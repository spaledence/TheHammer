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
        this.load.image('life', 'imgs/playerlife.png')

        this.load.atlas('playerRun', 'imgs/playerrun.png', 'imgs/playerrun.json')
        this.load.atlas('hammer', 'imgs/hammer.png', 'imgs/hammer.json')
        this.load.atlas('playeridle', 'imgs/playeridle.png', 'imgs/playeridle.json')
        this.load.atlas('playerpunch', 'imgs/playerpunch.png', 'imgs/playerpunch.json')
        this.load.atlas('hammeridle', 'imgs/hammeridle.png', 'imgs/hammeridle.json')
        this.load.atlas('hammerpunch', 'imgs/hammerpunch.png', 'imgs/hammerpunch.json')
        this.load.atlas('hammerwalk', 'imgs/hammerwalk.png', 'imgs/hammerwalk.json')

        this.load.bitmapFont('retro', '/text/retro.png', '/text/retro.xml')

        this.load.audio('hammerhit', '/sounds/hammerhit.wav')
        this.load.audio('playerhit', '/sounds/playerhit.wav')





    }

    create(){

        this.background = this.add.tileSprite(0, 0, 0, 0, 'background').setOrigin(0)
        this.life1 = this.add.image(50, 50, 'life').setScale(2)
        this.life2 = this.add.image(100, 50, 'life').setScale(2)
        this.life3 = this.add.image(150, 50, 'life').setScale(2)

        this.hammerHP = 100;

        this.hpText = this.add.bitmapText(game.config.width - 200, game.config.height / 8 - 30, 'retro', this.hammerHP, 30).setOrigin(0.5)



        //this.background.setScale(3)

        //player anims

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

        //hammer anims

        this.anims.create({
            key: 'hammeridle',
            frames: this.anims.generateFrameNames('hammeridle', {
                prefix: 'hammeridle',  // Prefix for each frame name in the atlas
                start: 1,                  
                end: 2,                   
            }),
            frameRate: 3,             
            repeat: -1                
        });

        this.anims.create({
            key: 'hammerpunch',
            frames: this.anims.generateFrameNames('hammerpunch', {
                prefix: 'hammerpunch',  // Prefix for each frame name in the atlas
                start: 1,                  
                end: 2,                   
            }),
            frameRate: 1,             
            repeat: 0                
        });

        this.anims.create({
            key: 'hammerwalk',
            frames: this.anims.generateFrameNames('hammerwalk', {
                prefix: 'hammerwalk',  // Prefix for each frame name in the atlas
                start: 1,                  
                end: 4,                   
            }),
            frameRate: 3,             
            repeat: -1                
        });


        
        this.hammer = new Hammer(this, 420, 420, 'hammeridle').setOrigin(0).setScale(3).play('hammeridle')
        this.player = new Player(this, 50, 420, 'playeridle').setOrigin(0).setScale(3).play('playeridle')
        
        //.play('player')

        this.cursors = this.input.keyboard.createCursorKeys();
        this.FKey = this.input.keyboard.addKey('F');


        this.hammerCanMove = true;

        //this.physics.add.collider(this.player, this.hammer)


        this.physics.add.overlap(this.player, this.hammer, () => {
            if (this.hammer.anims.currentAnim.key === 'hammerpunch' && this.hammer.anims.currentFrame.index === 2) {
                // Reset player's position
                this.player.setPosition(50, 420);
                this.hammer.setPosition(420, 420)
                this.sound.play('hammerhit')
                if (this.life3.visible == true){
                    this.life3.visible = false
                }
                else if(this.life2.visible == true){
                    this.life2.visible = false
                }
                else if(this.life1.visible == true){
                    this.life1.visible = false
                    this.scene.start("gameoverScene")
                }
                

                
            }
            if (this.player.anims.currentAnim.key === 'playerpunch' && !this.hitRegistered){
                this.hammerHP--;
                console.log(this.hammerHP);
                this.sound.play('playerhit')
                this.hitRegistered = true; // Set the flag to true to indicate the hit has been registered
            }
            
            // Reset the hitRegistered flag when the punch animation ends
            if (this.player.anims.currentAnim.key !== 'playerpunch' && this.hitRegistered){
                this.hitRegistered = false;
            }
        });
        

        //let moveDirection = new Phaser.Math.Vector2(0, 0)

        //var facingLeft = true;

    }

    update(){

        this.hpText.setText('Hammer Health: ' + this.hammerHP);

        //gameover
        if (this.hammerHP == 0){
            this.scene.start('gameoverScene')
        }

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

        if (this.hammerCanMove == true) {
            const directionX = this.player.x - this.hammer.x;
            const directionY = this.player.y - this.hammer.y;
            const distance = Math.sqrt(directionX * directionX + directionY * directionY);
            //console.log(distance)
        
            // Normalize the direction vector
            const normalizedDirectionX = directionX / distance;
            const normalizedDirectionY = directionY / distance;
        
            //later, i should adjust the movement of the hammer to scale based on how far away he is from the players x, y
            // Move the hammer towards the player at a speed of 50, but only if it is more than 120 pixels away
            if (Math.abs(directionX) > 110 || Math.abs(directionY) > 20) {
                //console.log(Math.abs(directionX))
                //console.log(Math.abs(directionY))
                this.hammer.body.setVelocity(normalizedDirectionX * 50, normalizedDirectionY * 50);
                this.hammer.anims.play('hammerwalk', true)
                if (this.hammer.x < this.player.x ){
                    this.hammer.flipX = true;
                }
                else{
                    this.hammer.flipX = false;
                }
            } else {
                this.hammer.body.setVelocity(0, 0);
                this.hammer.anims.play('hammerpunch', true)
                this.hammer.body.setSize(this.hammer.width, this.hammer.height/1.5)
                this.hammerCanMove = false;

                
                
                this.time.delayedCall(3000, () => {
                    this.hammerCanMove = true;
                    this.hammer.body.setSize(this.hammer.width/1.5, this.hammer.height/1.5)

                });

                
            }
        }
        
    }

}