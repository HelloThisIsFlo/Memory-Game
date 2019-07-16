function MemoryGame(board) {
  const validateBoard = board => {
    const ensureValidDimensions = () => {
      const throwError = () => {
        throw "Invalid dimensions. The board must be 4x4";
      };
      if (board.length !== 4) {
        throwError();
      }
      for (let i = 0; i < 4; i++) {
        if (board[i].length !== 4) {
          throwError();
        }
      }
    };
    const ensureContains8PairsOfIcons = () => {
      const allIcons = [];
      for (row of board) {
        for (icon of row) {
          allIcons.push(icon);
        }
      }

      const represents8Pairs = Array.from(new Set(allIcons)).length === 8;

      if (!represents8Pairs) {
        throw "Invalid board. The board must contain 8 pairs of icons";
      }
    };

    ensureValidDimensions();
    ensureContains8PairsOfIcons();
    return board;
  };

  this.board = validateBoard(board);
  this.firstCardOfCurrent2CardsMove = null;
}
MemoryGame.prototype.getCard = function(x, y) {
  return { x: x, y: y, icon: this.board[y][x] };
};
MemoryGame.prototype.playCard = function(x, y) {
  const validateCoordinates = () => {
    const isValid = coordinate => coordinate >= 0 && coordinate < 4;
    if (!isValid(x) || !isValid(y)) {
      throw "Invalid coordinates: Coordinates are out of the board!";
    }
  };
  playFirstMove = (x, y) => {
    this.firstCardOfCurrent2CardsMove = this.getCard(x, y);
    return {
      card1: this.firstCardOfCurrent2CardsMove,
      card2: null,
      success: null
    };
  };
  const playSecondMove = (x, y) => {
    const firstCard = this.firstCardOfCurrent2CardsMove;
    const secondCard = this.getCard(x, y);
    const sucess = secondCard.icon === this.firstCardOfCurrent2CardsMove.icon;

    return {
      card1: firstCard,
      card2: secondCard,
      success: sucess
    };
  };

  validateCoordinates();
  const isFirstMove = this.firstCardOfCurrent2CardsMove === null;
  if (isFirstMove) {
    const res = playFirstMove(x, y);
    return res;
  } else {
    return playSecondMove(x, y);
  }
};

function BoardBuilder() {
  this.buildFromIcons = function(icons) {
    icons = icons.slice();
    removeDuplicates();
    ensureEnoughIcons();
    return newBoard();

    function removeDuplicates() {
      icons = Array.from(new Set(icons));
    }
    function ensureEnoughIcons() {
      if (icons.length < 8) {
        throw "Not enough icons provided. Please provide at least 8 different icons";
      }
    }
    function newBoard() {
      const board = emptyBoard();
      const iconsPairs = eightShuffledPairsOfIcons();
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          board[i][j] = iconsPairs.pop();
        }
      }
      return board;

      function emptyBoard() {
        const board = new Array(4);
        for (let i = 0; i < 4; i++) {
          const row = new Array(4);
          board[i] = row;
        }
        return board;
      }

      function eightShuffledPairsOfIcons() {
        // Shuffle before slice to ensure we don't always pick the first 8 items
        const eightShuffledIcons = shuffle(icons).slice(0, 8);
        return shuffle([...eightShuffledIcons, ...eightShuffledIcons]);

        function shuffle(array) {
          return array.slice().sort(() => 0.5 - Math.random());
        }
      }
    }
  };
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

module.exports = { MemoryGame, BoardBuilder };
