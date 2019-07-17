function showDebugText(text) {
  const debugElement = document.querySelector("#debug");
  if (debugElement.innerHTML === "") {
    debug.innerHTML = text;
  } else {
    debug.innerHTML += "<br/>" + text;
  }
}

function View({ flashDuration: flashDuration = 2000 }) {
  this.flashDuration = flashDuration;

  const getCardDiv = (x, y) => {
    return document.getElementById(`cell-${x}_${y}`);
  };

  const flashCard = (card, cssClass) => {
    const cardDiv = getCardDiv(card.x, card.y);
    cardDiv.classList.add(cssClass);
    setTimeout(() => {
      cardDiv.classList.remove(cssClass);
    }, this.flashDuration);
  };

  this.revealCard = ({ x: x, y: y, icon: icon }) => {
    const card = getCardDiv(x, y);
    const paragaph = document.createElement("p");
    paragaph.textContent = icon;
    card.appendChild(paragaph);
    card.classList.add("revealed");
  };

  this.hideCard = ({ x: x, y: y }) => {
    const card = getCardDiv(x, y);
    card.removeChild(card.firstChild);
    card.classList.remove("revealed");
  };

  this.flashSuccess = (card1, card2) => {
    flashCard(card1, 'success')
    flashCard(card2, 'success')
  };

  this.flashFailure = (card1, card2) => {
    flashCard(card1, 'failure')
    flashCard(card2, 'failure')
  };
}

module.exports = { View };
