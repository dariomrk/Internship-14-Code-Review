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
 * Encapsulates all comment data.
 */
export class CommentData {

  /**
   * CommentData constructor
   * @param {number} id comment id.
   * @param {number} line code line.
   * @param {string} text comment.
   * @param {boolean} isLiked is liked?
   * @param {string} createdAt standard datetime format.
   */
  constructor(id, line, text, isLiked, createdAt) {
    this.id = id;
    this.line = line;
    this.text = text;
    this.isLiked = isLiked;
    this.createdAt = createdAt;
  }

  /**
   * Returns the JSON representation of the class instance.
   * @returns {string} JSON.
   */
  toJson() {
    return JSON.stringify({
      id: this.id,
      line: this.line,
      text: this.text,
      isLiked: this.isLiked,
      createdAt: this.createdAt
    });
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

  return (await response.json()).comment;
};
