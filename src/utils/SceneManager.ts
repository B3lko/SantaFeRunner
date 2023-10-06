import { Application, Ticker } from "pixi.js";
import { Group } from "tweedle.js";
import { SceneBase } from "./SceneBase";

export namespace SceneManager{
    let currentScene:SceneBase;
    export const WIDTH = 1280;
    export const HEIGTH = 720;
    let app : Application;

    export function initialize(){

        if(app){
            console.log("Dont call initialize twice");
            return;
        }

        app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution:1,
            autoDensity: true,
            backgroundColor: 0x6495ed,
            width: 1280,
            height: 720
            //sharedTicker.
        });
        
        window.addEventListener("resize",()=>{
            const scaleX = window.innerWidth / app.screen.width; //window.innerWidth es el tamaño total de la pantalla 
            const scaleY = window.innerHeight/ app.screen.height;
            const scale = Math.min(scaleX,scaleY); 
        
            const gameWidth = Math.round(app.screen.width * scale);
            const gameHeight = Math.round(app.screen.height * scale); 
        
            const marginHorizontal = Math.floor((window.innerWidth - gameWidth) / 2); // toda la ventana - el juego = es tamaño de la barra negra entonces a eso /2
            const marginVertical = Math.floor((window.innerHeight - gameHeight) / 2);
        
            if (app.view.style) {	
                app.view.style!.width = gameWidth + "px";
                app.view.style!.height = gameHeight + "px";
                (app.view.style as any).marginLeft = marginHorizontal; //Es le dice a ts que es de otro tipo, le pedimos a ts que confie, es una especie de casteo de c++
                (app.view.style as any).marginRight = marginHorizontal;
                (app.view.style as any).marginTop = marginVertical;
                (app.view.style as any).marginBottom = marginVertical;
            }
        });
        
        window.dispatchEvent(new Event("resize")); //Es una funcion que hace un falso evento (siumula cambiar el tamaño) para que se acomode la pantalla
        Ticker.shared.add(update);
    }

    export function ChangeScene(newScene:SceneBase){
        if(currentScene){
            currentScene.destroy();
        }
        currentScene = newScene;
        app.stage.addChild(currentScene);
    }

    function update(framePassed:number){
        Group.shared.update();
        currentScene?.update(framePassed, Ticker.shared.elapsedMS);
    }

}