"use strict";

// DOM ELEMENTS
var form = document.querySelectorAll(".js-form-valid");

// BACKUP ADD NOVALIDATE TO FORM ON PAGE
form.forEach(function (item) {
  item.setAttribute("novalidate", true);
});

var getError = function getError(validity) {
  /* eslint-disable curly, template-curly-spacing, consistent-return */

  // If valid, return null
  if (validity.valid) return;

  // If field is required and empty
  if (validity.valueMissing) return "Please fill out this field.";

  // If not the right type
  if (validity.typeMismatch) {
    if (field.type === "email") return "Please enter an email address.";
    if (field.type === "url") return "Please enter a URL.";
  }

  // If too short
  if (validity.tooShort) return "Please lengthen this text to at least " + field.getAttribute("minLength") + " characters";

  // If too long
  if (validity.tooLong) return "Please shorten this text to no more than " + field.getAttribute("maxLength") + " characters";

  // If number input isn"t a number
  if (validity.badInput) return "Please enter a number.";

  // If a number value doesn"t match the step interval
  if (validity.stepMismatch) return "Please select a valid value.";

  // If a number field is over the max
  if (validity.rangeOverflow) return "Please enter a value that is no more than " + field.getAttribute("max");

  // If a number field is below the min
  if (validity.rangeUnderflow) return "Please enter a value that is no less than " + field.getAttribute("min");

  // If pattern doesnt match
  if (validity.patternMismatch) {
    // If pattern info is included, return custom error
    if (field.hasAttribute("data-title")) return field.getAttribute("data-title");

    // Otherwise, generic error
    return "Please match the requested format";
  }

  // If all else fails, return a generic catchall error
  return "The value you entered for this field is invalid.";
  /* eslint-enable */
};

var checkForError = function checkForError(field) {
  // Dont validate submits, buttons, file and reset inputs, and disabled fields
  if (field.disabled || field.type === "file" || field.type === "reset" || field.type === "submit" || field.type === "button") return;

  var validity = getError(field.validity);
  console.log(validity);
};

// EVENT LISTENERS
document.addEventListener("blur", function (e) {
  e.stopPropagation();

  // return if form doesnt have validation flag
  if (!e.target.form.classList.contains("js-form-valid")) {
    return;
  }

  var error = checkForError(e.target);
}, true);