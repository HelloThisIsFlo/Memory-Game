const { MemoryGame, BoardBuilder } = require("./game");

function Presenter(view, icons) {
  this.view = view;
  const boardBuilder = new BoardBuilder();
  const iconBoard = boardBuilder.buildFromIcons(icons);
  this.game = new MemoryGame(iconBoard);

  this.onCardClick = (x, y) => {
    console.log(`Card clicked: (${x}, ${y})`);
    console.log('onCardClick: For now just reveal for 1 sec and hide again');
    this.view.revealCard({x: x, y: y, icon: 'A'})
    setTimeout(() => {
      this.view.hideCard({x: x, y: y})
    }, 1000)

  };

  this.onReset = () => {
    console.log('Resetting the game');
  };
}

module.exports = { Presenter };
