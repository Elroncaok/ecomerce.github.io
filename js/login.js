/*function validacion(){

    //obtengo los elementos html que contienen la info de usuario
    //creo variable para autentificar datos
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const boton = document.getElementById("regBtn");
    let validada = true

    //agrego un evento escucha para la funcion de validar
    boton.addEventListener("click", ()=>{
        if (email.value == ""){
            //modifico la clase del input si la condicion se cumple
            email.classList.add("is-invalid");
            //cambio el  estatus de la variable a false
            validada = false;
        }
    
        if (password.value == ""){
            password.classList.add("is-invalid");
            validada = false;
        }

        //si ambos campos estan completos, le cambio el valor a validada
        //para no tener que refrescar la pagina
        if ((password.value != "")&&(email.value != "")){
            validada = true;
        }


            //si la variable cambia a false, emito alerta
        if (validada == false){
            alert("complete los campos en rojo");
        }
            //si la variable se mantiene en true, redirigo
        if (validada == true){
            window.location.replace("inicio.html");
            //si la validación es correcta envio el valor de email al local storage
            localStorage.setItem("emailID", email.value);
        }
    })
}

validacion();
*/
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
          }else{
            localStorage.setItem("emailID", email.value);
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

  function redirect(){
    if(localStorage.getItem("emailID")){
        window.location.replace("inicio.html");
    }
  }
  redirect()