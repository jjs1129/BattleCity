import Game from "./Game.js";
import Status from './Status.js';
import Config from "./Config.js";
let cvs = document.querySelector('#cvs');
let context = cvs.getContext('2d');
let num = 20;
let game = new Game(context, num);
game.init();
game.update();
game.keyLisetner();

// delete game;
