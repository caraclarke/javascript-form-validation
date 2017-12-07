"use strict";

// SECURITY REQUIREMENTS
var securityField = document.querySelectorAll(".js-security");
var usernameField = document.querySelector(".js-username");

// SQ SPECIFIC DOM
var dropdownElement = document.querySelectorAll(".js-select--control");
var sqOptions = document.querySelectorAll(".js-select--option");

// SECURITY QUESTION
var matchPassword = true;
var matchUsername = true;
var matchesQuestion = false;
var answersMatching = false;

/* **************************
  SECURITY QUESTION CHECKS
  *************************** */

// check if security question is matching the password
var checkPassword = function checkPassword(password, confirmPassword, answer, index, removeText, addText, field) {
  if (answer === password || answer === confirmPassword) {
    field.setCustomValidity("Answer cannot match password");
    return false;
  }

  return true;
};

// check if security question is matching the username
var checkUsername = function checkUsername(username, answer, index, removeText, addText, field) {
  if (username === answer) {
    field.setCustomValidity("Answer cannot match username");
    return false;
  }

  return true;
};

var checkQuestion = function checkQuestion(index, field) {
  var selectedOption = [];
  var charOnly = /[^\w\s]/gi;
  var result = true;

  sqOptions.forEach(function (item) {
    if (item.selected) {
      var value = item.innerHTML.replace(charOnly, "");
      selectedOption.push(value);
    }
  });

  // does it equal the selected question && case insentitive -> false
  if (selectedOption[index].toLowerCase() === field.value.toLowerCase()) {
    field.setCustomValidity("Answers cannot question");
    showError(field, "Answer must not be equal to a security question you selected");
    result = false;
  } else {
    result = true;
  }

  return result;
};

var checkQMatch = function checkQMatch() {
  // do the question answers match && case insensitive -> false
  // otherwise return true
  var answerOne = securityField[0];
  var answerTwo = securityField[1];

  if (answerOne.value !== "" && answerTwo.value !== "") {
    if (answerOne.value === answerTwo.value) {
      securityField.forEach(function (field) {
        field.setCustomValidity("Answers cannot match");
        showError(field, "Answers must be unique");
      });

      return false;
    }
  }

  return true;
};

/* **************************
  REQUIREMENT ERROR STATES
*************************** */

var reqSqErr = function reqSqErr(pwMatchBool, unMatchBool, optionMatchBool, matchAnswerBool, field) {

  if (!pwMatchBool) {
    field.setCustomValidity("Field text matches password");
  }

  if (!unMatchBool) {
    field.setCustomValidity("Field text matches username");
  }

  if (!optionMatchBool) {
    field.setCustomValidity("cant match selection");
    return "Answer must not be equal to a security question you selected";
  }

  if (!matchAnswerBool) {
    field.setCustomValidity("answers cant be the same");
    return "Answers must be unique";
  }

  if (field.value === "") {
    field.setCustomValidity("required section");
    return "Please answer the security question.";
  }

  return "Please enter a valid answer";
};

/* **************************
  CHECK FOR VALIDITY
*************************** */

var securityQCheck = function securityQCheck(element) {
  var password = passwordField[0].value;
  var confirmPassword = passwordField[1].value;
  var username = usernameField.value;
  var question = element.value;
  var fieldsIndex = Array.prototype.slice.call(securityField);
  var elIndex = fieldsIndex.indexOf(element);
  var errMsg = "";

  if (password !== "") {
    matchPassword = checkPassword(password, confirmPassword, question, elIndex, initialIndex, metIndex, element);
  }
  if (username !== "") {
    matchUsername = checkUsername(username, question, elIndex, initialIndex, metIndex, element);
  }

  matchesQuestion = checkQuestion(elIndex, element);
  answersMatching = checkQMatch();

  if (matchPassword && matchUsername && matchesQuestion && answersMatching) {
    element.setCustomValidity("");

    securityField.forEach(function (item) {
      if (item.checkValidity()) {
        removeError(item);
      } else if (!item.checkValidity() && item.value !== "") {
        elementActions(item);
      }
    });
  } else {
    element.setCustomValidity("Please enter a valid answer");
    errMsg = reqSqErr(matchPassword, matchUsername, matchesQuestion, answersMatching, element);
    showError(element, errMsg);
  }
};