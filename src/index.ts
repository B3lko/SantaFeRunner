import { SceneManager } from "./utils/SceneManager";
import { LoaderScene } from "./utils/LoaderScene";
import { Capacitor } from "@capacitor/core";
import { StatusBar } from "@capacitor/status-bar";
import { KeepAwake } from "@capacitor-community/keep-awake";
import { App } from "@capacitor/app";
import { NavigationBar } from "@hugotomazi/capacitor-navigation-bar";
import { sound } from "@pixi/sound";

SceneManager.initialize();
SceneManager.ChangeScene(new LoaderScene());

window.addEventListener("contextmenu", e=> e.preventDefault());

if(Capacitor.isNativePlatform()){
    StatusBar.hide();
    NavigationBar.hide();
    KeepAwake.keepAwake();
    App.addListener("appStateChange", (e) => {
        if(e.isActive){
            //esumo el juego
            sound.play
        }
        else{
//pauso el juego
sound.pause;
        }
    });
}