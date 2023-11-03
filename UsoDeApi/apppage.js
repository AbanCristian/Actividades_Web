// variable que recolecta la peticion y la key de la api a usar
var configuracion = {
    Url: ' https://api.countrystatecity.in/v1/countries',
    Key: 'TXBkekFEbk90VU1EZHRwalVqajNhMFdlUzFkbWcxWncwR0xnang1NA=='


}

  var seleccionPais = document.querySelector('.pais'),
    seleccionEstado = document.querySelector('.estado'),
    seleccionCiudad = document.querySelector('.ciudad')

function CargarPaises() {
    let entradaApi = configuracion.Url
    fetch(entradaApi, {headers: {"X-CSCAPI-KEY":configuracion.Key}})
    .then(Response => Response.json())
    .then(data => (

        data.forEach(pais => {
            const option = document.createElement('option')
            option.value = pais.iso2
            option.textContent = pais.name
            seleccionPais.appendChild(option)
        })
    ))
    .catch(error => console.error('Error de carga de informacion', error))
  
}

function CargarEstados() {
    const seleccionDePais = seleccionPais.value
    seleccionEstado.innerHTML = '<option value ="">Selecciona tu estado </option>'

    fetch(`${configuracion.Url}/${seleccionDePais}/states`,  {headers: {"X-CSCAPI-KEY":configuracion.Key}} )
    .then(Response => Response.json())
    .then( data => {
        data.forEach(estado => {
            const option = document.createElement('option')
            option.value = estado.iso2
            option.textContent = estado.name
            seleccionEstado.appendChild(option)
        })
    })

    .catch(error => console.error('Error de carga de informacion', error))

}

function CargarCiudades() {
  const seleccionDePais = seleccionCiudad.value
  const seleccionDeEstado = seleccionEstado.value

  seleccionCiudad.innerHTML = '<option value ="">Selecciona tu ciudad</option>'

  fetch(`${configuracion.Url}/${seleccionDePais}/states/${seleccionDeEstado}/cities`,  {headers: {"X-CSCAPI-KEY":configuracion.Key}} )
    .then(Response => Response.json())
    .then( data => {
        data.forEach(ciudad => {
            const option = document.createElement('option')
            option.value = ciudad.iso2
            option.textContent = ciudad.name
            seleccionCiudad.appendChild(option)
        })
    })

    .catch(error => console.error('Error de carga de informacion', error))
}
 window.onload = CargarPaises
