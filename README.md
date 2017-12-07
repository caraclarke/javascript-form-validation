# JavaScript Form Validation

This project is a set of files and examples of form validation. It can be leveraged as a whole or taken in pieces. The validation specific files can be found in `app/js/validation/` or built to es2015 in `app/js/build/`. The validity polyfill that ats as a backup for augmenting native HTML5 form validation elements and attributes is kept in the main `app/js/` folder.

### Validation Files
- validation.js
    - holds main validation logic and functions
- dob-validation.js
    - date of birth specific validations and formatting
- phone-validation.js
    - phone specific validations and formatting
- inline-alert.js
   - functions for creating and clearing inline alert error links list
- password-validation.js
    - contains functions for validating various password requirements
- security-question.js
    - contains functions for validating various security q/a requirements

These files are minified and combined in the build process, but are kept separate when translated to es2015 and can be found in `app/js/validation/` or built in `app/js/build/`

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

**clearFormLevelErrorLinks**
**createFormLevelErrorLink**

**dateFormat**
**phoneFormat**

**daysInMonth**
**isValid**
**checkDob**

### How to set up an input
The files validate against inputs (including radio and checkbox) that have the `js-error` class within a form that has a `js-form-valid` class. It uses the following attributes for various validations:
- pattern: regex pattern for allowed input (letters, numbers, special characters)
    - can also use regex for disallowed characters i.e. `"pattern": "^[^<>&]+$",` means no `< > &` characters.
- data-fieldName: used for `${data-fieldName} is missing` or required errors
- data-title: used for custom error messages
- required: HTML attribute to indicate required field
- maxlength: maximum field length
- minlength: minimum field length

So an example of a first name input that is letters only, has a max length and is required would be:
```
<label for="input-fn" id="first-name">First Name</label>
  <input
    id="input-fn"
    class="text-field js-validate "
    name="firstName"
    type="text"
    placeholder="First Name"
    pattern="^[a-zA-Z\\s\\-']*$"
    data-fieldName="First name"
    data-title="Enter a valid name with letters only."
    maxlength="30"
    required />
```

Some inputs have separate, extra validations and those will be covered below.
