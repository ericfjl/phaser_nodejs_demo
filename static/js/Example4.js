class Example4 extends Phaser.Scene {
    constructor() {
        super({ key: "Example4" });
    }

    preload() {

        // this.game.load.spritesheet('balls', 'assets/sprites/balls.png', 17, 17);
        this.load.spritesheet('balls','assets/balls.png',17,17);

    }
    create() {

        this.game.stage.backgroundColor = '#124184';
    

        this.handle1 = this.game.add.sprite(100, 200, 'balls', 0);
        this.handle1.anchor.set(0.5);
        this.handle1.inputEnabled = true;
        this.handle1.input.enableDrag(true);

        this.handle2 = this.game.add.sprite(400, 300, 'balls', 0);
        this.handle2.anchor.set(0.5);
        this.handle2.inputEnabled = true;
        this.handle2.input.enableDrag(true);

        this.handle3 = this.game.add.sprite(200, 400, 'balls', 1);
        this.handle3.anchor.set(0.5);
        this.handle3.inputEnabled = true;
        this.handle3.input.enableDrag(true);

        this.handle4 = this.game.add.sprite(500, 500, 'balls', 1);
        this.handle4.anchor.set(0.5);
        this.handle4.inputEnabled = true;
        this.handle4.input.enableDrag(true);

        this.line1 = new Phaser.Line(this.handle1.x, this.handle1.y, this.handle2.x, this.handle2.y);
        this.line2 = new Phaser.Line(this.handle3.x, this.handle3.y, this.handle4.x, this.handle4.y);


        this.c = 'rgb(255,255,255)';
        this.p = new Phaser.Point();

    }

    update(data) {

        this.line1.fromSprite(this.handle1, this.handle2, false);
        this.line2.fromSprite(this.handle3, this.handle4, false);

        this.p = this.line1.intersects(this.line2, true);

        if (this.p) {
            this.c = 'rgb(0,255,0)';
        }
        else {
            this.c = 'rgb(255,255,255)';
        }

    }

    render() {

        this.game.debug.geom(this.line1, this.c);
        this.game.debug.geom(this.ine2, this.c);

        this.game.debug.lineInfo(this.line1, 32, 32);
        this.game.debug.lineInfo(this.line2, 32, 100);

        if (this.p) {
            this.game.context.fillStyle = 'rgb(255,0,255)';
            this.game.context.fillRect(this.p.x - 2, this.p.y - 2, 5, 5);
        }

        this.game.debug.text("Drag the handles", 32, 550);

    }
}