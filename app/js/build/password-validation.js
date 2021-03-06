"use strict";

// PW REQUIREMENTS
var passwordField = document.querySelectorAll(".js-password");
var passwordReqIcon = document.querySelector(".check-icon");
var checkForMobile = !/Mobi/.test(navigator.userAgent);
var isCapsLockOn = false;

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
  if (passwordField[0].value !== passwordField[1].value) {
    passwordField[1].classList.remove("matching");
    return false;
  } else {
    passwordField[1].classList.add("matching");
    return true;
  }
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
    reqField.setCustomValidity("Passwords do not match");
    return "Passwords do not match";
  }

  return "Please enter a valid password";
};

/* **************************
  CHECK FOR VALIDITY
*************************** */
var showPasswordError = function showPasswordError(element) {
  element.setCustomValidity("Please enter a valid answer");
  passwordReqIcon.classList.add("hide");
  var errMsg = reqPwErr(hasCapital, hasLowercase, hasNumber, isMatching, element);
  showErrorMessage(element, errMsg);
};

var passwordCheck = function passwordCheck(currentElement, otherPasswordField) {
  var passwordOne = currentElement.value;
  var passwordTwo = otherPasswordField.value;

  if (passwordOne !== "") {
    hasCapital = checkUppercase(passwordOne, currentElement);
    hasLowercase = checkLowercase(passwordOne, currentElement);
    hasNumber = checkNumber(passwordOne, currentElement);
  }

  if (passwordOne !== "" && passwordTwo !== "") {
    isMatching = checkPwMatch();
  } else {
    isMatching = true;
  }

  if (hasCapital && hasLowercase && hasNumber && isMatching) {
    currentElement.setCustomValidity("");
    passwordReqIcon.classList.remove("hide");

    passwordField.forEach(function (item) {
      var error = checkForError(item);

      if (!error) {
        removeErrorMessage(item);
      } else if (error) {
        showPasswordError(item);
      }
    });
  } else {
    showPasswordError(currentElement);
  }
};

/* **************************
  CAPS LOCK CHECKER FUNCTIONS
*************************** */

var showCapsLockWarning = function showCapsLockWarning(newIsCapsLockOn, field) {
  if (!newIsCapsLockOn) {
    field.parentElement.classList.remove("caps-lock-on");
    isCapsLockOn = false;
    return;
  }

  if (newIsCapsLockOn) {
    field.parentElement.classList.add("caps-lock-on");
    isCapsLockOn = true;
  }
};

var checkIfCapsLockIsOn = function checkIfCapsLockIsOn(keyboardEvent) {
  isCapsLockOn = keyboardEvent ? keyboardEvent.getModifierState("CapsLock") : false;
  return isCapsLockOn;
};

var handleKeyPress = function handleKeyPress(event) {
  var newIsCapsLockOn = checkIfCapsLockIsOn(event);
  showCapsLockWarning(newIsCapsLockOn, event.target);
};

/* **************************
  INDEX PASSWORD
*************************** */

var getFields = function getFields(currentElement) {
  var fieldsIndex = Array.prototype.slice.call(passwordField);
  var elIndex = fieldsIndex.indexOf(currentElement);
  var sendIndex = 1;
  elIndex === 0 ? sendIndex = 1 : sendIndex = 0;

  return sendIndex;
};

/* **************************
  EVENT LISTENERS
*************************** */

passwordField.forEach(function (item) {
  item.addEventListener("blur", function (e) {
    e.stopPropagation();

    var elementIndex = getFields(e.target);

    passwordCheck(e.target, passwordField[elementIndex]);
    if (checkForMobile) {
      showCapsLockWarning(false, e.target);
    }
  });

  if (!checkForMobile) {
    item.addEventListener("keydown", function (e) {
      handleKeyPress(e);
    });

    item.addEventListener("keyup", function (e) {
      handleKeyPress(e);
    });
  }
});