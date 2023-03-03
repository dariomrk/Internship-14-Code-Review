/**
 * Returns the target HTML element.
 * @param {string} targetSelector valid selector.
 * @returns {Element | null} HTML element.
 */
export const getTarget = targetSelector => document.querySelector(targetSelector);

/**
 * Removes the target HTML element.
 * @param {string} targetSelector valid selector.
 * @returns {void}
 */
export const removeTarget = targetSelector => getTarget(targetSelector).remove();

/**
 * Removes the "hidden" css class.
 * @param {string} targetSelector valid selector.
 * @returns {void}
 */
export const showElement = targetSelector => getTarget(targetSelector).classList.remove("hidden");

/**
 * Adds the "hidden" css class.
 * @param {string} targetSelector valid selector.
 * @returns {void}
 */
export const hideElement = targetSelector => getTarget(targetSelector).classList.add("hidden");

/**
 * Toggles a css class on the target element.
 * @param {string} targetSelector valid selector.
 * @param {string} className css class.
 * @returns {void}
 */
export const toggleClass = (targetSelector, className) => {
  const target = getTarget(targetSelector);

  if (target.classList.contains(className)) {
    target.classList.remove(className);
  } else {
    target.classList.add(className);
  }
};

export const getApplication = () => getTarget(".application");
