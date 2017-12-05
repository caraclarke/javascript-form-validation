const spaceRegex = /\s/g;

const phoneFormat = ( element ) => {
  const phEl = element;
  let value = phEl.value.replace(/\s/g, "");
  const formatRegex = /\//g;

  if ( formatRegex.test( value) ) { value = value.replace( /\//g, "" ); }

  if ( value.length > 10 ) {
    value = lengthRequirement( value, 10 );
    phEl.value = value.replace(/([\d]{3})-*([\d]{3})-*([\d]{4})$/, "$1-$2-$3");
  } else {
    phEl.value = value.replace(/([\d]{3})-*([\d]{3})-*([\d]{4})$/, "$1-$2-$3");
  }
};

const phoneValidate = ( element ) => {
  const phoneNumber = element.value;

  if ( spaceRegex.test( phoneNumber ) ) {
    element.setCustomValidity("no spaces");
    showErrorMessage( element, "Mobile number cannot contain spaces" );
  } else {
    element.setCustomValidity("");
    phoneFormat(element);
  }
};
