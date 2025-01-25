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
      [2, 5, 8],

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
      board = ["", "", "", "", "", "", "", "", ""];
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

    // Dialog element & its children
    const dialog = document.querySelector("dialog");
    const winnerImg = document.querySelector(".winnerImg");
    const winnerAnnounce = document.querySelector(".winnerAnnounce");
    const winnerChar = document.querySelector(".winnerChar");
    const rematchBtn = document.querySelector(".rematchBtn");
    const changeCharBtn = document.querySelector(".changeCharBtn");

    let playerOneChar;
    let playerTwoChar;
    let currentPlayer;
    let gameEnded = false;
    let isTie = false;

    const init = () => {
      _bindEvents();
      _setPlayerChar();
      _highlightSelectedChar();
    };

    const _bindEvents = () => {
      startGameBtn.addEventListener("click", _startGame);
      changeCharBtn.addEventListener("click", _changeCharacter);
      rematchBtn.addEventListener("click", _rematch);

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

    const getPlayerOneChar = () => {
      return playerOneChar;
    };

    const getPlayerTwoChar = () => {
      return playerTwoChar;
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

        _checkWin();
        _checkDraw();

        if(!gameEnded) {
          _togglePlayer();
          _displayPlayerTurn();
        }

        if(gameEnded && !isTie) {
          _modifyDialog();
          dialog.showModal();
        }
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

    const _checkDraw = () => {
      if(gameEnded) return;

      let boardIsFull = gameboard.getBoard().every((cell) => 
        cell === playerOneChar || cell === playerTwoChar );

      if(boardIsFull) {
        playerTurnOutput.textContent = "THIS GAME IS A TIE!";
        gameEnded = true;
        isTie = true;
      }
    };

    const reset = () => {
      // Reset board
      gameboard.resetBoard();

      // Reset players character
      playerOneChar = undefined;
      playerTwoChar = undefined;
      currentPlayer = undefined;

      // Reset game ended variable
      gameEnded = false;

      // Reset is tie variable
      isTie = false;

      // Remove selected class
      playerOneChars.forEach(el => el.classList.remove("selected"));
      playerTwoChars.forEach(el => el.classList.remove("selected"));

      // Reset chosen character output
      chosenCharOne.textContent = "WAITING PLAYER 1 TO CHOOSE";
      chosenCharTwo.textContent = "WAITING PLAYER 2 TO CHOOSE";

      // Remove img sign in board's cells
      const imgInBoard = boardWrapper.querySelectorAll("img");
      imgInBoard.forEach((img) => {
        img.remove();
      });

      // Reset player's turn
      playerTurnOutput.textContent = `${playerOneChar}'s turn`;
    };

    const _modifyDialog = () => {
      _setDialogWinnerImg();
      _setDialogWinnerChar();
    };

    const _setDialogWinnerImg = () => {
      let imgSrc;

      switch (currentPlayer) {
        case "Yoichi Isagi":
          imgSrc = "./blue-lock-images/isagi-goal.jpg";
          break;

        case "Michael Kaiser":
          imgSrc = "./blue-lock-images/kaiser-goal.jpg";
          break;

        case "Rensuke Kunigami":
          imgSrc = "./blue-lock-images/kunigami-goal.jpg";
          break;

        case "Seishiro Nagi":
          imgSrc = "./blue-lock-images/nagi-goal.jpg";
          break;

        case "Itoshi Rin":
          imgSrc = "./blue-lock-images/rin-goal.jpg";
          break;

        case "Tabito Karasu":
          imgSrc = "./blue-lock-images/karasu-goal.jpg";
          break;

        case "Ryusei Shidou":
          imgSrc = "./blue-lock-images/shidou-goal.png";
          break;

        case "Shouei Barou":
          imgSrc = "./blue-lock-images/barou-goal.jpg";
          break;
      }

      winnerImg.setAttribute("src", imgSrc);
    };

    const _setDialogWinnerChar = () => {
      winnerChar.textContent = currentPlayer;
    };

    const handleDialogTie = () => {
      winnerImg.setAttribute("src", "./blue-lock-images/tie-image.jpg");
      winnerAnnounce.textContent = "THIS GAME IS A TIE";
    };

    const _changeCharacter = (e) => {
      e.preventDefault();
      reset();
      audioController.getBacksound().pause();

      // Add hide class to playing section
      boardWrapper.classList.add("hide");
      playerTurnOutput.classList.add("hide");

      // Remove hide class from starting section
      choosePlayerContainer.classList.remove("hide");
      startGameBtnWrapper.classList.remove("hide");

      dialog.close();
    };

    const _rematch = (e) => {
      e.preventDefault();

      // Reset board
      gameboard.resetBoard();

      // Reset game ended variable
      gameEnded = false;

      // Reset is tie variable
      isTie = false;

      // Remove img sign in board's cells
      const imgInBoard = boardWrapper.querySelectorAll("img");
      imgInBoard.forEach((img) => {
        img.remove();
      });

      // Reset current player
      currentPlayer = playerOneChar;

      // Reset player's turn
      _displayPlayerTurn();

      dialog.close();
    };

    return { init, playerOneChars, playerTwoChars, getPlayerOneChar, getPlayerTwoChar, startGameBtn };

  })();

  displayController.init();

  const audioController = (() => {
    let backsound = null;
    let currentVoice = null;

    const init = () => {
      _bindEvents();
    };

    const _bindEvents = () => {
      displayController.startGameBtn.addEventListener("click", _setBacksound);

      displayController.playerOneChars.forEach((char) => {
        char.addEventListener("click", _setSelectedCharVoice);
      });

      displayController.playerTwoChars.forEach((char) => {
        char.addEventListener("click", _setSelectedCharVoice);
      });
    };

    const _setBacksound = () => {
      if(displayController.getPlayerOneChar() !== undefined && 
         displayController.getPlayerTwoChar() !== undefined) {
          backsound = new Audio("./blue-lock-audio/blue-lock-backsound.mp3");
          backsound.loop = true;
          backsound.play();
        }
    };

    const getBacksound = () => {
      return backsound;
    };

    const _setSelectedCharVoice = (e) => {
      let voiceSrc;

      switch (e.target.dataset.name) {
        case "Yoichi Isagi":
          voiceSrc = "./blue-lock-audio/isagi-voice.mp3";
          break;
      
        case "Michael Kaiser":
          voiceSrc = "./blue-lock-audio/kaiser-voice.mp3";
          break;

        case "Rensuke Kunigami":
          voiceSrc = "./blue-lock-audio/kunigami-voice.mp3";
          break;

        case "Seishiro Nagi":
          voiceSrc = "./blue-lock-audio/nagi-voice.mp3";
          break;

        case "Itoshi Rin":
          voiceSrc = "./blue-lock-audio/rin-voice.mp3";
          break;

        case "Tabito Karasu":
          voiceSrc = "./blue-lock-audio/karasu-voice.mp3";
          break;

        case "Ryusei Shidou":
          voiceSrc = "./blue-lock-audio/shidou-voice.mp3";
          break;

        case "Shouei Barou":
          voiceSrc = "./blue-lock-audio/barou-voice.mp3";
          break;
      }

      if(currentVoice) {
        currentVoice.pause();
        currentVoice.currentTime = 0;
      }

      currentVoice = new Audio(voiceSrc);
      currentVoice.play();
    };

    return { init, getBacksound };
  })();

  audioController.init();

})();