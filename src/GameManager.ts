//import { Container} from "pixi.js";
//import { SceneMenu } from "./SceneMenu";
import { SceneGame } from "./SceneGame";
import { IUpdateable } from "./IUpdateable";
import { Container } from "pixi.js";
//import { SceneMenu } from "./SceneMenu";
//import { Ticker } from "pixi.js";

export class GameManager extends Container implements IUpdateable{
    public SceneActual = new SceneGame(this);
    constructor(scrwidth:number){
        super();
        scrwidth;
        this.addChild(this.SceneActual);
        //this.SceneActual.update(_deltaTime:number,_deltaFrame:number);
    }
    public update(_deltaTime:number/* ,_deltaFrame:number */){
        this.SceneActual.update(_deltaTime/* ,_deltaFrame */);
    }
    public ChangeScene():void{
       // this.SceneActual.
        //this.SceneActual = new SceneMenu();
    }
}