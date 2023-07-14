while (true) {
    var numeroStr = prompt("Ingresa el número de DNI:");
  
    if (numeroStr === null) {
       break;
    }
  
    var numero = parseInt(numeroStr);
  
    if (isNaN(numero)) {
       alert("El valor ingresado no es un número válido. Por favor, intenta nuevamente.");
       continue;
    }
  
    if (numero < 0 || numero > 99999999) {
       alert("El número de DNI debe estar entre 0 y 99999999. Por favor, intenta nuevamente.");
       continue;
    }
  
    var letras = "TRWAGMYFPDXBNJZSQVHLCKE";
    var indice = numero % 23;
    var letra = letras.charAt(indice);
  
    alert("La letra correspondiente al número de DNI " + numero + " es: " + letra);
}