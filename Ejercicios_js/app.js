
function numeroMayot(){
  let numeros = [];

  while (true) {
    let dato = prompt("Introduce un número");
        if (dato === null) {
            if (numeros.length > 0) {
                let numeroMayor = Math.max(...numeros);
                alert("El número más grande ingresado es " + numeroMayor);
            } 
            else{
                alert("No se ingresaron números");
            }
            break;                   
         }                                                                      
    
        let numero = parseFloat(dato);
        if (!isNaN(numero)) {
            numeros.push(numero);
        }
  }  
}


function esPalindromo(palabra){
    palabra = palabra.replace(/\s/g, '').toLowerCase();
    let revertida = palabra.split('').reverse().join('');
    return palabra === revertida;
    
}

function Palindromo(){
  let palabra = prompt("Ingresa una palabra");
  if(esPalindromo(palabra)){
      alert("si es un Palindromo");
  }
  else{
    alert("no es palindromo")
  }
}


function sumardigitos(){
  const numero = prompt("Ingrese un número:");  
  let suma = 0;  


  for (let i = 0; i < numero.length; i++) {
    suma += parseInt(numero.charAt(i));  
  }

  alert("La suma es " +suma);

}

function numeroRandom() {
  const limite1 = parseInt(prompt("Ingrese el número mínimo del rango:"));  
  const limite2 = parseInt(prompt("Ingrese el número máximo del rango:"));  
  
  
  const numeroAleatorio = Math.floor(Math.random() * (limite2 - limite1 + 1)) + limite1;
  
  alert("Un numero del rango es " + numeroAleatorio);
  
}

function fibonacii() {
  const numero = parseInt(prompt("Ingrese un número:")); 
  let secuencia = [0, 1];  


  for (let i = 2; secuencia[i - 1] + secuencia[i - 2] <= numero; i++) {
    secuencia[i] = secuencia[i - 1] + secuencia[i - 2];
  }

 alert("La secuencia de Fibonacci es "+numero +" es: " +secuencia.join(", "));

}
