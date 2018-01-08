/* **************************
  DOM VARIABLES
*************************** */

const searchInput = document.querySelector( ".js-search-input" );
const clearSearch = document.querySelector( ".js-search-clear" );
const searchIcon = document.querySelector( ".js-search-enter" );

/* **************************
  EVENT LISTENERS
*************************** */

searchInput.addEventListener( "keyup", ( e ) => {
  if ( searchInput.value !== "" ) {
    searchInput.parentElement.classList.add( "has-text" );
  } else {
    searchInput.parentElement.classList.remove( "has-text" );
  }
});

clearSearch.addEventListener( "click", ( e ) => {
  e.preventDefault();

  searchInput.value = "";
  searchInput.parentElement.classList.remove( "has-text" );
});

searchIcon.addEventListener( "click", ( e ) => {
  e.preventDefault();

  if ( searchInput.value === "" ) {
    // put the field in error
    searchInput.setCustomValidity( "Please enter a valid search term" );
    showErrorMessage( searchInput, "Please enter a valid search term" );
  } else {
    // call the search function
  }
});
