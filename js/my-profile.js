//función para validar los datos y crear el perfil

(function () {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        } else {
          createPerfil();
        }

        form.classList.add('was-validated')
      }, false)
    })
})()

//crea un perfil de usuario en el local storage

function createPerfil() {
  let perfiles = [];
  let perfil = {
    nombre: document.getElementById("pmerNombre").value,
    segundo_nombre: document.getElementById("sdoNombre").value,
    apellido: document.getElementById("pmerApellido").value,
    segundo_apellido: document.getElementById("sdoApellido").value,
    email: document.getElementById("email").value,
    telefono: document.getElementById("telNumber").value,
  }
  let bandera = false;
  let j = 0;

  if (localStorage.getItem("userProfile")) {
    let registro = JSON.parse(localStorage.getItem("userProfile"));

    for (let i = 0; i < registro.length; i++) {
      let user = registro[i];

      if (user.email == perfil.email) {

        bandera = true;
        j=i
      } 
    }
    if(bandera){
      registro[j] = perfil;
      perfiles = registro;
    }else{
      perfiles=registro;
      perfiles.push(perfil);
    }
  } else {
    perfiles.push(perfil);
  }
  localStorage.setItem("userProfile", JSON.stringify(perfiles));
}

//escrie la dirección de correo

function writeEmail() {
  if (localStorage.getItem("emailID")) {
    document.getElementById("email").value = localStorage.getItem("emailID");
  }
}

//escribe los demás campos que el usuario ya guardo

function writeUser() {

  if (localStorage.getItem("userProfile")) {
    let registro = JSON.parse(localStorage.getItem("userProfile"));

    for (i = 0; i < registro.length; i++) {
      let usuario = registro[i];
      if (usuario.email == localStorage.getItem("emailID")) {
        document.getElementById("pmerNombre").value = usuario.nombre;
        document.getElementById("sdoNombre").value = usuario.segundo_nombre;
        document.getElementById("pmerApellido").value = usuario.apellido;
        document.getElementById("sdoApellido").value = usuario.segundo_apellido;
        document.getElementById("telNumber").value = usuario.telefono;
      }
    }
  }
}


const inputFile = document.getElementById("imageBtn");
const image = document.getElementById("fotoPerfil");

/**
 * Returns a file in Base64URL format.
 * @param {File} file
 * @return {Promise<string>}
 */
async function encodeFileAsBase64URL(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('loadend', () => {
      resolve(reader.result);
    });
    reader.readAsDataURL(file);
  });
};

// Eventos
inputFile.addEventListener('input', async (event) => {
  // Convierto la primera imagen del input en una ruta Base64
  const base64URL = await encodeFileAsBase64URL(inputFile.files[0]);
  // Anyado la ruta Base64 a la imagen
  image.setAttribute('src', base64URL);
  saveImage(base64URL);
});

function saveImage(profilePic) {
  picArray = [];
  actual_pic = {
    user: localStorage.getItem("emailID"),
    image: profilePic,
  };
  let bandera = false;
  let j = 0;

  if (localStorage.getItem("profilePic")) {

    let picStorage = JSON.parse(localStorage.getItem("profilePic"));
    for (let i = 0; i < picStorage.length; i++) {
      let pic = picStorage[i];

      if (pic.user == actual_pic.user) {

        bandera = true;
        j = i;

      }
    } if (bandera) {
      picStorage[j].image = profilePic;
      picArray = picStorage
    } else {
      picArray = picStorage
      picArray.push(actual_pic)
    }

  } else {
    picArray.push(actual_pic)

  }
  localStorage.setItem("profilePic", JSON.stringify(picArray))
}

function writeProfilePic() {
  if (localStorage.getItem("profilePic")) {
    localPic = JSON.parse(localStorage.getItem("profilePic"));

    for (let i = 0; i < localPic.length; i++) {
      let pic = localPic[i];

      if (pic.user == localStorage.getItem("emailID")) {

        image.setAttribute('src', pic.image);
      }
    }
  }
}

//permite estar en la página únicamente si el usuario se logeo antes

if (!localStorage.getItem("emailID")) {
  window.location = "index.html";
}



writeUser();
writeEmail();
writeProfilePic();