import rollADie from "roll-a-die";
import Player from "./Player";
import PlayerControl from "./PlayerControl";
import io from 'socket.io-client';
import RenderSnakesAndLadders from "./RenderSnakesAndLadders";
// const socket = io('/');
const socket = io('https://snakesandladders95.herokuapp.com/', {secure: true});
window.socket = socket;

class RenderSquareBoard {
  constructor(stage) {
    this.stage = stage;
    this.boxHeight = 600;
    this.boxWidth = 600;
    this.newMove = 0;
    this.players = [];
    this.currentPlayerNr = 0;
    this.displayNumbers = new Array();
    this.squares = new Array();
    this.squareSize = this.boxHeight / 10;
    this.turn=1;
    console.log(socket)
    this.createBoard();

    $('#new').on('click', () => {
      const name = $('#nameNew').val();
      if (!name) {
        alert('Please enter your name.');
        return;
      }
      socket.emit('createGame', { name });
      this.players[0].setPlayerName(name);
      this.displayPlayerControl();
      this.rollButton.css("display", "none");
    });
    // Join an existing game on the entered roomId. Emit the joinGame event.
    $('#join').on('click', () => {
      const name = $('#nameJoin').val();
      const roomID = $('#room').val();
      this.roomID = roomID;
      if (!name || !roomID) {
        alert('Please enter your name and game ID.');
        return;
      }
      socket.emit('joinGame', { name, room: roomID });
      this.players[1].setPlayerName(name);
      this.displayPlayerControl();
    });

    // New Game created by current client. Update the UI and create new Game var.
    socket.on('newGame', (data) => {
      console.log('newGame')
      const message =
        `Hello, ${data.name}.<br> Please ask your friend to enter Game ID: 
        ${data.room}.<br> Waiting for player 2...`;

      // Create game for player 1
      this.createBoard();
      this.roomID=data.room;
      this.displayBoard(message);
    });

    socket.on('player1', (data) => {
      const message = `Hello, ${this.players[0].playerName}`;
      $('#userHello').html(message);
      this.setCurrentTurn(true);
      this.rollButton.css("display", "block");
    });

    /**
     * Joined the game, so player is P2(O). 
     * This event is received when P2 successfully joins the game room. 
     */
    socket.on('player2', (data) => {
      const message = `Hello, ${data.name}`;

      // Create game for player 2
      this.createBoard();
      this.displayBoard(message);
      this.setCurrentTurn(false);
    });

      /**
   * Opponent played his turn. Update UI.
   * Allow the current player to play now. 
   */
    socket.on('turnPlayed', (data) => {
      console.log('turnPlayed',this.currentPlayer.playerNo,data)
        this.newMove = data.move;
        this.nextMove();
        // this.setCurrentTurn(true);
    });
    socket.on('opponentPlaying', (data) => {
      console.log('opponentPlaying',this.currentPlayer.playerNo,data)
        this.newMove = data.move;
        // this.nextMove();
        // this.setCurrentTurn(false);
    });
    this.bg = new createjs.Bitmap("../images/bg.jpg");
    // this.bg.alpha = 0.4;
    stage.addChild(this.bg);
    console.log(this.bg)

    for (let i = 0; i < this.squares.length; i++) {
      stage.addChild(this.squares[i]);
    }

    //let renderSnakesAndLadders = new RenderSnakeAndLadders(stage);
    // this.renderSnakesAndLadders();

    for (let i = 0; i < this.displayNumbers.length; i++) {
      stage.addChild(this.displayNumbers[i]);
    }

    // this.renderSnakesAndLadders();

    this.players.push(this.addPlayer(1, 600, 540));
    this.players.push(this.addPlayer(2, 660, 540));

    this.currentPlayer = this.players[this.currentPlayerNr];
    this.currentPlayer.obj.playerNr.outline=2;
    this.currentPlayer.obj.playerNr.color='red';

  }
  displayBoard(message) {
    $('.menu').css('display', 'none');
    $('.gameBoard').css('display', 'block');
    $('#userHello').html(message);
    this.createBoard();
  }
  displayPlayerControl(){
    this.playerControl = new PlayerControl();
    this.rollButton = this.playerControl.rollButton;
    this.rollButton.click(() => {
      this.rollButton.attr("disabled", true);
      rollADie({
        element: this.playerControl.dice[0],
        numberOfDice: 1,
        values:[this.turn],
        callback: res => {
          this.newMove = res[0];
          setTimeout(() => this.nextMove(), 1000);
          this.playTurn();
          // this.setCurrentTurn(false);
        }
      });
    });
  }

  createBoard() {
    const colorA = "#669900";
    const colorB = "#ffcc00";

    const initRow = 1;
    const totalRows = 10;
    const initcolumn = 1;
    const totalColumns = 10;

    let x = 0;
    let y = this.boxHeight - this.squareSize;
    let squareNr = 1;
    let leftToRight = true;

    for (let row = initRow; row <= totalRows; row++) {
      if (leftToRight) {
        x = 0;
      } else {
        x = this.boxWidth - this.squareSize;
      }

      for (var column = initcolumn; column <= totalColumns; column++) {
        this.squares[squareNr] = new createjs.Shape();
        this.squares[squareNr].x = x;
        this.squares[squareNr].y = y;

        // if (squareNr % 2 == 0) {
        //   this.squares[squareNr].graphics
        //     .beginStroke("red")
        //     .beginFill(colorA)
        //     .drawRect(0, 0, this.squareSize, this.squareSize);
        // } else {
        //   this.squares[squareNr].graphics
        //     .beginStroke("red")
        //     .beginFill(colorB)
        //     .drawRect(0, 0, this.squareSize, this.squareSize);
        // }

        // this.displayNumbers[squareNr] = new createjs.Text(
        //   squareNr,
        //   "20px Arial",
        //   "#000"
        // );
        // this.displayNumbers[squareNr].x = x + this.squareSize / 2;
        // this.displayNumbers[squareNr].y = y + this.squareSize / 2;
        // this.displayNumbers[squareNr].textAlign = "center";
        // this.displayNumbers[squareNr].textBaseline = "middle";

        let x1, y1;
        if (leftToRight) {
          x += this.squareSize;

          x1 = x + this.squareSize / 2;

          //console.log("x11",x1)
        } else {
          x -= this.squareSize;
          x1 = x - this.squareSize / 2;

          //console.log("x12",x1)
        }

        y1 = y - this.squareSize / 2;

        //console.log("y1",y1);

        squareNr++;
      }

      y -= this.squareSize;
      leftToRight = !leftToRight;
    }
  }
  renderSnakesAndLadders() {
    this.snakesAndLadders = new RenderSnakesAndLadders(this.stage,this.squares,this.squareSize);
    // let ladder2= this.createLadders(500,50,560,130)
    // stage.addChild(ladder2);
  }
  addPlayer(playerNo, x0, y0) {
    let player = new Player(playerNo, this.squareSize);
    //console.log(player.obj);
    player.drawPlayer(x0, y0);
    this.stage.addChild(player.obj);
    return player;
  }
  // Send an update to the opponent to update their UI's tile
  playTurn() {
    this.rollButton.attr("disabled", true);
    console.log('playTurn',this.roomID)
    // Emit an event to update other player that you've played your turn.
    socket.emit('playTurn', {
      move: this.newMove,
      room: this.roomID,
    });
  }
  setCurrentTurn(turn) {
    this.currentTurn = turn;
    console.log('setCurrentTurn',this.currentTurn)
    const message = turn ? 'Your turn' : 'Waiting for Opponent...';
    $('#turn').text(message);

    if(!turn){
      this.turnPopupWrapper = $("<div>", {
        id: "turnPopupWrapper",
        class: "turnPopupWrapper"
      });
      $("body").append(this.turnPopupWrapper[0]);
      this.helper = $("<div>", {
        id: "helper",
        class: "helper"
      });
      this.turnPopupWrapper[0].append(this.helper[0]);
      this.turnPopup = $("<div>", {
        id: "turnPopup",
        class: "turnPopup"
      });
      this.turnPopupWrapper[0].append(this.turnPopup[0]);
      this.turnPopup.html(message);
    }
    else{
      if($('#turnPopupWrapper').length)
      this.turnPopupWrapper.fadeOut();
    }
    this.rollButton.attr("disabled", !turn);
  }
  updatePlayerStatus(){
    this.setCurrentTurn(!this.currentTurn);
    if (this.currentPlayerNr < this.players.length - 1) {
      this.currentPlayerNr++;
    } else {
      this.currentPlayerNr = 0;
    }
    this.currentPlayer.obj.playerNr.outline = false;
    this.currentPlayer.obj.playerNr.color = 'black';
    this.currentPlayer = this.players[this.currentPlayerNr];
    // console.log('currentPlayer',this.currentPlayer.playerNo);
    this.playerControl.playerTurn.html(`Turn of player: <span id='currentPlayerNr'>${this.currentPlayerNr + 1}</span>`);
    this.currentPlayer.obj.playerNr.outline = 2;
    this.currentPlayer.obj.playerNr.color = 'red';
  }
  stillPlaying(){
    console.log('stillPlaying',this.currentTurn)
    this.setCurrentTurn(true);
    socket.emit('stillPlaying', {
      move: this.newMove,
      room: this.roomID,
    });
  }
  upAndDown() {
    //console.log("up", this.currentPlayer.currentPos);
    let TempPos = this.currentPlayer.currentPos;
    switch (this.currentPlayer.currentPos) {
      //ladder
      case 2:
        this.currentPlayer.currentPos = 23;
        break;
      case 6:
        this.currentPlayer.currentPos = 45;
        break;
      case 20:
        this.currentPlayer.currentPos = 59;
        break;
      case 52:
        this.currentPlayer.currentPos = 72;
        break;
      case 57:
        this.currentPlayer.currentPos = 96;
        break;
      case 71:
        this.currentPlayer.currentPos = 92;
        break;
      //snake
      case 98:
        this.currentPlayer.currentPos = 40;
        break;
      case 87:
        this.currentPlayer.currentPos = 49;
        break;
      case 84:
        this.currentPlayer.currentPos = 58;
        break;
      case 73:
        this.currentPlayer.currentPos = 15;
        break;
      case 56:
        this.currentPlayer.currentPos = 8;
        break;
      case 50:
        this.currentPlayer.currentPos = 5;
        break;
      case 43:
        this.currentPlayer.currentPos = 17;
        break;
    }

    if (TempPos != this.currentPlayer.currentPos) {
      TweenMax.to(this.currentPlayer.obj, 2, {
        x:
          this.squares[this.currentPlayer.currentPos].x +
          this.squareSize / 2 -
          this.currentPlayer.obj.getBounds().width / 2,
        y:
          this.squares[this.currentPlayer.currentPos].y +
          this.squareSize / 2 -
          this.currentPlayer.obj.getBounds().height / 2,
        onComplete: () => {
          if (TempPos < this.currentPlayer.currentPos) { 
            this.rollButton.attr("disabled", false)
            if(this.currentTurn){
               this.stillPlaying();
            }
           }
          else {
            this.updatePlayerStatus();
          }
        }
      });
    }
    else if (TempPos == this.currentPlayer.currentPos) {
      if (this.newMove == 6) {
          this.rollButton.attr("disabled", false); 
          if(this.currentTurn){
          this.stillPlaying();
          }
        }
      else { this.updatePlayerStatus(); }
    }
  }
  nextMove() {
    console.log('nextMove')
    //console.log(this.squares)
    if (this.currentPlayer.currentPos == 0) {
      if (this.newMove <= 6) {
        this.currentPlayer.currentPos = 1;
        this.currentPlayer.updatePlayer(0, 540, () => this.updatePlayerStatus());
        this.playerControl.nextTurn.html("Move: " + this.newMove);
      }
      else {
        this.updatePlayerStatus();
      }
    }
    else if (this.currentPlayer.currentPos + this.newMove <= 100) {
      //console.log(this.newMove);
      //console.log(this.currentPlayer);
      this.playerControl.nextTurn.html("Move: " + this.newMove);

      let coorintaes = this.squares[this.currentPlayer.currentPos];
      let movePoints = [];
      for (
        let i = this.currentPlayer.currentPos;
        i <= this.currentPlayer.currentPos + this.newMove;
        i++
      ) {
        //console.log(this.squares[i].x, this.squares[i].y);
        movePoints.push({
          x:
            this.squares[i].x +
            this.squareSize / 2 -
            this.currentPlayer.obj.getBounds().width / 2,
          y:
            this.squares[i].y +
            this.squareSize / 2 -
            this.currentPlayer.obj.getBounds().height / 2
        });
      }
      this.currentPlayer.currentPos =
        this.currentPlayer.currentPos + this.newMove;
      //console.log(movePoints);
      TweenMax.to(this.currentPlayer.obj, 2, {
        bezier: movePoints,
        ease: SteppedEase.config(this.newMove),
        onComplete: () => this.upAndDown()
      });

      if (this.currentPlayer.currentPos == 100) {
        alert(`Congratulations, Player ${this.currentPlayerNr + 1} have won the game :)`);
        this.players.splice(this.currentPlayerNr, 1);
        console.log(this.players)
        //initGame();
      }
    }
    else {
      this.updatePlayerStatus();
    }
  }
}
export default RenderSquareBoard;
