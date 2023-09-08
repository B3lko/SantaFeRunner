import { sound } from "@pixi/sound";
import { Sprite, Text, TextStyle, Texture, TilingSprite } from "pixi.js";
import { SceneBase } from "./utils/SceneBase";
import { SceneManager } from "./utils/SceneManager";
import { SceneGame } from "./SceneGame";

export class SceneMenu extends SceneBase{
    tstyle = new TextStyle({
        fontSize: 25,
        fontFamily: "Minecraft",
        fill: "white",
        dropShadow: true,
        dropShadowAngle: 0.7,
    dropShadowDistance: 5,
    });
    title = new Text("Santa Fe Runner",this.tstyle);
    TPlay = new Text("Play",this.tstyle);
    TExit = new Text("Exit",this.tstyle);
    TMute = new Text("Mute",this.tstyle);
    TUnMute = new Text("UnMute",this.tstyle);

    BackGround1: Sprite = Sprite.from("BG1");
    SantaFe: Sprite = Sprite.from("SantaFe");
    Runner: Sprite = Sprite.from("Runner");
    By: Sprite = Sprite.from("By");
    Base: Sprite = Sprite.from("Base");
    Play: Sprite = Sprite.from("PlayMenu");
    Exit: Sprite = Sprite.from("ExitMenu");
    Music1Menu: Sprite = Sprite.from("Music1Menu");
    Music2Menu: Sprite = Sprite.from("Music2Menu");
    

    Test: Sprite = Sprite.from("Test");

    private sndMM = sound.find("MusicMenu");

    private BackGround0:TilingSprite = new TilingSprite(Texture.from("BG0"), 1280,720);
    private Setuval:TilingSprite = new TilingSprite(Texture.from("Setuval"), 1280,197);
    constructor(){
        super();

        this.sndMM.play();
        /*sound.play("MusicMenu",{
            volume: 1.0,
            loop: true,
        });*/
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
        this.addChild(this.Play);
        this.addChild(this.Exit);
        this.addChild(this.Music1Menu);
        this.addChild(this.Music2Menu);
        this.Play.addChild(this.TPlay);
        this.Music2Menu.addChild(this.TUnMute);
        this.Music1Menu.addChild(this.TMute);
        this.Exit.addChild(this.TExit);
        
        this.Play.pivot.x = (this.Play.width/2);
        this.Play.position.set(1280/2,615);
        this.Play.interactive = true;

        this.Exit.pivot.x = (this.Exit.width/2);
        this.Exit.position.set(700/2,615);

        this.Music1Menu.pivot.x = (this.Music1Menu.width/2);
        this.Music1Menu.position.set(1860/2,615);
        this.Music1Menu.interactive = true;

        this.Music2Menu.pivot.x = (this.Music2Menu.width/2);
        this.Music2Menu.position.set(1860/2,615);
        this.Music2Menu.visible = false;
        this.Music2Menu.interactive = true;

        this.TPlay.position.set(5,65);
        this.TExit.position.set(5,65);
        this.TMute.position.set(5,65);
        this.TUnMute.position.set(-4,65);

        this.addChild(this.SantaFe);

        this.addChild(this.Runner);

        this.Play.on("pointertap",this.onTouchStartPlay,this);
        this.Music1Menu.on("pointertap",this.onTouchStartSndOn,this);
        this.Music2Menu.on("pointertap",this.onTouchStartSndOff,this);

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

    private onTouchStartPlay():void{
        this.sndMM.stop();
        SceneManager.ChangeScene(new SceneGame());
    }

    private onTouchStartSndOn():void{
        sound.toggleMuteAll();
        this.Music1Menu.visible = false;
        this.Music2Menu.visible = true;
    }

    private onTouchStartSndOff():void{
        sound.toggleMuteAll();
        this.Music1Menu.visible = true;
        this.Music2Menu.visible = false;
    }
}