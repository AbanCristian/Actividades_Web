let cadenadetexto = [];

while(true){
    let palabra = prompt("Ingresa una palabra ");
       if(palabra == null){
        break;
    }
    cadenadetexto.push(palabra);
}

let nuevotexto = cadenadetexto.join("-");
alert("texto en forma de cadenas: " + nuevotexto);