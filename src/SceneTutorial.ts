import { Sprite, TextStyle, Text, Container} from "pixi.js";
import { SceneBase } from "./utils/SceneBase";
import { SceneManager } from "./utils/SceneManager";
import { SceneMenu } from "./SceneMenu";
import { Player } from "./Player";
import { Tween } from "tweedle.js";
import { CRTFilter } from "@pixi/filter-crt";
import { OutlineFilter } from "@pixi/filter-outline";
import { StatusBar } from "@capacitor/status-bar";
import { sound } from "@pixi/sound";
import { App } from "@capacitor/app";

export class SceneTutorial extends SceneBase{

    tstyle = new TextStyle({
        fontSize: 30,
        fontFamily: "Minecraft",
        fill: "white",
        dropShadow: true,
        dropShadowAngle: 0.7,
    dropShadowDistance: 5,
    });

    TutoBG: Sprite = Sprite.from("TutoBG");
    Menu: Sprite = Sprite.from("BlueHome");
    Hand: Sprite = Sprite.from("Hand");
    TV13: Sprite = Sprite.from("TV13");

    TMenu = new Text("Menu",this.tstyle);
    TSUp = new Text("Swap up to make the character jump",this.tstyle);
    TSDown = new Text("Swap down to make the character roll",this.tstyle);
    player1 = new Player();

    scrollStart: number = 0;
    scrollDurationMS :number = 1500;

    Ready1:boolean = false;
    Ready2:boolean = true;

    TV: Container = new Container();
    TVS: Sprite = Sprite.from("TVS");


    constructor(){
        super();
        this.addChild(this.TutoBG);
        this.addChild(this.Menu);

        this.Menu.anchor.set(0.5);
        this.Menu.position.set(SceneManager.WIDTH*8/9,SceneManager.HEIGTH*8/9);
        this.Menu.interactive = true;
        this.Menu.on("pointertap",this.onTouchStartMenu,this);

        this.Menu.addChild(this.TMenu);
        this.TMenu.scale.set(0.75);
        this.TMenu.position.set(-25,35);

        this.TV.addChild(this.TVS);
        this.TVS.position.set(268,268);

        this.TV.addChild(this.player1);
        this.player1.position.set(480,400);

        this.player1.Cacho.playState("Idle");

        
        this.TV.addChild(this.TSUp);
        this.TSUp.position.set(300,290);


        this.TV.addChild(this.TSDown);
        this.TSDown.position.set(300,290);
        this.TSDown.visible = false;

        this.TV.addChild(this.Hand);
        this.Hand.scale.set(0.25);
        this.Hand.position.set(650,480);
        this.addChild(this.TV);

        this.TV.addChild(this.TV13);
        this.TV13.position.set(930,290);
       

        this.scrollStart = Date.now()
        new Tween(this.Hand)
            .to({y:330}, 500)
            .delay(1000)
            .start()

        const myCRT = new CRTFilter({
            verticalLine: true,
        });

        this.TV.filters = [myCRT];

        const myOutLine = new OutlineFilter();
        this.player1.filters = [myOutLine];

        StatusBar.hide();
    }

    private onTouchStartMenu():void{
        SceneManager.ChangeScene(new SceneMenu());
    }

    public update(_deltaTime:number/* ,_deltaFrame:number */){

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
        
        if(this.scrollStart < Date.now() - this.scrollDurationMS && !this.Ready1){
            this.Ready1 = true;
            this.player1.Cacho.playState("JumpUp");
            new Tween(this.player1)
            .to({y:290}, 500)
            .start()
            .onComplete(()=>{
                this.player1.Cacho.playState("JumpDown");
                new Tween(this.player1)
                .to({y:400}, 500)
                .start()
                .onComplete(()=>{
                    this.player1.Cacho.playState("Idle");
                    this.scrollStart = Date.now();
                    this.Ready2 = false;
                    this.TSUp.visible = false;
                    this.TSDown.visible = true;
                    new Tween(this.Hand)
                    .to({y:480}, 500)
                    .delay(500)
                    .start()
                });
            });
        }

        if(this.scrollStart < Date.now() - this.scrollDurationMS && !this.Ready2){
            this.Ready2 = true;
            this.player1.Cacho.playState("Roll");
            new Tween(this.player1)
            .to({}, 3000)
            .start()
            .onComplete(()=>{
                this.player1.Cacho.playState("Idle");
                this.scrollStart = Date.now();
                this.TSUp.visible = true;
                this.TSDown.visible = false;
                this.Ready1 = false;
                new Tween(this.Hand)
                .to({y:330}, 500)
                .delay(500)
                .start()
            });
        }
    }
}