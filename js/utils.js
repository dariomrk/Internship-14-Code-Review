/**
 * Gets the environment data.
 * @returns {Promise<{baseUrl: string, apiKey: string}>} Env data.
 */
// eslint-disable-next-line consistent-return
export const getEnvData = async () => {
  try {
    return await (await fetch("../env.json")).json();
  // eslint-disable-next-line no-unused-vars
  } catch (_) {
    // eslint-disable-next-line no-console
    console.warn("Please read the README.md in the project root.");
  }
};

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

/**
 * Filters by line.
 * @param {number} line filter comments for this line.
 * @param {Array<CommentData>} comments loaded comments.
 * @returns {Array<CommentData>} comments that belong to the given line.
 */
export const filterComments = (line, comments) =>
  comments.filter(comment => comment.line === line);

export const reloadRequired = () => {
  // eslint-disable-next-line no-alert
  alert("Comment will be visible after a page reload.");
};
