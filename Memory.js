const gameContainer = document.getElementById("game");

const colors = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(arr) {
    let counter = arr.length;
    while (counter > 0) {
      let i = Math.floor(Math.random() * counter);

      counter--;

      let temp = arr[counter];
      arr[counter] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }
  
  let shuffledColors = shuffle(colors);
 
  function createDivsForColors(colorArray) {
    for (let color of colorArray) {
      const newDiv = document.createElement("div");
      newDiv.classList.add(color);
      newDiv.addEventListener("click", handleCardClick);
      gameContainer.append(newDiv);
    }
  }
  
  function handleCardClick(e) {
    if (noClick) return;
    if (e.target.classList.contains("flipped")) return;
  
    let currentCard = e.target;
    currentCard.style.backgroundColor = currentCard.classList[0];
  
    if (!card1 || !card2) {
      currentCard.classList.add("flipped");
      card1 = card1 || currentCard;
      card2 = currentCard === card1 ? null : currentCard;
    }
  
    if (card1 && card2) {
      noClick = true;
     
      let gif1 = card1.className;
      let gif2 = card2.className;
  
      if (gif1 === gif2) {
        cardsFlipped += 2;
        card1.removeEventListener("click", handleCardClick);
        card2.removeEventListener("click", handleCardClick);
        card1 = null;
        card2 = null;
        noClick = false;
      } else {
        setTimeout(function() {
          card1.style.backgroundColor = "";
          card2.style.backgroundColor = "";
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          card1 = null;
          card2 = null;
          noClick = false;
        }, 1000);
      }
    }
  
    if (cardsFlipped === colors.length) alert("game over!");
  }
  
  createDivsForColors(shuffledColors);