import RenderSquareBoard from './RenderSquareBoard';
//import Controller from './Controller';
//import Util from './Util';
import '../css/App.css';
class App {
  constructor() {
    // console.log("APP class constructor");
    // this.controller = new Controller();
    // let model = new Model();
    // let view = new View();

    // this.controller.set(model,view)
    // view.set(this.controller)
    let stage = new createjs.Stage("demoCanvas"); 
    createjs.Ticker.addEventListener("tick", () => stage.update());

    this.preloadImages([
    '../images/position.png',
    '../images/SnakeA.gif',
    '../images/SnakeB.gif',
    '../images/LadderA.gif',
    '../images/LadderB.gif'

    ], function(){
      console.log('All images were loaded');
      let renderSquareBoard = new RenderSquareBoard(stage);
      window.obj = renderSquareBoard;
    });

  }
  preloadImages(urls, allImagesLoadedCallback){
    var loadedCounter = 0;
  var toBeLoadedNumber = urls.length;
  urls.forEach(function(url){
    preloadImage(url, function(){
        loadedCounter++;
            console.log('Number of loaded images: ' + loadedCounter);
      if(loadedCounter == toBeLoadedNumber){
        allImagesLoadedCallback();
      }
    });
  });
  function preloadImage(url, anImageLoadedCallback){
      var img = new Image();
      img.onload = anImageLoadedCallback;
      img.src = url;
  }
}


}
let app = new App();
//let utilObj = new Util(app.controller)
