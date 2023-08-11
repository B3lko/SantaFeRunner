import { AnimatedSprite, Container, Graphics, Rectangle, Texture } from "pixi.js";

export class Player extends Container{

    Animation: AnimatedSprite = new AnimatedSprite([
        Texture.from("Run1"),
        Texture.from("Run2"),
        Texture.from("Run3"),
        Texture.from("Run4"),
        Texture.from("Run5"),
        Texture.from("Run6"),
        Texture.from("Run7")
        
    ], true);

    JumpUp: AnimatedSprite = new AnimatedSprite([Texture.from("Jump1")], true);
    JumpMax: AnimatedSprite = new AnimatedSprite([Texture.from("Jump2")], true);
    JumpDown: AnimatedSprite = new AnimatedSprite([Texture.from("Jump3")], true);

    Run: AnimatedSprite = new AnimatedSprite([
        Texture.from("Run1"),
        Texture.from("Run2"),
        Texture.from("Run3"),
        Texture.from("Run4"),
        Texture.from("Run5"),
        Texture.from("Run6"),
        Texture.from("Run7")
        
    ], true);

    Roll: AnimatedSprite = new AnimatedSprite([
        Texture.from("Roll1"),
        Texture.from("Roll2"),
        Texture.from("Roll3"),
        Texture.from("Roll4"),
        Texture.from("Roll5"),
        Texture.from("Roll6"),
        Texture.from("Roll7")
        
    ], true);
    
    jumpspeed = 15; //10
    isJumping = false;
    isDown = false;
    isRolling = false;

    XLR8 = 0.75;
    Speed2 = 0;

    floor = 480;
    jumph = 50;

    gameSpeed = 20;

    scrollStart: number = 0;
    scrollDurationMS :number= 200;
    public hitbox:Graphics;
    constructor(){
        super();


    this.Animation.scale.set(4);
    //this.JumpUp.scale.set(4);
    //this.JumpDown.scale.set(4);

        this.hitbox = new Graphics;
        this.hitbox.beginFill(0xFF00FF,0.3);
        this.hitbox.drawRect(48+16,48,96-16-16-8,96+16);
        this.hitbox.endFill();
        //this.Animation = this.Run;
        //this.JumpUp.
        this.Animation.play();
        //this.Roll.play();
        //this.Roll.
        //this.Jump.scale.set(4);

        //this.Jump
        //this.addChild(this.hitbox);
        this.addChild(this.JumpUp);
        this.addChild(this.JumpDown);
        this.addChild(this.Animation);
        this.addChild(this.hitbox);
        this.addChild(this.Roll);

        //this.Roll.loop = false;

        this.Roll.visible = false;
        this.JumpDown.visible = false;
        this.JumpUp.visible = false;
        //this.Jump.set
    }

    public update(_deltaTime:number/* ,_deltaFrame:number */){

        this.gameSpeed +=1.1;
        //this.Animation.play();
        if(this.isJumping){this.jump();}

        if(this.isJumping && this.position.y <= this.jumph){
            this.isJumping = false;
            this.isDown =  true;
            this.JumpUp.visible =false;
            this.JumpDown.visible = true;
            //this.Animation.stop();
            //this.Animation = this.JumpDown;
            this.Animation.play();
        }
        if(this.isRolling && this.scrollStart < Date.now() - this.scrollDurationMS){ 
            //console.log("Si");
          //  if(this.Roll.play(onComplete){
                this.isRolling = false;
                this.Animation.visible = true;
                this.Roll.visible = false;
                
           // }/
        }

        if(this.isDown){this.down();}

         
        if(this.position.y >= this.floor && this.isDown){
            this.isDown = false;
            this.Animation.visible = true;
            this.JumpDown.visible = false;
            //this.Animation.stop();
           // this.Animation = this.Run;
           //this.Animation.play();
        }


        //this.on("touchstart",this.onTouchStart,this);
       // this.interactive = true;
    }


    public fRoll():void{
        if(!this.isJumping){
            this.Roll.play();
            this.isRolling = true;
            this.Animation.visible = false;
            this.Roll.visible = true;

            this.scrollStart = Date.now();
        }
    }

    public onTouchStart():void{
        if(!this.isJumping && !this.isRolling){
            this.Speed2 = this.jumpspeed;
            this.isJumping = true;
            this.Animation.visible = false;
            this.JumpUp.visible = true;
            
            //this.Animation.stop();
           // this.Animation = this.JumpDown;
           // this.Animation.play();
            //this.Run.stop();
            //this.Jump.play();
        }


    }
public getHitbox():Rectangle{
    return this.hitbox.getBounds();
}
    private jump():void{
        this.Speed2 += this.XLR8;// + this.gameSpeed;
        this.y -= this.Speed2; //* this.gameSpeed;
    }

    private down():void{
        this.Speed2 += this.XLR8;
        this.y += this.Speed2;//+ * this.gameSpeed;
    }

}