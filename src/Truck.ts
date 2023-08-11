import { Container, Graphics, Rectangle, Sprite } from "pixi.js";

export class Truck extends Container{
    Camion: Sprite = Sprite.from("Camion");
    private hitbox:Graphics;
    private hitbox2:Graphics;
    private hitbox3:Graphics;
    constructor(){
        super();
        //this.Camion.scale.set(4);
        
        //this.scale.set(-1,1);

        this.hitbox = new Graphics;
        this.hitbox.beginFill(0xFF00FF,0.3);
        this.hitbox.drawRect(0,30,30,300);
        this.hitbox.endFill();

        this.hitbox2 = new Graphics;
        this.hitbox2.beginFill(0x00FF00,0.3);
        this.hitbox2.drawRect(0,0,192,30);
        this.hitbox2.endFill();

        this.hitbox3 = new Graphics;
        this.hitbox3.beginFill(0x0000FF,0.3);
        this.hitbox3.drawRect(192,96,96,30);
        this.hitbox3.endFill();


        this.addChild(this.Camion);
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
}