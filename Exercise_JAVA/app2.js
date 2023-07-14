//Pide una nota (número). Muestra la calificación según la nota:
let nota = parseInt(prompt("Ingresa tu calificacion obtenida(número)"));

switch (nota) {
    case 0:
    case 1:
    case 2:
    case 3:
        alert("Muy deficiente");
        break;

    case 4:
    case 5:
        alert("Insuficiente");
        break;
    
    case 6:
        alert("Suficiente");
        break;
    
    case 7:
        alert("Bien");
        break;

    case 8:
    case 9:
        alert("Notable");
        break;

    case 10:
        alert("Sobresaliente");
        break;
}