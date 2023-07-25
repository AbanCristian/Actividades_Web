let form = document.getElementById('form');
let nombreArtis = document.getElementById('nombre');
let generoMusical = document.getElementById('genero');
let imagen = document.getElementById('albumURL');
// Poner variables de nombre, imagen, bibligrafia
let listadeartistas = JSON.parse(localStorage.getItem('names')) || [];
let status_edit = false;

const objetoArtista = {
  id: '',
  nombre: '',
  datos: '',
  url: ''
}

form.addEventListener('submit', formvalidate);

function formvalidate(e) {
  e.preventDefault();
  if (nombreArtis.value == "" || generoMusical.value == "" || imagen == "") {
    alert("Complete all charts");
    return;
  }

  if (status_edit) {
    editname();
    status_edit = false;
  } else {
    objetoArtista.id = Date.now();
    objetoArtista.nombre = nombreArtis.value;
    objetoArtista.datos = generoMusical.value;
    objetoArtista.url = imagen.value;

    addname();
  }
}

function addname() {
  listadeartistas.push({ ...objetoArtista });
  updateLocalStorage();
  readname();
  form.reset();
  clearobject();
}

function editname() {
  objetoArtista.nombre= nombreArtis.value;
  objetoArtista.datos = generoMusical.value;
  objetoArtista.url = imagen.value;

  listadeartistas.forEach(artista => {
    if (artista.id == objetoArtista.id) {
      artista.id = objetoArtista.id;
      artista.nombre = objetoArtista.nombre;
      artista.bibliografia = objetoArtista.datos;
      artista.url = objetoArtista.url;
    }
    status_edit = false;
  });
  updateLocalStorage();
  clearHTML();
  readname();
  form.reset();
  form.querySelector('button[type="submit"]').textContent = 'Add';
  status_edit = false;
}

function deletename(id) {
  listadeartistas = listadeartistas.filter(artista => artista.id != id);
  updateLocalStorage();
  clearHTML();
  readname();
}

function updatename(artista) {
  const { id, nombre, datos, url } = artista;
  nombreArtis.value = nombre;
  generoMusical.value = datos;
  objetoArtista.id = id;
  imagen.value = url;
  form.querySelector('button[type="submit"]').textContent = 'Update';
  status_edit = true;
}

function clearHTML() {
  const divfullname = document.querySelector('.div-fullname');
  while (divfullname.firstChild) {
    divfullname.removeChild(divfullname.firstChild);
  }
}

function clearobject() {
  objetoArtista.id = "";
  objetoArtista.nombre = "";
  objetoArtista.datos = "";
  objetoArtista.url = "";
}

function readname() {
  clearHTML();
  let divfullname = document.querySelector('.div-fullname');

  listadeartistas.forEach(artista => {
    const { id, nombre, datos, url } = artista;

    const paragraph = document.createElement('p');
    paragraph.textContent = `${url} - ${nombre} - ${datos} - `;
    paragraph.dataset.id = id;

    const editbutton = document.createElement('button');
    editbutton.onclick = () => updatename(artista);
    editbutton.textContent = 'Edit';
    editbutton.classList.add('button', 'edit-button');
    paragraph.append(editbutton);

    const deletebutton = document.createElement('button');
    deletebutton.onclick = () => deletename(id);
    deletebutton.textContent = 'Delete';
    deletebutton.classList.add('button', 'detele-button');
    paragraph.append(deletebutton);

    const hr = document.createElement('hr');

    divfullname.appendChild(paragraph);
    divfullname.appendChild(hr);
  })
}

function updateLocalStorage() {
  localStorage.setItem('names', JSON.stringify(listadeartistas));
}

// Al cargar la página, mostrar los datos almacenados en el localStorage
readname();
