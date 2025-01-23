(function() {

  const gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const winningCombinations = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 9],

      // Diagonals
      [0, 4, 8],
      [2, 4, 6]
    ];

    const getBoard = () => {
      return board;
    };

    const getBoardItem = (i) => {
      return board[i];
    };

    const resetBoard = () => {
      board = new Array(9);
    };

    const setBoardVal = (i, val) => {
      board[i] = val;
    }

    return { winningCombinations, getBoard, getBoardItem, resetBoard, setBoardVal };
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
    let gameEnded = false;

    const init = () => {
      _bindEvents();
      _setPlayerChar();
      _highlightSelectedChar();
    };

    const _bindEvents = () => {
      startGameBtn.addEventListener("click", _startGame);

      cells.forEach((cell) => {
        cell.addEventListener("click", operate);
      });
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

    const _setCurrentPlayerSign = () => {
      let link;

      switch (currentPlayer) {
        case "Yoichi Isagi":
          link = "./blue-lock-images/isagi-pfp.jpg";
          break;

        case "Michael Kaiser":
          link = "./blue-lock-images/kaiser-pfp.jpeg";
          break;

        case "Rensuke Kunigami":
          link = "./blue-lock-images/kunigami-pfp.jpg";
          break;

        case "Seishiro Nagi":
          link = "./blue-lock-images/nagi-pfp.jpg";
          break;

        case "Itoshi Rin":
          link = "./blue-lock-images/rin-pfp.jpg";
          break;

        case "Tabito Karasu":
          link = "./blue-lock-images/karasu-pfp.jpg";
          break;

        case "Ryusei Shidou":
          link = "./blue-lock-images/shidou-pfp.jpeg";
          break;

        case "Shouei Barou":
          link = "./blue-lock-images/barou-pfp.jpg";
          break;
      }

      return link;
    };

    const operate = (e) => {
      if(gameboard.getBoardItem(e.target.dataset.index) === "") {
        gameboard.setBoardVal(e.target.dataset.index, currentPlayer);
        console.log(gameboard.getBoard());

        cells.forEach((cell) => {
          if(cell.dataset.index === e.target.dataset.index) {
            let imgEl = document.createElement("img");
            imgEl.setAttribute("src", _setCurrentPlayerSign());
            imgEl.setAttribute("class", "signImg");
            cell.appendChild(imgEl);
          }
        });

        _togglePlayer();
        _displayPlayerTurn();
      }
    };

    const _togglePlayer = () => {
      currentPlayer = (currentPlayer === playerOneChar) ? playerTwoChar : playerOneChar;
    };

    const _displayPlayerTurn = () => {
      playerTurnOutput.textContent = `${currentPlayer}'s turn`;
    };

    const _checkLine = (a, b, c) => {
      return a === b && b === c && a !== "";
    };

    const _checkWin = () => {
      for(const [a, b, c] of gameboard.winningCombinations) {
        if(_checkLine(gameboard.getBoardItem(a), gameboard.getBoardItem(b), gameboard.getBoardItem(c))) {
          playerTurnOutput.textContent = `${currentPlayer} won the game!`;
          gameEnded = true;
        }
      }
    };

    return { init };

  })();

  displayController.init();

})();