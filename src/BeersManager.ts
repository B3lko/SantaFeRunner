import { Container, Rectangle } from "pixi.js";
import { Beer } from "./Beer";
import { checkCollision } from "./IHitbox";
import { Tween } from "tweedle.js";
import { Truck } from "./Truck";
import { Bike } from "./Bike";
import { sound } from "@pixi/sound";

export class BeersManager extends Container{

    Points:number = 0;
    Min:number = 3;
    Max:number = 6;
    Size:number = 0;
    aux:boolean = false;
    BeersArray: Beer[] = [];
    private SFXPickUp = sound.find("SFXPickUp");

    constructor(){
        super();
    }

    public relocationArray(Truck:Truck, Bike:Bike):void{
        for (let i = 0; i < this.BeersArray.length; i++) {
            if(checkCollision(this.BeersArray[i].getBounds(),Truck.getHitbox5())){
                this.BeersArray[i].position.y = 250;
            }
            else if(checkCollision(this.BeersArray[i].getBounds(),Truck.getHitbox6())){
                this.BeersArray[i].position.y = 300;
            }
            else if(checkCollision(this.BeersArray[i].getBounds(),Truck.getHitbox7())){
                this.BeersArray[i].position.y = 400;
            }
            else if(checkCollision(this.BeersArray[i].getBounds(),Bike.getHitbox2())){
                this.BeersArray[i].y = 450;
            }
        }
    }

    public GenerateArray(Truck:Truck, Bike:Bike):void{
        //Se crea un nuevo array
        this.BeersArray = new Array();

        //Se le da un tamaño random entre los valores establecidos
        this.Size = Math.floor(Math.random() * (this.Max - this.Min) + this.Min);

        //Rellenamos el arreglo
        for (let i = 0; i < this.Size; i++) {
            this.BeersArray.push(new Beer());
            this.addChild(this.BeersArray[i]);
        } 

        //Le damos un valor random a la primera cerveza y las demas se acomodan a partir de esta
        this.BeersArray[0].position.set(Math.floor(Math.random() * (2000 - 1600) + 1600),552);
        for (let i = 1; i < this.Size; i++) {
            this.BeersArray[i].position.set(this.BeersArray[i-1].x + 100,552);
        }

        //Llamamos a la funcion para que las reacomode si colisionan con el camion o la bici 
        this.relocationArray(Truck, Bike);
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

    public Update(Player1:Rectangle, Truck:Truck,GameSpeed:number, Bike:Bike):void{
        for (let i = 0; i < this.BeersArray.length; i++){
            
            
            if(this.BeersArray[i] != null && !this.BeersArray[i].getState()){
                this.BeersArray[i].position.x -= GameSpeed;
                if(this.BeersArray[i].position.x <= -80){
                    this.BeersArray[i].setState(true);
                }
            }

            if(checkCollision(this.BeersArray[i].getHitbox(),Player1) && !this.BeersArray[i].getState()){
                this.BeersArray[i].setState(true);
                this.SFXPickUp.play({
                    speed:0.5,
                    volume:0.5,
                    singleInstance:true});
                new Tween(this.BeersArray[i])
                .to({x:500, y:10}, 500)
                .onComplete(()=>{
                    this.Points += 1;
                })
                .start();
            }
        }
         
        this.aux = false;

        for (let i = 0; i < this.BeersArray.length; i++) {
            if(!this.BeersArray[i].getState()){
                this.aux = true;
            }
        }
        
        if(this.aux == false){
            this.GenerateArray(Truck, Bike);
        }
    }

}