//generate a random number between 1 and the number of faces on the dice

function diceGenerator(){
    let facesInput = document.getElementById("faces");
  console.log(facesInput); // should NOT be null
    let numFaces = Number(facesInput.value);

    
    let result = Math.floor(Math.random() * numFaces) + 1;
    console.log(result);

    let resultText = document.getElementById("resultText")
    resultText.textContent = result;
}
