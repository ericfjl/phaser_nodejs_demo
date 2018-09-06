class Example3 extends Phaser.Scene{
    constructor(){
        super({key:"Example3"});
    }
    preload(){
        this.load.audio('bbmm',['assets/bbmm.mp3']);
    }
    create(){
        this.key_1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);

        this.soundBM = this.sound.add('bbmm',{loop:true});
        this.soundBM.play();
        this.soundBM.rate = 0.9;

        this.input.keyboard.on("keydown_L",function(e){
            this.soundBM.loop = !this.soundBM.loop;
            if(this.soundBM.loop)
            {
                this.soundBM.play();
            }else{
                this.soundBM.stop();
            }
        },this);

        this.input.keyboard.on("keydown_P",function(e){
            if(this.soundBM.isPlaying){
                this.soundBM.pause();
            }else{
                this.soundBM.resume();
            }
        },this);
    
    }
    update(data)
    {
        if(this.key_1.isDown)
        {
            this.scene.start("Example1");
            this.soundBM.stop();
        }
    }
}