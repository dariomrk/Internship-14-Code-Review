import { toggleClass } from "./document";
import { getCommentsSelector, getLineNumberSelector } from "./selectors";

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
