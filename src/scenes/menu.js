class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene")
    }

    preload(){

        //this.load.path = './assets/'
        //this.load.audio('music', 'sounds/music.mp3')
        //this.load.audio('select', 'sounds/Blip_select 4.wav')

        this.load.bitmapFont('pixelfont', 'assets/text/pixelfont.png', '/assets/text/pixelfont.xml')
        this.load.bitmapFont('retro', 'assets/text/retro.png', '/assets/text/retro.xml')

        this.load.image('background', 'assets/imgs/bg2.png')
        
        this.load.image('hammerHead', 'assets/imgs/hammerHead.png')
        this.load.image('playerHead', 'assets/imgs/playerlife.png')


        
        this.load.audio('music', 'assets/sounds/theme.mp3')
        

    }

    create(){

        if (!this.sound.get('music')) {
            this.backgroundMusic = this.sound.add('music', { loop: true });
            this.backgroundMusic.play();
            this.backgroundMusic.setVolume(.3)
        }
        

        
        //this.background = this.add.tileSprite(0, 0, 0, 0, 'background').setOrigin(0)

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.M = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);



        
        this.add.bitmapText(game.config.width/2, game.config.height/2 - 64, 'retro', 'Nobody Beats the Hammer', 32).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/2 + 32, 'retro', 'Press [Space] to start' , 18).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/2 + 64, 'retro', 'Press [F] to Punch ' , 18).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/2 + 96, 'retro', 'Arrow keys to move' , 18).setOrigin(0.5)
        this.add.bitmapText(game.config.width/2, game.config.height/2 + 128, 'retro', 'Press [M] to Reveal Special Menu' , 18).setOrigin(0.5)

        this.initialized = false;

        this.head2 = this.add.image(750, 120, 'hammerHead').setScale(6)
        this.head2 = this.add.image(150, 90, 'playerHead').setScale(6)
        this.head2.flipX = true;





    }   

    update(){

        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            //this.sound.play('select')
            this.scene.start("playScene")
        }

        if(Phaser.Input.Keyboard.JustDown(this.M) && this.initialized == false){
            this.text1 = this.add.bitmapText(game.config.width/2, game.config.height/2 + 210, 'retro', 'The Hammers Weakness is Furniture! ' , 18).setOrigin(0.5)
            this.text2 = this.add.bitmapText(game.config.width/2, game.config.height/2 + 240, 'retro', 'Pickup Chairs with [E]' , 18).setOrigin(0.5)
            this.text3 = this.add.bitmapText(game.config.width/2, game.config.height/2 + 265, 'retro', 'Hold [F] to Attack with Chair' , 18).setOrigin(0.5)

            this.initialized = true;
            //this.sound.play('select')

        }
        
    }
}