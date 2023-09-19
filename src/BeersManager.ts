import { Container, Rectangle } from "pixi.js";
import { Beer } from "./Beer";
import { checkCollision } from "./IHitbox";
import { Tween } from "tweedle.js";
import { Truck } from "./Truck";

export class BeersManager extends Container{

    Points:number = 0;
    Min:number = 3;
    Max:number = 6;
    Size:number = 0;
    aux:boolean = false;
    BeersArray: Beer[] = [];

    constructor(){
        super();
    }

    public GenerateArray(Truck:Truck):void{

        for (let i = 0; i < this.Size; i++) {
            this.BeersArray[i].destroy();
        }
        this.BeersArray = new Array();
        
        this.Size = Math.floor(Math.random() * (this.Max - this.Min) + this.Min);
        console.log(this.Size);

        //Rellenamos el arreglo
        for (let i = 0; i < this.Size; i++) {
            this.BeersArray.push(new Beer());
            this.addChild(this.BeersArray[i]);
        } 

        this.BeersArray[0].position.set(Math.floor(Math.random() * (2000 - 1600) + 1600),552);

        for (let i = 1; i < this.Size; i++) {
            this.BeersArray[i].position.set(this.BeersArray[i-1].x + 100,552);
        }

        for (let i = 0; i < this.Size; i++) {
            if(checkCollision(this.BeersArray[i].getBounds(),Truck.getHitbox5())){
                this.BeersArray[i].position.y = 250;
            }
            else if(checkCollision(this.BeersArray[i].getBounds(),Truck.getHitbox6())){
                this.BeersArray[i].position.y = 300;
            }
            else if(checkCollision(this.BeersArray[i].getBounds(),Truck.getHitbox7())){
                this.BeersArray[i].position.y = 400;
            }
        }
    }

    public getPoints():number{
        return this.Points;
    }

    public setPoints(Points:number):void{
        this.Points = Points;
    }

    public getPositions():Beer[]{
        return this.BeersArray;
    }

    public Update(Player1:Rectangle, Truck:Truck,GameSpeed:number):void{

        for (let i = 0; i < this.BeersArray.length; i++) {
            this.BeersArray[i].position.x -= GameSpeed;
        }

        for (let i = 0; i < this.BeersArray.length; i++){

            if(checkCollision(this.BeersArray[i].getHitbox(),Player1) && !this.BeersArray[i].getState()){
                this.BeersArray[i].setState(true);
                new Tween(this.BeersArray[i])
                 .to({x:500, y:10}, 1500)
                 .onComplete(()=>{
                    this.BeersArray[i].setVisible(false);
                    this.Points += 1;
                 })
                .start();
            }

            if(this.BeersArray[i].position.x <= -50 * GameSpeed && !this.BeersArray[i].getState()){
                this.BeersArray[i].setVisible(false);
            }  

        }
        
        for (let i = 0; i < this.BeersArray.length; i++) {
            this.aux = false;
            if(this.BeersArray[i].getVisible() == true){
                this.aux = true;
            }
        }
        
        if(this.aux == false){
            this.GenerateArray(Truck);
        }
    }

}