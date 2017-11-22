"use strict";

// DOM ELEMENTS
var form = document.querySelectorAll(".js-form-valid");

// BACKUP ADD NOVALIDATE TO FORM ON PAGE
form.forEach(function (item) {
  item.setAttribute("novalidate", true);
});
console.log("HEY");

// EVENT LISTENERS
document.addEventListener("blur", function (e) {
  e.stopPropagation();

  // return if form doesnt have validation flag
  if (!e.target.form.classList.contains("js-form-valid")) {
    return;
  }

  var error = e.target.validity;
  console.log({ error: error });
}, true);