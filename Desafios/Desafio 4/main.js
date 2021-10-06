const url = "https://dog.ceo/api/breeds/image/random";
const image = document.querySelector(".dog-image")

  const validarStatusHTTP = dogData => {
    if (!dogData.ok) {
      throw new Error(`Erro HTTP, estado: ${dogData.status}`);
    }
    return dogData.json();
  };

  const inserirImagemNoDOM = ({ message: url }) => {
    image.setAttribute("src", url);
  };

fetch(url)
  .then(validarStatusHTTP)
  .then(inserirImagemNoDOM)
  .catch(erro => {
    console.log(erro.message);
  })

