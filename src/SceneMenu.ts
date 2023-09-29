import { sound } from "@pixi/sound";
import { exit } from "@tauri-apps/api/process";
import { appWindow } from "@tauri-apps/api/window";
import { Sprite, Text, TextStyle, Texture, TilingSprite } from "pixi.js";
import { SceneBase } from "./utils/SceneBase";
import { SceneManager } from "./utils/SceneManager";
import { SceneGame } from "./SceneGame";
import { Capacitor } from "@capacitor/core";
import { App } from "@capacitor/app";
import { Tween } from "tweedle.js";

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
    ExitButton: Sprite = Sprite.from("ExitMenu");
    Music1Menu: Sprite = Sprite.from("Music1Menu");
    Music2Menu: Sprite = Sprite.from("Music2Menu");
    FSOn: Sprite = Sprite.from("FSOn");
    FSOff: Sprite = Sprite.from("FSOff");

    private sndMM = sound.find("MusicMenu");
    private SFXPlane = sound.find("SFXPlane");

    private BackGround0:TilingSprite = new TilingSprite(Texture.from("BG0"), 1280,720);
    private Setuval:TilingSprite = new TilingSprite(Texture.from("Setuval"), 1280,197);
    constructor(){
        super();

        this.sndMM.loop = true;
        this.sndMM.play();
        
        this.SantaFe.scale.set(0.9);
        this.SantaFe.position.set(25,450);

        this.Runner.scale.set(1.1);
        this.Runner.position.set(795,-this.Runner.height);

        this.Setuval.position.y = 350;

        this.By.position.set(-this.By.width,30);

        this.Base.scale.set(0.875);
        this.Base.position.set(2000,1500);

        
        this.ExitButton.pivot.x = (this.ExitButton.width/2);
        this.ExitButton.position.set(700/2,615);
        this.ExitButton.interactive = true;

        //@ts-expect-error Tauri is injected in Tauri apps
        if(!Capacitor.isNativePlatform() && !window.__TAURI__){
            this.ExitButton.interactive = false;
            this.ExitButton.visible = false;
        }

        
        this.addChild(this.BackGround0);
        this.addChild(this.Setuval);
        this.addChild(this.By);
        this.addChild(this.BackGround1);
        this.addChild(this.Base);
        this.addChild(this.Play);
        this.addChild(this.ExitButton);
        this.addChild(this.Music1Menu);
        this.addChild(this.Music2Menu);
        this.addChild(this.FSOff);
        this.addChild(this.FSOn);
        this.Play.addChild(this.TPlay);
        this.Music2Menu.addChild(this.TUnMute);
        this.Music1Menu.addChild(this.TMute);
        this.ExitButton.addChild(this.TExit);
        
        this.Play.pivot.x = (this.Play.width/2);
        this.Play.position.set(1280/2,615);
        this.Play.interactive = true;

        this.FSOn.position.set(25,25);
        this.FSOn.interactive = true;
        this.FSOn.visible = false;

        this.FSOff.position.set(25,25);
        this.FSOff.interactive = true;
        
        this.SFXPlane.play({
            loop:true,
            singleInstance:true,
            volume:0.02
        })

        //@ts-expect-error Tauri is injected in Tauri apps
        if(!window.__TAURI__){
            this.FSOn.visible = false;
            this.FSOff.visible = false;
            this.FSOff.interactive = false;
            this.FSOn.interactive = false;
        }

        this.Music1Menu.pivot.x = (this.Music1Menu.width/2);
        this.Music1Menu.position.set(1860/2,615);
        this.Music1Menu.interactive = true;

        this.Music2Menu.pivot.x = (this.Music2Menu.width/2);
        this.Music2Menu.position.set(1860/2,615);
        //this.Music2Menu.visible = false;
        this.Music2Menu.interactive = true;


        if(sound.volumeAll == 1){
            this.Music2Menu.visible = false;
        }
        else if (sound.volumeAll == 0){
            this.Music1Menu.visible = false;
        }

        this.TPlay.position.set(5,65);
        this.TExit.position.set(5,65);
        this.TMute.position.set(5,65);
        this.TUnMute.position.set(-4,65);

        this.addChild(this.SantaFe);
        this.addChild(this.Runner);

        //Se asocia tocar el boton con su correspondinte funcion
        this.ExitButton.on("pointertap",this.onTouchStartExit,this);
        this.Play.on("pointertap",this.onTouchStartPlay,this);
        this.Music1Menu.on("pointertap",this.onTouchStartSndOn,this);
        this.Music2Menu.on("pointertap",this.onTouchStartSndOff,this);
        this.FSOff.on("pointertap",this.onTouchStartFSO,this);
        this.FSOn.on("pointertap",this.onTouchStartFSO,this);

        //Tween del avioncito
        new Tween(this.By)
        .to({x:1400, y:30}, 30000)
        .delay(5000)
        .repeat(Infinity)
        .start();

        //Tween de "Runner"
        new Tween(this.Runner)
        .to({x:this.Runner.x, y:446}, 2000)
        .start();

        //Tween de la base de Runner
        new Tween(this.Base)
        .to({x:795, y:500}, 2000)
        .start();    
    }

    public update(_deltaTime:number/* ,_deltaFrame:number */){
        this.BackGround0.tilePosition.x += 0.2;
        this.Setuval.tilePosition.x += 0.2;
    }

    private async onTouchStartFSO(){
        //@ts-expect-error Tauri is injected in Tauri apps
        if(window.__TAURI__){
            const isFull = await appWindow.isFullscreen();
            if(isFull){
                this.FSOn.visible = true;
                this.FSOff.visible = false;
            }
            else{
                this.FSOn.visible = false;
                this.FSOff.visible = true;
            }
            await appWindow.setFullscreen(!isFull);
        }
    }

    private async onTouchStartExit(){
        //@ts-expect-error Tauri is injected in Tauri apps
        if(window.__TAURI__){
            await exit(1);
            this.sndMM.stop();
        }
        if(Capacitor.isNativePlatform()){
            App.exitApp();
        }
    }

    private onTouchStartPlay():void{
        this.sndMM.stop();
        this.SFXPlane.stop();
        SceneManager.ChangeScene(new SceneGame());
    }

    private onTouchStartSndOn():void{
        sound.volumeAll = 0;
        this.Music1Menu.visible = false;
        this.Music2Menu.visible = true;
    }

    private onTouchStartSndOff():void{
        sound.volumeAll = 1;
        this.Music1Menu.visible = true;
        this.Music2Menu.visible = false;
    }
}