class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setSize(this.width/2, this.height/2)
        this.body.setCollideWorldBounds(true)
    }

    update(){

    }

    runRight(){
        this.body.setVelocityX(50);

    }

    runLeft(){
        this.body.setVelocityX(-50);

    }

    runUp(){
        this.body.setVelocityY(50);


    }

    runDown(){
        this.body.setVelocityY(50);


    }


}