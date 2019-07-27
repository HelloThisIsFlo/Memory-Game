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

  const hideCardDiv = cardDiv => {
    const iconDiv = cardDiv.firstChild;
    iconDiv && iconDiv.remove();
    cardDiv.classList.remove("revealed");
  };

  const hideCardDivAfterFlash = cardDiv => {
    setTimeout(() => {
      hideCardDiv(cardDiv);
    }, this.flashDuration);
  };

  const hideCardAfterFlash = ({ x: x, y: y }) => {
    const cardDiv = getCardDiv(x, y);
    hideCardDivAfterFlash(cardDiv);
  };

  const revealCardDiv = (cardDiv, icon, showIcon = true) => {
    if (showIcon) {
      const iconDiv = document.createElement("i");
      iconDiv.classList.add("fas", "fa-" + icon);
      cardDiv.appendChild(iconDiv);
    }
    cardDiv.classList.add("revealed");
  };

  const flashDiv = (div, cssClass) => {
    div.classList.add(cssClass);
    setTimeout(() => {
      div.classList.remove(cssClass);
    }, this.flashDuration);
  };

  const flashCard = (card, cssClass) => {
    const cardDiv = getCardDiv(card.x, card.y);
    flashDiv(cardDiv, cssClass);
  };

  const flashAndHidePreviews = cssClass => {
    const previewDiv1 = document.getElementById("preview1");
    const previewDiv2 = document.getElementById("preview2");
    flashDiv(previewDiv1, cssClass);
    flashDiv(previewDiv2, cssClass);
    hideCardDivAfterFlash(previewDiv1);
    hideCardDivAfterFlash(previewDiv2);
  };

  const getCardDiv = (x, y) => {
    return document.getElementById(`card-${x}_${y}`);
  };

  this.revealCard = ({ x: x, y: y, icon: icon }) => {
    const cardDiv = getCardDiv(x, y);
    const showIcon = true;
    revealCardDiv(cardDiv, icon, showIcon);
  };

  this.revealPreview1 = icon => {
    const previewDiv1 = document.getElementById("preview1");
    revealCardDiv(previewDiv1, icon);
  };

  this.revealPreview2 = icon => {
    const previewDiv2 = document.getElementById("preview2");
    revealCardDiv(previewDiv2, icon);
  };

  this.resetAllCards = () => {
    const hideAllCards = () => {
      for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
          const cardDiv = getCardDiv(x, y);
          hideCardDiv(cardDiv);
        }
      }
    };
    const hidePreview = () => {
      for (let previewDivId of ["preview1", "preview2"]) {
        const previewDiv = document.getElementById(previewDivId);
        hideCardDiv(previewDiv);
      }
    };

    hideAllCards();
    hidePreview();
    resetDebugText();
  };

  this.flashSuccess = (card1, card2, shouldFlashAndHidePreviews = true) => {
    flashCard(card1, "success");
    flashCard(card2, "success");

    if (shouldFlashAndHidePreviews) {
      flashAndHidePreviews("success");
    }
  };

  this.flashFailureAndHide = (
    card1,
    card2,
    shouldFlashAndHidePreviews = true
  ) => {
    flashCard(card1, "failure");
    flashCard(card2, "failure");
    hideCardAfterFlash(card1);
    hideCardAfterFlash(card2);

    if (shouldFlashAndHidePreviews) {
      flashAndHidePreviews("failure");
    }
  };

  this.updateMovesCount = count => {
    const movesCountDiv = document.getElementById("moves-count__counter");
    movesCountDiv.textContent = count;
  };

  this.updateRating = rating => {
    const ratingDiv = document.getElementById("rating");

    for (let i = 0; i < rating; i++) {
      ratingDiv.children[i].classList.remove("far");
      ratingDiv.children[i].classList.add("fas");
    }
    for (let i = rating; i < 3; i++) {
      ratingDiv.children[i].classList.remove("fas");
      ratingDiv.children[i].classList.add("far");
    }
  };

  this.showResults = () => {
    showDebugText("Game is Finished!");
  };
}

module.exports = { View };
