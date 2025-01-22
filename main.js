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

    // Player's turn output element
    const playerTurnOutput = document.querySelector(".playerTurn");

    let playerOneChar;
    let playerTwoChar;

    const init = () => {
      _setPlayerChar();
    };

    const _setPlayerChar = () => {
      // Selecting player one character
      playerOneChars.forEach((char) => {
        char.addEventListener("click", () => {
          playerOneChar = char.dataset.name;

          _displayPlayerOneChar();
        });
      });

      // Selecting player two character
      playerTwoChars.forEach((char) => {
        char.addEventListener("click", () => {
          playerTwoChar = char.dataset.name;

          _displayPlayerTwoChar();
        });
      });
    };

    const _displayPlayerOneChar = () => {
      chosenCharOne.textContent = playerOneChar;
    };

    const _displayPlayerTwoChar = () => {
      chosenCharTwo.textContent = playerTwoChar;
    };

    return { init };

  })();

  displayController.init();

})();