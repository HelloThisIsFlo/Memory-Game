const debugElement = document.querySelector("#debug");

function showDebugText(text) {
  if (debugElement.innerHTML === "") {
    debugElement.innerHTML = text;
  } else {
    debugElement.innerHTML += "<br/>" + text;
  }
}
function resetDebugText() {
  debugElement.innerHTML = "";
}

function View({ flashDuration: flashDuration = 2000 }) {
  this.flashDuration = flashDuration;

  const getCardDiv = (x, y) => {
    return document.getElementById(`card-${x}_${y}`);
  };

  const flashCard = (card, cssClass) => {
    const cardDiv = getCardDiv(card.x, card.y);
    cardDiv.classList.add(cssClass);
    setTimeout(() => {
      cardDiv.classList.remove(cssClass);
    }, this.flashDuration);
  };
  const hideAfterFlash = card => {
    setTimeout(() => {
      this.hideCard(card);
    }, this.flashDuration);
  };

  this.revealCard = ({ x: x, y: y, icon: icon }) => {
    const card = getCardDiv(x, y);
    card.textContent = icon;
    card.classList.add("revealed");
  };

  this.hideCard = ({ x: x, y: y }) => {
    const card = getCardDiv(x, y);
    card.textContent = "";
    card.classList.remove("revealed");
  };

  this.resetAllCards = () => {
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        this.hideCard({ x: x, y: y });
      }
    }
    resetDebugText();
  };

  this.flashSuccess = (card1, card2) => {
    flashCard(card1, "success");
    flashCard(card2, "success");
  };

  this.flashFailureAndHide = (card1, card2) => {
    flashCard(card1, "failure");
    flashCard(card2, "failure");
    hideAfterFlash(card1);
    hideAfterFlash(card2);
  };

  this.showResults = () => {
    showDebugText("Game is Finished!");
    console.log('Showing Results');
  };
}

module.exports = { View };
