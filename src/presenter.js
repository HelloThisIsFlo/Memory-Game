const { MemoryGame, BoardBuilder } = require("./game");

function Presenter(view, icons) {
  this.view = view;
  this.icons = icons;
  const boardBuilder = new BoardBuilder();
  const iconBoard = boardBuilder.buildFromIcons(icons);
  this.game = new MemoryGame(iconBoard);

  const displayFirstCard = firstCard => {
    this.view.revealCard(firstCard);
  };
  const displaySecondCardAndResult = (firstCard, secondCard, isSuccessful) => {
    this.view.revealCard(secondCard);
    if (isSuccessful) {
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
      success: isSuccessful
    } = this.game.playCard(x, y);

    if (isFirstCardPicked()) {
      displayFirstCard(firstCard);
    } else {
      displaySecondCardAndResult(firstCard, secondCard, isSuccessful);
    }
  };

  this.onReset = () => {
    const resetGame = () => {
      const newBoard = boardBuilder.buildFromIcons(this.icons)
      this.game = new MemoryGame(newBoard)
    }

    console.log("Resetting the game");
    this.view.resetAllCards()
    resetGame()
  };
}

module.exports = { Presenter };
