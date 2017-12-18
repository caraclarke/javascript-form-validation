/* **************************
  DOM VARIABLES
*************************** */
const showPw = document.querySelectorAll( ".pw-show" );

/* **************************
  HIDE/SHOW PASSWORD
*************************** */

showPw.forEach( ( item ) => {
  item.addEventListener( "click", ( e ) => {
    e.preventDefault();
    const pwField = e.target.previousElementSibling;
    const link = item;

    if ( pwField.getAttribute("type") === "password" ) {
      pwField.setAttribute("type", "text");
      link.innerHTML = "Hide";
    } else {
      pwField.setAttribute("type", "password");
      link.innerHTML = "Show";
    }
  });
});
