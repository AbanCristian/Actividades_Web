let form = document.getElementById('form');
let nombreCancion = document.getElementById('nombreCancion');
let nombreAutor = document.getElementById('nombreAutor');
let nombreAlbum = document.getElementById('album');
// Poner variables de nombre, nombre autor, album de procedencia
let listadefavoritos = JSON.parse(localStorage.getItem('names')) || [];
let status_edit = false;

const objetoPlaylist = {
  id: '',
  cancion: '',
  autor: '',
  album: ''
}

form.addEventListener('submit', formvalidate);

function formvalidate(e) {
  e.preventDefault();
  if (nombreCancion.value == "" || nombreAutor.value == "" || nombreAlbum == "") {
    alert("Complete all charts");
    return;
  }

  if (status_edit) {
    editname();
    status_edit = false;
  } else {
    objetoPlaylist.id = Date.now();
    objetoPlaylist.cancion = nombreCancion.value;
    objetoPlaylist.autor = nombreAutor.value;
    objetoPlaylist.album = nombreAlbum.value;

    addname();
  }
}

function addname() {
  listadefavoritos.push({ ...objetoPlaylist });
  updateLocalStorage();
  readname();
  form.reset();
  clearobject();
}

function editname() {
  objetoPlaylist.cancion= nombreCancion.value;
  objetoPlaylist.autor = nombreAutor.value;
  objetoPlaylist.album = nombreAlbum.value;

  listadefavoritos.forEach(playlist => {
    if (playlist.id == objetoPlaylist.id) {
      playlist.id = objetoPlaylist.id;
      playlist.cancion = objetoPlaylist.cancion;
      playlist.autor = objetoPlaylist.autor;
      playlist.album = objetoPlaylist.album;
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
  listadefavoritos = listadefavoritos.filter(playlist => playlist.id != id);
  updateLocalStorage();
  clearHTML();
  readname();
}

function updatename(playlist) {
  const { id, cancion, autor, album } = playlist;
  nombreCancion.value = cancion;
  nombreAutor.value = autor;
  objetoPlaylist.id = id;
  nombreAlbum.value = album;
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
  objetoPlaylist.id = "";
  objetoPlaylist.cancion = "";
  objetoPlaylist.autor = "";
  objetoPlaylist.album = "";
}

function readname() {
  clearHTML();
  let divfullname = document.querySelector('.div-fullname');

  listadefavoritos.forEach(playlist => {
    const { id, cancion, autor, album } = playlist;

    const paragraph = document.createElement('p');
    paragraph.textContent = `${cancion} - ${autor} - ${album} - `;
    paragraph.dataset.id = id;

    const editbutton = document.createElement('button');
    editbutton.onclick = () => updatename(playlist);
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
  localStorage.setItem('names', JSON.stringify(listadefavoritos));
}

// Al cargar la página, mostrar los datos almacenados en el localStorage
readname();
