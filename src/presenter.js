const { MemoryGame, BoardBuilder } = require("./game");

function Presenter(view, icons) {
  this.view = view;
  this.icons = icons;
  const boardBuilder = new BoardBuilder();
  const board = boardBuilder.buildFromIcons(icons);
  console.log(
    "board :\n",
    JSON.stringify(board)
      .split("],")
      .join("],\n  ")
      .replace(/"/g, " ")
  );
  this.game = new MemoryGame(board);

  const displayFirstCard = firstCard => {
    this.view.revealCard(firstCard);
  };
  const displaySecondCardAndResult = (firstCard, secondCard, wasSuccessful) => {
    this.view.revealCard(secondCard);
    if (wasSuccessful) {
      this.view.flashSuccess(firstCard, secondCard);
    } else {
      this.view.flashFailureAndHide(firstCard, secondCard);
    }
  };
  this.onCardClick = (x, y) => {
    const isFirstCardPicked = () => secondCard === null;

    console.log(`Card clicked: (${x}, ${y})`);
    const {
      card1: firstCard,
      card2: secondCard,
      success: wasSuccessful,
      isGameFinished: gameIsFinished
    } = this.game.playCard(x, y);

    if (isFirstCardPicked()) {
      displayFirstCard(firstCard);
    } else {
      displaySecondCardAndResult(firstCard, secondCard, wasSuccessful);
    }

    console.log("gameIsFinished :", gameIsFinished);
    if (gameIsFinished) {
      this.view.showResults();
    }
  };

  this.onReset = () => {
    const resetGame = () => {
      const newBoard = boardBuilder.buildFromIcons(this.icons);
      this.game = new MemoryGame(newBoard);
    };

    console.log("Resetting the game");
    this.view.resetAllCards();
    resetGame();
  };
}

module.exports = { Presenter };
