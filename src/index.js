const { View } = require("./view");
const { Presenter } = require("./presenter");

const icons = [
  'a', 'b', 'c', 'd'
]
const view = new View({flashDuration: 800});
const presenter = new Presenter(view, 'a')

const card1 = { x: 1, y: 3, icon: "S" };
const card2 = { x: 2, y: 0, icon: "A" };

view.revealCard(card1)
view.flashSuccess(card1, card2);



function debug() {
  // view.flashSuccess(card1, card2);
  view.flashFailure(card1, card2);
}

window.debug = debug;
