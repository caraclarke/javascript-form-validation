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
  if ( passwordField[ 0 ].value !== passwordField[ 1 ].value ) {
    passwordField[ 1 ].classList.remove( "matching" );
    return false;
  } else {
    passwordField[ 1 ].classList.add( "matching" );
    return true;
  }
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
const passwordCheck = ( currentElement, otherPasswordField ) => {
  const passwordOne = currentElement.value;
  const passwordTwo = otherPasswordField.value;

  if ( passwordOne !== "" ) {
    hasCapital = checkUppercase( passwordOne, currentElement );
    hasLowercase = checkLowercase( passwordOne, currentElement );
    hasNumber = checkNumber( passwordOne, currentElement );
  }

  if ( passwordOne !== "" && passwordTwo !== "") {
    isMatching = checkPwMatch();
  }

  if ( hasCapital && hasLowercase && hasNumber && isMatching ) {
    currentElement.setCustomValidity("");
    passwordReqIcon.classList.remove( "hide" );

    passwordField.forEach((item) => {
      if ( item.checkValidity() ) {
        removeErrorMessage( item );
      } else if ( !item.checkValidity() && item.value !== "" ) {
        checkForError( item );
      }
    });
  } else {
    currentElement.setCustomValidity("Please enter a valid answer");
    passwordReqIcon.classList.add( "hide" );
    const errMsg = reqPwErr( hasCapital, hasLowercase, hasNumber, isMatching, currentElement );
    showErrorMessage( currentElement, errMsg );
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
  isCapsLockOn = ( keyboardEvent ) ? keyboardEvent.getModifierState("CapsLock") : false;
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

    const fieldsIndex = Array.prototype.slice.call(passwordField);
    const elIndex = fieldsIndex.indexOf( e.target );
    let sendIndex = 1;
    elIndex === 0 ? sendIndex = 1 : sendIndex = 0;

    passwordCheck( e.target, passwordField[ sendIndex ] );
    if ( checkForMobile ) { showCapsLockWarning( false, e.target ); }
  });

  if ( !checkForMobile ) {
    item.addEventListener( "keydown", ( e ) => {
      handleKeyPress( e );
    });

    item.addEventListener( "keyup", ( e ) => {
      handleKeyPress( e );
    });
  }
});
