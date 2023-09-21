import { Container, Graphics, Rectangle, Sprite } from "pixi.js";

export class Beer extends Container{

    BeerSPT: Sprite = Sprite.from("Beer");
    used: boolean = false;
    hitbox: Graphics = new Graphics;

    constructor(){
        super();

        this.hitbox.beginFill(0xFF00FF,0.3);
        this.hitbox.drawRect(5,-10,60,90);
        this.hitbox.endFill();
        this.hitbox.visible = false;
        this.addChild(this.hitbox);
        this.addChild(this.BeerSPT);

    }

    public getHitbox():Rectangle{
        return this.hitbox.getBounds();
    }

    public setState(State:boolean):void{
        this.used = State;
    }

    public setVisible(Visible:boolean):void{
        this.BeerSPT.visible = Visible;
    }

    public getState():boolean{
        return this.used;
    }
}