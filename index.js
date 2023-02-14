const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");
let planetOnDisplay = 0;
let mouseX = 0
let mouseY = 0
let mouseDown = 0;
let scale = .6
context.scale(scale,scale)
let scaleAjustada = 1/scale
let offsetX = canvas.offsetLeft
let offsetY = canvas.offsetTop
let canvasWidth = canvas.clientWidth * scaleAjustada;
let canvasHeight = canvas.clientHeight * scaleAjustada;
const nameOfPlanets = ["sun","earth","moon","jupiter", "marte", "netuno","saturno","urano","venus","mercurio"]
maior = undefined
let shiftDown = 0

/*
//DRAW LINES
context.strokeStyle = "purple";
context.lineWidth = 10;
context.beginPath();
context.moveTo(0, 0);
context.lineTo(250, 250);
context.lineTo(250, 500);
context.moveTo(500, 0);
context.lineTo(250, 250);
context.stroke();
*/
/*
//DRAW TRIANGLE
context.strokeStyle = "grey";
context.fillStyle = "yellow";
context.lineWidth = 10;
context.beginPath();
context.moveTo(250, 0);
context.lineTo(0, 250);
context.lineTo(500, 250);
context.lineTo(250, 0);
context.stroke();
context.fill();
*/
/*
//DRAW RECTANGLE
context.fillStyle = "black";
context.fillRect(0, 0, 250, 250);
context.strokeStyle = "black";
context.strokeRect(0, 0, 250, 250);

context.fillStyle = "red";
context.fillRect(0, 250, 250, 250);
context.strokeStyle = "black";
context.strokeRect(0, 250, 250, 250);

context.fillStyle = "green";
context.fillRect(250, 250, 250, 250);
context.strokeStyle = "black";
context.strokeRect(250, 250, 250, 250);

context.fillStyle = "blue";
context.fillRect(250, 0, 250, 250);
context.strokeStyle = "black";
context.strokeRect(250, 0, 250, 250);
*/

//DRAW CIRCLE
//(x, y, r, sAngle, eAngle, counterclockwise)
/*
context.fillStyle = "blue";
context.beginPath();
context.arc(canvasWidth/4, canvasHeight/2, 40, 0, 2 * Math.PI);
context.stroke();
context.fill();
*/

//DRAW TEXT
/*
context.font = "50px MV Boli";
context.fillStyle = "grey";
context.textAlign = "center";
context.fillText("YOU WIN!", canvas.width / 2, canvas.height / 2);
*/
const listOfPlanets = []
const g = 6.674484 * Math.pow(10,-11)
const massaTerra = Math.pow(5.9742,14)

//Funcção para criar planetas

createPlanet = function(namePlanet){
    let planet = ""
    switch (namePlanet){
        case "sun":
            planet = new Sol()
            break;

        case "earth":
            planet = new Planets()
            break;
        
        case "moon":
            planet = new Lua();
            break;
        case "jupiter":
            planet = new Jupiter()
            break;
        case "marte":
            planet = new Marte()
            break;
        case "netuno":
            planet = new Netuno()
            break;
        case "saturno":
            planet = new Saturno()
            break;
        case "urano":
            planet = new Urano();
            break;
        case "venus":
            planet = new Venus();
            break;
        case "mercurio":
            planet = new Mercuiro();
            break;
        case "black":
            planet = new BlackHole()
            break
        
    }
    if (namePlanet != "black") listOfPlanets[listOfPlanets.length] = planet;
    else listOfPlanets.unshift(planet);
        addEventListener("mousemove", (function (e) {
            planet.handleMouseMove(e);
    
        }));
    return planet;
}

//PAI DOS OBJETOS
class Planets{
    img = new Image()
    name = "Terra"
    source = "Images/Earth.png"
    x = canvasWidth/2;
    y = canvasHeight/2;
    acelh = 0;
    acelv = 0;
    hspd = 0;
    vspd = 0;
    mass = massaTerra;
    radius = 20;
    color ="blue"
    id = listOfPlanets.length
    marginDisplayX = 25 * scaleAjustada;
    move(){
        if(this.name == "Black Hole") this.mass*= 1.01
        for(let i = 0; i< listOfPlanets.length; i++)
        {
            if(listOfPlanets[i].id != this.id){
                
                let dis = Math.sqrt(Math.pow(listOfPlanets[i].x - this.x,2) + Math.pow(listOfPlanets[i].y - this.y,2))

                let forca = g * this.mass * listOfPlanets[i].mass/ (dis * dis)

                if(dis < Math.abs(250)) dis = 250;

                let disy = listOfPlanets[i].y - this.y;
                let disx = listOfPlanets[i].x - this.x;
                let seno = disy/dis
                let cose = disx/dis

                let acel = forca/this.mass;
                this.acelh = acel * cose;
                this.acelv = acel * seno;

                this.hspd += this.acelh;
			    this.vspd += this.acelv
                
            }
            
        }

        
    }

    realMove(){
        this.x += this.hspd;
        this.y += this.vspd
        
    }

    draw(){
        document.onkeydown = ((e) =>{
            if(e.key == "Shift") ++shiftDown
        })
        document.onkeyup = ((e) =>{
            if(e.key == "Shift") shiftDown = 0
        })

        if(shiftDown){
            var massaTodos = this.mass
            var centro_massa_x = this.mass * this.x
            var centro_massa_y = this.mass * this.y
            for(let i = 0; i< listOfPlanets.length; i++)
            {
                if(listOfPlanets[i].id != this.id){
            massaTodos += listOfPlanets[i].mass
            centro_massa_x +=  listOfPlanets[i].mass *  listOfPlanets[i].x
            centro_massa_y +=  listOfPlanets[i].mass *  listOfPlanets[i].y
                }
            }
            centro_massa_x = centro_massa_x/massaTodos;
            centro_massa_y = centro_massa_y/massaTodos
            context.beginPath();
            context.lineWidth = 2;
            context.moveTo(this.x, this.y);
            context.lineTo(centro_massa_x, centro_massa_y);
            context.stroke()
        }
        
        
        context.fillStyle = this.color;
        context.drawImage(this.img,this.x - this.radius,this.y - this.radius, this.radius * 2, this.radius* 2)
        
        this.img.src = this.source;
        
        
        if(planetOnDisplay == this.id)
        {

            document.body.onmousedown = function(e) { 
                if(e.button == 0)++mouseDown;
                
              }
              document.body.onmouseup = function(e) {
                if(e.button == 0) --mouseDown;
              }
            if(mouseDown)
            {
                
                this.x = mouseX;
                this.y = mouseY
            }
            var disMaior = Math.sqrt(Math.pow(this.x - maior.x,2) + Math.pow(this.y - maior.y,2))
            var velEscape = Math.sqrt(2 * g * maior.mass/disMaior)
            var velTang = Math.sqrt(Math.pow(this.vspd,2) + Math.pow(this.hspd,2))
            let dis = 30 * scaleAjustada
            context.fillStyle = "white"
            context.font = 20*scaleAjustada+"px Arial"
            context.fillText("Objeto: " +this.name,this.marginDisplayX, dis)
            context.fillText("Massa: " +this.mass ,this.marginDisplayX,dis *2)
            context.fillText("Velocidade Horizontal: " +this.hspd.toFixed(2) ,this.marginDisplayX,dis *3)
            context.fillText("Velocidade Vertical: " +this.vspd.toFixed(2) ,this.marginDisplayX,dis *4)
            context.fillText("Velocidade Tangencial: " + velTang.toFixed(2) ,this.marginDisplayX,dis*5)
            if(velEscape < velTang) {context.fillStyle = "green"}
            context.fillText("Velocidade de Escape: " + velEscape.toFixed(2) ,this.marginDisplayX,dis*6)
            context.fillStyle = "white"
            context.fillStyle = "lightblue"
            context.fillText("On Github erickcestari",this.marginDisplayX,dis * 31)
            
            context.strokeStyle = "red";

            
            
        }
    }
    handleMouseMove(e) {
        
        e.preventDefault();
        e.stopPropagation();
        mouseX = parseInt(e.clientX * scaleAjustada - offsetX);
        mouseY = parseInt(e.clientY * scaleAjustada - offsetY);
        var dx = mouseX - this.x;
        var dy = mouseY - this.y;
        var isInside = dx * dx + dy * dy <= this.radius * this.radius;
        for(let i = 0; i< listOfPlanets.length - 1; i++){
            if(listOfPlanets[i].x == listOfPlanets[i + 1].x && listOfPlanets[i].y == listOfPlanets[i +1].y){
                isInside = false;
            }
        }
        if (isInside) {
            
            
            planetOnDisplay = this.id;
            
        } 
    }
    
}

//Filhos do objeto

class Sol extends Planets{
    mass = massaTerra * 350
    radius = 80
    name = "Sol"
    color = "yellow"
    source = "Images/Sun.png"
}

class Lua extends Planets{
    name = "Lua"
    x = canvasWidth/2 -455;
    y = canvasHeight/2;
    mass = massaTerra * 0.01;
    radius = 15
    color = "gray"
    source = "Images/Moon.png"
}

class Jupiter extends Planets{
    name = "Jupiter"
    x = canvasWidth/2 -650;
    y = canvasHeight/2;
    mass = massaTerra * 10;
    radius = 30
    color = "gray"
    source = "Images/Jupiter.png"
}
class Marte extends Planets{
    name = "Marte"
    x = canvasWidth/2 -550;
    y = canvasHeight/2;
    mass = massaTerra * 0.6;
    radius = 18
    color = "red"
    source = "Images/Mars.png"
}
class Netuno extends Planets{
    name = "Netuno"
    x = canvasWidth/2 -1000;
    y = canvasHeight/2 - 20;
    mass = massaTerra * 0.9;
    radius = 18
    color = "blue"
    source = "Images/Netuno.png"
}
class Saturno extends Planets{
    name = "Saturno"
    x = canvasWidth/2 -750;
    y = canvasHeight/2;
    mass = massaTerra * 10;
    radius = 30
    color = "red"
    source = "Images/Saturn.png"
}
class Urano extends Planets{
    name = "Urano"
    x = canvasWidth/2 -900;
    y = canvasHeight/2 - 10;
    mass = massaTerra * 0.8;
    radius = 20
    color = "lightblue"
    source = "Images/Uranu.png"
}
class Venus extends Planets{
    name = "Vênus"
    x = canvasWidth/2 + 250;
    y = canvasHeight/2;
    mass = massaTerra * .95;
    radius = 20
    color = "gray"
    source = "Images/Venus.png"
}
class Mercuiro extends Planets{
    name = "Mercurio"
    x = canvasWidth/2  -200;
    y = canvasHeight/2;
    mass = massaTerra * 0.06;
    radius = 15
    color = "gray"
    source = "Images/Mercury.png"
}
class BlackHole extends Planets{
    name = "Black Hole"
    x = canvasWidth/2 + 1000;
    y = canvasHeight/2 ;
    mass = massaTerra * 100;
    radius = 100
    color = "black"
    source = "Images/Blackhole.png"
}
let terra = createPlanet("earth")
let lua = createPlanet("moon")
let sol = createPlanet("sun")
let jupiter = createPlanet("jupiter")
let marte = createPlanet("marte")
let netuno = createPlanet("netuno")
let saturno = createPlanet("saturno")
let uranu = createPlanet("urano")
let venus = createPlanet("venus")
let mercurio = createPlanet("mercurio")



mercurio.hspd = 1
mercurio.vspd = -2

venus.hspd = -.5;
venus.vspd = -2

lua.vspd = -1.2
lua.hspd = 1;

terra.hspd = 1
terra.vspd = -1.5
terra.x -= 400;

marte.hspd = 1
marte.vspd = -1

jupiter.hspd = 1
jupiter.vspd = -1

saturno.hspd = .4
saturno.vspd = -1

uranu.hspd = .5
uranu.vspd = -1

netuno.hspd = .5
netuno.vspd = -1

creatingPlanets = function(){
    
    window.onmousedown = function(e) { 
        if(e.button == 2)
        {
            let randomNumber = Math.floor(Math.random() * nameOfPlanets.length)
            let planet = createPlanet(nameOfPlanets[randomNumber])
            planet.x = mouseX;
            planet.y = mouseY
        }
    }
}

setInterval(step,16)

function step (){
    window.onkeydown = function(e){
        if(e.key == "b"){
            let hole = createPlanet("black")
            hole.x = mouseX;
            hole.y = mouseY;
        } 
    }
    zoom()
    defineMaior()
    context.fillStyle = "black";
    context.fillRect(0,0,Math.abs(canvasWidth),Math.abs(canvasHeight))
    creatingPlanets()
    for(let i = 0; i < listOfPlanets.length ; i++){
        listOfPlanets[i].move()
        listOfPlanets[i].realMove()
        listOfPlanets[i].draw()
    }
    
    
}

defineMaior = function(){
    var bigger = listOfPlanets[0]
    for(i of listOfPlanets){
        if(i.mass > bigger.mass) bigger = i;
    }
    maior = bigger;
    
}

zoom = function(){
    //TA FUNCIONANDO UHUUU!
    let inScale = 1
    window.onwheel = function(e){
    inScale += e.deltaY * -0.0002;
    
    scale += inScale - 1
    context.scale(scaleAjustada,scaleAjustada)
    context.scale(scale,scale)
    scaleAjustada = 1/scale
    canvasWidth = canvas.clientWidth * scaleAjustada;
    canvasHeight = canvas.clientHeight * scaleAjustada;
    console.log(canvasWidth)
    offsetX = canvas.offsetLeft
    offsetY = canvas.offsetTop
    
    }
    
}