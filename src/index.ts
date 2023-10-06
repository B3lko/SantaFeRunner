import { SceneManager } from "./utils/SceneManager";
import { LoaderScene } from "./utils/LoaderScene";
import { Capacitor } from "@capacitor/core";
import { StatusBar } from "@capacitor/status-bar";
import { KeepAwake } from "@capacitor-community/keep-awake";
import { App } from "@capacitor/app";
import { sound } from "@pixi/sound";

SceneManager.initialize();
SceneManager.ChangeScene(new LoaderScene());

window.addEventListener("contextmenu", e=> e.preventDefault());

if(Capacitor.isNativePlatform()){
    StatusBar.hide();
    KeepAwake.keepAwake();
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
}