import { CommentData, removeComment, updateIsLiked } from "./application";
import { getApplication } from "./document";
import { generateHtmlElement, generateServerComment } from "./generate";
import { filterComments } from "./utils";

/**
 * Renders a code line along with all of the comments.
 * @param {number} line line number.
 * @param {string} code code to display.
 * @param {Array<CommentData>} comments all comments.
 * @returns {void}
 */
export const renderLine = (line, code, comments) => {
  const template =
  `<div class="code-line" id="line-${line}">
    <p class="line-number selected">${line}</p>
    <div class="content">
      <pre><code class="code">${code}</code></pre>
      <div class="comments">
      </div>
    </div>
  </div>`;
  const generatedLine = generateHtmlElement(template);
  const filteredComments = filterComments(line, comments);
  const generatedServerComments = filteredComments.map(comment => generateServerComment(comment,
    (_, commentData) => {

      // likeUnlikeCallback
      updateIsLiked(commentData.id, !commentData.isLiked);
    },
    (_, commentData) => {

      // deleteCallback
      removeComment(commentData.id);
    }));

  generatedServerComments.forEach(comment => generatedLine.querySelector(".comments").appendChild(comment));
  getApplication().appendChild(generatedLine);
};
