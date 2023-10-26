const boton=document.getElementById("boton");
const cartasmaquina=document.getElementById("cartasmaquina")
const cartasjugador=document.getElementById("cartasjugador")
const tablero=document.getElementById("tablero")
const apoyacartas=document.getElementById("apoyacartas")

const colores=["rojo","amarillo","verde","azul"];
const numeros=["1","2","3","4","5","6","7","8","9","0","+2","cambiosentido","prohibido","cambiocolor","+4"];
const cartas=[];





const barajamaquina=[];
const barajajugador=[];







const darcartas=()=>{

for (let i = 0; i < 7; i++) {
    let random=Math.floor(Math.random()*cartas.length)
    let carta=document.createElement("IMG")
    carta.src="./assets/imagenes/"+cartas[random]+ ".PNG"
    carta.classList.add("cartas")
    //Probar solo con array
    /* jugador.appendChild(carta) */
    barajajugador.push(carta)
    cartas.splice(random,1)
}
for (let i = 0; i < 7; i++) {

    let random=Math.floor(Math.random()*cartas.length)
    let carta=document.createElement("IMG")
    carta.src="./assets/imagenes/cartaUNO.PNG"
    carta.classList.add("cartas")

    cartasmaquina.appendChild(carta)
    barajamaquina.push(cartas[random])
    cartas.splice(random,1)
}

cartasmaquina.style.display="flex"
cartasjugador.style.display="flex"
tablero.style.display="flex"


barajajugador.forEach(carta=> {
    cartasjugador.appendChild(carta)
    
});


console.log(barajamaquina)


}



const barajearmazo=()=>{
    for (let i = 0; i < cartas.length; i++) {
       let random=Math.floor(Math.random()*cartas.length)
       let aux;
       aux=cartas[i]
       cartas[i]=cartas[random];
       cartas[random]=aux
        
    }
}


const generarmazo=()=>{
  
    numeros.forEach(numero => {
        colores.forEach(color=> {
            if (numero=="+4"||numero=="cambiocolor") {
                cartas.push(numero)
            }else{
                cartas.push(numero+color)
            }
        });
    });

    barajearmazo()
   

}


const iniciarJuego=(event)=>{

boton.style.display="none";
generarmazo();
darcartas();



}


//logica del juego




const turnomaquina=()=>{
console.log(apoyacartas.children)
const cartamedio=apoyacartas.lastChild.src;
const valorcarta=cartamedio.substring(38,cartamedio.lastIndexOf("."))


let  color="";
let numero="";

for (let i = 0; i < valorcarta.length; i++) {
    if (i === 0 && valorcarta[i] === "+" && !isNaN(valorcarta[i + 1])) {
        numero = "+" + valorcarta[i + 1];
        color=valorcarta.substring(i + 2);
        i++;
    } else if (!isNaN(valorcarta[i])) {
        numero = valorcarta[i];
        color = valorcarta.substring(i + 1);
        break; 
    } else if (valorcarta.substring(i, i + 11) === "cambiocolor") {
        numero = "cambiocolor";
        color = "";
        break;
    } else if (valorcarta.substring(i, i + 13) === "cambiosentido") {
        numero = "cambiodesentido";
        color = valorcarta.substring(i + 13);
        break;
    }else if (valorcarta.substring(i, i + 9) === "prohibido") {
        numero = "prohibido";
        color = valorcarta.substring(i + 9);
        break;
    }
}


console.log(color)
console.log(numero)   



    
}


const turnoJugador=(event)=>{

if (event.target.nodeName== "IMG") {   
let valorcarta= event.target.src.substring(38,event.target.src.lastIndexOf("."));
console.log(valorcarta)


let carta = document.createElement("IMG");
carta.src="./assets/imagenes/"+valorcarta+".PNG";
carta.classList.add("cartas","posicioncartas")


if (barajajugador.length==7) {

   apoyacartas.appendChild(carta)
  
 let imageneliminar;
   barajajugador.forEach(x => {
    if (x.src == carta.src) {
        imageneliminar=x
    }
   })
   
   barajajugador.splice(barajajugador.lastIndexOf(imageneliminar),1);
   

  
  
   cartasjugador.innerHTML="";
  
    barajajugador.forEach(carta => {
        cartasjugador.append(carta)
    });

    
}






}
turnomaquina();

}






boton.addEventListener("click",iniciarJuego);
cartasjugador.addEventListener("click",turnoJugador) 