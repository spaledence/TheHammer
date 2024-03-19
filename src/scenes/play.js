class Play extends Phaser.Scene {
    constructor(){
        super('playScene')
        this.lastPunchTime = 0;
        this.isPunching = false;
        

    }

    preload() {
        //add assets
        this.load.path = './assets/'
        this.load.image('background', 'imgs/bg2.png')
        this.load.image('life', 'imgs/playerlife.png')
        this.load.image('chair', 'imgs/chair.png')

        this.load.atlas('playerRun', 'imgs/playerrun.png', 'imgs/playerrun.json')
        this.load.atlas('playeridle', 'imgs/playeridle.png', 'imgs/playeridle.json')
        this.load.atlas('playerpunch', 'imgs/playerpunch.png', 'imgs/playerpunch.json')
        this.load.atlas('hammeridle', 'imgs/hammeridle.png', 'imgs/hammeridle.json')
        this.load.atlas('hammerpunch', 'imgs/hammerpunch.png', 'imgs/hammerpunch.json')
        this.load.atlas('hammerwalk', 'imgs/hammerwalk.png', 'imgs/hammerwalk.json')
        this.load.atlas('dead', 'imgs/dead.png', 'imgs/dead.json')


        this.load.bitmapFont('retro', '/text/retro.png', '/text/retro.xml')
        this.load.bitmapFont('retro2', '/text/retroYellow.png', '/text/retroYellow.xml')


        this.load.audio('hammerhit', '/sounds/hammerhit.wav')
        this.load.audio('playerhit', '/sounds/playerhit.wav')

        

        this.load.atlas('chairwalk', 'imgs/chairwalk.png', 'imgs/chairwalk.json')
        this.load.atlas('chairidle', 'imgs/chairidle.png', 'imgs/chairidle.json')
        this.load.atlas('chairhit', 'imgs/chairhit.png', 'imgs/chairhit.json')






    }

    create(){

        this.punch1 = true;

        this.background = this.add.image(0, 0, 'background').setOrigin(0).setScale(.5)
        this.life1 = this.add.image(50, 50, 'life').setScale(2)
        this.life2 = this.add.image(100, 50, 'life').setScale(2)
        this.life3 = this.add.image(150, 50, 'life').setScale(2)
       
        let chairs = []
        //make chairs
        this.chair1 = this.physics.add.staticSprite(200, 250, 'chair').setSize(60, 60).setScale(3)
        this.chair1.body.setOffset(0,70)
        

        this.chair2 = this.physics.add.staticSprite(100, 500, 'chair').setSize(60, 60).setScale(3)
        this.chair2.body.setOffset(0,70)

        this.chair3 = this.physics.add.staticSprite(800, 250, 'chair').setSize(60, 60).setScale(3)
        this.chair3.flipX = true;
        this.chair3.body.setOffset(0,70)

        this.chair4 = this.physics.add.staticSprite(900, 500, 'chair').setSize(60, 60).setScale(3)
        this.chair4.flipX = true;

        this.chair4.body.setOffset(0,70)

        chairs.push(this.chair1);
        chairs.push(this.chair2);
        chairs.push(this.chair3);
        chairs.push(this.chair4);

        this.hammerHP = 100;


        this.hpText = this.add.bitmapText(game.config.width - 450, game.config.height / 8 - 30, 'retro2', this.hammerHP, 30).setOrigin(0.5)


       
      
        

        
        let points = [
            { x: 10, y:618 },
            { x: 170, y: 302 },
            { x: 160, y: 302 },
            { x: 0, y: 618 }

            //-50, 470, 75, 150

        ];
        

        //chair anims
        this.anims.create({
            key: 'chairwalk',
            frames: this.anims.generateFrameNames('chairwalk', {
                prefix: 'chairwalk',  // Prefix for each frame name in the atlas
                start: 1,                  
                end: 4,                   
            }),
            frameRate: 5,             
            repeat: -1                
        });

        this.anims.create({
            key: 'chairidle',
            frames: this.anims.generateFrameNames('chairidle', {
                prefix: 'chairidle',  // Prefix for each frame name in the atlas
                start: 1,                  
                end: 2,                   
            }),
            frameRate: 3,             
            repeat: -1                
        });

        this.anims.create({
            key: 'chairhit',
            frames: this.anims.generateFrameNames('chairhit', {
                prefix: 'chairhit',  // Prefix for each frame name in the atlas
                start: 1,                  
                end: 2,                   
            }),
            frameRate: 5,             
            repeat: 0               
        });



        //player anims

        this.anims.create({
            key: 'dead',
            frames: this.anims.generateFrameNames('dead', {
                prefix: 'dead',  // Prefix for each frame name in the atlas
                start: 1,                  
                end: 3,                   
            }),
            frameRate: 5,             
            repeat: 0                
        });

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


        
        this.hammer = new Hammer(this, 400, 400, 'hammeridle').setOrigin(0).setScale(3).play('hammeridle')
        this.player = new Player(this, 50, 420, 'playeridle').setOrigin(0).setScale(3).play('playeridle')
        this.invisibleBody = this.physics.add.sprite(440, 475).setSize(100, 60).setOrigin(0)
        this.invisibleBody2 = this.physics.add.sprite(440, 475).setSize(60, 30).setOrigin(0)
        this.invisibleBody3 = this.physics.add.sprite(440, 475).setSize(80, 100).setOrigin(0)
        
        

        //.play('player')

        this.cursors = this.input.keyboard.createCursorKeys();
        this.FKey = this.input.keyboard.addKey('F');
        this.EKey = this.input.keyboard.addKey('E');


        this.hammerCanMove = true;
        let playerHit = false;


        //this.isRespawning = false;

        //this.physics.add.collider(this.player, this.hammer)
        this.chairHolding = false;

        
        this.physics.add.overlap(this.player, chairs, (player, chair) => {
            if (this.EKey.isDown){
                this.chairHolding = true;
                this.player.anims.play('chairidle', true);
                chair.destroy()
            }


        });
        

        this.physics.add.overlap(this.player, this.invisibleBody, () => {
            if (this.hammer.anims.currentAnim.key === 'hammerpunch' && this.hammer.anims.currentFrame.index === 2 && !playerHit) {
                //this.player.anims.stop()
                //this.player.anims.play('dead', true).once('animationcomplete', () => {
                    /*
                    this.time.delayedCall(1000, () => {
                        this.player.setPosition(50, 420);
                        this.isRespawning = false; // Reset the respawn flag
                        */
                
                playerHit = true;
                let boom = this.add.sprite(this.player.x+40, this.player.y+40, 'dead').setOrigin(0, 0).setScale(2);
                this.player.setVisible(false);
                boom.anims.play('dead', true)
                boom.on('animationcomplete', () => {
                    if (this.player.x >= this.hammer.x){
                        this.player.setPosition(50,420);
                    }
                    else{
                        this.player.setPosition(750,420);

                    }
                    this.chairHolding = false;
                    this.player.setVisible(true);
                    this.hammer.setPosition(400, 400)

                    boom.destroy();
                    playerHit = false;
                })
   
                    
                
                this.invisibleBody.setPosition(this.hammer.x+20, this.hammer.y+75);
                this.sound.play('hammerhit')
                if (this.life3.visible == true){
                    this.life3.visible = false
                }
                else if(this.life2.visible == true){
                    this.life2.visible = false
                }
                else if(this.life1.visible == true){
                    this.life1.visible = false
                    this.scene.start('gameoverScene', { hammerHP: this.hammerHP });
                }
            }

        });

        let collisionBoxes = [];

        // Add all collision boxes to the array
        collisionBoxes.push(this.physics.add.staticSprite(500, 640).setSize(900, 50).setOrigin(0));
        collisionBoxes.push(this.physics.add.staticSprite(500, 200).setSize(640, 50).setOrigin(0));
        collisionBoxes.push(this.physics.add.staticSprite(-15, 300).setSize(50, 500).setOrigin(0));
        collisionBoxes.push(this.physics.add.staticSprite(0, 300).setSize(50, 450).setOrigin(0));
        collisionBoxes.push(this.physics.add.staticSprite(15, 300).setSize(50, 400).setOrigin(0));
        collisionBoxes.push(this.physics.add.staticSprite(30, 300).setSize(50, 350).setOrigin(0));
        collisionBoxes.push(this.physics.add.staticSprite(45, 300).setSize(50, 300).setOrigin(0));
        collisionBoxes.push(this.physics.add.staticSprite(60, 300).setSize(50, 250).setOrigin(0));
        collisionBoxes.push(this.physics.add.staticSprite(75, 300).setSize(50, 200).setOrigin(0));
        collisionBoxes.push(this.physics.add.staticSprite(90, 300).setSize(50, 150).setOrigin(0));
        collisionBoxes.push(this.physics.add.staticSprite(105, 300).setSize(50, 100).setOrigin(0));
        collisionBoxes.push(this.physics.add.staticSprite(120, 280).setSize(50, 50).setOrigin(0));
        collisionBoxes.push(this.physics.add.staticSprite(140, 230).setSize(30, 30).setOrigin(0));
        collisionBoxes.push(this.physics.add.staticSprite(150, 220).setSize(30, 30).setOrigin(0));


        collisionBoxes.push(this.physics.add.staticSprite(970, 320).setSize(30, 450).setOrigin(0));
        collisionBoxes.push(this.physics.add.staticSprite(960, 320).setSize(30, 400).setOrigin(0));
        collisionBoxes.push(this.physics.add.staticSprite(950, 320).setSize(30, 350).setOrigin(0));
        collisionBoxes.push(this.physics.add.staticSprite(940, 320).setSize(30, 300).setOrigin(0));
        collisionBoxes.push(this.physics.add.staticSprite(930, 320).setSize(30, 250).setOrigin(0));
        collisionBoxes.push(this.physics.add.staticSprite(920, 320).setSize(30, 150).setOrigin(0));
        collisionBoxes.push(this.physics.add.staticSprite(910, 320).setSize(30, 100).setOrigin(0));
        collisionBoxes.push(this.physics.add.staticSprite(900, 320).setSize(30, 50).setOrigin(0));
        collisionBoxes.push(this.physics.add.staticSprite(880, 230).setSize(30, 30).setOrigin(0));
        collisionBoxes.push(this.physics.add.staticSprite(860, 220).setSize(30, 30).setOrigin(0));



        // Add a collider between the player and the group of collision boxes
        this.physics.add.collider(this.player, collisionBoxes, () => {
            //console.log("Collision with one of the collision boxes detected!");
        });


        

        this.physics.add.collider(this.player, this.graphics)

        //this.hitRegistered = false;
        this.physics.add.overlap(this.invisibleBody2, this.hammer, () => {
            if (this.player.anims.currentAnim.key === 'playerpunch' && !this.hitRegistered){
                this.hammerHP--;
                //console.log(this.hammerHP);
                this.sound.play('playerhit')
                this.hitRegistered = true; // Set the flag to true to indicate the hit has been registered
            }
            
            // Reset the hitRegistered flag when the punch animation ends
            if (this.player.anims.currentAnim.key !== 'playerpunch' && this.hitRegistered){
                this.hitRegistered = false;
            }
        });

        this.physics.add.overlap(this.invisibleBody3, this.hammer, () => {
            if(this.player.anims.currentAnim.key === 'chairhit'  && this.player.anims.currentFrame.index === 2 && !this.hitRegistered2){
                this.hammerHP -= 25;
                this.sound.play('hammerhit');
                this.hitRegistered2 = true;
                this.time.delayedCall(500, () => {
                    this.chairHolding = false;
                });
            }
            if (this.player.anims.currentAnim.key !== 'chairhit'  && this.hitRegistered2){
                this.hitRegistered2 = false;
            }

        });
        
        


    }

    update(){

        this.hpText.setText('Hammer Health: ' + this.hammerHP);

        if (this.hammer.anims.currentAnim.key === 'hammerpunch') {
            // If the physics sprite has not been created yet, create it
            if (this.hammer.flipX == false){
                this.invisibleBody.setPosition(this.hammer.x+30, this.hammer.y+75);
                this.physicsSpriteCreated = true;
            }
            else{
                this.invisibleBody.setPosition(this.hammer.x+130, this.hammer.y+75);
                this.physicsSpriteCreated = true;
            }
            

        // If the physics sprite has been created, destroy it and reset the flag
            if (this.physicsSpriteCreated) {
                //this.invisibleBody.destroy();
                this.physicsSpriteCreated = false;
            }
        }


        


        //gameover
        if (this.hammerHP <= 0){
            this.scene.start('gameoverScene', { hammerHP: this.hammerHP });

        }

        let velocityX = 0;
        let velocityY = 0;

        
        /////////
        //chairwalk
        ///////////
        if (this.cursors.right.isDown && !this.FKey.isDown && this.chairHolding) {
            velocityX += 1;
            this.player.flipX = true;
            this.player.anims.play('chairwalk', true);
        } else if (this.cursors.left.isDown && !this.FKey.isDown && this.chairHolding) {
            velocityX -= 1;
            this.player.flipX = false;
            this.player.anims.play('chairwalk', true);
        }

        if (this.cursors.down.isDown && !this.FKey.isDown && this.chairHolding) {
            velocityY += 1;
            this.player.anims.play('chairwalk', true);
        } else if (this.cursors.up.isDown && !this.FKey.isDown && this.chairHolding) {
            velocityY -= 1;
            this.player.anims.play('chairwalk', true);
        }

        if (velocityX !== 0 || velocityY !== 0) {
            const speed = 100; // Adjust the speed as needed
            const totalVelocity = new Phaser.Math.Vector2(velocityX, velocityY).normalize().scale(speed);

            this.player.body.setVelocity(totalVelocity.x, totalVelocity.y);
            //this.invisibleBody.body.setVelocity(totalVelocity.x, totalVelocity.y)
        } else {
            this.player.body.setVelocity(0, 0);
            if (this.FKey.isDown != true && this.chairHolding){
                this.player.anims.play('chairidle', true);
            }
        }


        /////////
        //normal walk
        ////////
        if (this.cursors.right.isDown && !this.FKey.isDown && !this.chairHolding) {
            velocityX += 1;
            this.player.flipX = true;
            this.player.anims.play('playerRun', true);
        } else if (this.cursors.left.isDown && !this.FKey.isDown && !this.chairHolding) {
            velocityX -= 1;
            this.player.flipX = false;
            this.player.anims.play('playerRun', true);
        }

        if (this.cursors.down.isDown && !this.FKey.isDown && !this.chairHolding) {
            velocityY += 1;
            this.player.anims.play('playerRun', true);
        } else if (this.cursors.up.isDown && !this.FKey.isDown && !this.chairHolding) {
            velocityY -= 1;
            this.player.anims.play('playerRun', true);
        }

        if (velocityX !== 0 || velocityY !== 0) {
            const speed = 100; // Adjust the speed as needed
            const totalVelocity = new Phaser.Math.Vector2(velocityX, velocityY).normalize().scale(speed);

            this.player.body.setVelocity(totalVelocity.x, totalVelocity.y);
            //this.invisibleBody.body.setVelocity(totalVelocity.x, totalVelocity.y)
        } else {
            this.player.body.setVelocity(0, 0);
            if (this.FKey.isDown != true && !this.chairHolding){
                this.player.anims.play('playeridle', true);
            }
        }
        
        


        if (this.FKey.isDown && this.chairHolding && !this.prevFkeyState2 && !this.playerIsHittingWithChair) {
            // Set the flag to true to prevent multiple chair hits
            this.playerIsHittingWithChair = true;
            this.prevFKeyState2 = true;
            // Play the chair hit animation
            this.player.anims.play('chairhit', true);

            // Set the position of the invisible body
            if (this.player.flipX) {
                this.invisibleBody3.setPosition(this.player.x + 120, this.player.y + 110);
            } else {
                this.invisibleBody3.setPosition(this.player.x + 40, this.player.y + 110);
            }

            

            // Optional: Add a delay before resetting the flag to allow the animation to finish
            
        }
        else if (!this.FKey.isDown) {
            this.prevFKeyState2 = false; // Reset previous F key state
            this.playerIsHittingWithChair = false; // Reset playerIsPunching when the F key is released
        }

        

        

        if (this.FKey.isDown && !this.prevFKeyState && !this.chairHolding && !this.playerIsPunching) {
            this.prevFKeyState = true;
            this.playerIsPunching = true; // Set playerIsPunching to true to prevent multiple punches
            // Play punch animation based on the current frame
            if (this.punch1) {
                this.player.anims.play('playerpunch', true).setFrame('playerpunch1');
            } else {
                this.player.anims.play('playerpunch', true).setFrame('playerpunch2');
            }
            this.punch1 = !this.punch1; // Toggle punch1 
        
            if (this.player.flipX) {
                // Player is facing right, spawn to the right
                this.invisibleBody2.setPosition(this.player.x + 120, this.player.y + 110);
            } else {
                // Player is facing left, spawn to the left
                this.invisibleBody2.setPosition(this.player.x + 40, this.player.y + 110);
            }
        
            this.player.anims.pause();
            this.time.delayedCall(10000, () => {
                this.player.anims.resume();
            });
        } else if (!this.FKey.isDown) {
            this.prevFKeyState = false; // Reset previous F key state
            this.playerIsPunching = false; // Reset playerIsPunching when the F key is released
        }

        if (this.hammerCanMove == true) {
            const directionX = this.player.x - this.hammer.x;
            const directionY = this.player.y - this.hammer.y;
            const distance = Math.sqrt(directionX * directionX + directionY * directionY);
            const requiredDistanceX = 90; // Adjust as needed
            const requiredDistanceY = 10; // Adjust as needed
        
            // Calculate the distance differences
            const distanceDiffX = Math.abs(directionX) - requiredDistanceX;
            const distanceDiffY = Math.abs(directionY) - requiredDistanceY;
        
            // Calculate the proportional speed
            const speedX = (distanceDiffX > 0) ? Math.sign(directionX) * Math.min(Math.abs(distanceDiffX), 50) : 0;
            const speedY = (distanceDiffY > 0) ? Math.sign(directionY) * Math.min(Math.abs(distanceDiffY), 50) : 0;
        
            // Move the hammer
            this.hammer.body.setVelocity(speedX, speedY);
        
            // Update hammer direction
            if (this.hammer.x < this.player.x) {
                this.hammer.flipX = true;
            } else if (this.hammer.x > this.player.x) {
                this.hammer.flipX = false;
            }
        
            // Check if the hammer is close enough to trigger the punch animation
            if (Math.abs(directionX) <= 110 && Math.abs(directionY) <= 24) {
                this.hammer.body.setVelocity(0, 0);
                this.hammer.anims.play('hammerpunch', true);
                this.hammerCanMove = false;
        
                this.time.delayedCall(2000, () => {
                    this.hammerCanMove = true;
                    this.hammer.body.setSize(this.hammer.width / 1.5, this.hammer.height / 1.5);
                });
            } 
            else if (Math.abs(directionX) <= 140 && Math.abs(directionY) <= 60 && (this.hammer.y) <= -20){
                this.hammer.body.setVelocity(0, 0)
                this.hammer.anims.play('hammerpunch', true);
                this.hammerCanMove = false;
        
                this.time.delayedCall(2000, () => {
                    this.hammerCanMove = true;
                    this.hammer.body.setSize(this.hammer.width / 1.5, this.hammer.height / 1.5);
                });
            } 
                
            else {
                // Play walk animation if not close enough for punch animation
                this.hammer.anims.play('hammerwalk', true);
                



            }
        }
        
    }

}