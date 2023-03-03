import { attachCommentToggler, CommentData, removeComment, updateIsLiked, createComment, removeLocalComment, storeNewLocalComment, generateLocalCommentId } from "./application.js";
import { getApplication, getCommentControls, getCommentSelector } from "./selectors.js";
import { generateHtmlElement, generateLocalComment, generateNewComment, generateServerComment } from "./generate.js";
import { filterComments, reloadRequired } from "./utils.js";

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

        const likeButton = getCommentControls(commentData.id)[0];

        if (likeButton.classList.contains("accept")) {
          likeButton.classList.remove("accept");
          likeButton.classList.add("danger");
          likeButton.innerHTML = "Unlike";
        } else {
          likeButton.classList.remove("danger");
          likeButton.classList.add("accept");
          likeButton.innerHTML = "Like";
        }

      },
      (_, commentData) => {

        // deleteCallback
        removeComment(commentData.id);
        document.querySelector(getCommentSelector(commentData.id)).remove();
      }));

    generatedServerComments.forEach(comment => generatedLine.querySelector(".comments").appendChild(comment));
  }

  if (localComments !== null && localComments.length !== 0) {
    const filteredLocalComments = filterComments(line, localComments);
    const generatedLocalComments = filteredLocalComments.map(comment => generateLocalComment(comment,
      (_, commentData) => {

        // deleteCallback
        removeLocalComment(commentData.id);
        document.querySelector(getCommentSelector(commentData.id)).remove();
      }));

    generatedLocalComments.forEach(comment => generatedLine.querySelector(".comments").appendChild(comment));
  }

  generatedLine.querySelector(".comments").appendChild(generateNewComment(line,
    (_, commentData) => {

      // saveCallback

      const content = document.querySelector(`#comment-new__input-${commentData.line}`).value;

      if (content.trim() === "") {
        // eslint-disable-next-line no-alert
        alert("Empty comments are not allowed.");
        return;
      }
      storeNewLocalComment(new CommentData(
        generateLocalCommentId(),
        commentData.line,
        content
      ));
      reloadRequired();
    },
    (_, commentData) => {

      // sendCallback
      const content = document.querySelector(`#comment-new__input-${commentData.line}`).value;

      if (content.trim() === "") {
        // eslint-disable-next-line no-alert
        alert("Empty comments are not allowed.");
        return;
      }
      createComment(commentData.line, content);
      reloadRequired();
    }));

  getApplication().appendChild(generatedLine);
};
