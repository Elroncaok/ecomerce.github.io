
function showPrize(precio, cantidad) {
    let subtotal = precio * cantidad;
    return subtotal;
}


function deleteProd(id) {
    let userCartArray = JSON.parse(localStorage.getItem("userCart"));
    for (let i = 0; i < userCartArray.length; i++) {
        let userProd = userCartArray[i];
        if (userProd.id==id){
            
        let borrar = userCartArray.indexOf(userProd);
        userCartArray.splice(borrar,1);
        localStorage.setItem("userCart", JSON.stringify(userCartArray));
        window.location.reload();
        }
    }
    if (userCartArray.length<1){
        localStorage.removeItem("userCart");
    }

}


function showUserCart() {
    let htmlContentToAppend = "";
    let userCartArray = JSON.parse(localStorage.getItem("userCart"));
    for (let i = 0; i < userCartArray.length; i++) {
        let userProd = userCartArray[i];
        htmlContentToAppend += `
        <tr>
                <td scope="row" class="col-1"><img src="${userProd.image}" class="d-block w-100 img-thumbnail"></td>
                <td>${userProd.name}</td>
                <td>${userProd.currency} ${userProd.unitCost}</td>
                <td><input type="number" onchange="showTotal()" class="form-control" style="width : 75px;" min="1" max="100" id="${userProd.id}" value="${userProd.count}"></td>
                <td><strong id="${userProd.id}2">${userProd.currency} ${showPrize(userProd.count, userProd.unitCost)}</strong></td>
                <td><button type="button" class="btn btn-outline-danger" onclick=deleteProd(${userProd.id})><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg></button></td>
        </tr>
        `
    }
    document.getElementById("cartProd").innerHTML += htmlContentToAppend;

    for (let i = 0; i < userCartArray.length; i++) {
        let userProd = userCartArray[i];
        let valor = document.getElementById(userProd.id);
        valor.addEventListener('input', function () {
            let htmlContentToAppend = "";
            let newCart = JSON.parse(localStorage.getItem("userCart"));
            for (let i = 0; i < newCart.length; i++) {
                let inputcart = newCart[i];
                if (inputcart.id == userProd.id) {
                    inputcart.count = (valor.value);
                }
            }
            localStorage.setItem("userCart", JSON.stringify(newCart));
            htmlContentToAppend += `${userProd.currency} ${showPrize(valor.value, userProd.unitCost)}`
            document.getElementById(userProd.id + "2").innerHTML = htmlContentToAppend;
        })
    }
}
//funcion para calcular el importe de subtotal, envio y total
function showTotal() {
    let monto = 0;
    let cotizacion = 40;
    let cargoEnvio = 0;
    let total = 0;
    let envio = document.getElementsByName("envio");
    let carrito = document.getElementsByClassName('strong');

    for (i = 0; i < JSON.parse(localStorage.getItem("userCart")).length; i++) {
        let carrito = JSON.parse(localStorage.getItem("userCart"))[i];
        if (carrito.currency == 'USD') {
            monto += carrito.unitCost * carrito.count;
        } else {
            monto += Math.round((carrito.unitCost / cotizacion) * carrito.count);
        }
    }
    for (i = 0; i < envio.length; i++) {
        let cargo = envio[i];
        if (cargo.checked) {
            cargoEnvio = Math.round(cargo.value * monto);
        }
    }
    total = monto + cargoEnvio;

    document.getElementById("subTotalText").innerHTML = 'USD ' + monto;
    document.getElementById("envioText").innerHTML = 'USD ' + cargoEnvio;
    document.getElementById("totalText").innerHTML = 'USD ' + total;

}
function disableTjta() {
    document.getElementById("nroTarjeta").setAttribute("disabled", "");
    document.getElementById("vtoTarjeta").setAttribute("disabled", "");
    document.getElementById("codSeg").setAttribute("disabled", "");

    if (document.getElementById("nroCuenta").disabled) {
        document.getElementById("nroCuenta").removeAttribute("disabled", "");
    }
}

function disableTrx() {
    document.getElementById("nroCuenta").setAttribute("disabled", "");
    if (document.getElementById("nroTarjeta").disabled) {
        document.getElementById("nroTarjeta").removeAttribute("disabled", "");
        document.getElementById("vtoTarjeta").removeAttribute("disabled", "");
        document.getElementById("codSeg").removeAttribute("disabled", "");

    }
}

document.getElementById("btnCerrar").addEventListener('click', () => {
    let htmlContentToAppend = "";
    if (document.getElementById("trx").checked) {
        htmlContentToAppend = `
        <p>Transferencia bancaria
            <button type="button" class="m-1 btn btn-link" id="btnModal" data-bs-toggle="modal"
                data-bs-target="#contidionsModal">Seleccionar</button>
                <div id="textDanger">                
              </div>   
        </p>
    `
        document.getElementById("modoPago").innerHTML = htmlContentToAppend;
    } if ((document.getElementById("creditCard").checked)) {
        htmlContentToAppend = `
        <p>Tarjeta de crédito
            <button type="button" class="m-1 btn btn-link" id="btnModal" data-bs-toggle="modal"
                data-bs-target="#contidionsModal">Seleccionar</button>
                <div id="textDanger">                
                </div>   
        </p>
        `
        document.getElementById("modoPago").innerHTML = htmlContentToAppend;
    }
})


function TerminosAlert() {

    let htmlContentToAppend = "";
    let tarjeta = document.getElementById("creditCard");
    let transferencia = document.getElementById("trx");
    let tarjeta_nro = document.getElementById("nroTarjeta");
    let tarjeta_vto = document.getElementById("vtoTarjeta");
    let tarjeta_segCod = document.getElementById("codSeg");
    let transferencia_nro = document.getElementById("nroCuenta");

    if (!tarjeta.checked && !transferencia.checked) {
        htmlContentToAppend += `<p class="text-danger">Debe seleccionar una forma de pago.</p>`;


    } else {
        if (tarjeta.checked) {
            if (tarjeta_nro.value == "" || tarjeta_segCod == "" || tarjeta_vto == "") {
                htmlContentToAppend += `          
                   <p class="text-danger">Debe ingresar los datos de su tarjeta.</p>
                   `
            } else {
                return true;
            }
        } else if (transferencia.checked && (transferencia_nro.value == "")) {
            htmlContentToAppend += `<p class="text-danger">Debe ingresar el número de cuenta bancaría.</p>`
        } else {
            return true;
        }

    }

    document.getElementById("textDanger").innerHTML = htmlContentToAppend;
}


(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
    let htmlContentToAppend = ""
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
            
                if (!form.checkValidity()||!TerminosAlert()) {
                    event.preventDefault()
                    event.stopPropagation()
                }else{
                    localStorage.setItem("alerta","true")
                }
                form.classList.add('was-validated')
                
            }, false)
            
        })

})()

if(!localStorage.getItem("alerta")){
localStorage.setItem("alerta","false");
}else if(localStorage.getItem("alerta")=="true"){
    document.getElementById("alert-success").classList.add("show")
}


document.addEventListener("DOMContentLoaded", () => {
    
            showUserCart();
            showTotal();
            
})
