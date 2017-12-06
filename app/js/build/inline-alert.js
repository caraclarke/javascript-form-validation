"use strict";

var feInlineAlert = document.querySelector("#fe-error-container");
var inlineAlertList = document.querySelector("#fe-error-container #error-list");

var clearFormLevelErrorLinks = function clearFormLevelErrorLinks() {
  while (inlineAlertList.hasChildNodes()) {
    inlineAlertList.removeChild(inlineAlertList.lastChild);
  }
};

var createFormLevelErrorLink = function createFormLevelErrorLink(errField, error) {
  var id = errField.getAttribute("id");
  var listItem = document.createElement("li");
  listItem.className = "error-item";
  listItem.id = "list-error-for-" + id;

  listItem.innerHTML = "<a href=\"#" + id + "\">" + error + "</a>";
  inlineAlertList.appendChild(listItem);
};