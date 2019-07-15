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
    /**
     *  TODO: Move the board creation logic to a different module & set the board via `setBoard()`
     *        Orrrrrrrrrr . . . pass a `BoardBuilder` as a dependency of `MemoryGame`, along with
     *        the list of icons and delegate the random behavior to it. Then, in the tests, simply
     *        mock the behavior of the `BoardBuilder` to inject our `mockBoard`
     */
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
  this.firstCardOfCurrent2CardsMove = null;

  // Private Functions
  const getCard = (x, y) => {
    return { x: x, y: y, icon: this.board[y][x] };
  };
  const playFirstMove = (x, y) => {
    this.firstCardOfCurrent2CardsMove = getCard(x, y);
    return {
      card1: this.firstCardOfCurrent2CardsMove,
      card2: null,
      success: null
    };
  };
  const playSecondMove = (x, y) => {
    // this.firstCardOfCurrent2CardsMove = null

    const firstCard = this.firstCardOfCurrent2CardsMove;
    const secondCard = getCard(x, y);
    const sucess = secondCard.icon === this.firstCardOfCurrent2CardsMove.icon;

    return {
      card1: firstCard,
      card2: secondCard,
      success: sucess
    };
  };

  // Public functions
  this.playCard = function(x, y) {
    function validateCoordinates() {
      const isValid = coordinate => coordinate >= 0 && coordinate < 4;
      if (!isValid(x) || !isValid(y)) {
        throw "Invalid coordinates: Coordinates are out of the board!";
      }
    }

    validateCoordinates();

    const isFirstMove = this.firstCardOfCurrent2CardsMove === null;
    if (isFirstMove) {
      return playFirstMove(x, y);
    } else {
      return playSecondMove(x, y);
    }
  };

  this.setBoard = function(board) {
    function ensureValidDimensions() {
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
    }
    function ensureContains8PairsOfIcons() {
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
    }

    ensureValidDimensions();
    ensureContains8PairsOfIcons();
    this.board = board;
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

module.exports = { MemoryGame };
