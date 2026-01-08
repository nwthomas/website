import * as Sentry from "@sentry/nextjs";

import { REDIS_TOKEN, REDIS_URL } from "./constants";
import { RedisClientType, createClient } from "redis";

function getPostViewsRedisKey(postId: string) {
  return `${postId}-views`;
}

class RedisSingleton {
  private static instance: RedisSingleton;
  private client: RedisClientType | null = null;
  private isConnecting = false;

  public static getInstance(): RedisSingleton {
    if (!REDIS_URL) {
      throw new Error("REDIS_URL is not set");
    }
    if (!REDIS_TOKEN) {
      throw new Error("REDIS_TOKEN is not set");
    }

    if (!RedisSingleton.instance) {
      RedisSingleton.instance = new RedisSingleton();
    }
    return RedisSingleton.instance;
  }

  private async ensureConnection(): Promise<void> {
    if (this.client?.isOpen) {
      return;
    }

    if (this.isConnecting) {
      while (this.isConnecting) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      return;
    }

    this.isConnecting = true;

    try {
      this.client = createClient({
        url: `rediss://default:${REDIS_TOKEN}@${REDIS_URL}`,
      });

      this.client.on("error", (error) => {
        Sentry.captureException(error);
      });

      await this.client.connect();
    } finally {
      this.isConnecting = false;
    }
  }

  public async set(key: string, value: unknown, ttl?: number): Promise<boolean> {
    await this.ensureConnection();

    if (!this.client) {
      throw new Error("Redis client not initialized");
    }

    const serializedValue = typeof value === "string" ? value : JSON.stringify(value);

    if (ttl !== undefined) {
      await this.client.setEx(key, ttl, serializedValue);
    } else {
      await this.client.set(key, serializedValue);
    }

    return true;
  }

  public async increment(key: string): Promise<number> {
    await this.ensureConnection();
    if (!this.client) {
      throw new Error("Redis client not initialized");
    }
    return await this.client.incr(key);
  }

  public async get<T = unknown>(key: string): Promise<T | null> {
    await this.ensureConnection();

    if (!this.client) {
      throw new Error("Redis client not initialized");
    }

    const value = await this.client.get(key);

    if (value === null) {
      return null;
    }

    try {
      return JSON.parse(value) as T;
    } catch {
      return value as T;
    }
  }

  public async mGet<T = unknown>(keys: string[]): Promise<Record<string, T | null>> {
    await this.ensureConnection();

    if (!this.client) {
      throw new Error("Redis client not initialized");
    }

    const values = (await this.client.mGet(keys)) as (T | null)[];

    const result = values.reduce(
      (acc, value, index) => {
        acc[keys[index]] = value;
        return acc;
      },
      {} as Record<string, T | null>,
    );

    return result;
  }

  public async delete(key: string): Promise<boolean> {
    await this.ensureConnection();

    if (!this.client) {
      throw new Error("Redis client not initialized");
    }

    const result = await this.client.del(key);
    return result > 0;
  }

  public async exists(key: string): Promise<boolean> {
    await this.ensureConnection();

    if (!this.client) {
      throw new Error("Redis client not initialized");
    }

    const result = await this.client.exists(key);
    return result > 0;
  }

  public async disconnect(): Promise<void> {
    if (this.client?.isOpen) {
      await this.client.quit();
    }
    this.client = null;
  }
}

const redis = RedisSingleton.getInstance();

export { redis, getPostViewsRedisKey };
