(function() {

  const gameboard = (() => {
    let board = new Array(9);

    const getBoard = () => {
      return board;
    };

    const resetBoard = () => {
      board = new Array(9);
    };

    const setBoardVal = (i, val) => {
      board[i] = val;
    }

    return { getBoard, resetBoard, setBoardVal };
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

    // Start game button wrapper element
    const startGameBtnWrapper = document.querySelector(".wrapper");

    // Start game button element
    const startGameBtn = document.querySelector(".startGameBtn");

    // Player's turn output element
    const playerTurnOutput = document.querySelector(".playerTurn");

    let playerOneChar;
    let playerTwoChar;
    let currentPlayer;

    const init = () => {
      _bindEvents();
      _setPlayerChar();
      _highlightSelectedChar();
    };

    const _bindEvents = () => {
      startGameBtn.addEventListener("click", _startGame);
    };

    const _setPlayerChar = () => {
      // Selecting player one character
      playerOneChars.forEach((char) => {
        char.addEventListener("click", () => {
          playerOneChar = char.dataset.name;
          currentPlayer = playerOneChar;

          _displayPlayerOneChar();
          _displayPlayerTurn();
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

    const _highlightSelectedChar = () => {
      // Highlighting player one character
      playerOneChars.forEach((char) => {
        char.addEventListener("click", () => {
          playerOneChars.forEach(el => el.classList.remove("selected"));

          char.classList.add("selected");
        });
      });

      // Highlighting player two character
      playerTwoChars.forEach((char) => {
        char.addEventListener("click", () => {
          playerTwoChars.forEach(el => el.classList.remove("selected"));

          char.classList.add("selected");
        });
      });
    };

    const _displayPlayerOneChar = () => {
      chosenCharOne.textContent = playerOneChar;
    };

    const _displayPlayerTwoChar = () => {
      chosenCharTwo.textContent = playerTwoChar;
    };

    const _startGame = () => {
      if(playerOneChar && playerTwoChar) {
        // Add hide class to starting section
        choosePlayerContainer.classList.add("hide");
        startGameBtnWrapper.classList.add("hide");

        // Remove hide class from playing section
        boardWrapper.classList.remove("hide");
        playerTurnOutput.classList.remove("hide");
      }
    };

    const _togglePlayer = () => {
      currentPlayer = (currentPlayer === playerOneChar) ? playerTwoChar : playerOneChar;
    };

    const _displayPlayerTurn = () => {
      playerTurnOutput.textContent = `${currentPlayer}'s turn`;
    };

    return { init };

  })();

  displayController.init();

})();