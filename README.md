# JavaScript Form Validation

This project is a set of files and examples of form validation. It can be leveraged as a whole or taken in pieces. The structure is as follows:

1. app
2. build

### Validation Files
- validation.js
- dob-validation.js
- phone-validation.js
- password-validation.js
- inline-alert.js

These files are minified and combined in the build process, but are kept separate when translated to es2015.

### Main functions

There is an onblur event on the document that validates when a user leaves the field. There is also a submit event listener for when the form is submitted. There is also an onload event that adds "novalidate" to any forms so this works.

**checkForError**
This function checks if the field is invalid in any way.

**getError**
getError works with the specific form error and returns a string error message

**showErrorMessage**
showErrorMessage takes the field and the error message. It adds the "error" style class and calls createErrorMessage to create the red error message.

**createErrorMessage**
**removeErrorMessage**
**createFormLevelErrorLink**
**lengthRequirement**
**dateFormat**
**phoneFormat**
**phoneValidate**
**daysInMonth**
**isValid**
**checkDob**
**clearFormLevelErrorLinks**
**createFormLevelErrorLink**

##### Password stuff

### How to set up an input
The files validate against inputs (including radio and checkbox) that have the `js-error` class within a form that has a `js-form-valid` class. It uses the following attributes for various validations:
- pattern
- data-fieldName
- data-title
- required
- maxlength
- minlength

Some inputs have separate, extra validations and those will be covered below.
