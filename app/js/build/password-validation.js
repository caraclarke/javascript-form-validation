"use strict";

// PW REQUIREMENTS
var passwordField = document.querySelectorAll(".js-password");
var passwordReqIcon = document.querySelector(".check-icon");

// PASSWORD
var hasCapital = false;
var hasLowercase = false;
var hasNumber = false;
var isMatching = false;

/* **************************
  PASSWORD CHECKS
  *************************** */

var checkUppercase = function checkUppercase(password, index, removeText, addText) {
  var upperRegex = new RegExp("[A-Z]");

  if (password && upperRegex.exec(password)) {
    return true;
  }

  return false;
};

var checkLowercase = function checkLowercase(password, index, removeText, addText) {
  var lowerRegex = new RegExp("[a-z]");

  if (password && lowerRegex.exec(password)) {
    return true;
  }

  return false;
};

var checkNumber = function checkNumber(password, index, removeText, addText) {
  var numRegex = new RegExp("[0-9]");
  if (password && numRegex.exec(password)) {
    return true;
  }

  return false;
};

var checkPwMatch = function checkPwMatch() {
  var password = passwordField[0];
  var passwordConfirm = passwordField[1];

  if (password.value !== "" && passwordConfirm.value !== "") {
    if (password.value !== passwordConfirm.value) {
      passwordField.forEach(function (field) {
        field.setCustomValidity("Passwords must match");
        showErrorMessage(field, "Passwords do not match");
      });

      passwordField[1].classList.remove("matching");
      return false;
    }
  }

  passwordField[1].classList.add("matching");
  return true;
};

/* **************************
  REQUIREMENT ERROR STATES
*************************** */

var reqPwErr = function reqPwErr(capBool, lowerBool, numBool, matchBool, reqField) {
  if (!capBool) {
    reqField.setCustomValidity("Uppercase letter failure");
  }

  if (!lowerBool) {
    reqField.setCustomValidity("Lowercase letter failure");
  }

  if (!numBool) {
    reqField.setCustomValidity("Number failure");
  }

  if (!matchBool) {
    return "Passwords do not match";
  }

  return "Please enter a valid password";
};

/* **************************
  CHECK FOR VALIDITY
*************************** */
var passwordCheck = function passwordCheck(element) {
  var password = element.value;

  if (password !== "") {
    hasCapital = checkUppercase(password, element);
    hasLowercase = checkLowercase(password, element);
    hasNumber = checkNumber(password, element);
    isMatching = checkPwMatch();
  }

  if (hasCapital && hasLowercase && hasNumber && isMatching) {
    element.setCustomValidity("");
    passwordReqIcon.classList.remove("hide");

    passwordField.forEach(function (item) {
      if (item.checkValidity()) {
        removeErrorMessage(item);
      } else if (!item.checkValidity() && item.value !== "") {
        checkForError(item);
      }
    });
  } else {
    element.setCustomValidity("Please enter a valid answer");
    passwordReqIcon.classList.add("hide");
    var errMsg = reqPwErr(hasCapital, hasLowercase, hasNumber, isMatching, element);
    showErrorMessage(element, errMsg);
  }
};

/* **************************
  EVENT LISTENERS
*************************** */

passwordField.forEach(function (item) {
  item.addEventListener("blur", function (e) {
    e.stopPropagation();

    passwordCheck(e.target);
  });
});