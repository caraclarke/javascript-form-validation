"use strict";

// PW REQUIREMENTS
var requirementsFields = document.querySelectorAll(".js-req");
var passwordField = document.querySelectorAll(".js-password");
var textSpChar = document.querySelectorAll(".js-pwCharCri > .js-sp-char");
var reqRegex = /[<*%.]+/;

// PW SPECIFIC DOM
var pwChar = document.querySelectorAll(".js-PwChar");
var pwCap = document.querySelectorAll(".js-PwCap");
var pwLower = document.querySelectorAll(".js-PwLower");
var pwNum = document.querySelectorAll(".js-PwNum");
var textChar = document.querySelectorAll(".js-char");
var textCap = document.querySelectorAll(".js-cap");
var textLower = document.querySelectorAll(".js-lower");
var textNum = document.querySelectorAll(".js-num");