class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this);
        scene.physics.add.existing(this);
        //this.body.setImmovable(true)
        this.body.setSize(this.width/2.5, this.height/2.5)
        this.body.setOffset(20, 25)
        this.body.setCollideWorldBounds(true)
    }

    update(){

    }



}