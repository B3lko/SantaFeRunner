import { Assets, Graphics, Text } from "pixi.js";
import { SceneManager } from "./SceneManager";
import { SceneBase } from "./SceneBase";
import { SceneMenu } from "../SceneMenu";
import { assets } from "../assets";

export class LoaderScene extends SceneBase{

    public override update(_deltaFrame: number, _deltaTime?: number | undefined): void {}

    public bar: Graphics;
    public BG: Graphics;
    public TLoading: Text;

    constructor(){
        super();

        this.BG = new Graphics();
        this.BG.beginFill(0x0000000);
        this.BG.drawRect(0,0,SceneManager.WIDTH,SceneManager.HEIGTH);
        this.BG.endFill();
        this.addChild(this.BG);
 

        this.bar = new Graphics();
        this.setBarPercent(0);
        this.bar.pivot.x = this.bar.width / 2;
        this.bar.pivot.y = this.bar.height / 2;
        this.bar.position.x = SceneManager.WIDTH / 2;
        this.bar.position.y = SceneManager.HEIGTH / 2;
        this.addChild(this.bar);   
        this.downAssets();


        this.TLoading = new Text("L o a d i n g . . .", {fontWeight:"bolder", fontSize:30, fill:0xFFFFFF });
        this.TLoading.anchor.set(0.5);
        this.TLoading.position.set(SceneManager.WIDTH/2,SceneManager.HEIGTH/2);
        this.addChild(this.TLoading)
    }

    private async downAssets(){
        Assets.addBundle("myAssets", assets); 
        Assets.loadBundle(["myAssets"]).then(this.whenLoadFinished.bind(this));
        await Assets.loadBundle(["myAssets"], this.setBarPercent.bind(this));
    }

    private setBarPercent(percent:number){
        const factor = percent;
        this.bar.clear();

        this.bar.beginFill(0xFF00000);
        this.bar.drawRect(0,0,SceneManager.WIDTH * 0.8 * factor,SceneManager.HEIGTH * 0.1);
        this.bar.endFill();

        this.bar.lineStyle(5, 0xFFFFFF, 1);
        this.bar.beginFill(0xFF0000,0);
        this.bar.drawRect(0,0,SceneManager.WIDTH * 0.8,SceneManager.HEIGTH * 0.1);
        this.bar.endFill();
    }

    private whenLoadFinished(){
        SceneManager.ChangeScene(new SceneMenu);
    }
}