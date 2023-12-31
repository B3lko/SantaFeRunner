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
import { SceneTutorial } from "./SceneTutorial";
import { StatusBar } from "@capacitor/status-bar";

export class SceneMenu extends SceneBase{

    //------------Estilo Fuentes------------//
    tstyle = new TextStyle({
        fontSize: 25,
        fontFamily: "Minecraft",
        fill: "white",
        dropShadow: true,
        dropShadowAngle: 0.7,
    dropShadowDistance: 5,
    });


    //------------Textos------------//
    title = new Text("Santa Fe Runner",this.tstyle);
    TPlay = new Text("Play",this.tstyle);
    TExit = new Text("Exit",this.tstyle);
    TMute = new Text("Mute",this.tstyle);
    TUnMute = new Text("UnMute",this.tstyle);
    TTuto = new Text("Tutorial",this.tstyle);
    TFSOn = new Text("FullScrnOn",this.tstyle);
    TFSOff = new Text("FullScrnOff",this.tstyle);


    //------------Sprites------------//
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
    Tuto: Sprite = Sprite.from("Tuto");

    //------------Sonidos------------//
    private sndMM = sound.find("MusicMenu");
    private SFXPlane = sound.find("SFXPlane");


    //------------TilingSprites------------//
    private BackGround0:TilingSprite = new TilingSprite(Texture.from("BG0"), 1280,720);
    private Setuval:TilingSprite = new TilingSprite(Texture.from("Setuval"), 1280,197);

    private Platform = 0;
    //1 = Tauri | 2 = Capacitor | 3 = Web

    constructor(){
        super();

        this.sndMM.loop = true;
        if(!this.sndMM.isPlaying)
        this.sndMM.play();
        
        this.SantaFe.scale.set(0.9);
        this.SantaFe.position.set(25,450);

        this.Runner.scale.set(1.1);
        this.Runner.position.set(795,-this.Runner.height);

        this.Setuval.position.y = 350;

        this.By.pivot.x = this.By.width;
        this.By.position.set(-this.By.width,30);

        this.Base.scale.set(0.875);
        this.Base.position.set(2000,1500);

        
        this.ExitButton.interactive = true;
        this.Tuto.interactive = true;
        this.Play.interactive = true;
        this.Music1Menu.interactive = true;
        this.Music2Menu.interactive = true;

        this.ExitButton.pivot.x = this.ExitButton.width/2;
        this.Tuto.pivot.x = this.Tuto.width/2;
        this.Play.pivot.x = this.Play.width/2;
        this.FSOff.pivot.x = this.FSOff.width/2;
        this.FSOn.pivot.x = this.FSOn.width/2;
        this.Music1Menu.pivot.x = this.Music1Menu.width/2;
        this.Music2Menu.pivot.x = this.Music2Menu.width/2;

        //------------En que plataforma se está jugando------------//
        //@ts-expect-error Tauri is injected in Tauri apps
        if(window.__TAURI__){this.Platform = 1;}
        else if(Capacitor.isNativePlatform()){this.Platform = 2;}
        else{this.Platform = 3;}
        
        if(this.Platform == 1){
            this.FSOff.visible = false;
            this.FSOff.interactive = false;
            this.FSOn.interactive = true;
            this.FSOn.interactive = true;
            this.FSOff.interactive = true;
            this.FSOn.position.set(SceneManager.WIDTH/6,615);
            this.FSOff.position.set(SceneManager.WIDTH/6,615);
            this.Tuto.position.set(SceneManager.WIDTH*2/3,615);
            this.ExitButton.position.set(SceneManager.WIDTH/3,615);
            this.Play.position.set(SceneManager.WIDTH/2,615);
            this.Music1Menu.position.set(SceneManager.WIDTH*5/6,615);
            this.Music2Menu.position.set(SceneManager.WIDTH*5/6,615);
        }

        if(this.Platform == 2){
            this.FSOn.visible = false;
            this.FSOff.visible = false;
            this.FSOff.interactive = false;
            this.FSOn.interactive = false;
            this.Tuto.position.set(SceneManager.WIDTH/2.5,615);
            this.ExitButton.position.set(SceneManager.WIDTH/6,615);
            this.Play.position.set(SceneManager.WIDTH*7/12,615);
            this.Music1Menu.position.set(SceneManager.WIDTH*5/6,615);
            this.Music2Menu.position.set(SceneManager.WIDTH*5/6,615);
        }

        if(this.Platform == 3){
            this.ExitButton.interactive = false;
            this.ExitButton.visible = false;
            this.FSOff.visible = false;
            this.FSOff.interactive = true;
            this.FSOn.interactive = true;
            this.FSOn.position.set(SceneManager.WIDTH/6,615);
            this.FSOff.position.set(SceneManager.WIDTH/6,615);
            this.Tuto.position.set(SceneManager.WIDTH/2.5,615);
            this.Play.position.set(SceneManager.WIDTH*7/12,615);
            this.Music1Menu.position.set(SceneManager.WIDTH*5/6,615);
            this.Music2Menu.position.set(SceneManager.WIDTH*5/6,615);
        }

        this.TTuto.position.set(-15,65);
    
        this.addChild(this.BackGround0);
        this.addChild(this.Setuval);
        this.addChild(this.By);
        this.addChild(this.BackGround1);
        this.addChild(this.SantaFe);
        this.addChild(this.Runner);
        this.addChild(this.Base);
        this.addChild(this.Play);
        this.addChild(this.ExitButton);
        this.addChild(this.Music1Menu);
        this.addChild(this.Music2Menu);
        this.addChild(this.FSOff);
        this.addChild(this.FSOn);
        this.addChild(this.Tuto);
        this.Tuto.addChild(this.TTuto);
        this.Play.addChild(this.TPlay);
        this.Music2Menu.addChild(this.TUnMute);
        this.Music1Menu.addChild(this.TMute);
        this.ExitButton.addChild(this.TExit);
        this.FSOn.addChild(this.TFSOn);
        this.FSOff.addChild(this.TFSOff);


        if(sound.volumeAll == 1){this.Music2Menu.visible = false;}
        else if (sound.volumeAll == 0){this.Music1Menu.visible = false;}


        this.TPlay.position.set(5,65);
        this.TExit.position.set(5,65);
        this.TMute.position.set(5,65);
        this.TUnMute.position.set(-4,65);
        this.TFSOff.position.set(-35,65);
        this.TFSOn.position.set(-35,65);


        //Se asocia tocar el boton con su correspondinte funcion
        this.ExitButton.on("pointertap",this.onTouchStartExit,this);
        this.Play.on("pointertap",this.onTouchStartPlay,this);
        this.Music1Menu.on("pointertap",this.onTouchStartSndOn,this);
        this.Music2Menu.on("pointertap",this.onTouchStartSndOff,this);
        this.FSOff.on("pointertap",this.onTouchStartFSO,this);
        this.FSOn.on("pointertap",this.onTouchStartFSO,this);
        this.Tuto.on("pointertap",this.onTouchStartTuto,this);

        //Tween del avioncito
        new Tween(this.By)
        .to({x:1800, y:30}, 30000)
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


        StatusBar.hide();


    }

    //------------Update------------//
    public update(_deltaTime:number/* ,_deltaFrame:number */){

        this.BackGround0.tilePosition.x += 0.2;
        this.Setuval.tilePosition.x += 0.2;
        
        App.addListener("appStateChange", (e) => {
            if(e.isActive){
                //Reanudar el juego
                sound.play;
            }
            else{
                //Pausar el juego
                sound.pause;
            }
        });

        if(this.By.position.x > 0 && (this.By.position.x) < SceneManager.WIDTH && !this.SFXPlane.isPlaying){
            this.SFXPlane.play({
                singleInstance:true,
                volume:0.02
            })
        }
        else if (this.SFXPlane.isPlaying){
            this.SFXPlane.stop;
        }

    }


    //------------Pantalla completa------------//
    private async onTouchStartFSO(){
        if(this.Platform == 1){
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

        else if(this.Platform == 3){
            if (!document.fullscreenElement){
                document.documentElement.requestFullscreen();
                this.FSOn.visible = false;
                this.FSOff.visible = true;
            }
            else{
                document.exitFullscreen();
                this.FSOn.visible = true;
                this.FSOff.visible = false;
            }
        }
    }


    //------------Cerrar juego------------//
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

    private onTouchStartTuto():void{
        SceneManager.ChangeScene(new SceneTutorial());
    }

    //------------Jugar------------//
    private onTouchStartPlay():void{
        this.sndMM.stop();
        this.SFXPlane.stop();
        SceneManager.ChangeScene(new SceneGame());
    }


    //------------Sonido ON------------//
    private onTouchStartSndOn():void{
        sound.volumeAll = 0;
        this.Music1Menu.visible = false;
        this.Music2Menu.visible = true;
    }


    //------------Sonido Off------------//
    private onTouchStartSndOff():void{
        sound.volumeAll = 1;
        this.Music1Menu.visible = true;
        this.Music2Menu.visible = false;
    }
}