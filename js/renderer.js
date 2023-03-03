import { CommentData, removeComment, updateIsLiked } from "./application";
import { getApplication } from "./document";
import { generateHtmlElement, generateLocalComment, generateServerComment } from "./generate";
import { filterComments } from "./utils";

/**
 * Renders a code line along with all of the comments.
 * @param {number} line line number.
 * @param {string} code code to display.
 * @param {Array<CommentData>} serverComments server comments.
 * @param {Array<CommentData>} localComments local comments.
 * @returns {void}
 */
export const renderLine = (line, code, serverComments, localComments) => {
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
  const filteredServerComments = filterComments(line, serverComments);
  const filteredLocalComments = filterComments(line, localComments);
  const generatedServerComments = filteredServerComments.map(comment => generateServerComment(comment,
    (_, commentData) => {

      // likeUnlikeCallback
      updateIsLiked(commentData.id, !commentData.isLiked);

      // TODO Update HTML
    },
    (_, commentData) => {

      // deleteCallback
      removeComment(commentData.id);

      // TODO Update HTML
    }));
  const generatedLocalComments = filteredLocalComments.map(comment => generateLocalComment(comment,
    (_, commentData) => {

      // TODO Update HTML
      // TODO Implement removal of local comments.
    }));

  generatedServerComments.forEach(comment => generatedLine.querySelector(".comments").appendChild(comment));
  generatedLocalComments.forEach(comment => generatedLine.querySelector(".comments").appendChild(comment));
  getApplication().appendChild(generatedLine);
};
