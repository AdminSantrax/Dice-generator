//generate a random number between 1 and the number of faces on the dice

function diceGenerator(){
    let numberIndex = Number(document.getElementById("faces").value);  
    let faces = Array.from({ length: numberIndex }, (_, i) => i + 1)
    let square = document.createElement("div");
    square.classList.add("square");
    square.textContent = `D${numberIndex}`;
     const container = document.getElementById("diceContainer");
  container.appendChild(square);
  square.addEventListener("click", () => {
  const randomIndex = Math.floor(Math.random() * faces.length);
  const result = faces[randomIndex];
  document.getElementById("resultText").textContent = `you got a ${result}`;
});

  return faces;

}