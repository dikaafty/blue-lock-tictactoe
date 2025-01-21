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
    let playerOneChar;
    let playerTwoChar;

    const init = () => {

    };

    const cacheDOM = () => {
      const choosePlayerContainer = document.querySelector(".choosePlayerContainer");
      const boardWrapper = document.querySelector(".boardWrapper");

      // Player one elements
      const playerOneChars = document.querySelectorAll(".charactersContainer.first div");
      const chosenCharOne = document.querySelector(".playerOne .chosenCharOutput");

      // Player two elements
      const playerTwoChars = document.querySelectorAll(".charactersContainer.second div");
      const chosenCharTwo = document.querySelector(".playerTwo .chosenCharOutput");

      // Cell elements
      const cells = document.querySelectorAll(".cell");
    };

    // Player's turn output element
    const playerTurnOutput = document.querySelector(".playerTurn");
  })();

})();