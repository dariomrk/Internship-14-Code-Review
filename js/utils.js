/**
 * Gets the environment data.
 * @returns {Promise<{baseUrl: string, apiKey: string}>} Env data.
 */
export const getEnvData = async () => await (await fetch("../env.json")).json();

/**
 * Gets the full url.
 * @param {string} route api route.
 * @returns {string} full url.
 */
export const getUrl = async route => (await getEnvData()).baseUrl + route;

/**
 * Gets the api key.
 * @returns {string} api key.
 */
export const getKey = async () => (await getEnvData()).apiKey;

export const getHeaders = async () => new Headers({
  "Content-Type": "application/json",
  key: await getKey()
});
