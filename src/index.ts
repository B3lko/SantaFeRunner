import { Application, Assets } from 'pixi.js'
import { assets } from './assets';
import { GameManager } from './GameManager';
//import { SceneGame } from './SceneGame';

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 1280,
	height: 720
	//sharedTicker.
});

//console.log(app.ticker.deltaTime);
//const GM = new GameManager();
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

Assets.addBundle("myAssets", assets); 
Assets.loadBundle(["myAssets"]).then(() => {
	const GM = new GameManager(app.screen.width);
	app.stage.addChild(GM);
	//const SG = new SceneGame();
	//app.stage.addChild(SG);
	//Ticker.targetFPMS = 1/1000;
	//Ticker.shared.deltaMS = 60/100;
	//Ticker.shared.deltaTime = 1;
	//app.ticker.deltaMS=16.66;



	/* window.addEventListener('mousemove', (event) => {
		// Obtener la posición del mouse relativa al área de la ventana
		const mouseX = event.clientX;
		const mouseY = event.clientY;
	  
		// Puedes usar las coordenadas mouseX y mouseY para lo que necesites
		console.log("Posición del mouse: " + mouseX + " " + mouseY);
	  }); */




	app.ticker.add(function(deltaMS){

		GM.update(deltaMS); 
		//console.log("yo"+deltaMS);
	})
	
	//Ticker.shared.speed = 300/833;
	/* 	Ticker.shared.add(update,this); */	
})


/*  function update(deltaFrame:number){
	GM.update(/* Ticker.shared.deltaMS 60/1000, deltaFrame); 
	console.log("yo"+deltaFrame);
	console.log("delta: "+deltaFrame);
}  */