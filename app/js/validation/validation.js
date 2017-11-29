// DOM ELEMENTS
const form = document.querySelectorAll( ".js-form-valid" );

// BACKUP ADD NOVALIDATE TO FORM ON PAGE
form.forEach( (item) => {
  item.setAttribute("novalidate", true);
});

// EVENT LISTENERS
document.addEventListener( "blur", ( e ) => {
  e.stopPropagation();

  // return if form doesnt have validation flag
  if ( !e.target.form.classList.contains("js-form-valid") ) { return; }

  const error = e.target.validity;
  console.log({ error });
}, true);
