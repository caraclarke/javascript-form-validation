/* **************************
  DOM VARIABLES
  *************************** */

const form = document.querySelectorAll( ".js-form-valid" );

/* **************************
  VALIDATION FUNCTIONS
  *************************** */
form.forEach( (item) => {
  item.setAttribute("novalidate", true);
});

// REMOVE THE ERROR MESSAGE
const removeErrorMessage = ( field ) => {
  let errField = field;

  // Remove error class to field
  if ( errField.type === "radio" && errField.name ) {
    errField.parentElement.parentElement.parentElement.classList.remove("error");

    const group = document.getElementsByName(errField.name);
    if ( group.length > 0 ) {
      group.forEach(( item ) => {
        if ( item.form !== errField.form ) {
          item.classList.remove("error");
        }
      });

      errField = group[ group.length - 1 ];
    }
  } else {
    errField.classList.remove("error");
  }

  // Remove ARIA role from the errField
  errField.removeAttribute("aria-describedby");

  // Get errField id or name
  var id = errField.id || errField.name;
  if (!id) return;

  // Check if an error message is in the DOM
  var message = errField.form.querySelector( `.error-message#error-for-${ id }` );
  if (!message) return;

  // If so, hide it
  message.innerHTML = "";
  message.style.display = "none";
  message.style.visibility = "hidden";
};

// SHOW THE ERROR MESSAGE
const showErrorMessage = ( field, error ) => {
  let errField = field;

  if ( errField.type === "radio" && errField.name ) {
    errField.parentElement.parentElement.parentElement.classList.add( "error" );

    const group = document.getElementsByName( errField.name );
    if ( group.length > 0 ) {
      group.forEach(( item ) => {
        if ( item.form !== errField.form ) {
          item.classList.add( "error" );
        }

        errField = group[ group.length - 1 ];
      });
    }
  } else {
    errField.classList.add("error");
  }

  // Get errField id or name
  var id = errField.id || errField.name;
  if (!id) return;

  // Check if error message errField already exists
  // If not, create one
  var message = errField.form.querySelector(`.error-message#error-for-${ id }`);
  if ( !message ) {
    message = document.createElement("div");
    message.className = "error-message";
    message.id = `error-for-${ id }`;
    errField.parentNode.insertBefore( message, errField.nextSibling );
  }

  // Update error message and errField
  errField.setAttribute("aria-describedby", `error-for-${ id }`);
  message.innerHTML = error;

  // Show error message
  message.style.display = "block";
  message.style.visibility = "visible";
}

// GET THE ERROR
const getError = ( field ) => {
  const validity = field.validity;
  /* eslint-disable curly, template-curly-spacing, consistent-return */

  // If valid, return null
  if (validity.valid) return;
  let fieldName = "This section";

  if ( field.getAttribute( "data-fieldName" ) ) {
    fieldName = field.getAttribute( "data-fieldName" );
  }

  // If field is required and empty
  if (validity.valueMissing) return `${fieldName} is missing`;

  // If not the right type
  if (validity.typeMismatch) {
    if (field.type === "email") return "Please enter an email address.";
    if (field.type === "url") return "Please enter a URL.";
  }

  // If too short
  if (validity.tooShort) return `Please lengthen this text to at least ${field.getAttribute("minLength")} characters`;

  // If too long
  if (validity.tooLong) return `Please shorten this text to no more than ${field.getAttribute("maxLength")} characters`;

  // If number input isn"t a number
  if (validity.badInput) return "Please enter a number.";

  // If a number value doesn"t match the step interval
  if (validity.stepMismatch) return "Please select a valid value.";

  // If a number field is over the max
  if (validity.rangeOverflow) return `Please enter a value that is no more than ${field.getAttribute("max")}`;

  // If a number field is below the min
  if (validity.rangeUnderflow) return `Please enter a value that is no less than ${field.getAttribute("min")}`;

  // If pattern doesnt match
  if (validity.patternMismatch) {
    if ( field.classList.contains("js-address") ) return "Please do not use any of these special characters < > &";

    // If pattern info is included, return custom error
    if (field.hasAttribute("data-title")) return field.getAttribute("data-title");

    // Otherwise, generic error
    return "Please match the requested format";
  }

  // If all else fails, return a generic catchall error
  return "The value you entered for this field is invalid.";
  /* eslint-enable */
};

const checkForError = ( field ) => {
  // Dont validate submits, buttons, file and reset inputs, and disabled fields
  if (field.disabled || field.type === "file" || field.type === "reset" || field.type === "submit" || field.type === "button") return;

  const validity = getError(field);
  return validity;
};

/* **************************
  EVENT LISTENERS
  *************************** */
document.addEventListener( "blur", ( e ) => {
  e.stopPropagation();

  // return if form doesnt have validation flag
  if ( !e.target.form.classList.contains("js-form-valid") ) { return; }

  if ( e.target.classList.contains( "js-dob" ) && e.target.value !== "" ) {
    dateFormat( e.target );
    checkDob( e.target );
    return;
  }

  const error = checkForError( e.target );

  if ( error ) {
    showErrorMessage( e.target, error );
    return;
  }

  // Otherwise, remove any existing error message
  removeErrorMessage(event.target);
}, true);

document.addEventListener( "submit", ( e ) => {
  e.preventDefault();

  // Only run on forms flagged for validation
  if (!e.target.classList.contains("js-form-valid")) return;

  // Get all of the form elements
  var fields = e.target.elements;

  // Validate each field
  // Store the first field with an error to a variable so we can bring it into focus later
  var error,
    hasError;
  for (var i = 0; i < fields.length; i++) {
    error = checkForError(fields[ i ]);
    if (error) {
      showErrorMessage(fields[ i ], error);
      if (!hasError) {
        hasError = fields[ i ];
      }
    }
  }

  // If there are errrors, dont submit form and focus on first element with error
  if (hasError) {
    hasError.focus();
  }

  // Otherwise, let the form submit normally
  // You could also bolt in an Ajax form submit process here
}, false);
