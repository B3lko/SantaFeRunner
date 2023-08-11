import { sound } from "@pixi/sound";
import { Container, Sprite, Text, TextStyle, Texture, TilingSprite } from "pixi.js";

export class SceneMenu extends Container{
    Play: Sprite = Sprite.from("ovni");
    tstyle = new TextStyle({
        fontSize: 432,
    });
    title = new Text("Santa Fe Runner",this.tstyle);
    BackGround1: Sprite = Sprite.from("BG1");
    SantaFe: Sprite = Sprite.from("SantaFe");
    Runner: Sprite = Sprite.from("Runner");
    By: Sprite = Sprite.from("By");
    Base: Sprite = Sprite.from("Base");

    Test: Sprite = Sprite.from("Test");

    private BackGround0:TilingSprite = new TilingSprite(Texture.from("BG0"), 1280,720);
    private Setuval:TilingSprite = new TilingSprite(Texture.from("Setuval"), 1280,197);
    constructor(){
        super();


        sound.play("MusicMenu",{
            volume: 1.0,
            loop: true,
        });
       // this.addChild(this.Play);
        //this.addChild(this.title);
        
        //this.SantaFe.scale.set(3.5);
        this.SantaFe.scale.set(0.9);
        this.SantaFe.position.set(25,450);

        this.Runner.scale.set(1.1);
        this.Runner.position.set(795,-300);
        //this.Runner.angle = (6);

        //this.Setuval.scale.set(3.5);
        this.Setuval.position.y = 350;

        //this.Camion.scale.set(0.1);
        this.By.position.set(-450,30);

        this.Base.scale.set(0.875);
        this.Base.position.set(795,1500);

        
        this.addChild(this.BackGround0);
        this.addChild(this.Setuval);
        this.addChild(this.By);
        this.addChild(this.BackGround1);
        this.addChild(this.Base);
        
        //this.addChild(this.Test);
       // this.Test.position.y = -50;
        //this.Test.alpha = 0.25;
       // this.Test.angle = 3;

        this.addChild(this.SantaFe);


        this.addChild(this.Runner);
    }
    public update(_deltaTime:number/* ,_deltaFrame:number */){
        this.BackGround0.tilePosition.x += 0.5;
        this.Setuval.tilePosition.x += 0.5;
        this.By.x += 2.3;
        if(this.By.x > 1400) this.By.x = -450;

        if(this.Runner.y < 440){
            this.Runner.position.y += 20;
        }
        
        if(this.Base.y >= 510){
            this.Base.position.y -= 20;
        }

    }
}