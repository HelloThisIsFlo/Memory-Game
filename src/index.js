const { View } = require("./view");
const { Presenter } = require("./presenter");
const { alphaPctToHex } = require("./tools");

const icons = [
  "battery-half",
  "archway",
  "ambulance",
  "atlas",
  "asterisk",
  "bomb",
  "bug",
  "brush",
  "bolt"
];
const config = {
  flashDuration: 1000,
  icons: icons,
  ratingThreshold: {
    twoStars: 4,
    oneStar: 10
  }
};

const view = new View({ flashDuration: config.flashDuration });
const presenter = new Presenter(view, config.icons, config.ratingThreshold);

const setupClickListeners = () => {
  const setupCardClickListener = () => {
    const isGameCard = element => {
      return element.classList.contains("game__card");
    };
    const isRevealed = cardDiv => {
      return cardDiv.classList.contains("revealed");
    };
    const extractCoordinatesFromId = card => {
      return card.id.split("-")[1].split("_");
    };

    const gameDiv = document.getElementById("game");
    gameDiv.addEventListener("click", e => {
      // Should we check if target is indeed a HTMLElement?
      if (isGameCard(e.target) && !isRevealed(e.target)) {
        const card = e.target;
        const [x, y] = extractCoordinatesFromId(card);
        presenter.onCardClick(x, y);
      }
    });
  };
  const setupResetClickListener = () => {
    const resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", () => {
      presenter.onReset();
    });
  };

  setupCardClickListener();
  setupResetClickListener();
};
setupClickListeners();

function debug() {
  const card1 = { x: 1, y: 3, icon: "battery-half" };
  const card2 = { x: 2, y: 0, icon: "bread-slice" };

  // view.revealCard(card1);
  // view.flashSuccess(card1, card2);
  // view.flashFailureAndHide(card1, card2);
  // view.updateMovesCount(23423);
  view.revealCard(card1);
  // setTimeout(() => {
  //   view.hideCard(card1);
  // }, 1000);
}

window.alphaPctToHex = alphaPctToHex;
window.debug = debug;
window.enableAutoDebug = () => {
  localStorage.setItem("runDebug", true);
};
window.disableAutoDebug = () => {
  localStorage.setItem("runDebug", false);
};

if (localStorage.getItem("runDebug") === "true") {
  debug();
}
