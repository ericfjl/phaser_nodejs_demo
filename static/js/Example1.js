class Example1 extends Phaser.Scene {
    constructor() {
        super({ key: "Example1" });
    }
    preload() {
        this.load.image('tree', 'assets/tree1.png');
    }
    create() {
        this.image = this.add.image(400, 300, 'tree');

        this.input.keyboard.on('keyup_D', function keyup_D(params) {
            this.image.x += 10;

        }, this);
        this.key_A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        this.input.on('pointerdown', function (event) {
            this.image.x = event.x;
            this.image.y = event.y;
        }, this);
        this.input.keyboard.on('keyup_P', function keyup_P(params) {
            var physicsImage = this.physics.add.image(this.image.x, this.image.y, "tree");
            physicsImage.setVelocity(Phaser.Math.RND.integerInRange(-100, 100), -300);
        }, this);

        this.input.keyboard.on('keyup', function keyup(e) {
            if (e.key == "2") {
                this.scene.start("Example2");
            } else if (e.key == "3") {
                this.scene.start("Example3");
            } else if (e.key == "4") {
                this.scene.start("Example4");ß
            }
        }, this);
    }
    update(data) {
        if (this.key_A.isDown) {
            this.image.x--;
        }
    }
}