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

**checkForError (field)**
This function takes the element being acted upon (blur or focus) and checks if it is a valid field to be checking validity on. If it is it passes the element to the `getError` function and stores the `getError` response in a variable that it returns.

**getError (field)**
This function also takes the full element being acted upon. getError checks for different invalid attributes (like length, required, type mismatch etc.) and returns an error message based on the field in error. If no specific error is found but the field is still invalid it returns a generic error. Error messages can be set and specified here for most fields.

**showErrorMessage (field, error)**
showErrorMessage takes the field (element) and the error message (string). It adds the "error" class to the element which adds the error styling to the input and calls `createErrorMessage`

**createErrorMessage (errorField, id, message)**
createErrorMessage takes the field in error, the ID of that field and the error message string. It creates the error message element (div) and places it beneath the field in error.

**removeErrorMessage (field)**
removeErrorMessage takes the element in error and clears the error styling and removes and hides the error message.

**createFormLevelErrorLink (errorField, error)**
This function takes the element that is invalid and the string error message and creates a list item with a link inside of it and appends that to the `ul` element in the top level form alert. The `href` of the link is set to the ID of the element that is in error.

**clearFormLevelErrorLinks ()**
This function cycles through the `ul` element on the top level form alert and clears all child `li` elements.

**lengthRequirement (value, expectedLength)**
This function is called for formatting dates and phone numbers. It takes the value of the input being acted on and the expected length and returns the value with the defined length, 10 for phone and 8 for DOB. Note: it removes extra numbers/letters from the end.

**dateFormat (element)**
Takes an input that needs to be formatted `MM/DD/YYYY` and does that.

**phoneFormat (element)**
Takes an input that needs ot be formatted `XXX-XXX-XXXX` and does that.

**daysInMonth (month, year)**
Figures out how many days are in a certain month. Needs year b/c leap years.

**isValid (day, month, year)**
Returns true or false whether a date is a valid date. `02/27/1985` yes, `48/17/2237` no.

**checkDob (element)**
Performs a variety of checks to figure out if a date is valid. Uses `setCustomValidity` to make field invalid or valid depending on input.

### How to set up an input
The files validate against inputs (including radio and checkbox) that have the `js-validate` class within a form that has a `js-form-valid` class. It uses the following attributes for various validations:
- pattern: regex pattern for allowed input (letters, numbers, special characters)
    - can also use regex for disallowed characters i.e. `"pattern": "^[^<>&]+$",` means no `< > &` characters.
- data-fieldName: used for `${data-fieldName} is missing` or required errors
- data-title: used for custom error messages
- required: HTML attribute to indicate required field
- maxlength: maximum field length
- minlength: minimum field length

So an example of a first name input that allows letters, spaces and `-`, has a max length and is required would be:
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
