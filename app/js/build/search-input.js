const searchInput = document.querySelector( ".js-search-input" );
const clearSearch = document.querySelector( ".js-search-clear" );

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
