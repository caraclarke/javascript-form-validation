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

### How to set up an input
The files validate against inputs (including radio and checkbox) that have the `js-error` class within a form that has a `js-form-valid` class. It uses the following attributes for various validations:
- pattern
- data-fieldName
- data-title
- required
- maxlength
- minlength

Some inputs have separate, extra validations and those will be covered below.
