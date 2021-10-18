// Jeito gambiarra de fazer

const buttonOne = document.querySelector("[data-b1-clicked]");
const buttonTwo = document.querySelector("[data-b2-clicked]");

let buttonOneCounter = buttonOne.dataset.b1Clicked;
let buttonTwoCounter = buttonTwo.dataset.b2Clicked;

const listener = document.querySelector(".listener").addEventListener("click", e => {
  const clickedButton = e.target;
  buttonKey = Object.keys(clickedButton.dataset)[0] === "b1Clicked" || "b2Clicked";
  if(clickedButton.tagName === "BUTTON" && buttonKey) {
    switch (buttonKey) {
      case true:
        buttonOneCounter++;
        break;
      case "b2Clicked":
        buttonTwoCounter++;
    }
  }
  console.log("Button 1: ", buttonOneCounter);
  console.log("Button 2: ", buttonTwoCounter);
});