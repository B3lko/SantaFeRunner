import { SceneManager } from "./utils/SceneManager";
import { LoaderScene } from "./utils/LoaderScene";

SceneManager.initialize();
SceneManager.ChangeScene(new LoaderScene());