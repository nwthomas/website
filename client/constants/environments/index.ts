const NODE_ENV = process.env.NODE_ENV;

const PRODUCTION_ENV_LABEL = "production";

export const isProductionEnvironment = NODE_ENV === PRODUCTION_ENV_LABEL;
