const ENVIRONMENT = process.env.NODE_ENV || "";

const PRODUCTION_ENVIRONMENT = "production";

export const isProductionEnvironment = ENVIRONMENT === PRODUCTION_ENVIRONMENT;
