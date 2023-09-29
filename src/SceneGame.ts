import { Container, TextStyle, Texture, TilingSprite, Text, Sprite, NineSlicePlane, Graphics, BlurFilter} from "pixi.js";
import { Player } from "./Player";
import { Truck } from "./Truck";
import { checkCollision } from "./IHitbox";
import { sound} from "@pixi/sound";
import { Tween } from "tweedle.js";
import { SceneBase } from "./utils/SceneBase";
import { SceneManager } from "./utils/SceneManager";
import { SceneMenu } from "./SceneMenu";
import { BeersManager } from "./BeersManager";
import { Sign } from "./Sign";
import { Bike } from "./Bike";
import * as DustParticle from "./emitterDust.json";
import * as SmokeParticle from "./emitterSmoke.json";
import { Emitter, upgradeConfig } from "@pixi/particle-emitter";

export class SceneGame extends SceneBase{
    private world:Container;
    player1 = new Player();
    private Sky1:TilingSprite = new TilingSprite(Texture.from("Sky1"), 1280,720);
    private Sky2:TilingSprite = new TilingSprite(Texture.from("Sky2"), 1280,720);
    private Sky3:TilingSprite = new TilingSprite(Texture.from("Sky3"), 1280,720);
    private Bridge:TilingSprite = new TilingSprite(Texture.from("Bridge"), 1280,720);
    Truck1:Truck = new Truck();
    Sign1:Sign = new Sign();
    Bike1:Bike = new Bike();
    
    private curtain:Graphics;
    private PauseW: NineSlicePlane = new NineSlicePlane(
        Texture.from("Blue"),
        35,35,35,35
    )
    
    private Lose: NineSlicePlane = new NineSlicePlane(
        Texture.from("Blue"),
        35,35,35,35
    )

    //----------SPRITES----------//
    SndOff: Sprite = Sprite.from("SndOff");
    SndOn: Sprite = Sprite.from("SndOn");
    Retry: Sprite = Sprite.from("Retry");
    Menu: Sprite = Sprite.from("Menu");
    Play: Sprite = Sprite.from("Play");
    Pause: Sprite = Sprite.from("Pause");
    Death1: Sprite = Sprite.from("Death1");
    Death2: Sprite = Sprite.from("Death2");
    Beer: Sprite = Sprite.from("Beer");
    Beer2: Sprite = Sprite.from("Beer");
    Beer3: Sprite = Sprite.from("Beer");
    
    //------------Sounds_&_Music------------//
    private sndMG = sound.find("MusicGame");
    private Ring = sound.find("Ring");
    private BeerOpen = sound.find("BeerOpen");
    private SFXDown = sound.find("SFXDown");
    private SFXImpact = sound.find("SFXImpact");
    private SFXImpact2 = sound.find("SFXImpact2");
    
    //------------TextStyles------------//
    tstyle = new TextStyle({
        fontSize: 50,
        fontFamily: "Minecraft",
        fill: "white",
        dropShadow: true,
        dropShadowAngle: 0.7,
    dropShadowDistance: 5,
    });

    tstyleTap = new TextStyle({
        fontSize: 30,
        fontFamily: "Minecraft",
        fill: 0x000000
    });

    //----------TEXTS----------//
    TScore = new Text("Score: 0",this.tstyle);
    TScore2 = new Text("Score: 0",this.tstyle);
    TPause = new Text("Pause",this.tstyle);
    TPlay = new Text("Play",this.tstyle);
    TRetry = new Text("Retry",this.tstyle);
    TMenu = new Text("Menu",this.tstyle);
    TStarting = new Text("Starting in",this.tstyle);
    T1 = new Text("1",this.tstyle);
    T2 = new Text("2",this.tstyle);
    T3 = new Text("3",this.tstyle);
    TLose = new Text("Continue?",this.tstyle);
    TContinue = new Text("Continue",this.tstyle);
    Tx = new Text("X",this.tstyle);
    TBeers = new Text("0", this.tstyle);
    TBeers2 = new Text("0", this.tstyle);
    Tap = new Text("Tap to play!", this.tstyleTap);


    //----------BOOLEANS----------//
    BoolStng: boolean = false;
    Loser = false;
    TruckUp = false;
    FreeSpace: boolean = false;
    Ready1 = false; //Perder una sola vez
    public isPause = false;
    okayaux: Boolean = false;
    isIdle: boolean = true;
    OnceIdle: boolean = false;

    //----------NUMBERS----------//
    TimeStng = 0;
    V1R = 600;
    V1L = 400;
    Vxi = 0;
    Vxf = 0;
    lasty:number = 0;
    private Firsty:number = 0;
    private Lasty:number = 0;
    PointsBeer = 0;
    Score:number = 0;
    private gameSpeed = 1;
    BridgeVelocity = 6;
    cloud1Velocity = this.BridgeVelocity / 2;
    cloud2Velocity = this.BridgeVelocity / 4;
    gameSpeedAux: number = 0;
    PriceBeers = 10;

    
    private Stng:Container;

    BM1 = new BeersManager();

    private Dust: Emitter;
    private Smoke: Emitter;
    curtain2: Graphics;

    constructor(){
        super();

        this.Tx.text = "X" + this.PriceBeers;
        this.world = new Container();
        this.Stng = new Container();

        this.world = new Container();
        this.world.addChild(this.Sky1);
        this.world.addChild(this.Sky2);
        this.world.addChild(this.Sky3);
        this.world.addChild(this.Bridge);

        this.world.addChild(this.player1);

        this.player1.position.set(100,480);

        this.Tap.angle= -15;
        this.Tap.pivot.set(this.Tap.width/2,this.Tap.height/2);
        this.Tap.position.set(this.player1.position.x*2,this.player1.position.y);
        this.world.addChild(this.Tap);

        new Tween(this.Tap)
            .to({angle: 15, scale: {x:1.1,y:1.1}},5000)
            .yoyo(true)
            .repeat(Infinity)
            .start();


        this.GenerateTruck();
        this.Truck1.position.set(-400,352);
        this.world.addChild(this.Truck1);

        this.Sign1.position.set(600,125);
        this.GenerateSign();
        this.world.addChild(this.Sign1);

        this.Bike1.position.set(-2500,515);
        this.GenerateBike();
        this.world.addChild(this.Bike1);

        this.TScore.position.set(20,15);

        this.world.addChild(this.TScore);

        this.Pause.position.set(1196,15);
        this.world.addChild(this.Pause);

        this.Beer.position.set(500,10);
        this.world.addChild(this.Beer);
        
        this.PauseW.addChild(this.SndOff);
        this.SndOff.position.set(10,10);

        this.PauseW.addChild(this.SndOn);

        this.PauseW.pivot.set(this.PauseW.width/2,this.PauseW.height/2);
        this.PauseW.width = 600; //600
        this.PauseW.height = 300;//300
        this.PauseW.pivot.set(this.PauseW.width/2,this.PauseW.height/2);
        this.PauseW.position.set(1280/2,720/2);
        this.PauseW.visible = true;

        this.PauseW.addChild(this.TPause);
        this.TPause.pivot.x = (this.TPause.width/2);
        this.TPause.position.set(this.PauseW.width/2,10);


        
        //------------Iconos de la pausa------------//
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
        this.Lose.addChild(this.Menu);
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

        
        
        this.world.addChild(this.BM1);
        this.BM1.GenerateArray(this.Truck1, this.Bike1);

        this.curtain2 = new Graphics;
        this.curtain2.beginFill(0x000000,0.7);
        this.curtain2.drawRect(0,0,1280,720);
        this.curtain2.endFill();
        this.curtain2.visible = false;

        this.curtain = new Graphics;
        this.curtain.beginFill(0x000000,0.7);
        this.curtain.drawRect(0,0,1280,720);
        this.curtain.endFill();


        //------------Particles------------//
        this.Dust = new Emitter(this.world, upgradeConfig(DustParticle, Texture.from("DustP")));
        this.Dust.spawnPos.set(this.player1.position.x,this.player1.position.y + 150);
        this.Dust.emit = false;

        this.Smoke = new Emitter(this.Truck1, upgradeConfig(SmokeParticle, Texture.from("SmokeP")));
        this.Smoke.spawnPos.set(0,230);
        this.Smoke.emit = true;

        this.curtain.visible = false;
        
        this.curtain.addChild(this.PauseW);
        this.curtain2.filters = [new BlurFilter];
        
        this.addChild(this.world);
        this.addChild(this.curtain);

        this.Retry.on("pointertap",this.onTouchStartRetry,this);
        this.Retry.interactive = true;

        this.Pause.on("pointertap",this.onTouchStartPause,this);
        this.Pause.interactive = true;

        this.Play.on("pointertap",this.onTouchStartPlay,this);
        this.Play.interactive = true;

        this.Menu.on("pointertap",this.onTouchStartHome,this);
        this.Menu.interactive = true;

        this.SndOn.on("pointertap",this.onTouchStartSndOn,this);
        this.SndOn.interactive = true;
        this.SndOn.position.set(10,10);

        this.SndOff.on("pointertap",this.onTouchStartSndOff,this);
        this.SndOff.interactive = true;
        
        if(sound.volumeAll == 1){
            this.SndOff.visible = false;
        }
        else if (sound.volumeAll == 0){
            this.SndOn.visible = false;
        }
        
        this.Beer2.on("pointertap",this.onTouchStartBeer,this);
        this.Beer2.interactive = true;

        this.Stng.addChild(this.T1);
        this.Stng.addChild(this.T2);
        this.Stng.addChild(this.T3);
        this.Stng.addChild(this.TStarting);
        this.addChild(this.Stng);
        this.Stng.visible = false;

        this.TStarting.pivot.x = (this.TStarting.width/2);
        this.TStarting.pivot.y = (this.TStarting.height/2);
        this.TStarting.scale.set(0.75);
        this.TStarting.position.set(SceneManager.WIDTH/2,SceneManager.HEIGTH/2);

        this.T1.pivot.x = (this.T1.width/2);
        this.T1.scale.set(0.5);
        this.T1.position.set(this.TStarting.x,this.TStarting.y + 35);
        this.T1.visible = false;

        this.T2.pivot.x = (this.T2.width/2);
        this.T2.scale.set(0.5);
        this.T2.position.set(this.TStarting.x,this.TStarting.y + 35);
        this.T2.visible = false;

        this.T3.pivot.x = (this.T3.width/2);
        this.T3.scale.set(0.5);
        this.T3.position.set(this.TStarting.x,this.TStarting.y + 35);
        this.T3.visible = false;

        this.Beer.addChild(this.TBeers);
        this.TBeers.position.set(80,10);

        this.Lose.width = 600;
        this.Lose.height = 300;
        this.Lose.pivot.set(this.Lose.width/2,this.Lose.height/2);
        this.Lose.position.set(1280/2,720/2);
        this.addChild(this.Lose);
        this.Lose.visible = false;

        this.Beer2.pivot.set(this.Beer2.width/2,this.Beer2.height/2);
        this.Beer2.position.set(this.PauseW.width/1.25,220);
        this.Lose.addChild(this.Beer2);

        this.Beer2.addChild(this.Tx);
        this.Tx.position.set(60,20);
        this.Tx.scale.set(0.5,0.5);

        this.Beer2.addChild(this.TContinue);
        this.TContinue.scale.set(0.4);
        this.TContinue.pivot.set(this.TContinue.width/2,this.TContinue.height/2);
        this.TContinue.position.set(10,80);

        this.TLose.pivot.set(this.TLose.width/2,this.TLose.height/2);
        this.TLose.position.set(this.Lose.width/2,50);
        this.Lose.addChild(this.TLose);
        this.Lose.addChild(this.TScore2);
        this.Lose.addChild(this.TBeers2);

        this.TScore2.pivot.set(this.TScore2.width/2,this.TScore2.height/2);
        this.TScore2.scale.set(0.6,0.6);
        this.TScore2.position.y = (this.Lose.height/3) + 20;
        this.TScore2.position.x = this.Lose.width/(4/3);

        this.Lose.addChild(this.Beer3);
        this.Beer3.position.y = (this.Lose.height/3) + 20;
        this.Beer3.position.x = this.Lose.width/6;

        this.Beer3.addChild(this.TBeers2);
        this.Beer3.pivot.set(this.Beer3.width/2,this.Beer3.height/2);
        this.Beer3.scale.set(0.75,0.75);
        this.TBeers2.scale.set(0.75,0.75);

        this.TBeers2.position.set(80,15);

        this.addChild(this.Death1);
        this.Death1.visible = false;

        this.world.addChild(this.Death2);
        this.Death2.visible = false;
        this.Death2.position.set(10,540);
        this.world.addChild(this.curtain2);

        //Activamos que la escena sea interactiva para poder hacer los slides
        this.interactive = true;
        if(this.isIdle){
            this.on("pointerdown",this.setIdle,this);
        }

        if(this.isIdle){
            this.on("pointerdown",(e)=>{ this.Firsty = e.data.global.y; }); //Obtenemos el punto en y inicial
            this.on("pointerup",(e)=>{ //Cuando se suelta nos fijamos si y esta arriba o abajo del punto inicial
                this.Lasty = e.data.global.y;
                if(this.Firsty>this.Lasty && !this.isPause){
                 this.player1.JumpStart();
                }
                 else if(this.Firsty<this.Lasty && !this.isPause){
                    if(this.player1.isJumping){
                        this.player1.letsDown();
                    }
                    else{
                        this.player1.fRoll();
                    }
                    
                 }
            });
        }
        
    }

    public setIdle():void{
        if(!this.OnceIdle){
            this.OnceIdle = true;
            this.Tap.visible = false;
            this.isIdle = false;
            this.player1.Cacho.playState("Run");
            sound.play("MusicGame",{
                volume: 0.35,
                loop: true,
                singleInstance:true
            });
        }
    }


    public update(frame:number, _deltaMS:number ){

        //Se actualizan las particulas
        this.Dust.update(_deltaMS/1000);
        this.Smoke.update(_deltaMS/1000);

        if(checkCollision(this.player1.getHitbox(),this.Truck1.getHitbox())){
            this.Loser = true;
        }
        if(checkCollision(this.player1.getHitbox(),this.Bike1.getHitbox3())){
            this.Loser = true;
        }
        if(checkCollision(this.player1.getHitbox(),this.Sign1.getHitbox())){
            this.Loser = true;
        }


        if(checkCollision(this.player1.getHitbox(),this.Truck1.getHitbox2())){
            this.doRun();
        }
        else if(checkCollision(this.player1.getHitbox(),this.Truck1.getHitbox3())){
            this.doRun();
        }
        else if(checkCollision(this.player1.getHitbox(),this.Truck1.getHitbox4())){
            this.doRun();
        }
        else if(checkCollision(this.player1.getHitbox(),this.Bike1.getHitbox2())){
            this.Ring.play({singleInstance:true});
            this.doRun();
        }
        else if(this.TruckUp && !this.player1.isJumping){
            this.player1.isDown = true;
            this.TruckUp = false;
            this.player1.Cacho.playState("JumpDown");
        }
       
        if(!this.isPause && !this.Loser && !this.isIdle){
            this.gameSpeed += 0.5;
            this.gameSpeedAux = this.gameSpeed;
            this.player1.setGS(this.gameSpeed);
            this.Score += this.gameSpeed/1000;
            this.TScore.text = "Score: " +String(Math.round(this.Score));
            this.TScore2.text = "Score: " +String(Math.round(this.Score));
            this.player1.update(frame/* ,_deltaFrame */);

            this.Sky1.tilePosition.x -= this.gameSpeed * frame/1000;
            this.Sky2.tilePosition.x -= this.cloud2Velocity + this.gameSpeed * frame/1000;
            this.Sky3.tilePosition.x -= this.cloud1Velocity + this.gameSpeed * frame/1000;
            this.Bridge.tilePosition.x -= this.BridgeVelocity + this.gameSpeed * frame/1000;
            this.Truck1.position.x -= this.BridgeVelocity + this.gameSpeed * frame/1000;
            this.Sign1.position.x -= this.BridgeVelocity + this.gameSpeed * frame/1000;
            this.Bike1.position.x -= this.BridgeVelocity + this.gameSpeed * frame/1000;

            this.BM1.Update(this.player1.getHitbox(),this.Truck1, (this.BridgeVelocity + this.gameSpeed * frame/1000),this.Bike1);
            this.PointsBeer = this.BM1.getPoints();
            this.TBeers.text = (this.PointsBeer);
            this.TBeers2.text = (this.PointsBeer);
            if(this.Truck1.position.x + this.Truck1.width < 0){
                this.GenerateTruck();
            }
            if(this.Sign1.position.x + this.Sign1.width < 0){
                this.GenerateSign();
            }
            if(this.Bike1.position.x + this.Bike1.width < 0){
                this.GenerateBike();
            }
        }

        else if (!this.Loser){
            if(this.BoolStng){
                if(this.TimeStng < Date.now() - 800){
                    this.T3.visible = false;
                    this.T2.visible = true;
                }
                else{this.T3.scale.set(this.T3.scale.x + 0.01,this.T3.scale.y + 0.01);}

                if((this.TimeStng+800) < Date.now() - 800 ){
                    this.T2.visible = false;
                    this.T1.visible = true;
                }
                else if (this.T2.visible){this.T2.scale.set(this.T2.scale.x + 0.01,this.T2.scale.y + 0.01);}

                if((this.TimeStng+1600) < Date.now() - 800){
                    this.T2.visible = false;
                    this.T3.visible = false;
                    this.T1.visible = false;
                    this.isPause = false;
                    this.BoolStng = false;
                    this.Stng.visible = false;
                    this.T1.scale.set(0.5);
                    this.T2.scale.set(0.5);
                    this.T3.scale.set(0.5);
                    this.player1.Cacho.play();
                    this.Pause.interactive = true;
                    this.curtain2.visible = false;
                    this.world.filters?.pop();
                }
                else if (this.T1.visible){this.T1.scale.set(this.T1.scale.x + 0.01,this.T1.scale.y + 0.01);}

            }   
        }
        
        if(this.Loser && !this.Ready1){
           this.Death1.position.set(this.player1.position.x,this.player1.position.y-20);
           this.SFXDown.play({speed:1.2});
           new Tween(this.Death1)
           .to({x:10, y:530} ,1500)
           .onComplete(()=>{
                this.Death1.visible = false;
                this.Death2.visible = true;
                this.Death2.y -= 25; 
                this.Lose.visible = true;
                this.Lose.addChild(this.Menu);
                this.Dust.emitNow();
                this.world.filters = [new BlurFilter];
                this.curtain2.visible = true;
                this.SFXImpact.play({
                    volume:4
                });
                this.SFXImpact2.play({
                    volume:4
                });
           })
           .start();
            this.player1.visible = false;
            this.Death1.visible = true;
            this.gameSpeed = 0;
            this.Ready1 = true;
        }  
    }
    private doRun():void{
        if(!this.player1.isJumping){
            this.player1.isDown = false;
            this.player1.isJumping = false;
            this.player1.walkingObject = true;
            this.TruckUp = true;
            this.player1.Cacho.playState("Run");
        }
        
    }
    private GenerateTruck():void{
        this.okayaux = false;
        while(!this.okayaux){
            this.Truck1.position.x = 1280 + 5000*Math.random();
            if(checkCollision(this.Sign1.getHitbox3(),this.Truck1.getHitbox())||
            checkCollision(this.Sign1.getHitbox3(),this.Truck1.getHitbox4()) ||
            checkCollision(this.Bike1.getHitbox(),this.Truck1.getHitbox4()) ||
            checkCollision(this.Bike1.getHitbox(),this.Truck1.getHitbox())){
                this.okayaux = false;  
            }
            else{
                this.okayaux = true;
            }
        }
        this.BM1.relocationArray(this.Truck1,this.Bike1);
    }

    private GenerateSign():void{
        this.okayaux = false;
        while(!this.okayaux){
            this.Sign1.position.x = 1280 + 5000*Math.random();
            if(checkCollision(this.Sign1.getHitbox3(),this.Truck1.getHitbox())||
            checkCollision(this.Sign1.getHitbox3(),this.Truck1.getHitbox4()) ||
            checkCollision(this.Sign1.getHitbox3(),this.Bike1.getHitbox())
            ){
                this.okayaux = false;
            }
            else{
                this.okayaux = true;
            }
        }
    }

    private GenerateBike():void{
        this.okayaux = false;
        while(!this.okayaux){
            this.Bike1.position.x = 1280 + 5000*Math.random();
            if(
            checkCollision(this.Bike1.getHitbox(),this.Truck1.getHitbox())||
            checkCollision(this.Bike1.getHitbox(),this.Truck1.getHitbox4()) ||
            checkCollision(this.Bike1.getHitbox(),this.Sign1.getHitbox3())
            )
            {
                this.okayaux = false;
            }
            else{
                this.okayaux = true;
            }
        }
        this.BM1.relocationArray(this.Truck1,this.Bike1);
    }

    private onTouchStartBeer():void{
        if(this.PointsBeer >= this.PriceBeers){
            this.PointsBeer -= this.PriceBeers;
            this.PriceBeers *= 2;
            this.Tx.text = "X" + this.PriceBeers;
            this.TBeers.text = (this.PointsBeer);
            this.TBeers2.text = (this.PointsBeer);
            this.BM1.setPoints(this.PointsBeer);
            this.Loser = false;
            this.player1.visible = true;
            this.Death1.visible = false;
            this.Death2.visible = false;
            this.Death2.y += 25; 
            this.gameSpeed = this.gameSpeedAux;
            this.Ready1 = false;
            this.Lose.visible = false;
            this.PauseW.addChild(this.Menu);
            this.GenerateTruck();
            this.GenerateBike();
            this.GenerateSign();
            this.BeerOpen.play();
            this.curtain2.visible = false;
            this.world.filters?.pop();
            this.BM1.relocationDead();
        }
    }
    
    private onTouchStartRetry():void{
        this.sndMG.stop();
        SceneManager.ChangeScene(new SceneGame());
    }

    private onTouchStartPause():void{
        if(!this.Loser){
            this.world.filters = [new BlurFilter];
            this.isPause = true;
            this.PauseW.addChild(this.Menu);
            this.Pause.visible = false;
            this.curtain.visible = true;
            this.Pause.interactive = false;
            this.player1.Cacho.stop();
        }
    }
    
    private onTouchStartPlay():void{
        this.T3.visible = true;
        this.curtain.visible = false;
        this.Pause.visible = true;
        this.TimeStng = Date.now();
        this.BoolStng = true;
        this.Stng.visible = true;
        this.curtain2.visible = true;
    }

    private onTouchStartHome():void{
        this.sndMG.stop();
        SceneManager.ChangeScene(new SceneMenu());
    }

    private onTouchStartSndOn():void{
        sound.volumeAll = 0;
        this.SndOn.visible = false;
        this.SndOff.visible = true;
    }

    private onTouchStartSndOff():void{
        sound.volumeAll = 1;
        this.SndOn.visible = true;
        this.SndOff.visible = false;
    }
}