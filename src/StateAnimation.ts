import { AnimatedSprite, Container, Texture } from "pixi.js";

export class StateAnimation extends Container{

    Stop = false;
    private states:Map<string,AnimatedSprite> = new Map();
    currentState = this.states.get("");
    
    public playState(stateName: string){
        this.removeChildren();
        this.currentState = this.states.get(stateName);
        if(this.currentState){
            this.addChild(this.currentState);
        }
    }

    public addState(stateName: string, frames: Texture[] | string[], animationSpeed:number = 0.12, loop:boolean = true){
        const texArray:Texture[] = [];
        for(const tex of frames){
            if(typeof tex == "string"){
                texArray.push(Texture.from(tex));
            }
            else{
                texArray.push(tex);
            }
        }

        const tempAnim:AnimatedSprite = new AnimatedSprite(texArray);
        tempAnim.animationSpeed = animationSpeed;
        tempAnim.loop = loop;
        tempAnim.play();
        this.states.set(stateName, tempAnim);
    }

    public update(frames:number){
        if(!this.Stop){
            for (const state of this.states.values()) {
                state.update(frames);
            }
        }
    }

    public stop(){
        this.Stop = true;
        this.currentState?.stop();
    }
    public play(){
        this.Stop = false;
        this.currentState?.play();
    }
}