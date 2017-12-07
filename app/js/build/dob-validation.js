"use strict";

// format DOB
var lengthRequirement = function lengthRequirement(value, expectedLength) {
  var elementValue = value;
  var maxLength = expectedLength;

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

var checkDob = function checkDob(input) {
  var regex = /\//g;

  if (input) {
    var value = input.value;

    if (regex.test(value)) {
      value = value.replace(/\//g, "");
    }

    if (value.length < 8) {
      input.setCustomValidity("Invalid Date");
      showErrorMessage(input, "MM/DD/YYYY");
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
        input.setCustomValidity("");
        removeErrorMessage(input);
        return false;
      } else {
        // the input date is after todays date
        input.setCustomValidity("Please enter a date that is not in the future");
        showErrorMessage(input, "Please enter a date that is not in the future");
        return true;
      }
    } else {
      input.setCustomValidity("Invalid Date");
      showErrorMessage(input, "MM/DD/YYYY");
      return true;
    }
  } // end if inputVal

  return false;
};