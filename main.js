(function() {

  const gameboard = (() => {
    let board = new Array(9);

    const getBoard = () => {
      return board;
    };

    const resetBoard = () => {
      board = new Array(9);
    };

    return { getBoard, resetBoard };
  })();

  const displayController = (() => {
    const init = () => {

    };

    const cacheDOM = () => {
      const choosePlayerContainer = document.querySelector(".choosePlayerContainer");
      const boardWrapper = document.querySelector(".boardWrapper");
    };
  })();

})();