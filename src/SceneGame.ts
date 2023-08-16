import { Container, TextStyle, Texture, TilingSprite, Text, Sprite, NineSlicePlane, Graphics} from "pixi.js";
import { Player } from "./Player";
import { Truck } from "./Truck";
import { GameManager } from "./GameManager";
import { checkCollision } from "./IHitbox";
import { sound} from "@pixi/sound";
//import { sound } from '@pixi/sound';
//import { SceneBase } from "./SceneBase";

export class SceneGame extends Container{
    private world:Container;
    player1 = new Player();
    private Sky1:TilingSprite = new TilingSprite(Texture.from("Sky1"), 1280,720);
    private Sky2:TilingSprite = new TilingSprite(Texture.from("Sky2"), 1280,720);
    private Sky3:TilingSprite = new TilingSprite(Texture.from("Sky3"), 1280,720);
    private Bridge:TilingSprite = new TilingSprite(Texture.from("Bridge"), 1280,720);
    Truck1:Truck = new Truck();
    private gameSpeed = 20;
    private curtain:Graphics;
    private PauseW: NineSlicePlane = new NineSlicePlane(
        Texture.from("Blue"),
        35,35,35,35
    )
    

    //sound
    //sound//.play("Cantina");
    SndOff: Sprite = Sprite.from("SndOff");
    SndOn: Sprite = Sprite.from("SndOn");
    Retry: Sprite = Sprite.from("Retry");
    Menu: Sprite = Sprite.from("Menu");
    Play: Sprite = Sprite.from("Play");
    Pause: Sprite = Sprite.from("Pause");
    Tan: Sprite = Sprite.from("Tan");
    isPause = false;

//sound

    Score:number = 0;
    tstyle = new TextStyle({
        fontSize: 50,
        fontFamily: "Minecraft",
        fill: "white",
        dropShadow: true,
        dropShadowAngle: 0.7,
    dropShadowDistance: 5,
    });
    TScore = new Text("Score: 0",this.tstyle);

    TPause = new Text("Pause",this.tstyle);

    TPlay = new Text("Play",this.tstyle);
    TRetry = new Text("Retry",this.tstyle);
    TMenu = new Text("Menu",this.tstyle);
    TStarting = new Text("Starting in",this.tstyle);
    T1 = new Text("1",this.tstyle);
    T2 = new Text("2",this.tstyle);
    T3 = new Text("3",this.tstyle);

    TimeStng = 0;
    BoolStng: boolean = false;

    private Stng:Container;

    GM1: GameManager;

    private Firsty:number = 0;
    private Lasty:number = 0;

    lasty:number = 0;


Loser = false;
TruckUp = false;

Volume = 100;
V1R = 600;
V1L = 400;
Vxi = 0;
Vxf = 0;


private sndMG = sound.find("MusicGame");
    constructor(GM:GameManager){
        super();
//sound
        this.GM1 = GM;
      //  SCALE_MODES.NEAREST;

        this.world = new Container();
        this.Stng = new Container();
        //this.Firsty = 0;
       // SceneGame.Firsty;
       // this.lasty = 0;

        //const Sky1: new (TilingSprite) (Texture.from("Sky1");

        //this.Sky1.scale.set(10,10);

        //const sndMG = sound.find("MusicGame");
        this.sndMG.volume = 1.0;
       this. sndMG.loop = true;
        //sndMG.speed = 0.5;
      this.  sndMG.singleInstance = true;
        sound.play("MusicGame",{
            volume: 1.1,
            loop: true,
        });


        this.world = new Container();
        this.world.addChild(this.Sky1);
        this.world.addChild(this.Sky2);
        this.world.addChild(this.Sky3);
        this.world.addChild(this.Bridge);

        this.world.addChild(this.player1);

        this.player1.position.set(60,480);

        this.Truck1.position.set(1400,352);
        this.world.addChild(this.Truck1);

        this.TScore.position.set(20,15);

        this.world.addChild(this.TScore);

        this.Pause.position.set(1196,15);
        this.world.addChild(this.Pause);

        
        
        
        
        
        this.PauseW.addChild(this.SndOff);
        this.SndOff.position.set(10,10);

        this.PauseW.addChild(this.SndOn);

        this.PauseW.addChild(this.Tan);
        this.Tan.position.set (700,100);
        this.Tan.on("pointerdown",this.pointerdown,this);  
        this.Tan.interactive = true;      


        //this.Play.visible = false;
        //this.Play.position.set()
        //this.world.addChild(this.Play);

        this.PauseW.pivot.set(this.PauseW.width/2,this.PauseW.height/2);
        this.PauseW.width = 600; //600
        this.PauseW.height = 300;//300
        this.PauseW.pivot.set(this.PauseW.width/2,this.PauseW.height/2);
        this.PauseW.position.set(1280/2,720/2);
        this.PauseW.visible = true;

        this.PauseW.addChild(this.TPause);
        this.TPause.pivot.x = (this.TPause.width/2);
        this.TPause.position.set(this.PauseW.width/2,10);
        //Iconos de la pausa
        //Play
        this.Play.pivot.set(this.Play.width/2,this.Play.height/2);
        this.Play.position.set(this.PauseW.width/2,230);
        this.PauseW.addChild(this.Play);
        this.Play.addChild(this.TPlay);
        this.TPlay.scale.set(0.4);
        this.TPlay.position.set(9,55);

        //Menu
        this.Menu.pivot.set(this.Menu.width/2,this.Menu.height/2);
        this.PauseW.addChild(this.Menu);
        this.Menu.position.set(this.PauseW.width/6,230);
        this.Menu.addChild(this.TMenu);
        this.TMenu.scale.set(0.4);
        this.TMenu.position.set(9,55);

        //Retry
        this.Retry.pivot.set(this.Retry.width/2,this.Retry.height/2);
        this.PauseW.addChild(this.Retry);
        this.Retry.position.set(this.PauseW.width/1.25,230);
        this.Retry.addChild(this.TRetry);
        this.TRetry.scale.set(0.4);
        this.TRetry.position.set(4,55);


        this.curtain = new Graphics;
        this.curtain.beginFill(0x000000,0.7);
        this.curtain.drawRect(0,0,1280,720);
        this.curtain.endFill();

        this.curtain.visible = false;

        this.curtain.addChild(this.PauseW);
        this.world.addChild(this.curtain);
        this.addChild(this.world);

        this.Retry.on("pointertap",this.onTouchStartRetry,this);
        this.Retry.interactive = true;

        this.Pause.on("pointertap",this.onTouchStartPause,this);
        this.Pause.interactive = true;

        this.Play.on("pointertap",this.onTouchStartPlay,this);
        this.Play.interactive = true;

        this.Play.on("pointertap",this.onTouchStartHome,this);
        this.Menu.interactive = true;

        this.SndOn.on("pointertap",this.onTouchStartSndOn,this);
        this.SndOn.interactive = true;
        this.SndOn.position.set(10,10);

        this.SndOff.on("pointertap",this.onTouchStartSndOff,this);
        this.SndOff.interactive = true;
        this.SndOff.visible = false;

        this.Stng.addChild(this.T1);
        this.Stng.addChild(this.T2);
        this.Stng.addChild(this.T3);
        this.Stng.addChild(this.TStarting);
        this.addChild(this.Stng);
        this.Stng.visible = false;

        this.TStarting.pivot.x = (this.TStarting.width/2);
        this.TStarting.scale.set(0.75);
        this.TStarting.position.set(1280/2,500);

        this.T1.pivot.x = (this.T1.width/2);
        this.T1.scale.set(0.5);
        this.T1.position.set(1280/2,550);

        this.T2.pivot.x = (this.T2.width/2);
        this.T2.scale.set(0.5);
        this.T2.position.set(1280/2,550);
        this.T2.visible = false;

        this.T3.pivot.x = (this.T3.width/2);
        this.T3.scale.set(0.5);
        this.T3.position.set(1280/2,550);
        this.T3.visible = false;
       // this.Firsty
       //this.on("pointertap",this.TS,this);
        

       //this.Tan.on("pointermove",(e)=>{
        //e;
        this.Tan.on("pointerdown",(e)=>{
            this.Vxi = e.data.global.x;
            this.Tan.on("pointermove",(e)=>{
            this.Vxf = e.data.global.x;

            this.Tan.position.set(this.Vxf-this.Vxi,this.Tan.position.y);
            //console.log(this.Vx);
        });
        });
         
     //});

       this.interactive = true;
       //this.on("pointertap",(e)=>{



        this.on("pointerdown",(e)=>{
        // Firsty:number = 0;
         //console.log("mouseCliked");
         //console.log("Y: ",e.data.global.y);
         this.Firsty = e.data.global.y;
     });

     this.on("pointerup",(e)=>{
        // Firsty:number = 0;
         //console.log("mouseCliked");
         //console.log("Y: ",e.data.global.y);
         this.Lasty = e.data.global.y;
         if(this.Firsty>this.Lasty){
            this.player1.onTouchStart();
         }
         else if(this.Firsty<this.Lasty){
            this.player1.fRoll();
         }
     });
    }

    public TS(){
        
    }
    public update(_deltaTime:number/* ,_deltaFrame:number */){
//console.log(_deltaTime);
       //console.log(checkCollision(this.player1,this.Truck1));

       if(checkCollision(this.player1.getHitbox(),this.Truck1.getHitbox())){
            this.Loser = true;
       }

       if(checkCollision(this.player1.getHitbox(),this.Truck1.getHitbox2())){
            this.player1.isDown = false;
            this.player1.isJumping = false;
            this.player1.JumpUp.visible = false;
            this.TruckUp = true;
            this.player1.Animation.visible = true;
            this.player1.JumpDown.visible = false;
       }
       else if(this.TruckUp){
        this.player1.isDown = true;
        this.TruckUp = false;
        this.player1.JumpDown.visible = true;
        this.player1.JumpUp.visible = false;
        
        //this.player1.JumpDown.visible = false;
       }
       

       /*if(){
        this.player1.isJumping = false;
        this.player1.isDown = true;
       }*/

//console.log(this.Firsty,this.Lasty);
        if(!this.isPause && !this.Loser){
            this.gameSpeed += 1.1;
            this.Score += this.gameSpeed/1000;
           // let score =  this.Score;
            this.TScore.text = "Score: " +String(Math.round(this.Score));
            this.player1.update(_deltaTime/* ,_deltaFrame */);
            this.Sky1.tilePosition.x -= this.gameSpeed * _deltaTime/1000;
            this.Sky2.tilePosition.x -= 2 + this.gameSpeed * _deltaTime/1000;
            this.Sky3.tilePosition.x -= 5 + this.gameSpeed * _deltaTime/1000;
            this.Bridge.tilePosition.x -= 9 + this.gameSpeed * _deltaTime/1000;
            this.Truck1.position.x -= 9 + this.gameSpeed * _deltaTime/1000;
//console.log(_deltaTime + " y " + _deltaFrame);
            if(this.Truck1.position.x + this.Truck1.width < 0){
                this.Truck1.position.x = 1280 + 1000*Math.random();
            }


            



        }
        else if (!this.Loser){
            if(this.BoolStng){
                if(this.TimeStng < Date.now() - 800){
                    this.T1.visible = false;
                    this.T2.visible = true;
                    this.T2.scale.set(0.5);
                    //this.TimeStng = Date.now();
                }
                else{this.T1.scale.set(this.T1.scale.x + 0.01,this.T1.scale.y + 0.01);}

                if((this.TimeStng+800) < Date.now() - 800 ){
                    this.T2.visible = false;
                    this.T3.visible = true;
                    this.T3.scale.set(0.5);
                   // this.TimeStng = Date.now();
                }
                else{console.log("a");this.T2.scale.set(this.T2.scale.x + 0.01,this.T2.scale.y + 0.01);}

                if(this.TimeStng+1600 < Date.now() - 800){
                    this.T2.visible = false;
                    this.T3.visible = false;
                    this.T1.visible = true;
                    this.isPause = false;
                    this.BoolStng = false;
                    this.Stng.visible = false;
                }
                else{this.T3.scale.set(this.T3.scale.x + 0.01,this.T3.scale.y + 0.01);}

            }   
        }
        
        if(this.Loser){
           // console.log("Perdiste");
           this.gameSpeed = 0;
        }  
    }
    
    private onTouchStartRetry():void{
        this.gameSpeed = 20;
        this.Score = 0;
        this.Truck1.position.x = 1400;
        this.Pause.visible = true;
        this.curtain.visible = false;
        this.Stng.visible = true;
        this.TimeStng = Date.now();
        this.BoolStng = true;
        this.T1.scale.set(0.5);
        console.log(this.TimeStng);
    }


    private pointerdown():void{
        //this.Tan.position.set(e.data.global.y;,this.Tan.position.y);
    }
   
    private onTouchStartPause():void{
        this.isPause = true;
        this.player1.Animation.stop();
       // this.Play.visible = true;
        //this.Play.interactive = true;
        //this.Pause.interactive = false;
        this.Pause.visible = false;
        this.curtain.visible = true;
    }
    
    private onTouchStartPlay():void{
        this.isPause = false;
        this.curtain.visible = false;
        this.Pause.interactive = true;
        this.Pause.visible = true;
    }

    private onTouchStartHome():void{
       //"" this.GM1.ChangeScene();
       
    }

    private onTouchStartSndOn():void{
        sound.toggleMuteAll();
        this.SndOn.visible = false;
        this.SndOff.visible = true;
    }

    private onTouchStartSndOff():void{
        sound.toggleMuteAll();
        this.SndOn.visible = true;
        this.SndOff.visible = false;
    }
}