const { MemoryGame, BoardBuilder } = require("./game");

function Presenter(view, icons) {
  this.view = view;
  const boardBuilder = new BoardBuilder();
  const iconBoard = boardBuilder.buildFromIcons(icons);
  this.game = new MemoryGame(iconBoard);

  this.onCardClick = (x, y) => {
    // this.view.
  };

  this.onReset = () => {};
}

module.exports = { Presenter };
