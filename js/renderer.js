import { attachCommentToggler, CommentData, removeComment, updateIsLiked, createComment, getComments } from "./application";
import { getApplication, getCommentControls, getCommentSelector, getCommentsSelector } from "./selectors";
import { generateHtmlElement, generateLocalComment, generateNewComment, generateServerComment } from "./generate";
import { filterComments, reloadRequired } from "./utils";
import { getTarget } from "./document";

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

      // TODO Update HTML
      // TODO Implement removal of local comments.
      }));

    generatedLocalComments.forEach(comment => generatedLine.querySelector(".comments").appendChild(comment));
  }

  generatedLine.querySelector(".comments").appendChild(generateNewComment(line,
    (_, commentData) => {

      // saveCallback
      // TODO save to localstorage
      reloadRequired();
    },
    (_, commentData) => {

      // sendCallback
      const content = document.querySelector(`#comment-new__input-${commentData.line}`).value;

      createComment(commentData.line, content);
      reloadRequired();
    }));

  getApplication().appendChild(generatedLine);
};
