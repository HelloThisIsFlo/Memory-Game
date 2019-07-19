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
    const cardDiv = getCardDiv(x, y);
    const iconDiv = document.createElement('i')
    iconDiv.classList.add('fas', 'fa-' + icon)
    cardDiv.appendChild(iconDiv)
    cardDiv.classList.add("revealed");
  };

  this.hideCard = ({ x: x, y: y }) => {
    const cardDiv = getCardDiv(x, y);
    const iconDiv = cardDiv.firstChild;
    iconDiv && iconDiv.remove()
    cardDiv.classList.remove("revealed");
  };

  this.resetAllCards = () => {
    const hideAllCards = () => {
      for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
          this.hideCard({ x: x, y: y });
        }
      }
    };

    hideAllCards();
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

  this.updateMovesCount = count => {
    const movesCountDiv = document.getElementById("moves-count__counter");
    movesCountDiv.textContent = count;
  };

  this.updateRating = rating => {
    const ratingDiv = document.getElementById("rating");

    for (let i = 0; i < rating; i++) {
      ratingDiv.children[i].classList.remove('far')
      ratingDiv.children[i].classList.add('fas')
    }
    for (let i = rating; i < 3; i++) {
      ratingDiv.children[i].classList.remove('fas')
      ratingDiv.children[i].classList.add('far')
    }
  };

  this.showResults = () => {
    showDebugText("Game is Finished!");
  };
}

module.exports = { View };
