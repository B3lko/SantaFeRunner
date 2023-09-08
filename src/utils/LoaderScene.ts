import { Assets, Graphics } from "pixi.js";
import { SceneManager } from "./SceneManager";
import { SceneBase } from "./SceneBase";
import { SceneMenu } from "../SceneMenu";
import { assets } from "../assets";

export class LoaderScene extends SceneBase{

    public override update(_deltaFrame: number, _deltaTime?: number | undefined): void {}

    public bar: Graphics;

    constructor(){
        super();
        this.bar = new Graphics();
        this.setBarPercent(0);
        this.bar.pivot.x = this.bar.width / 2;
        this.bar.pivot.y = this.bar.height / 2;
        this.bar.position.x = SceneManager.WIDTH / 2;
        this.bar.position.y = SceneManager.HEIGTH / 2;
        this.addChild(this.bar);   

        this.downAssets();
    }

    private downAssets(){
        Assets.addBundle("myAssets", assets); 
        Assets.loadBundle(["myAssets"]).then(this.whenLoadFinished.bind(this));
        //await Assets.loadBundle(bundleIds, this.setBarPercent.bind(this));
    }

    private setBarPercent(percent:number){
        //this.bar.scale.x = (percent/100)

        const factor = percent/100;
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