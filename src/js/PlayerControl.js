class PlayerControl{
    constructor() {
    this.container = $(".container");
    this.userHello = $("<div>", {
        id: "userHello",
        class: ""
    });
    $(this.container[0]).append(this.userHello[0]);

    this.turn = $("<div>", {
        id: "turn",
        class: ""
    });
    $(this.container[0]).append(this.turn[0]);

    this.dice = $("<div>", {
        id: "dice",
        class: "dice"
      });
  
    $(this.container[0]).append(this.dice[0]);

    this.nextTurn = $("<div>", {
        id: "nextTurn",
        class: "nextTurn"
      });
  
    $(this.container[0]).append(this.nextTurn[0]);
    this.nextTurn.html("Move:");

    this.playerTurn = $("<div>", {
        id: "playerTurn",
        class: "playerTurn"
      });
  
    $(this.container[0]).append(this.playerTurn[0]);
    this.playerTurn.html(`Turn of player:`);

    this.rollButton = $("<button>", {
        id: "rollButton",
        class: "rollButton"
      });
  
    $(this.container[0]).append(this.rollButton[0]);
    this.rollButton.html("Roll dice");

    }

}
 
export default PlayerControl;