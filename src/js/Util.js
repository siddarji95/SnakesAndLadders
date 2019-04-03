class RenderSnakeAndLadders {
  constructor() {
        var img = new Image();
        img.onload = function () 
        {
        context.drawImage(img, 66, 23);
        };
        img.src = "Images/SnakeA.gif";

        var img1 = new Image();
        img1.onload = function () 
        {
        context.drawImage(img1, 66, 166);
        };
        img1.src = "Images/SnakeB.gif";
        //context.drawImage(img, 66, 166);
        
        context.drawImage(img, 66, 23);

        var img2 = new Image();
        img2.onload = function () {
            context.drawImage(img2, 57, 166);
        };
        img2.src = "Images/LadderA.gif";

        var img3 = new Image();
        img3.onload = function () 
        {
            context.drawImage(img3, 322, 366);
        };
        img3.src = "Images/LadderA.gif";            
  }
};
export default RenderSnakeAndLadders;
