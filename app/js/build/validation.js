"use strict";

// format DOB
var lengthRequirement = function lengthRequirement(value, lengthReq) {
  var elementValue = value;
  var maxLength = lengthReq;

  var sliceValue = maxLength - elementValue.length;
  elementValue = elementValue.slice(0, sliceValue);
  return elementValue;
};

var dateFormat = function dateFormat(element) {
  var dEl = element;
  var value = dEl.value.replace(/\s/g, "");
  var formatRegex = /\//g;

  if (formatRegex.test(value)) {
    value = value.replace(/\//g, "");
  }

  if (value.length > 8) {
    value = lengthRequirement(value, 8);
    dEl.value = value.replace(/^([\d]{2})([\d]{2})([\d]{4})$/, "$1/$2/$3");
  } else {
    dEl.value = value.replace(/^([\d]{2})\/*([\d]{2})\/*([\d]{4})$/, "$1/$2/$3");
  }
};

/* **************************
  VALIDATE DOB INPUT
*************************** */

// http://stackoverflow.com/a/1433119/6826746
var daysInMonth = function daysInMonth(m, y) {
  // m is 0 indexed: 0-11
  switch (m) {
    case 1:
      return y % 4 === 0 && y % 100 || y % 400 === 0 ? 29 : 28;
    case 8:case 3:case 5:case 10:
      return 30;
    default:
      return 31;
  }
};

var isValid = function isValid(d, m, y) {
  // m is 0 indexed: 0-11
  return m >= 0 && m < 12 && d > 0 && d <= daysInMonth(m, y);
};

var checkDob = function checkDob(inputVal) {
  var regex = /\//g;

  if (inputVal) {
    var value = inputVal.value;

    if (regex.test(value)) {
      value = value.replace(/\//g, "");
    }

    if (value.length < 8) {
      inputVal.setCustomValidity("Invalid Date");
      showErrorMessage(inputVal, "MM/DD/YYYY");
      return false;
    } else if (value.length > 8) {
      value = lengthRequirement(value, 8);
    }

    var mm = parseInt(value.slice(0, 2)) - 1,
        dd = parseInt(value.slice(2, 4)),
        yyyy = parseInt(value.slice(4, 8));

    if (isValid(dd, mm, yyyy)) {
      var date = new Date(yyyy, mm, dd);
      var now = new Date();

      if (now > date) {
        // input date is before todays date
        inputVal.setCustomValidity("");
        removeErrorMessage(inputVal);
        return false;
      } else {
        // the input date is after todays date
        inputVal.setCustomValidity("Please enter a date that is not in the future");
        showErrorMessage(inputVal, "Please enter a date that is not in the future");
        return true;
      }
    } else {
      inputVal.setCustomValidity("Invalid Date");
      showErrorMessage(inputVal, "MM/DD/YYYY");
      return true;
    }
  } // end if inputVal

  return false;
};
"use strict";

/* **************************
  DOM VARIABLES
  *************************** */

var form = document.querySelectorAll(".js-form-valid");

/* **************************
  VALIDATION FUNCTIONS
  *************************** */
form.forEach(function (item) {
  item.setAttribute("novalidate", true);
});

// REMOVE THE ERROR MESSAGE
var removeErrorMessage = function removeErrorMessage(field) {
  var inputField = field;

  if (inputField.type === "radio" && inputField.name) {
    inputField.parentElement.parentElement.parentElement.classList.remove("error");

    var group = document.getElementsByName(inputField.name);
    if (group.length > 0) {
      group.forEach(function (item) {
        if (item.form !== inputField.form) {
          item.classList.remove("error");
        }
      });

      inputField = group[group.length - 1];
    }
  } else {
    inputField.classList.remove("error");
  }

  // Remove ARIA role from the inputField
  inputField.removeAttribute("aria-describedby");

  // Get inputField id or name
  var id = inputField.id || inputField.name;
  if (!id) {
    return;
  }

  // Check if an error message is in the DOM
  var message = inputField.form.querySelector(".input-help#error-for-" + id);
  if (!message) {
    return;
  }

  // If so, hide it
  message.innerHTML = "";
  message.style.display = "none";
  message.style.visibility = "hidden";
};

// CREATE THE ERROR MESSAGE
var createErrorMessage = function createErrorMessage(errorField, id, error) {
  var message = errorField.form.querySelector(".input-help#error-for-" + id);
  var errorMsg = error;

  if (!message) {
    message = document.createElement("div");
    message.className = "input-help";
    message.id = "error-for-" + id;

    // If the field is a radio button or checkbox, insert error after the label
    var label = void 0;
    if (errorField.type === "radio" || errorField.type === "checkbox") {
      label = errorField.form.querySelector("label[for=\"" + id + "\"]") || errorField.parentNode;
      if (label) {
        label.parentNode.append(message);
      }
    }

    // Otherwise, insert it after the field
    if (!label) {
      errorField.parentNode.insertBefore(message, errorField.nextSibling);
    } else if (label && !(errorField.type === "radio" || errorField.type === "checkbox")) {
      errorField.parentNode.insertBefore(message, errorField.lastChild);
    }
  }

  // Update error message
  errorField.setAttribute("aria-describedby", "error-for-" + id);

  // Show error message
  message.innerHTML = errorMsg;
  message.setAttribute("role", "alert");
  message.style.display = "block";
  message.style.visibility = "visible";
};

// SHOW THE ERROR MESSAGE
var showErrorMessage = function showErrorMessage(field, error) {
  var errorField = field;

  if (errorField.type === "radio" && errorField.name) {
    errorField.parentElement.parentElement.parentElement.classList.add("error");

    var group = document.getElementsByName(errorField.name);
    if (group.length > 0) {
      group.forEach(function (item) {
        if (item.form !== errorField.form) {
          item.classList.add("error");
        }

        errorField = group[group.length - 1];
      });
    }
  } else {
    errorField.classList.add("error");
  }

  // Get errorField id or name
  var id = errorField.id || errorField.name;
  if (!id) {
    return;
  }

  // Check if error message field already exists
  // If not, create one
  createErrorMessage(errorField, id, error);
};

// GET THE ERROR
var getError = function getError(field) {
  var validity = field.validity;
  /* eslint-disable curly, template-curly-spacing, consistent-return */

  // If valid, return null
  if (validity.valid) return;
  var fieldName = "This section";

  if (field.getAttribute("data-fieldName")) {
    fieldName = field.getAttribute("data-fieldName");
  }

  // If field is required and empty
  if (validity.valueMissing) return fieldName + " is missing";

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
    if (field.classList.contains("js-address")) return "Please do not use any of these special characters < > &";

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

  var validity = getError(field);
  return validity;
};

/* **************************
  EVENT LISTENERS
  *************************** */
document.addEventListener("blur", function (e) {
  e.stopPropagation();

  // return if form doesnt have validation flag
  if (!e.target.form.classList.contains("js-form-valid")) {
    return;
  }

  if (e.target.classList.contains("js-dob") && e.target.value !== "") {
    dateFormat(e.target);
    checkDob(e.target);
    return;
  }

  var error = checkForError(e.target);

  if (error) {
    showErrorMessage(e.target, error);
    return;
  }

  // Otherwise, remove any existing error message
  removeErrorMessage(event.target);
}, true);

document.addEventListener("submit", function (e) {
  e.preventDefault();

  // Only run on forms flagged for validation
  if (!e.target.classList.contains("js-form-valid")) return;

  // Get all of the form elements
  var fields = e.target.elements;

  // Validate each field
  // Store the first field with an error to a variable so we can bring it into focus later
  var error, hasError;
  for (var i = 0; i < fields.length; i++) {
    error = checkForError(fields[i]);
    if (error) {
      showErrorMessage(fields[i], error);
      if (!hasError) {
        hasError = fields[i];
      }
    }
  }

  // If there are errrors, dont submit form and focus on first element with error
  if (hasError) {
    hasError.focus();
  }

  // Otherwise, let the form submit normally
  // You could also bolt in an Ajax form submit process here
}, false);