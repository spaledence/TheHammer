class Hammer extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x , y, texture, frame){
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        scene.physics.add.existing(this)

        this.body.setSize(this.width/1.5, this.height/1.5)
        this.body.setCollideWorldBounds(true)
        this.body.setImmovable(true)
        //this.body.setAllowGravity(false)

    }

    update(){
    }

}