// constantes que vamos a utilizar durante el juego, cada una tiene su uso
const body = document.getElementById("body")
const boton = document.getElementById("boton");
const cartasmaquina = document.getElementById("cartasmaquina")
const cartasjugador = document.getElementById("cartasjugador")
const tablero = document.getElementById("tablero")
const apoyacartas = document.getElementById("apoyacartas")
const mazo = document.getElementById("mazo")
const coloreselegir = document.getElementById("colores")
const sabercolor = document.getElementById("sabercolor")
// aqui declaro tanto un array de colores como de numeros para crear las cartas 
const colores = ["rojo", "amarillo", "verde", "azul"];
const numeros = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+2", "cambiosentido", "prohibido", "cambiocolor", "+4"];
//aqui es donde van a ir todas las cartas del mazo
const cartas = [];




// en baraja maquina y baraja jugador es para saber que cartas tienen cada uno
const barajamaquina = [];
const barajajugador = [];
//uso de variables para la logica del juego, el color y el numero son esenciales para saber que carta puedo poner o no
let color = "";
let numero = "";
//Esto son condicionadores que se van a aplicar a lo largo de la partida
let i = 0;
let condicionador = false;





const darcartas = () => {
    //el primer for es para darle las cartas al jugador, en el uno de primeras se dan 7 cartas, cojo un numero aleatorio del mazo y se la doy al jugador
    for (let i = 0; i < 7; i++) {
        let random = Math.floor(Math.random() * cartas.length)
        let carta = document.createElement("IMG")
        carta.src = "./assets/imagenes/" + cartas[random] + ".PNG"
        carta.classList.add("cartas")
        barajajugador.push(carta)
        //aqui borro la carta del mazo para que no se repita
        cartas.splice(random, 1)
    }
    //lo mismo pero para las cartas de la maquina, la cosa es que necesito guardar el valor de la carta y darla vuelta para que el jugador no vea que cartas tiene la maquina
    for (let i = 0; i < 7; i++) {

        let random = Math.floor(Math.random() * cartas.length)
        let carta = document.createElement("IMG")
        carta.src = "./assets/imagenes/cartaUNO.PNG"
        carta.classList.add("cartas")

        cartasmaquina.appendChild(carta)
        //aqui guardo el valor de la carta y la borro del mazo
        barajamaquina.push(cartas[random])
        cartas.splice(random, 1)
    }
    //cuando ya estan las cartas dadas hago que aparezca todo
    cartasmaquina.style.display = "flex"
    cartasjugador.style.display = "flex"
    tablero.style.display = "flex"


    //saber color es para saber en que color se esta jugando, porque cuando hay cambio color no se sabria en que color se esta jugando
    sabercolor.style.display = "flex"
    //hago visibles las cartas del jugador
    barajajugador.forEach(carta => {
        cartasjugador.appendChild(carta)

    });





}



const barajearmazo = () => {
    //lo que hace esta funcion es barajear el mazo
    for (let i = 0; i < cartas.length; i++) {
        let random = Math.floor(Math.random() * cartas.length)
        let aux;
        aux = cartas[i]
        cartas[i] = cartas[random];
        cartas[random] = aux

    }
}


const generarmazo = () => {
    //lo que hace esta funcion es generar el mazo con los arrays de colores y numeros, tras esto lo añade al array de cartas
    numeros.forEach(numero => {
        colores.forEach(color => {
            if (numero == "+4" || numero == "cambiocolor") {
                cartas.push(numero)
            } else {
                cartas.push(numero + color)
            }
        });
    });

    barajearmazo()


}


const iniciarJuego = (event) => {
    // al dar click en el primer boton iniciamos el juego lo que hace que se desaparezca el boton de empezar
    boton.style.display = "none";
    //aqui se genera el mazo
    generarmazo();
    //y se dan las cartas a cada jugador
    darcartas();



}






const turnomaquina = () => {
    // este es el turno de la maquina
    //lee el valor de la carta del medio
    let cartamedio = apoyacartas.lastChild.src;
    const valorcarta = cartamedio.substring(38, cartamedio.lastIndexOf("."))

    //saber los valores del medio
    if (condicionador == true) {
        condicionador = false;
    }
    else {
        for (let i = 0; i < valorcarta.length; i++) {
            if (i === 0 && valorcarta[i] === "+" && !isNaN(valorcarta[i + 1])) {
                numero = "+" + valorcarta[i + 1];
                color = valorcarta.substring(i + 2);
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
            } else if (valorcarta.substring(i, i + 9) === "prohibido") {
                numero = "prohibido";
                color = valorcarta.substring(i + 9);
                break;
            }
        }
    }


    console.log("valores de los colores que recibe la maquina")
    console.log(color)
    console.log(numero)

    // la maquina esta viendo que posibilidades puede hacer con la carta del medio
    let posibilidades = [];
    //por cada carta que hay en mi array mira si es posible meterla en el medio
    for (let i = 0; i < barajamaquina.length; i++) {
        if (numero == "") {

            if (barajamaquina[i].includes(color) || barajamaquina[i].includes("+4") || barajamaquina[i].includes("cambiocolor")) {
                posibilidades.push(barajamaquina[i])
            }

        }
        else if (barajamaquina[i].includes(numero) || barajamaquina[i].includes(color) || barajamaquina[i].includes("+4") || barajamaquina[i].includes("cambiocolor")) {
            posibilidades.push(barajamaquina[i])
        }
    }



    //si no hay posibilidade la maquina roba
    if (posibilidades.length == 0) {
        cogercartadelmazo("maquina")
    } else {
        // si hay posibilidades coge una aleatoria y la pone en el medio
        let random = Math.floor(Math.random() * posibilidades.length)
        let carta = document.createElement("IMG");
        carta.src = "./assets/imagenes/" + posibilidades[random] + ".PNG";
        carta.classList.add("cartas", "posicioncartas")

        apoyacartas.appendChild(carta)


        //la elimino de su array
        let imageneliminar;
        barajamaquina.forEach(x => {
            if (carta.src.includes(x)) {
                imageneliminar = x
            }
        })







        barajamaquina.splice(barajamaquina.lastIndexOf(imageneliminar), 1);



        //la borro der su mazo



        cartasmaquina.innerHTML = "";

        barajamaquina.forEach(carta => {
            let cartavuelta = document.createElement("IMG");
            cartavuelta.src = "./assets/imagenes/cartaUNO.PNG"
            cartavuelta.classList.add("cartas")
            cartasmaquina.append(cartavuelta)
        });
        //lee el color con el que se va a jugar
        colores.forEach(color => {
            if (carta.src.includes(color)) {
                sabercolor.textContent = ""
                sabercolor.textContent = "color con el que se esta jugando: " + color

            }

        });


        //los condicionadores
        if (carta.src.includes("cambiocolor")) {
            cambiocolor("maquina")
            sabercolor.textContent = ""
            sabercolor.textContent = "color con el que se esta jugando: " + color

        }

        if (carta.src.includes("+2")) {
            chupate("maquina", 2)

        }

        if (carta.src.includes("+4")) {
            chupate("maquina", 4)

        }


        if (cartasmaquina.children.length == 0) {
            pantallafinal("maquina")
        }


        //tras posibilidades de haber cambiado el color se pone el color en pantalla
        sabercolor.textContent = ""
        sabercolor.textContent = "color con el que se esta jugando: " + color

        console.log(carta.src)
        // si es cambio de sentido o prohibido le vuelve a tocar
        if (carta.src.includes("cambiosentido") || carta.src.includes("prohibido")) {
            setTimeout(turnomaquina, 2000)
        }





    }
}


const turnoJugador = async (event) => {
    // Al hacer click veo si es en una imagen donde he hecho click
    if (event.target.nodeName == "IMG") {
        // saco el valor de la carta del src para luego jugar con el
        let valorcarta = event.target.src.substring(38, event.target.src.lastIndexOf("."));


        //creo la carta que va a ir al medio
        let carta = document.createElement("IMG");
        carta.src = "./assets/imagenes/" + valorcarta + ".PNG";
        carta.classList.add("cartas", "posicioncartas")

        //la condicion i es para saber si es la primera ves que se mete la carta al medio, ya que la primera vez no hay condicionadores del color o del valor,estom lo hice porque
        //si no hago este condicionador bajo de 7 cartas pero si necesito robar me haria lo que haria nada mas empezar y eso no quiero, quiero que se pueda poner una carta pasando
        // los condicionadores. En este caso es cuando ya tengo una carta en el medio

        if (barajajugador.length < 7 || i != 0) {
            //Saco el valor de la carta del medio antes de poner la mia 
            const cartamedio = apoyacartas.lastChild.src;
            const valorcartamedio = cartamedio.substring(38, cartamedio.lastIndexOf("."))


            //Este for es para saber el numero y el color en distintos casos, cunado son cartas especiales como cambio de color o +4 no tienen color, lo digo para luego
            //que hay condicionadores

            for (let i = 0; i < valorcartamedio.length; i++) {
                if (i === 0 && valorcartamedio[i] === "+" && !isNaN(valorcartamedio[i + 1])) {
                    numero = "+" + valorcartamedio[i + 1];

                    if (numero != "+4") {
                        color = valorcartamedio.substring(i + 2);
                    }

                    i++;
                } else if (!isNaN(valorcartamedio[i])) {
                    numero = valorcartamedio[i];
                    color = valorcartamedio.substring(i + 1);
                    break;
                } else if (valorcartamedio.substring(i, i + 11) === "cambiocolor") {
                    numero = "cambiocolor";

                    break;
                } else if (valorcartamedio.substring(i, i + 13) === "cambiosentido") {
                    numero = "cambiodesentido";
                    color = valorcartamedio.substring(i + 13);
                    break;
                } else if (valorcartamedio.substring(i, i + 9) === "prohibido") {
                    numero = "prohibido";
                    color = valorcartamedio.substring(i + 9);
                    break;
                }
            }
            console.log(color)
            console.log(numero)

            //ya tengo el valor del color y del numero ahora vienen los condicionadores
            //esto es para las cartas especiales ya que si no tiene color no se modifica 
            if (color == "") {
                //esto es para saber si la puedo meter en el medio, tiene que coincidir que sea el mismo numero o el mismo color o cartas especiales, en este caso el color no porque es vacio
                // y entrarian todas las cartas
                if (event.target.src.includes(numero) || event.target.src.includes("cambiocolor") || event.target.src.includes("+4")) {


                    // ya se que la carta puede entrar en el medio asique la pongo
                    apoyacartas.appendChild(carta)
                    //toca eliminarla tanto de mi array como de mi baraja
                    let imageneliminar;
                    barajajugador.forEach(x => {
                        if (x.src == carta.src) {
                            imageneliminar = x
                        }
                    })

                    barajajugador.splice(barajajugador.lastIndexOf(imageneliminar), 1);



                    //borro la carta de mi mazo

                    cartasjugador.innerHTML = "";

                    barajajugador.forEach(carta => {
                        cartasjugador.append(carta)
                    });





                    // dentro de meter las cartas hay cartas que hacen cosas diferentes, el casao del cambio de color, aparece un cuadrado con los 4 colores para elegir

                    if (carta.src.includes("cambiocolor")) {
                        coloreselegir.style.display = "flex";
                        const changecolors = await cambiocolor("jugador");
                        coloreselegir.style.display = "none";
                    }

                    sabercolor.textContent = ""
                    sabercolor.textContent = "color con el que se esta jugando: " + color


                    //si tiene que chupar la maquina 
                    if (carta.src.includes("+2")) {
                        await chupate("jugador", 2)
                    }
                    if (carta.src.includes("+4")) {
                        await chupate("jugador", 4)
                    }
                    // una vez sabido condicionadores que pueden hacer variar el color, muestro con el color que estamos jugando

                    sabercolor.textContent = ""
                    sabercolor.textContent = "color con el que se esta jugando: " + color


                    //compruebo si he ganado
                    console.log(cartasjugador.children)
                    if (cartasjugador.children.length == 0) {
                        pantallafinal("jugador")
                    }


                    //en el juego real el cambio de sentido y el prohibido pues saltaria o cambiaria de sentido, al ser 2 le toca de nuevo al jugador
                    if (carta.src.includes("cambiosentido") || carta.src.includes("prohibido")) {

                    }
                    else {
                        turnomaquina();
                    }






                }
                //si la carta no cumple algun condicionador la carta no se puede meter
                else {
                    console.log("esta no")
                }
            }
            else {
                //tras muchos bug aparecio uno que hacia que en algunas cartas el numero aparece vacio, si es asi no contaria jugar con el numero
                if (numero == "") {
                    //esto es para saber si la puedo meter en el medio, tiene que coincidir que sea el mismo numero o el mismo color o cartas especiales, en este caso el numero no porque es vacio
                    // y entrarian todas las cartas
                    if (event.target.src.includes(color) || event.target.src.includes("cambiocolor") || event.target.src.includes("+4")) {
                        // ya se que la carta puede entrar en el medio asique la pongo
                        apoyacartas.appendChild(carta)
                        //toca eliminarla tanto de mi array como de mi baraja
                        let imageneliminar;
                        barajajugador.forEach(x => {
                            if (x.src == carta.src) {
                                imageneliminar = x
                            }
                        })

                        barajajugador.splice(barajajugador.lastIndexOf(imageneliminar), 1);



                        //borro la carta de mi mazo

                        cartasjugador.innerHTML = "";

                        barajajugador.forEach(carta => {
                            cartasjugador.append(carta)
                        });
                        // dentro de meter las cartas hay cartas que hacen cosas diferentes, el casao del cambio de color, aparece un cuadrado con los 4 colores para elegir

                        if (carta.src.includes("cambiocolor")) {
                            coloreselegir.style.display = "flex";
                            const changecolors = await cambiocolor("jugador");
                            coloreselegir.style.display = "none";
                        }

                        sabercolor.textContent = ""
                        sabercolor.textContent = "color con el que se esta jugando: " + color

                        //si tiene que chupar la maquina 
                        if (carta.src.includes("+2")) {
                            await chupate("jugador", 2)
                        }
                        if (carta.src.includes("+4")) {
                            await chupate("jugador", 4)
                        }

                        // una vez sabido condicionadores que pueden hacer variar el color, muestro con el color que estamos jugando
                        sabercolor.textContent = ""
                        sabercolor.textContent = ""
                        sabercolor.textContent = "color con el que se esta jugando: " + color

                        //compruebo si he ganado
                        console.log("cartasjugador.children")
                        console.log(cartasjugador.children)
                        if (cartasjugador.children.length == 0) {
                            pantallafinal("jugador")
                        }

                        //en el juego real el cambio de sentido y el prohibido pues saltaria o cambiaria de sentido, al ser 2 le toca de nuevo al jugador
                        if (carta.src.includes("cambiosentido") || carta.src.includes("prohibido")) {

                        }
                        else {
                            turnomaquina();
                        }






                    } else {
                        //si la carta no cumple algun condicionador la carta no se puede meter
                        console.log("esta no")
                    }
                }
                //si es una carta  normal y corriente deberia entrar aqui
                else {
                    //esto es para saber si la puedo meter en el medio, tiene que coincidir que sea el mismo numero o el mismo color o cartas especiales
                    if (event.target.src.includes(color) || event.target.src.includes(numero) || event.target.src.includes("cambiocolor") || event.target.src.includes("+4")) {
                        // ya se que la carta puede entrar en el medio asique la pongo
                        apoyacartas.appendChild(carta)
                        //toca eliminarla tanto de mi array como de mi baraja
                        let imageneliminar;
                        barajajugador.forEach(x => {
                            if (x.src == carta.src) {
                                imageneliminar = x
                            }
                        })

                        barajajugador.splice(barajajugador.lastIndexOf(imageneliminar), 1);



                        //borro la carta de mi mazo

                        cartasjugador.innerHTML = "";

                        barajajugador.forEach(carta => {
                            cartasjugador.append(carta)
                        });
                        // dentro de meter las cartas hay cartas que hacen cosas diferentes, el casao del cambio de color, aparece un cuadrado con los 4 colores para elegir

                        if (carta.src.includes("cambiocolor")) {
                            coloreselegir.style.display = "flex";
                            const changecolors = await cambiocolor("jugador");
                            coloreselegir.style.display = "none";
                        }

                        sabercolor.textContent = ""
                        sabercolor.textContent = "color con el que se esta jugando: " + color

                        //si tiene que chupar la maquina 

                        if (carta.src.includes("+2")) {
                            await chupate("jugador", 2)
                        }
                        if (carta.src.includes("+4")) {
                            await chupate("jugador", 4)
                        }

                        // una vez sabido condicionadores que pueden hacer variar el color, muestro con el color que estamos jugando
                        sabercolor.textContent = ""
                        sabercolor.textContent = "color con el que se esta jugando: " + color

                        //compruebo si he ganado
                        console.log("cartasjugador.children")
                        console.log(cartasjugador.children)
                        if (cartasjugador.children.length == 0) {
                            pantallafinal("jugador")
                        }


                        //en el juego real el cambio de sentido y el prohibido pues saltaria o cambiaria de sentido, al ser 2 le toca de nuevo al jugador
                        if (carta.src.includes("cambiosentido") || carta.src.includes("prohibido")) {

                        }
                        else {
                            turnomaquina();
                        }






                    } else {
                        //si la carta no cumple algun condicionador la carta no se puede meter
                        console.log("esta no")
                    }
                }
            }








        }
        //No hay condiconadores porque es la primera jugada, la primera carta de la partida
        if (barajajugador.length == 7 && i == 0) {
            //se mete la carta en el medio
            apoyacartas.appendChild(carta)

            //la elimino de mi array
            let imageneliminar;
            barajajugador.forEach(x => {
                if (x.src == carta.src) {
                    imageneliminar = x
                }
            })

            barajajugador.splice(barajajugador.lastIndexOf(imageneliminar), 1);



            //la elimino de mi mazo

            cartasjugador.innerHTML = "";

            barajajugador.forEach(carta => {
                cartasjugador.append(carta)
            });

            //condicionadores

            if (carta.src.includes("cambiocolor")) {
                coloreselegir.style.display = "flex";
                const changecolors = await cambiocolor("jugador");
                coloreselegir.style.display = "none";
            }

            sabercolor.textContent = ""
            sabercolor.textContent = "color con el que se esta jugando: " + color


            if (carta.src.includes("+2")) {
                await chupate("jugador", 2)
            }
            if (carta.src.includes("+4")) {
                await chupate("jugador", 4)
            }



            if (carta.src.includes("cambiosentido") || carta.src.includes("prohibido")) {

            }
            else {
                turnomaquina();
            }

        }






    }
}




const cogercartadelmazo = (jugador) => {

    if (jugador == "usuario") {
        let random = Math.floor(Math.random() * cartas.length)
        let carta = document.createElement("IMG")
        carta.src = "./assets/imagenes/" + cartas[random] + ".PNG"
        carta.classList.add("cartas")


        barajajugador.push(carta)
        cartas.splice(random, 1)


        cartasjugador.innerHTML = "";

        barajajugador.forEach(cartas => {
            cartasjugador.append(cartas)
        });
        i++;
        turnomaquina();
    }
    if (jugador == "maquina") {
        let random = Math.floor(Math.random() * cartas.length)

        barajamaquina.push(cartas[random])
        cartas.splice(random, 1)


        cartasmaquina.innerHTML = "";

        barajamaquina.forEach(carta => {
            let cartavuelta = document.createElement("IMG");
            cartavuelta.src = "./assets/imagenes/cartaUNO.PNG"
            cartavuelta.classList.add("cartas")
            cartasmaquina.append(cartavuelta)
        });

    }

}

const cambiocolor = async (player, event) => {
      //aqui realiza el cambio de color
    return new Promise((resolve) => {

 // si es el jugador tiene que clickar el color que quiere
        if (player == "jugador") {
            const handleClick = (event) => {
                if (event.target.nodeName === "DIV") {
                    const classes = event.target.classList;
                    if (classes.contains("rojo")) {
                        color = "rojo"

                    } else if (classes.contains("verde")) {
                        color = "verde"

                    } else if (classes.contains("azul")) {

                        color = "azul"

                    } else if (classes.contains("amarillo")) {
                        color = "amarillo"

                    }
                    condicionador = true
                    resolve();
                }


            };

            coloreselegir.addEventListener("click", handleClick);
        }
        else {
            //si es la maquina coge un color random
            let arraycolores = ["rojo", "amarillo", "verde", "azul"];
            let random = Math.floor(Math.random() * arraycolores.length);
            color = arraycolores[random]

            resolve();

        }



    });
};

// Uso de la función cambio de color
cambiocolor("jugador").then(() => {

});




const chupate = async (player, cantidad) => {
      //depende de la cantidad
    //si es el jugador 
    if (cantidad === 4) {
        if (player === "jugador") {
            for (let i = 1; i <= cantidad; i++) {
                let random = Math.floor(Math.random() * cartas.length);
                barajamaquina.push(cartas[random]);
                cartas.splice(random, 1);
                cartasmaquina.innerHTML = "";
                barajamaquina.forEach(carta => {
                    let cartavuelta = document.createElement("IMG");
                    cartavuelta.src = "./assets/imagenes/cartaUNO.PNG";
                    cartavuelta.classList.add("cartas");
                    cartasmaquina.append(cartavuelta);
                });
            }

            if (cantidad == 4) {
                coloreselegir.style.display = "flex";
                const changecolors = await cambiocolor("jugador");
                coloreselegir.style.display = "none";
            }

        }
        else {
  //si es la maquina

            for (let i = 1; i <= cantidad; i++) {
                let random = Math.floor(Math.random() * cartas.length)
                let carta = document.createElement("IMG")
                carta.src = "./assets/imagenes/" + cartas[random] + ".PNG"
                carta.classList.add("cartas")
                barajajugador.push(carta)
                cartas.splice(random, 1)
                cartasjugador.innerHTML = ""
                barajajugador.forEach(carta => {
                    cartasjugador.appendChild(carta)

                });
            }


       //si es +4 tabien hay cambio de color
            if (cantidad == 4) {

                cambiocolor("maquina");

            }



        }
    }
};


const pantallafinal = (jugador) => {
    debugger
    body.innerHTML = "";
    let titulofinal = document.createElement("h1")
    titulofinal.classList.add("titulofinal")
    titulofinal.textContent = "Ha ganado " + jugador

    body.appendChild(titulofinal)
    //Aqui hago que tras 2 segundos se reinicie sola la pagina
    setTimeout(function () {
        location.reload();
    }, 2000);
}



boton.addEventListener("click", iniciarJuego);
cartasjugador.addEventListener("click", turnoJugador)
mazo.addEventListener("click", () => {
    cogercartadelmazo("usuario")
})
