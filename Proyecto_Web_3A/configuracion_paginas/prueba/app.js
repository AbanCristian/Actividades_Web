let form = document.getElementById('form');
let nameInput = document.getElementById('name');
let lastnameInput = document.getElementById('lastname');
let btnadd = document.getElementById('form');

let listofnames = JSON.parse(localStorage.getItem('names')) || [];
let status_edit = false;

const objectfullname = {
  id: '',
  name: '',
  lastname: ''
}

form.addEventListener('submit', formvalidate);

function formvalidate(e) {
  e.preventDefault();
  if (nameInput.value === "" || lastnameInput.value === "") {
    alert("Complete all charts");
    return;
  }

  if (status_edit) {
    editname();
    status_edit = false;
  } else {
    objectfullname.id = Date.now();
    objectfullname.name = nameInput.value;
    objectfullname.lastname = lastnameInput.value;

    addname();
  }
}

function addname() {
  listofnames.push({ ...objectfullname });
  updateLocalStorage();
  readname();
  form.reset();
  clearobject();
}

function editname() {
  objectfullname.name = nameInput.value;
  objectfullname.lastname = lastnameInput.value;

  listofnames.forEach(person => {
    if (person.id == objectfullname.id) {
      person.id = objectfullname.id;
      person.name = objectfullname.name;
      person.lastname = objectfullname.lastname;
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
  listofnames = listofnames.filter(person => person.id != id);
  updateLocalStorage();
  clearHTML();
  readname();
}

function updatename(person) {
  const { id, name, lastname } = person;
  nameInput.value = name;
  lastnameInput.value = lastname;
  objectfullname.id = id;
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
  objectfullname.id = "";
  objectfullname.name = "";
  objectfullname.lastname = "";
}

function readname() {
  clearHTML();
  let divfullname = document.querySelector('.div-fullname');

  listofnames.forEach(person => {
    const { id, name, lastname } = person;

    const paragraph = document.createElement('p');
    paragraph.textContent = `${id} - ${name} - ${lastname} - `;
    paragraph.dataset.id = id;

    const editbutton = document.createElement('button');
    editbutton.onclick = () => updatename(person);
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
  localStorage.setItem('names', JSON.stringify(listofnames));
}

// Al cargar la página, mostrar los datos almacenados en el localStorage
readname();
