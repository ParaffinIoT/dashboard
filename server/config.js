const isDevelopment = process.env.NODE_ENV !== "production";

isDevelopment && require("dotenv").config();

/**
 * Load .env Variables
 * @param {String} env
 */
const Config = env => {
  const envirVariable = process.env[env];
  if (!envirVariable) throw new Error(`${env} is required`);
  return process.env[env];
};

module.exports = {
  Config
};
