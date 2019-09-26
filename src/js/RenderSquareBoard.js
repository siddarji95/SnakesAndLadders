import rollADie from "roll-a-die";
import Player from "./Player";

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
    this.createBoard();

    for (let i = 0; i < this.squares.length; i++) {
      stage.addChild(this.squares[i]);
    }

    //let renderSnakesAndLadders = new RenderSnakeAndLadders(stage);
    this.renderSnakesAndLadders();

    for (let i = 0; i < this.displayNumbers.length; i++) {
      stage.addChild(this.displayNumbers[i]);
    }

    this.renderSnakesAndLadders();

    this.players.push(this.addPlayer(1, 600, 540));
    this.players.push(this.addPlayer(2, 660, 540));

    this.currentPlayer = this.players[this.currentPlayerNr];
    this.currentPlayer.obj.playerNr.outline=2;
    this.currentPlayer.obj.playerNr.color='red';

    this.dice = $("<div>", {
      id: "dice",
      class: "dice"
    });

    $("body").append(this.dice[0]);
    this.nextTurn = $("<div>", {
      id: "nextTurn",
      class: "nextTurn"
    });

    $("body").append(this.nextTurn[0]);
    //console.log(this.newMove);

    this.nextTurn.html("You got: " + this.newMove);

    this.playerTurn = $("<div>", {
      id: "playerTurn",
      class: "playerTurn"
    });
    $("body").append(this.playerTurn[0]);
    this.playerTurn.html(`Turn of player: <span id='currentPlayerNr'>${this.currentPlayerNr + 1}</span>`);

    this.rollButton = $("<button>", {
      id: "rollButton",
      class: "rollButton"
    });
    $("body").append(this.rollButton[0]);
    this.rollButton.html("Roll dice");

    this.rollButton.click(() => {
      this.rollButton.attr("disabled", true);
      rollADie({
        element: this.dice[0],
        numberOfDice: 1,
        callback: res => {
          this.newMove = res[0];
          setTimeout(() => this.nextMove(), 1000);
        }
      });
    });
  
    // this.rollButton.click(() => {
    //   this.rollButton.attr("disabled", true);
    //   console.log(this.newMove)
    //   rollADie({
    //     element: this.dice[0],
    //     numberOfDice: 1,
    //     values:[this.newMove],
    //     callback: res => {
    //       setTimeout(() => this.nextMove(), 1000);
    //     }
    //   });
    // });

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

        if (squareNr % 2 == 0) {
          this.squares[squareNr].graphics
            .beginStroke("red")
            .beginFill(colorA)
            .drawRect(0, 0, this.squareSize, this.squareSize);
        } else {
          this.squares[squareNr].graphics
            .beginStroke("red")
            .beginFill(colorB)
            .drawRect(0, 0, this.squareSize, this.squareSize);
        }

        this.displayNumbers[squareNr] = new createjs.Text(
          squareNr,
          "20px Arial",
          "#000"
        );
        this.displayNumbers[squareNr].x = x + this.squareSize / 2;
        this.displayNumbers[squareNr].y = y + this.squareSize / 2;
        this.displayNumbers[squareNr].textAlign = "center";
        this.displayNumbers[squareNr].textBaseline = "middle";

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
    let ladder1 = this.createLadders(96, 57);
    this.stage.addChild(ladder1);

    let ladder2 = this.createLadders(92, 71);
    this.stage.addChild(ladder2);

    let ladder3 = this.createLadders(72, 52);
    this.stage.addChild(ladder3);

    let ladder4 = this.createLadders(59, 20);
    this.stage.addChild(ladder4);

    let ladder5 = this.createLadders(23, 2);
    this.stage.addChild(ladder5);

    let ladder6 = this.createLadders(45, 6);
    this.stage.addChild(ladder6);

    let snake1 = this.createSnakes(98, 40);
    this.stage.addChild(snake1);

    let snake2 = this.createSnakes(87, 49);
    this.stage.addChild(snake2);

    let snake3 = this.createSnakes(84, 58);
    this.stage.addChild(snake3);

    let snake4 = this.createSnakes(73, 15);
    this.stage.addChild(snake4);

    let snake5 = this.createSnakes(50, 5);
    this.stage.addChild(snake5);

    let snake6 = this.createSnakes(43, 17);
    this.stage.addChild(snake6);

    let snake7 = this.createSnakes(56, 8);
    this.stage.addChild(snake7);

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
  createSnakes(start, end) {
    const snake = new createjs.Shape();
    snake.graphics
      .setStrokeStyle(8, "round")
      .beginStroke("red")
      .moveTo(
        this.squares[start].x + this.squareSize / 2,
        this.squares[start].y + (this.squareSize * 2) / 3
      )
      .lineTo(
        this.squares[end].x + this.squareSize / 2,
        this.squares[end].y + this.squareSize / 3
      );
    return snake;
  }
  createLadders(start, end) {
    const snake = new createjs.Shape();
    snake.graphics
      .setStrokeStyle(8, "round")
      .beginStroke("#fff")
      .moveTo(
        this.squares[start].x + this.squareSize / 2,
        this.squares[start].y + (this.squareSize * 2) / 3
      )
      .lineTo(
        this.squares[end].x + this.squareSize / 2,
        this.squares[end].y + this.squareSize / 3
      );
    return snake;
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
          onComplete: () =>{
            if(TempPos < this.currentPlayer.currentPos)
             {this.rollButton.attr("disabled", false)}
             else{
              this.updatePlayerStatus();
             }
          }
      });
    }
    else if(TempPos == this.currentPlayer.currentPos){
      if(this.newMove==6){this.rollButton.attr("disabled", false);}
      else
      {this.updatePlayerStatus();}
    } 
  }
  updatePlayerStatus(){
    this.rollButton.attr("disabled", false);
    if (this.currentPlayerNr < this.players.length - 1) {
      this.currentPlayerNr++;
    } else {
      this.currentPlayerNr = 0;
    }
    this.currentPlayer.obj.playerNr.outline=false;
    this.currentPlayer.obj.playerNr.color='black';
    this.currentPlayer = this.players[this.currentPlayerNr];
    this.playerTurn.html(`Turn of player: <span id='currentPlayerNr'>${this.currentPlayerNr + 1}</span>`);
    this.currentPlayer.obj.playerNr.outline=2;
    this.currentPlayer.obj.playerNr.color='red';
  }
  nextMove() {
    //console.log(this.squares)
    if (this.currentPlayer.currentPos == 0) {
        if(this.newMove<=6){
          console.log(this.currentPlayer.playerNo,this.currentPlayerNr+1,"heloooo")
            this.currentPlayer.currentPos=1;
           this.currentPlayer.updatePlayer(0,540,()=>this.updatePlayerStatus());
        }
        else{
          this.updatePlayerStatus();
        }
    }
    else if(this.currentPlayer.currentPos+this.newMove<=100){
      //console.log(this.newMove);
      //console.log(this.currentPlayer);
      this.nextTurn.html("You got: " + this.newMove);

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
        alert(`Congratulations, Player ${this.currentPlayerNr+1} have won the game :)`);
        this.players.splice(this.currentPlayerNr, 1);
        console.log(this.players)
        //initGame();
      }
    }
    else{
      this.updatePlayerStatus();
    }
  }
}
export default RenderSquareBoard;
