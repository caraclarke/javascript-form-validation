const feInlineAlert = document.querySelector( "#fe-error-container" );
const inlineAlertList = document.querySelector( "#fe-error-container #error-list" );

const clearFormLevelErrorLinks = ( ) => {
  while (inlineAlertList.hasChildNodes()) {
    inlineAlertList.removeChild( inlineAlertList.lastChild );
  }
};

const createFormLevelErrorLink = ( errField, error ) => {
  const id = errField.getAttribute( "id" );
  const listItem = document.createElement("li");
  listItem.className = "error-item";
  listItem.id = `list-error-for-${ id }`;

  listItem.innerHTML = `<a href="#${ id }">${ error }</a>`;
  inlineAlertList.appendChild(listItem);
}
