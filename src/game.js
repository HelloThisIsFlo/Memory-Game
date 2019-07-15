function MemoryGame(icons) {
  function removeDuplicates(icons) {
    return Array.from(new Set(icons));
  }
  function ensureEnoughIcons(icons) {
    if (icons.length < 8) {
      throw "Not enough icons provided. Please provide at least 8 different icons";
    }
  }
  function newBoard(icons) {
    function emptyBoard() {
      const board = new Array(4);
      for (let i = 0; i < 4; i++) {
        const row = new Array(4);
        board[i] = row;
      }
      return board;
    }

    function eightShuffledPairsOfIcons() {
      function shuffle(array) {
        return array.slice().sort(() => 0.5 - Math.random());
      }

      // Shuffle before slice to ensure we don't always pick the first 8 items
      const eightShuffledIcons = shuffle(icons).slice(0, 8);
      return shuffle([...eightShuffledIcons, ...eightShuffledIcons]);
    }

    const board = emptyBoard();
    const iconsPairs = eightShuffledPairsOfIcons();
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        board[i][j] = iconsPairs.pop();
      }
    }
    return board;
  }

  icons = removeDuplicates(icons);
  ensureEnoughIcons(icons);
  this.board = newBoard(icons);

  // Private Functions
  const getCard = (x, y) => {
    return {x: x, y: y, icon: this.board[x][y]};
  }

  // Public functions
  this.playCard = function(x, y) {
    return {
      card1: getCard(1, 1)
    };
  };
}

function card(x, y, icon) {
  return { x, y, icon };
}

/*
const template = {
  card1: { x, y, icon },
  card2: { x, y, icon },
  success: true,
  isGameFinished: false,
  movesCounter: 13,
  rating: 2
};
*/

module.exports = { MemoryGame };
