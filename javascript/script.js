const boton=document.getElementById("boton");
const cartasmaquina=document.getElementById("cartasmaquina")
const cartasjugador=document.getElementById("cartasjugador")
const tablero=document.getElementById("tablero")

const colores=["rojo","amarillo","verde","azul"];
const numeros=["1","2","3","4","5","6","7","8","9","0","+2","cambiosentido","prohibido","cambiocolor","+4"];
const cartas=[];
const barajamaquina=[];
const darcartas=()=>{
let jugador=document.createDocumentFragment();
let maquina=document.createDocumentFragment();

for (let i = 0; i < 7; i++) {
    let random=Math.floor(Math.random()*cartas.length)
    let carta=document.createElement("IMG")
    carta.src="./assets/imagenes/"+cartas[random]+ ".PNG"
    jugador.appendChild(carta)
    cartas[random].remove
}
for (let i = 0; i < 7; i++) {

    let random=Math.floor(Math.random()*cartas.length)
    let carta=document.createElement("IMG")
    carta.src="./assets/imagenes/cartaUNO.PNG"
    maquina.appendChild(carta)
    barajamaquina.push(cartas[random])
    cartas[random].remove
}
cartasmaquina.style.display="flex"
cartasjugador.style.display="flex"
tablero.style.display="flex"

cartasjugador.appendChild(jugador)
cartasmaquina.appendChild(maquina)




console.log(barajamaquina);
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
    console.log(cartas)

}


const iniciarJuego=(event)=>{

boton.style.display="none";
generarmazo();
darcartas();



}
boton.addEventListener("click",iniciarJuego);