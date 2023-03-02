import { CommentData } from "./application";

/**
 * Generates a HTML element from the input string.
 * @param {string} html valid HTML markup.
 * @returns {Element} new HTML element.
 */
export const generateHtmlElement = html => {
  const template = document.createElement("template");
  const content = html.trim();

  if (!content) {
    throw new Error("No valid HTML markup.");
  }

  template.innerHTML = content;
  return template.content.firstChild;
};

/**
 * Generates a HTML button element.
 * @param {string} displayText content to display.
 * @param {(e: Event, metadata: CommentData) => void} callback onclick callback.
 * @param {CommentData} metadata metadata to pass in the callback.
 * @param {string} buttonType valid arguments: `accept`, `danger` and an empty string.
 * @returns {Element} button HTML element.
 */
export const generateButtonElement = (displayText, callback, metadata, buttonType = "") => {
  const markup = `<button>${displayText}</button>`;
  const button = generateHtmlElement(markup);

  button.classList.add(buttonType);
  button.addEventListener("onclick", e => callback(e, metadata));
  return button;
};

/**
 * Gemerates a HTML chip element.
 * @param {string} dateTime date and time string
 * @returns {Element} chip HTML element.
 */
export const generateDateTimeChip = dateTime => generateHtmlElement(`<p class="chip comment__created-at">${dateTime}</p>`);

/**
 * Generates a HTML comment element from previous data.
 * @param {CommentData} commentObject loaded comment.
 * @param {(e: Event, metadata: CommentData) => void} likeUnlikeCallback triggers when the like button is clicked.
 * @param {(e: Event, metadata: CommentData) => void} deleteCallback trigger when the delete button is clicked.
 * @returns {Element} comment HTML element.
 */
export const generateLoadedComment = (commentObject, likeUnlikeCallback, deleteCallback) => {
  const markup = `
    <div class="comment" id="comment-ID">
      <p>${commentObject.text}</p>
      <div class="comment__controls">
      </div>
    </div>`;

  const element = generateHtmlElement(markup);
  const controls = element.querySelector(".comment__controls");

  // #region generating comment controls
  const likeButton = generateButtonElement(
    commentObject.isLiked ? "Unlike" : "Like",
    likeUnlikeCallback,
    commentObject,
    commentObject.isLiked ? "danger" : "accept"
  );
  const deleteButton = generateButtonElement(
    "Delete",
    deleteCallback,
    commentObject
  );
  const dateTimeChip = generateDateTimeChip(commentObject.createdAt);

  // #endregion

  controls.appendChild(likeButton);
  controls.appendChild(deleteButton);
  controls.appendChild(dateTimeChip);

  return element;
};

/**
 * Generates a new HTML comment.
 * The line value is the <input> id value.
 * @param {number} line line number.
 * @param {(e: Event, metadata: CommentData) => void} saveCallback called on save.
 * @param {(e: Event, metadata: CommentData) => void} sendCallback called on send.
 * @returns {Element} New HTML comment.
 */
export const generateNewComment = (line, saveCallback, sendCallback) => {
  const markup = `
    <div class="comment" id="comment-new">
      <input
      type="text"
      name="comment"
      id="${line}"
      class="chip"
      placeholder="New comment..."
      />
      <div class="comment__controls">
      </div>
    </div>`;

  const element = generateHtmlElement(markup);
  const controls = element.querySelector(".comment__controls");

  const saveButton = generateButtonElement(
    "Save",
    saveCallback,
    new CommentData(line, line, null, null, null)
  );

  const sendButton = generateButtonElement(
    "Send",
    sendCallback,
    new CommentData(line, line, null, null, null),
    "accept"
  );

  controls.appendChild(saveButton);
  controls.appendChild(sendButton);

  return element;
};
