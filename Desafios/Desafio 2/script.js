document.querySelector("[value='Processar'").addEventListener("click", processarCPF);
const resultado = document.querySelector(".resultado");
let cpf = document.querySelector(".cpf").value;

function processarCPF() {
  let cpf = document.querySelector(".cpf").value;

  if (cpf.length == 0 || cpf.length < 11) {
    alert("CPF inválido! Escreva no campo e certifique-se que há 11 dígitos");
  } else {
    cpfArray = cpf.split("");
    cpfFormatado = "";
    console.log(cpfArray);
    for(let i = 0; i < cpf.length; i++) {
      if (i == 3 || i == 6) {
        cpfFormatado += ".";
        cpfFormatado += cpfArray[i];
      } else if (i == 9) {
        cpfFormatado += "-";
        cpfFormatado += cpfArray[i];
      } else {
        cpfFormatado += cpfArray[i];
      }
    }
    resultado.innerHTML = `${cpfFormatado}`;
  }
}

// 12345678901
// 123.456.789-01 || Índices: 3, 7, 11