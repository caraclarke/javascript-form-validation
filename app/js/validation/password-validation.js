// PW REQUIREMENTS
const passwordField = document.querySelectorAll( ".js-password" );
const passwordReqIcon = document.querySelector( ".check-icon" );
const checkForMobile = !/Mobi/.test(navigator.userAgent);
let isCapsLockOn = false;

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
      passwordField.forEach( ( field ) => {
        field.setCustomValidity("Passwords must match");
        showErrorMessage( field, "Passwords do not match" );
      });

      passwordField[ 1 ].classList.remove( "matching" );
      return false;
    }
  }

  passwordField[ 1 ].classList.add( "matching" );
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
    passwordReqIcon.classList.remove( "hide" );

    passwordField.forEach((item) => {
      if ( item.checkValidity() ) {
        removeErrorMessage( item );
      } else if ( !item.checkValidity() && item.value !== "" ) {
        checkForError( item );
      }
    });
  } else {
    element.setCustomValidity("Please enter a valid answer");
    passwordReqIcon.classList.add( "hide" );
    const errMsg = reqPwErr( hasCapital, hasLowercase, hasNumber, isMatching, element );
    showErrorMessage( element, errMsg );
  }
};

/* **************************
  CAPS LOCK CHECKER FUNCTIONS
*************************** */

const showCapsLockWarning = ( newIsCapsLockOn, field ) => {
  if ( !newIsCapsLockOn ) {
    field.parentElement.classList.remove( "caps-lock-on");
    isCapsLockOn = false;
    return;
  }

  if ( newIsCapsLockOn ) {
    field.parentElement.classList.add( "caps-lock-on");
    isCapsLockOn = true;
  }
};

const checkIfCapsLockIsOn = ( keyboardEvent ) => {
  isCapsLockOn = ( keyboardEvent ) ? keyboardEvent.getModifierState("CapsLock") : true;
  return isCapsLockOn;
};

const handleKeyPress = ( event ) => {
  const newIsCapsLockOn = checkIfCapsLockIsOn( event );
  showCapsLockWarning( newIsCapsLockOn, event.target );
};

/* **************************
  EVENT LISTENERS
*************************** */

passwordField.forEach( ( item ) => {
  item.addEventListener( "blur", ( e ) => {
    e.stopPropagation();

    passwordCheck( e.target );
    if ( checkForMobile ) { showCapsLockWarning( false, e.target ); }
  });

  if ( checkForMobile ) {
    item.addEventListener( "focus", ( e ) => {
      handleKeyPress( e );
    });

    // item.addEventListener( "keypress", ( e ) => {
    //   handleKeyPress( event );
    // });

    item.addEventListener( "keyup", ( e ) => {
      handleKeyPress( e );
    });
  }
});
