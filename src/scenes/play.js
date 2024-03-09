class Play extends Phaser.Scene {
    constructor(){
        super('playScene')
        this.lastPunchTime = 0;
        this.isPunching = false;
    }

    preload() {
        //add assets
        this.load.path = './assets/'
        this.load.image('background', 'imgs/temp2background.jpeg')
        this.load.atlas('playerRun', 'imgs/playerrun.png', 'imgs/playerrun.json')
        this.load.atlas('hammer', 'imgs/hammer.png', 'imgs/hammer.json')
        this.load.atlas('playeridle', 'imgs/playeridle.png', 'imgs/playeridle.json')
        this.load.atlas('playerpunch', 'imgs/playerpunch.png', 'imgs/playerpunch.json')


    }

    create(){

        this.background = this.add.tileSprite(0, 0, 0, 0, 'background').setOrigin(0)
        //this.background.setScale(3)

        
        this.anims.create({
            key: 'playerRun',
            frames: this.anims.generateFrameNames('playerRun', {
                prefix: 'playerrun',  // Prefix for each frame name in the atlas
                start: 1,                  
                end: 4,                   
            }),
            frameRate: 5,             
            repeat: -1                
        });

        this.anims.create({
            key: 'playeridle',
            frames: this.anims.generateFrameNames('playeridle', {
                prefix: 'playeridle',  // Prefix for each frame name in the atlas
                start: 1,                  
                end: 2,                   
            }),
            frameRate: 3,             
            repeat: -1                
        });

        this.anims.create({
            key: 'playerpunch',
            frames: this.anims.generateFrameNames('playerpunch', {
                prefix: 'playerpunch',  // Prefix for each frame name in the atlas
                start: 1,                  
                end: 2,                   
            }),
            frameRate: 5,   
            repeat: 0          
            //repeat: -1                
        });


        

        this.player = new Player(this, 50, 420, 'playeridle').setOrigin(0).setScale(3).play('playeridle')
        
        //.play('player')

        this.cursors = this.input.keyboard.createCursorKeys();
        this.FKey = this.input.keyboard.addKey('F');


         

        //let moveDirection = new Phaser.Math.Vector2(0, 0)

        //var facingLeft = true;

    }

    update(){

        let velocityX = 0;
        let velocityY = 0;

        if (this.cursors.right.isDown) {
            velocityX += 1;
            this.player.flipX = true;
            this.player.anims.play('playerRun', true);
        } else if (this.cursors.left.isDown) {
            velocityX -= 1;
            this.player.flipX = false;
            this.player.anims.play('playerRun', true);
        }

        if (this.cursors.down.isDown) {
            velocityY += 1;
            this.player.anims.play('playerRun', true);
        } else if (this.cursors.up.isDown) {
            velocityY -= 1;
            this.player.anims.play('playerRun', true);
        }

        if (velocityX !== 0 || velocityY !== 0) {
            const speed = 100; // Adjust the speed as needed
            const totalVelocity = new Phaser.Math.Vector2(velocityX, velocityY).normalize().scale(speed);

            this.player.body.setVelocity(totalVelocity.x, totalVelocity.y);
        } else {
            this.player.body.setVelocity(0, 0);
            if (this.FKey.isDown != true){
                this.player.anims.play('playeridle', true);
            }
        }


        
        
        if (this.FKey.isDown ) {
            //const currentTime = this.time.now;
            this.player.body.setVelocity(0, 0);
            this.player.anims.play('playerpunch', true);
            
        }
        
        

        



            

        
        

        
        
        
        

    }

}