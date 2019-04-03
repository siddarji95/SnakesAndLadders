class Player{
    constructor(playerNo,squareSize){
        this.squareSize=squareSize;
        this.obj = new createjs.Container();
        this.playerImg = new createjs.Bitmap("../images/position.png");
        this.playerCir = new createjs.Shape();
        this.playerCir.graphics.beginFill("#fff").drawCircle(15, 15, 10);
        this.playerNr = new createjs.Text("","20px Arial", "#000");
        this.playerNr.x = 15;
        this.playerNr.y = 22;
        this.playerNr.textBaseline = "alphabetic";
        this.playerNr.textAlign = 'center'


        this.obj.addChild(this.playerImg, this.playerCir,this.playerNr);
        this.obj.playerNr=this.playerNr;
        this.currentPos=0;
        this.playerNo=playerNo;
        //console.log(this.player)
    }
    drawPlayer(x,y){
        this.obj.x = x + this.squareSize / 2 - this.playerImg.getBounds().width / 2;
        this.obj.y = y + this.squareSize / 2 - this.playerImg.getBounds().height / 2;
        this.obj.playerNr.text = this.playerNo;
    }
    updatePlayer(x,y,callback){
        TweenMax.to(this.obj, 2, {
            x: x + this.squareSize / 2 - this.playerImg.getBounds().width / 2,
            y: y + this.squareSize / 2 - this.playerImg.getBounds().height / 2,
            onComplete:callback
          });
    }
}
export default Player;