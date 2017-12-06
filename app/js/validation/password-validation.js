// PW REQUIREMENTS
const passwordField = document.querySelectorAll( ".js-password" );

// PASSWORD
let hasCapital = false;
let hasLowercase = false;
let hasNumber = false;
let isMatching = false;

/* **************************
  PASSWORD CHECKS
  *************************** */

const checkUppercase = ( password, index, removeText, addText ) => {
  const upperRegex = new RegExp("[A-Z]");

  if ( password && upperRegex.exec( password ) ) {
    return true;
  }

  return false;
};

const checkLowercase = ( password, index, removeText, addText ) => {
  const lowerRegex = new RegExp("[a-z]");

  if ( password && lowerRegex.exec( password ) ) {
    return true;
  }

  return false;
};

const checkNumber = ( password, index, removeText, addText ) => {
  const numRegex = new RegExp("[0-9]");
  if ( password && numRegex.exec( password ) ) {
    return true;
  }

  return false;
};

const checkPwMatch = () => {
  const password = passwordField[ 0 ];
  const passwordConfirm = passwordField[ 1 ];

  if ( password.value !== "" && passwordConfirm.value !== "" ) {
    if ( password.value !== passwordConfirm.value ) {
      passwordField.forEach( (field) => {
        field.setCustomValidity("Passwords must match");
        showErrorMessage( field, "Passwords do not match" );
      });

      return false;
    }
  }

  return true;
};

/* **************************
  REQUIREMENT ERROR STATES
*************************** */

const reqPwErr = ( capBool, lowerBool, numBool, matchBool, reqField ) => {
  if ( !capBool ) {
    reqField.setCustomValidity("Uppercase letter failure");
  }

  if ( !lowerBool ) {
    reqField.setCustomValidity("Lowercase letter failure");
  }

  if ( !numBool ) {
    reqField.setCustomValidity("Number failure");
  }

  if ( !matchBool ) {
    return "Passwords do not match";
  }

  return "Please enter a valid password";
};

/* **************************
  CHECK FOR VALIDITY
*************************** */
const passwordCheck = ( element ) => {
  const password = element.value;

  if ( password !== "" ) {
    hasCapital = checkUppercase( password, element );
    hasLowercase = checkLowercase( password, element );
    hasNumber = checkNumber( password, element );
    isMatching = checkPwMatch();
  }

  if ( hasCapital && hasLowercase && hasNumber && isMatching ) {
    element.setCustomValidity("");

    passwordField.forEach((item) => {
      if ( item.checkValidity() ) {
        removeErrorMessage( item );
      } else if ( !item.checkValidity() && item.value !== "" ) {
        checkForError( item );
      }
    });
  } else {
    element.setCustomValidity("Please enter a valid answer");
    const errMsg = reqPwErr( hasCapital, hasLowercase, hasNumber, isMatching, element );
    showErrorMessage( element, errMsg );
  }
};
