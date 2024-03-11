class Gameover extends Phaser.Scene{
    constructor(){
        super("gameoverScene")
    }

    preload(){

        //this.load.path = './assets/'
        //this.load.audio('select', 'sounds/Blip_select 4.wav')
        this.load.bitmapFont('retro', 'assets/text/retro.png', 'assets/text/retro.xml')
    }

    create(){

        //let score = data.score

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.restart = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

        this.add.bitmapText(game.config.width/2, game.config.height/2 - 32, 'retro', 'Game Over', 32).setOrigin(.5)

        this.add.bitmapText(game.config.width/2, game.config.height/2 + 64, 'retro', 'Press [Space] for Menu', 16).setOrigin(.5)
        this.add.bitmapText(game.config.width/2, game.config.height/2 + 96, 'retro', 'Press [R] to Restart', 16).setOrigin(.5)


        //this.add.text(100, 100, "hello")



        


    }   

    update(){

        if(Phaser.Input.Keyboard.JustDown(this.restart)){
            //this.sound.play('select')
            this.scene.start("playScene")
        }

        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            //this.sound.play('select')
            this.scene.start("menuScene")

        }
    }

}   