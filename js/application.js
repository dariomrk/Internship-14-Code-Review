import { toggleClass } from "./document";
import { getCommentsSelector, getLineNumberSelector } from "./selectors";
import { getHeaders, getUrl } from "./utils";

export const toggleCommentsVisibility = line => {
  toggleClass(getCommentsSelector(line), "hidden");
};

export const toggleSelectedLine = line => {
  toggleClass(getLineNumberSelector(line), "selected");
};

/**
 * Attaches a comment toggler.
 * @param {number} lineNumber line number.
 * @param {Element} codeLineElement code line HTML element.
 * @returns {void}
 */
export const attachCommentToggler = (lineNumber, codeLineElement) => {
  codeLineElement.addEventListener("click", () => {
    toggleCommentsVisibility(lineNumber);
    toggleSelectedLine(lineNumber);
  });
};

/**
 * Encapsulates all comment data.
 */
export class CommentData {

  /**
   * CommentData constructor
   * @param {number} id comment id.
   * @param {number} line code line.
   * @param {string} text comment.
   * @param {boolean | null} isLiked is liked?
   * @param {string | null} createdAt standard datetime format.
   */
  constructor(id, line, text, isLiked = null, createdAt = null) {
    this.id = id;
    this.line = line;
    this.text = text;
    this.isLiked = isLiked;
    this.createdAt = createdAt ?? (new Date()).toISOString();
  }
}

/**
 * GET /code
 * @returns {string} code
 */
export const getCode = async () => {
  const response = await fetch(await getUrl("/code"), {
    headers: await getHeaders()
  });

  if (!response.ok) {
    throw new Error(response);
  }

  return (await response.json()).code;
};

/**
 * GET /comments
 * @returns {Array<CommentData>} array of comments.
 */
export const getComments = async () => {
  const response = await fetch(await getUrl("/comments"), {
    headers: await getHeaders()
  });

  if (!response.ok) {
    throw new Error(response);
  }

  return (await response.json()).comments;
};

/**
 * GET /comments/:id
 * @param {number} id comment id.
 * @returns {CommentData} comment object.
 */
export const getComment = async id => {
  const response = await fetch(await getUrl(`/comments/${id}`), {
    headers: await getHeaders()
  });

  if (!response.ok) {
    throw new Error(response);
  }

  return (await response.json()).comment;
};

/**
 * POST /create
 * @param {number} line line number.
 * @param {string} text comment text.
 * @returns {CommentData} comment object.
 */
export const createComment = async (line, text) => {
  if (text.trim() === "") {
    // eslint-disable-next-line no-alert
    alert("Empty comments are not allowed.");
    return;
  }
  const response = await fetch(await getUrl("/create"), {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify({
      line,
      text
    })
  });

  if (!response.ok) {
    throw new Error(response);
  }

  // eslint-disable-next-line consistent-return
  return (await response.json()).comment;
};

/**
 * PUT /update-is-liked/:id
 * @param {number} id comment id.
 * @param {boolean} isLiked comment like status.
 * @returns {void}
 */
export const updateIsLiked = async (id, isLiked) => {
  const response = await fetch(await getUrl(`/update-is-liked/${id}`), {
    method: "PUT",
    headers: await getHeaders(),
    body: JSON.stringify({
      isLiked
    })
  });

  if (!response.ok) {
    throw new Error(response);
  }
};

/**
 * DELETE /remove/:id
 * @param {number} id comment id.
 * @returns {void}
 */
export const removeComment = async id => {
  const response = await fetch(await getUrl(`/remove/${id}`), {
    method: "DELETE",
    headers: await getHeaders()
  });

  if (!response.ok) {
    throw new Error(response);
  }
};

/**
 * Get comments stored in localStorage.
 * @returns {Array<CommentData>} locally stored comments.
 */
export const loadLocalComments = () => JSON.parse(localStorage.getItem("localComments")) ?? [];

/**
 * Store new comment to localStorage.
 * @param {CommentData} newComment new comment.
 * @returns {void}
 */
export const storeNewLocalComment = newComment => {
  if (newComment.text.trim() === "") {
    return;
  }
  localStorage.setItem("localComments", JSON.stringify([...loadLocalComments(), newComment]));
};

/**
 * Removes the comment from localStorage.
 * @param {number} commentId local comment id.
 * @returns {void}
 */
export const removeLocalComment = commentId => localStorage.setItem("localComments", JSON.stringify(loadLocalComments().filter(comment => comment.id !== commentId)));

/**
 * Generates a valid local comment id (negative integer).
 * @returns {number} valid local comment id.
 */
export const generateLocalCommentId = () => loadLocalComments().length * -1 - 1;
