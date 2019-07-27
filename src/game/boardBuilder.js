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

module.exports = { BoardBuilder };
