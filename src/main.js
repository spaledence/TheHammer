//Dale Spence - Nobody Beats the Hammer 
//3/18/2024
//Phaser Components Included: Animation Manager, Text Objects, Timers, Physics Systems, Couldnt think of others 

'use strict';

// define and configure main Phaser game objec
let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    pixelArt:  true,
    roundPixels: true,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            /*
            gravity: {
                x: 0,
                y: 400
            }
            */
            
        }
    },
    scene: [ Menu, Play, Gameover]
}



// define game
let game = new Phaser.Game(config);
let { width, height } = game.config