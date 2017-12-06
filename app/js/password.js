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
    let pwField = e.target.previousElementSibling;

    if ( pwField.getAttribute("type") === "password" ) {
      pwField.setAttribute("type", "text");
      item.innerHTML = "Hide";
    } else {
      pwField.setAttribute("type", "password");
      item.innerHTML = "Show";
    }

  });
});
