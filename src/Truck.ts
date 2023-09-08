import { Container, Graphics, Rectangle, Sprite } from "pixi.js";

export class Truck extends Container{
    Camion: Sprite = Sprite.from("Camion");
    private hitbox:Graphics;
    private hitbox2:Graphics;
    private hitbox3:Graphics;
    private hitbox4:Graphics;
    private hitbox5:Graphics;
    private hitbox6:Graphics;
    private hitbox7:Graphics;
    constructor(){
        super();

        this.hitbox = new Graphics;
        this.hitbox.beginFill(0xFF00FF,0.3);
        this.hitbox.drawRect(0,30,30,300);
        this.hitbox.endFill();
        this.hitbox.visible = false;

        this.hitbox2 = new Graphics;
        this.hitbox2.beginFill(0x00FF00,0.3);
        this.hitbox2.drawRect(0,0,192,30);
        this.hitbox2.endFill();
        this.hitbox2.visible = false;

        this.hitbox3 = new Graphics;
        this.hitbox3.beginFill(0x0000FF,0.3);
        this.hitbox3.drawRect(192,96,96,30);
        this.hitbox3.endFill();
        this.hitbox3.visible = false;

        this.hitbox4 = new Graphics;
        this.hitbox4.beginFill(0xAA44FF,0.3);
        this.hitbox4.drawRect(275,155,96,30);
        this.hitbox4.endFill();
        this.hitbox4.visible = false;

        this.hitbox5 = new Graphics;
        this.hitbox5.beginFill(0xAA44FF,1);
        this.hitbox5.drawRect(-40,200,220,50);
        this.hitbox5.endFill();
        this.hitbox5.visible = false;

        this.hitbox6 = new Graphics;
        this.hitbox6.beginFill(0x660000,0.3);
        this.hitbox6.drawRect(192,200,85,50);
        this.hitbox6.endFill();
        this.hitbox6.visible = false;

        this.hitbox7 = new Graphics;
        this.hitbox7.beginFill(0xAA44FF,0.3);
        this.hitbox7.drawRect(280,200,120,50);
        this.hitbox7.endFill();
        this.hitbox7.visible = false;

        this.addChild(this.Camion);
        this.addChild(this.hitbox);
        this.addChild(this.hitbox2);
        this.addChild(this.hitbox3);
        this.addChild(this.hitbox4);
        this.addChild(this.hitbox5);
        this.addChild(this.hitbox6);
        this.addChild(this.hitbox7);
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
    public getHitbox4():Rectangle{
        return this.hitbox4.getBounds();
    }
    public getHitbox5():Rectangle{
        return this.hitbox5.getBounds();
    }
    public getHitbox6():Rectangle{
        return this.hitbox6.getBounds();
    }
    public getHitbox7():Rectangle{
        return this.hitbox7.getBounds();
    }
}