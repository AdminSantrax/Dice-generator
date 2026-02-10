//generate a random number between 1 and the number of faces on the dice
//We need to make each dice to have 1 button, and ask the usser how many times they want to throw the dice, and add a modifier to the result of the dice throw.
//Also need to dont allow the user to input a number less than 1 for the faces, times and modifier inputs.
function diceGenerator() {
  let numberIndex = Number(document.getElementById("faces").value);
  let faces = Array.from({ length: numberIndex }, (_, i) => i + 1)
  let square = document.createElement("div");
  square.classList.add("square");
  square.classList.add("position-relative");

  square.classList.add("square");
  square.textContent = `D${numberIndex}`;
  const container = document.getElementById("diceContainer");
  container.appendChild(square);
  square.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * faces.length);
    const result = faces[randomIndex];
    document.getElementById("resultText").textContent = `you got a ${result}`;
    document.getElementById("modifier").value = 0; // Reset modifier input after each throw
    document.getElementById("times").value = 1; // Reset times input after each throw
    //now we will create a input and add it to this dice,to ask how many times the user wants to throw the dice.
    const timesInput = document.createElement("input");
    timesInput.addEventListener("click", (e) => {
  e.stopPropagation();
});
    timesInput.type = "number";
    timesInput.min = "1";
    timesInput.value = "1";
    timesInput.id = `times-${square.id}`;
    timesInput.classList.add("timesInput", "position-absolute", "bottom-0", "start-0", "p-1", "rounded", "border-0", "bg-light", "shadow-sm");
    square.appendChild(timesInput);
    const modInput = document.createElement("input");
    modInput.addEventListener("click", (e) => {
  e.stopPropagation();
});
    modInput.type = "number";
    modInput.value = "0";
    modInput.classList.add(
      "modifierInput",
      "position-absolute",
      "bottom-0",
      "end-0",
      "p-1"
    );
    square.appendChild(modInput);


  });

  return faces;

}

//Now we need to add a function for the times input so when we use it, will throw the dice that many times.

function timesDice() {
  let numberIndex = Number(document.getElementById("times").value);
  for (let i = 0; i < numberIndex; i++) {
    diceGenerator();
  }

}

//Now we need to add a function for the modifier input, so when we use it, will add the modifier to the result of the dice throw.
function modifierDice() {
  let modifier = Number(document.getElementById("modifier").value);
  let resultText = document.getElementById("resultText");
  let currentResult = Number(resultText.textContent.split(" ")[2]);
  let newResult = currentResult + modifier;
  resultText.textContent = `you got a ${newResult}`;
}

