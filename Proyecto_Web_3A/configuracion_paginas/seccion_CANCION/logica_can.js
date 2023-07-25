let form = document.getElementById('form');
let nombreCancion = document.getElementById('nombreCancion');
let nombreAutor = document.getElementById('nombreAutor');
let url = document.getElementById('link');
let btnadd = document.getElementById('form');

let listadecanciones = JSON.parse(localStorage.getItem('names')) || [];
let status_edit = false;

const objetoCancion = {
  id: '',
  cancion: '',
  autor: '',
  enlace:''
}

form.addEventListener('submit', formvalidate);

function formvalidate(e) {
  e.preventDefault();
  if (nombreCancion.value == "" || nombreAutor.value == "" || url.value == "") {
    alert("Complete todos los campos");
    return;
  }

  if (status_edit) {
    editname();
    status_edit = false;
  } else {
    objetoCancion.id = Date.now();
    objetoCancion.cancion = nombreCancion.value;
    objetoCancion.autor = nombreAutor.value;
    objetoCancion.enlace = url.value;

    addname();
  }
}

function addname() {
  listadecanciones.push({ ...objetoCancion });
  updateLocalStorage();
  readname();
  form.reset();
  clearobject();
}

function editname() {
  objetoCancion.cancion = nombreCancion.value;
  objetoCancion.autor = nombreAutor.value;
  objetoCancion.enlace = url.value;

  listadecanciones.forEach(Musica => {
    if (Musica.id == objetoCancion.id) {
      Musica.id = objetoCancion.id;
      Musica.cancion = objetoCancion.cancion;
      Musica.autor = objetoCancion.autor;
      Musica.enlace =  objetoCancion.enlace;
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
  listadecanciones = listadecanciones.filter(Musica => Musica.id != id);
  updateLocalStorage();
  clearHTML();
  readname();
}

function updatename(Musica) {
  const { id ,cancion, autor, enlace } = Musica;
  objetoCancion.id = id;
  nombreCancion.value = cancion;
  nombreAutor.value = autor;
  url.value = enlace;
  
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
  objetoCancion.id = "";
  objetoCancion.cancion = "";
  objetoCancion.autor = "";
  objetoCancion.enlace = "";
}

function readname() {
  clearHTML();
  let div_infocancion = document.querySelector('.div-fullname');

  listadecanciones.forEach(Musica => {
    const { id ,cancion, autor, enlace } = Musica;

    const paragraph = document.createElement('p');
    paragraph.textContent = `${cancion} - `;
    paragraph.dataset.id = id;
    const paragraph2 = document.createElement('p');
    paragraph2.textContent = `${autor} - `;
    paragraph2.dataset.id = id;
    const paragraph3 = document.createElement('p');
    paragraph3.textContent = ` ${enlace} - `;
    paragraph3.dataset.id = id;

    const editbutton = document.createElement('button');
    editbutton.onclick = () => updatename(Musica);
    editbutton.textContent = 'Edit';
    editbutton.classList.add('button', 'edit-button');
    paragraph.append(editbutton);

    const deletebutton = document.createElement('button');
    deletebutton.onclick = () => deletename(id);
    deletebutton.textContent = 'Delete';
    deletebutton.classList.add('button', 'detele-button');
    paragraph.append(deletebutton);

    const hr = document.createElement('hr');

    div_infocancion.appendChild(paragraph);
    div_infocancion.appendChild(paragraph2);
    div_infocancion.appendChild(paragraph3);
    div_infocancion.appendChild(hr);
  })
}

function updateLocalStorage() {
  localStorage.setItem('names', JSON.stringify(listadecanciones));
}

// Al cargar la página, mostrar los datos almacenados en el localStorage
readname();
