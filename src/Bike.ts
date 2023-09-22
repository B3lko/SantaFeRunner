import { Container, Graphics, Rectangle, Sprite } from "pixi.js";

export class Bike extends Container{
    SBike:Sprite = Sprite.from("Bike");
    private hitbox:Graphics;
    private hitbox2:Graphics;
    private hitbox3:Graphics;
    constructor(){
        super();
        
        this.hitbox = new Graphics;
        this.hitbox.beginFill(0xFFFF00,0.3);
        this.hitbox.drawRect(-this.SBike.width * 2,20,this.SBike.width * 5,20);
        this.hitbox.endFill();
        this.hitbox.visible = false;

        this.hitbox2 = new Graphics;
        this.hitbox2.beginFill(0x00FFFF,0.3);
        this.hitbox2.drawRect(-10,30,this.SBike.width,20);
        this.hitbox2.endFill();
        this.hitbox2.visible = false;

        this.hitbox3 = new Graphics;
        this.hitbox3.beginFill(0x00FF00,0.3);
        this.hitbox3.drawRect(0,50,20,this.SBike.height - 20);
        this.hitbox3.endFill();
        this.hitbox3.visible = false;

        this.addChild(this.hitbox);
        this.addChild(this.hitbox2);
        this.addChild(this.hitbox3);
        this.addChild(this.SBike);
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