// SECURITY REQUIREMENTS
const securityField = document.querySelectorAll( ".js-security" );
const usernameField = document.querySelector( ".js-username" );

// SQ SPECIFIC DOM
const dropdownElement = document.querySelectorAll( ".js-select--control" );
const sqOptions = document.querySelectorAll( ".js-select--option" );

// SECURITY QUESTION
let matchPassword = true;
let matchUsername = true;
let matchesQuestion = false;
let answersMatching = false;

/* **************************
  SECURITY QUESTION CHECKS
  *************************** */

  // check if security question is matching the password
const checkPassword = ( password, confirmPassword, answer, index, removeText, addText, field ) => {
  if ( answer === password || answer === confirmPassword ) {
    field.setCustomValidity("Answer cannot match password");
    return false;
  }

  return true;
};

// check if security question is matching the username
const checkUsername = ( username, answer, index, removeText, addText, field ) => {
  if ( username === answer ) {
    field.setCustomValidity("Answer cannot match username");
    return false;
  }

  return true;
};

const checkQuestion = ( index, field ) => {
  const selectedOption = [];
  const charOnly = /[^\w\s]/gi;
  let result = true;

  sqOptions.forEach((item) => {
    if ( item.selected ) {
      const value = item.innerHTML.replace(charOnly, "");
      selectedOption.push(value);
    }
  });

  // does it equal the selected question && case insentitive -> false
  if ( selectedOption[ index ].toLowerCase() === field.value.toLowerCase() ) {
    field.setCustomValidity("Answers cannot question");
    showError( field, "Answer must not be equal to a security question you selected" );
    result = false;
  } else {
    result = true;
  }

  return result;
}

const checkQMatch = () => {
  // do the question answers match && case insensitive -> false
  // otherwise return true
  const answerOne = securityField[ 0 ];
  const answerTwo = securityField[ 1 ];

  if ( answerOne.value !== "" && answerTwo.value !== "" ) {
    if ( answerOne.value === answerTwo.value ) {
      securityField.forEach( (field) => {
        field.setCustomValidity("Answers cannot match");
        showError( field, "Answers must be unique" );
      });

      return false;
    }
  }

  return true;
};

/* **************************
  REQUIREMENT ERROR STATES
*************************** */

const reqSqErr = ( pwMatchBool, unMatchBool, optionMatchBool, matchAnswerBool, field ) => {

  if ( !pwMatchBool ) {
    field.setCustomValidity("Field text matches password");
  }

  if ( !unMatchBool ) {
    field.setCustomValidity("Field text matches username");
  }

  if ( !optionMatchBool ) {
    field.setCustomValidity("cant match selection");
    return "Answer must not be equal to a security question you selected";
  }

  if ( !matchAnswerBool ) {
    field.setCustomValidity("answers cant be the same");
    return "Answers must be unique";
  }

  if ( field.value === "" ) {
    field.setCustomValidity("required section");
    return `Please answer the security question.`;
  }

  return "Please enter a valid answer";
};

/* **************************
  CHECK FOR VALIDITY
*************************** */

const securityQCheck = ( element ) => {
  const password = passwordField[ 0 ].value;
  const confirmPassword = passwordField[ 1 ].value;
  const username = usernameField.value;
  const question = element.value;
  const fieldsIndex = Array.prototype.slice.call(securityField);
  const elIndex = fieldsIndex.indexOf( element );
  let errMsg = "";

  if ( password !== "" ) { matchPassword = checkPassword( password, confirmPassword, question, elIndex, initialIndex, metIndex, element ); }
  if ( username !== "" ) { matchUsername = checkUsername( username, question, elIndex, initialIndex, metIndex, element ); }

  matchesQuestion = checkQuestion( elIndex, element );
  answersMatching = checkQMatch();

  if ( matchPassword && matchUsername && matchesQuestion && answersMatching ) {
    element.setCustomValidity("");

    securityField.forEach((item) => {
      if ( item.checkValidity() ) {
        removeError( item );
      } else if ( !item.checkValidity() && item.value !== "" ) {
        elementActions( item );
      }
    });
  } else {
    element.setCustomValidity("Please enter a valid answer");
    errMsg = reqSqErr( matchPassword, matchUsername, matchesQuestion, answersMatching, element );
    showError(element, errMsg);
  }
};
