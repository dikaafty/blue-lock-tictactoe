(function() {

  const gameboard = (() => {
    let board = new Array(9);

    const getBoard = () => {
      return board;
    };

    const resetBoard = () => {
      board = new Array(9);
    };
  })();

})();