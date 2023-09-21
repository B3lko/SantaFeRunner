import { Container, Graphics, Rectangle, Sprite } from "pixi.js";

export class Sign extends Container{

    SignSpr: Sprite = Sprite.from("Sign");
    private hitbox:Graphics;
    private hitbox2:Graphics;
    private hitbox3:Graphics;

    constructor(){
        super();

        this.hitbox = new Graphics;
        this.hitbox.beginFill(0xFF0000,0.3);
        this.hitbox.drawRect(0,30,50,100);
        this.hitbox.endFill();
       // this.hitbox.visible = false;

        this.hitbox2 = new Graphics;
        this.hitbox2.beginFill(0x00FF00,0.3);
        this.hitbox2.drawRect(0,0,260,25);
        this.hitbox2.endFill();
        //this.hitbox2.visible = false;

        this.hitbox3 = new Graphics;
        this.hitbox3.beginFill(0x0000FF,0.3);
        this.hitbox3.drawRect(-300,100,900,30);
        this.hitbox3.endFill();
        //this.hitbox3.visible = false;

        this.SignSpr.scale.x = 0.8;
        //this.SignSpr.skew.x = 0.5;

        this.addChild(this.SignSpr);
        this.addChild(this.hitbox);
        this.addChild(this.hitbox2);
        this.addChild(this.hitbox3);
    }

    public getHitbox():Rectangle{
        return this.hitbox.getBounds();
    }

    public getHitbox2():Rectangle{
        return this.hitbox2.getBounds();
    }

    public getHitbox3():Rectangle{
        return this.hitbox3.getBounds();
    }
}