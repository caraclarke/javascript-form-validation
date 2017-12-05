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
  let inputField = field;

  if ( inputField.type === "radio" && inputField.name ) {
    inputField.parentElement.parentElement.parentElement.classList.remove("error");

    const group = document.getElementsByName(inputField.name);
    if ( group.length > 0 ) {
      group.forEach(( item ) => {
        if ( item.form !== inputField.form ) {
          item.classList.remove("error");
        }
      });

      inputField = group[ group.length - 1 ];
    }
  } else {
    inputField.classList.remove("error");
  }

  // Remove ARIA role from the inputField
  inputField.removeAttribute("aria-describedby");

  // Get inputField id or name
  const id = inputField.id || inputField.name;
  if ( !id ) { return; }

  // Check if an error message is in the DOM
  const message = inputField.form.querySelector(`.input-help#error-for-${ id }`);
  if ( !message ) { return; }

  // If so, hide it
  message.innerHTML = "";
  message.style.display = "none";
  message.style.visibility = "hidden";
};

// CREATE THE ERROR MESSAGE
const createErrorMessage = ( errorField, id, error ) => {
  let message = errorField.form.querySelector( `.input-help#error-for-${ id }` );
  const errorMsg = error;

  if ( !message ) {
    message = document.createElement("div");
    message.className = "input-help";
    message.id = `error-for-${ id }`;

    // If the field is a radio button or checkbox, insert error after the label
    let label;
    if ( errorField.type === "radio" || errorField.type === "checkbox" ) {
      label = errorField.form.querySelector(`label[for="${ id }"]`) || errorField.parentNode;
      if ( label ) {
        label.parentNode.append( message );
      }
    }

    // Otherwise, insert it after the field
    if ( !label ) {
      errorField.parentNode.appendChild( message, errorField.nextSibling );
    } else if ( label && !( errorField.type === "radio" || errorField.type === "checkbox" ) ) {
      errorField.parentNode.insertAfter( message, errorField.nextSibling );
    }
  }

  // Update error message
  errorField.setAttribute("aria-describedby", `error-for-${ id }`);

  // Show error message
  message.innerHTML = errorMsg;
  message.setAttribute("role", "alert");
  message.style.display = "block";
  message.style.visibility = "visible";
};

// SHOW THE ERROR MESSAGE
const showErrorMessage = ( field, error ) => {
  let errorField = field;

  if ( errorField.type === "radio" && errorField.name ) {
    errorField.parentElement.parentElement.parentElement.classList.add( "error" );

    const group = document.getElementsByName(errorField.name);
    if ( group.length > 0 ) {
      group.forEach(( item ) => {
        if ( item.form !== errorField.form ) {
          item.classList.add( "error" );
        }

        errorField = group[ group.length - 1 ];
      });
    }
  } else {
    errorField.classList.add("error");
  }

  // Get errorField id or name
  const id = errorField.id || errorField.name;
  if ( !id ) { return; }

  // Check if error message field already exists
  // If not, create one
  createErrorMessage( errorField, id, error );
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
  } else if ( e.target.classList.contains( "js-pn" ) && e.target.value !== "" ) {
    phoneValidate( e.target );
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
