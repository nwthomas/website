const ENVIRONMENT = process.env.NODE_ENV || "";

const PRODUCTION_ENVIRONMENT = "production";
const DEVELOPMENT_ENVIRONMENT = "development";

export const isDevelopmentEnvironment = ENVIRONMENT === DEVELOPMENT_ENVIRONMENT;
export const isProductionEnvironment = ENVIRONMENT === PRODUCTION_ENVIRONMENT;
