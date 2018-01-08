"use strict";

var spaceRegex = /\s/g;

var phoneFormat = function phoneFormat(element) {
  var phEl = element;
  var value = phEl.value.replace(/\s/g, "");
  var formatRegex = /\-/g;

  if (formatRegex.test(value)) {
    value = value.replace(/\-/g, "");
  }

  if (value.length > 10) {
    value = lengthRequirement(value, 10);
    phEl.value = value.replace(/([\d]{3})-*([\d]{3})-*([\d]{4})$/, "$1-$2-$3");
  } else {
    phEl.value = value.replace(/([\d]{3})-*([\d]{3})-*([\d]{4})$/, "$1-$2-$3");
  }
};

var phoneValidate = function phoneValidate(element) {
  var phoneNumber = element.value;

  if (spaceRegex.test(phoneNumber)) {
    element.setCustomValidity("no spaces");
    showErrorMessage(element, "Mobile number cannot contain spaces");
  } else {
    element.setCustomValidity("");
  }
};