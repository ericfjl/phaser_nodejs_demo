class Example2 extends Phaser.Scene {
    constructor() {
        super({ key: "Example2" });
    }
    create() {
        this.text = this.add.text(0, 0, "Example2 welcome you!", { font: "40px Impact" });


        var tween = this.tweens.add({
            targets: this.text,
            x: 200,
            y: 300,
            duration: 2000,
            ease: "Elastic",
            easeParams: [1.5, 1],
            delay: 1000,
            onComplete:function(src,tg){
                tg[0].x = 0;
                tg[0].y = 0;
                tg[0].setColor("Red");
            }
        });

        this.key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    }
    update(delta)
    {
        if(this.key_1.isDown)
        {
            this.scene.start("Example1");
        }
    }
}