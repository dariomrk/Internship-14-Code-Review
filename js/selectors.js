import { getTarget } from "./document";

/**
 * Returns the line selector.
 * @param {number} line line number.
 * @returns {string} line selector.
 */
export const getLineSelector = line => `#line-${line}`;

/**
 * Returns the line number selector.
 * @param {number} line line number.
 * @returns {string} line number selector.
 */
export const getLineNumberSelector = line => `${getLineSelector(line)} > .line-number`;

/**
 * Returns the comment selector.
 * @param {number} commentId comment id.
 * @returns {string} comment selector.
 */
export const getCommentSelector = commentId => `#comment-${commentId}`;

/**
 * Returns the comments selector.
 * @param {number} line line number.
 * @returns {string} comments selector.
 */
// #comment-160 > div
export const getCommentsSelector = line => `${getLineSelector(line)} > .content > .comments`;

/**
 * Returns all of the comment controls.
 * @param {number} commentId comment id
 * @returns {Array<Element>} comment controls.
 */
export const getCommentControls = commentId => {
  const comment = getTarget(`${getCommentSelector(commentId)} > .comment__controls`);

  return [...comment.children];
};

/**
 * Get the application element.
 * @returns {Element} application HTML element.
 */
export const getApplication = () => getTarget(".application");
