class RenderSnakesAndLadders {
    constructor(stage,squares,squareSize) {
        this.stage = stage;
        this.squares = squares;
        this.squareSize = squareSize
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
}
 
export default RenderSnakesAndLadders;