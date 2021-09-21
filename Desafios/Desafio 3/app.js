const acordeon = document.querySelector("[data-js=accordion]");
acordeon.addEventListener("click", e => {
  const acordeonID = e.target.dataset.accordionHeader;
  const acordeonBodyASerAberto = document.querySelector(`[data-accordion-body="${acordeonID}"]`)
  const acordeonClicado = document.querySelector(`[data-accordion-header="${acordeonID}"]`);

  acordeonBodyASerAberto.classList.toggle("active"); 
  acordeonClicado.classList.toggle("active");      
});