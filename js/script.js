var gameApp, randomize;

/**
 * # Staring the game obj
 */
gameApp = {
  // Get the DOM element to set up the board
  board: document.getElementById('grid-container'),

  // Function Initialize to start the game on the next step
  init: function() {
    return document.body.onkeyup = this.setElementToMove;
  },

  // Function for get the element to move
  setElementToMove: function(event) {
    var element, empty, emptyIndex;

    // Set the empty element in cache
    empty = document.getElementsByClassName("empty")[0];

    // Set the index of the empty element to know where should end the new one
    emptyIndex = Array.prototype.slice.call(empty.parentNode.children).indexOf(empty);
    element = null;

    // Process the keycode to know what elemnt set depend on the arrow pressed
    switch (event.keyCode) {
      case 37:
        if (empty.nextElementSibling !== null) {
          element = empty.nextElementSibling;
        }
        break;
      case 38:
        if (empty.parentNode.nextElementSibling !== null) {
          element = Array.prototype.slice.call(empty.parentNode.nextElementSibling.children)[emptyIndex];
        }
        break;
      case 39:
        if (empty.previousElementSibling !== null) {
          element = empty.previousElementSibling;
        }
        break;
      case 40:
        if (empty.parentNode.previousElementSibling !== null) {
          element = Array.prototype.slice.call(empty.parentNode.previousElementSibling.children)[emptyIndex];
        }
        break;
      default:
        console.log("No Moves");
    }

    // Now we have the element so we can move
    if (element) {
      gameApp.move(empty, element);
    }

    // Verify if that move can make you a Winner
    gameApp.isWinner();
  },

  // Set the new element to the empty one and viceversa
  move: function(empty, element) {
    empty.innerText = element.innerText;
    element.innerText = "";
    element.className = "empty";
    empty.className = "";
  },

  // Verify if the table is in order
  isWinner: function() {
    var arr, i, j, k;
    arr = [];
    k = 1;
    i = 0;
    while (i < gameApp.board.children.length) {
      j = 0;
      while (j < gameApp.board.children[i].children.length) {
        arr[k] = parseInt(gameApp.board.children[i].children[j].innerText, 10) === k++;
        j++;
      }
      i++;
    }
    if (arr.join("").length === 65) {
      document.getElementById('game-message').classList.add('game-win');
    }
  }
};

// Random
randomize = {
  numbers: "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15".split(","),
  board: gameApp.board.children,
  init: function() {
    var element, i, j, temp;
    i = 0;
    while (i < this.board.length) {
      j = 0;
      while (j < this.board[i].children.length) {
        temp = ~~(Math.random() * this.numbers.length);
        element = this.board[i].children[j];
        if (this.numbers[temp] === undefined) {
          element.className = "empty";
        } else {
          element.innerText = this.numbers[temp];
        }
        this.numbers.splice(temp, 1);
        j++;
      }
      i++;
    }
  }
};

randomize.init();

gameApp.init();
