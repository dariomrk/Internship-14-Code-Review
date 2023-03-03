import { attachCommentToggler, CommentData, removeComment, updateIsLiked } from "./application";
import { getApplication } from "./selectors";
import { generateHtmlElement, generateLocalComment, generateNewComment, generateServerComment } from "./generate";
import { filterComments } from "./utils";

/**
 * Renders a code line along with all of the comments.
 * @param {number} line line number.
 * @param {string} code code to display.
 * @param {Array<CommentData>} serverComments server comments.
 * @param {Array<CommentData>} localComments local comments.
 * @returns {void}
 */
export const renderLine = (line, code, serverComments = null, localComments = null) => {
  const template =
  `<div class="code-line" id="line-${line}">
    <p class="line-number">${line}</p>
    <div class="content">
      <pre><code class="code">${code}</code></pre>
      <div class="comments hidden">
      </div>
    </div>
  </div>`;
  const generatedLine = generateHtmlElement(template);

  attachCommentToggler(line, generatedLine);

  if (serverComments !== null && serverComments.length !== 0) {
    const filteredServerComments = filterComments(line, serverComments);
    const generatedServerComments = filteredServerComments.map(comment => generateServerComment(comment,
      (_, commentData) => {

        // likeUnlikeCallback
        updateIsLiked(commentData.id, !commentData.isLiked);

      // TODO update HTML
      },
      (_, commentData) => {

        // deleteCallback
        removeComment(commentData.id);

      // TODO update HTML
      }));

    generatedServerComments.forEach(comment => generatedLine.querySelector(".comments").appendChild(comment));
  }

  if (localComments !== null && localComments.length !== 0) {
    const filteredLocalComments = filterComments(line, localComments);
    const generatedLocalComments = filteredLocalComments.map(comment => generateLocalComment(comment,
      (_, commentData) => {

      // TODO Update HTML
      // TODO Implement removal of local comments.
      }));

    generatedLocalComments.forEach(comment => generatedLine.querySelector(".comments").appendChild(comment));
  }

  generatedLine.querySelector(".comments").appendChild(generateNewComment(line,
    (_, commentData) => {

      // save callback
      // TODO update HTMl
      // TODO save to localstorage
    },
    (_, commentData) => {

      // send callback
      // TODO update HTML
      // TODO save to server
    }));

  getApplication().appendChild(generatedLine);
};
