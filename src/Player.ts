import { Container, Graphics, Rectangle, Texture } from "pixi.js";
import { StateAnimation } from "./StateAnimation";

export class Player extends Container{
 
    public Cacho: StateAnimation;

    jumpspeed = 15;
    isJumping = false;
    isDown = false;
    isRolling = false;
    XLR8 = 0.01;
    Speed2 = 0;
    floor = 480;
    jumph = 50;
    gameSpeed = 20;

    scrollStart: number = 0;
    scrollDurationMS :number = 2500;
    public hitbox:Graphics = new Graphics();
    public hitboxRolling:Graphics;
    public hitboxNormal:Graphics;


    constructor(){
        super();

        //HitBox
        this.hitboxNormal = new Graphics;
        this.hitboxNormal.beginFill(0xFF0000,0.3);
        this.hitboxNormal.drawRect(64,48,56,112);
        this.hitboxNormal.endFill();
        //this.addChild(this.hitboxNormal);
        this.hitboxNormal.visible = false;

        this.hitboxRolling = new Graphics;
        this.hitboxRolling.beginFill(0x0000FF,0.3);
        this.hitboxRolling.drawRect(64,80,56,64);
        this.hitboxRolling.endFill();
        this.hitboxRolling.visible = false;
       // this.addChild(this.hitboxRolling);
        this.hitbox.visible = false;

        //this.hitbox = this.hitboxNormal;
        this.hitbox = new Graphics();
        this.hitbox = this.hitboxNormal.clone();
        this.hitbox.visible = false;
        this.addChild(this.hitbox);
        
        //this.hitbox.clear;
        //this.hitbox = this.hitboxNormal;

        //Animations
        this.Cacho = new StateAnimation();
        this.Cacho.addState("JumpDown",[Texture.from("Jump3")]);
        this.Cacho.addState("JumpUp",[Texture.from("Jump1")]);
        this.Cacho.addState("Run",[
            Texture.from("Run1"),
            Texture.from("Run2"),
            Texture.from("Run3"),
            Texture.from("Run4"),
            Texture.from("Run5"),
            Texture.from("Run6"),
            Texture.from("Run7")
            
        ]);
        this.Cacho.addState("Roll",[
            Texture.from("Roll1"),
            Texture.from("Roll2"),
            Texture.from("Roll3"),
            Texture.from("Roll4"),
            Texture.from("Roll5"),
            Texture.from("Roll6"),
            Texture.from("Roll7")
            
        ]);
        this.addChild(this.Cacho);
        this.Cacho.playState("Run");
    }

    public update(_deltaTime:number){



        this.Cacho.update(_deltaTime);
        this.gameSpeed +=1.1;

        //if(!this.isRolling)
       // this.scrollDurationMS += this.gameSpeed * 0.01;

        if(this.isJumping){this.jump();}

        if(this.isJumping && this.position.y <= this.jumph){
            this.isJumping = false;
            this.isDown =  true;
            this.Cacho.playState("JumpDown");
        }

        if(this.isRolling && this.scrollStart < Date.now() - this.scrollDurationMS){ 
            this.isRolling = false;
            this.Cacho.playState("Run");

            
            this.hitbox.destroy();
            this.hitbox = new Graphics();
            this.hitbox = this.hitboxNormal.clone();
            this.removeChild(this.hitbox);
            this.addChild(this.hitbox);
            this.hitbox.visible = false;
        }

        if(this.isDown){this.down();}

        if(this.position.y >= this.floor && this.isDown){
            this.isDown = false;
            this.Cacho.playState("Run");
        }

    }

    public fRoll():void{
        if(!this.isJumping && !this.isDown){
            this.Cacho.playState("Roll");
            this.isRolling = true;
            this.scrollStart = Date.now();

            this.hitbox.destroy();
            this.hitbox = new Graphics();
            this.hitbox = this.hitboxRolling.clone();
            this.removeChild(this.hitbox);
            this.addChild(this.hitbox);
            this.hitbox.visible = false;
        }
    }

    public onTouchStart():void{
        if(!this.isJumping && !this.isRolling && !this.isDown){
            this.Speed2 = this.jumpspeed;
            this.isJumping = true;
            this.Cacho.playState("JumpUp");
        }
    }

    public getHitbox():Rectangle{
        return this.hitbox.getBounds();
    }

    private jump():void{
        this.Speed2 += this.XLR8;
        this.y -= this.Speed2;
    }

    private down():void{
        this.Speed2 += this.XLR8;
        this.y += this.Speed2;
    }

}