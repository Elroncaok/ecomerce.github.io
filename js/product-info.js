let idProd = localStorage.getItem("prodID");

const prodInfoURL = PRODUCT_INFO_URL + idProd + EXT_TYPE
const prodComentsURL = PRODUCT_INFO_COMMENTS_URL + idProd + EXT_TYPE


let currentProdInfoArray = [];
let currentProdComentsArray = [];

//funcion que carga la info del producto
function showProductsInfo() {


    let htmlContentToAppend = "";
    let productinfo = currentProdInfoArray;
    {

        htmlContentToAppend += `<div class="row"><div class="list-item col-6">
        <h4 class="mb-1">Precio</h4>
        <h5 class="mb-1 text-muted">${productinfo.currency} ${productinfo.cost}</h5><br>
        <h4 class="mb-1">Desccripción</h4>
        <h5 class="mb-1 text-muted">${productinfo.description}</h5><br>
        <h4 class="mb-1">Categoría</h4>
        <h5 class="mb-1 text-muted">${productinfo.category}</h5><br>
        <h4 class="mb-1">Cantidad de Vendidos</h4>
        <h5 class="mb-1 text-muted">${productinfo.soldCount}</h5><br>
        </div>
        <div class="container col-6">
        <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
        <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="10000">
        <img src="${productinfo.images[0]}" class="d-block w-100 img-thumbnail">
        </div>`
        for (let i = 1; i < currentProdInfoArray.images.length; i++) {
            let imageninfo = currentProdInfoArray.images[i]; 
            htmlContentToAppend +=`
            <div class="carousel-item" data-bs-interval="10000">
            <img src="${imageninfo}" class="d-block w-100 img-thumbnail">
            </div>        
            `   
        }
        htmlContentToAppend +=`
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>    
        </div>`

    }
    document.getElementById("proTitle").innerHTML = currentProdInfoArray.name;
    document.getElementById("prod-info-container").innerHTML = htmlContentToAppend;
}


//funciona que toma un numero como argumento y lo representa con estrellas pintadas
function ShowStars(numero) {
    let estrellas = `<span class="fa fa-star checked"></span>`;
    let estrellasVacias = `<span class="fa fa-star"></span>`;
    let score = estrellas.repeat(numero) + estrellasVacias.repeat(5 - numero);

    return score
}

//funcion que muestra los comentarios del json
function showProductsComents() {

    let htmlContentToAppend = "";

    {
        htmlContentToAppend += `<h4 class="mb-1">Comentarios</h4>`
    }
    for (let i = 0; i < currentProdComentsArray.length; i++) {
        let productcomment = currentProdComentsArray[i];
        {
            htmlContentToAppend += `
        <div class="list-group-item">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <p class="mb-1"><strong>${productcomment.user} </strong>- ${productcomment.dateTime} - ${ShowStars(productcomment.score)}</p>
                    </div>
                    <p class="mb-1">${productcomment.description}</p>
                </div>
            </div>
        </div>
        `
        };
    };
    let commentContainer = document.getElementById("prod-comment-container")

    commentContainer.innerHTML = htmlContentToAppend;
}

// funcion para incertar el nuevo comentario a la pagina
function ShowNewComent(){
    let htmlContentToAppend = "";
    if(JSON.parse(localStorage.getItem("userComent"))){
    let userComentarray = JSON.parse(localStorage.getItem("userComent"));
    for (let i = 0; i < userComentarray.length; i++) {
        let userComent = userComentarray[i];
    //todos los comentarios estaran en local storage, solo me interesan los que pertenezcan al producto
    if (userComent.product == idProd){
        htmlContentToAppend += `
        <div class="list-group-item">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <p class="mb-1"><strong>${userComent.user} </strong>- ${userComent.dateTime} - ${ShowStars(userComent.score)}</p>
                    </div>
                    <p class="mb-1">${userComent.description}</p>
                </div>
            </div>
        </div>
        `

    };
};}
    let commentContainer = document.getElementById("prod-comment-container")

    commentContainer.innerHTML += htmlContentToAppend;
    

}

//funcion que guarda el nuevo comentario en el localstorage
//a futuro quiero que sea una lista de comentarios, todavia esta en desarrollo
document.getElementById("comentBtn").addEventListener('click',()=> { 
    let allComents = [];
    let fecha = new Date();
    let userComent =
    {
        "product": idProd,
        "score": document.getElementById("clientScore").value,
        "description": document.getElementById("clientOp").value,
        "user": localStorage.getItem("emailID"),
        "dateTime":(fecha.getDate() + '-' + ( fecha.getMonth() + 1 ) + '-' + fecha.getFullYear()+ ' ' +
                    fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds()),
    }
    if (userComent.description !=""){
        if(localStorage.getItem("userComent")){
            allComents = JSON.parse(localStorage.getItem("userComent")); 
            allComents.push(userComent);
        }else{
            allComents.push(userComent);
        }
    };
    localStorage.setItem("userComent", JSON.stringify(allComents));
    
    document.getElementById("clientOp").value="";
    document.getElementById("clientScore").value=0;
    location.reload();
});

//funcion para redirigir hacia el producto relacionado
function changeProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

//funcion que muestra los productos relacionados y utiliza un oneclick para poder redirigir
function showRelatedProd(){
    let htmlContentToAppend = "";
    for (let i = 0; i < currentProdInfoArray.relatedProducts.length; i++) {
        let relatedProduct = currentProdInfoArray.relatedProducts[i];{
            htmlContentToAppend += `  
            <div class="col-6">         
                <div onclick="changeProdID(${relatedProduct.id})" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col">
                            <img src="${relatedProduct.image}" class="img-thumbnail">
                        </div>
                        <div class="col-6">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${relatedProduct.name} </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        };
       document.getElementById("relatedProd").innerHTML = htmlContentToAppend;
    };
};

document.getElementById("btnBuy").addEventListener('click',()=>{
    let userCart = [];
    let userCartProd ={
        "id": idProd,
        "name": currentProdInfoArray.name,
        "count": 1,
        "unitCost": currentProdInfoArray.cost,
        "currency": currentProdInfoArray.currency,
        "image": currentProdInfoArray.images[0],
    };
    if(JSON.parse(localStorage.getItem("userCart"))){
        
        for(let i = 0; i<(JSON.parse(localStorage.getItem("userCart")).length); i++){
            let carrito = JSON.parse(localStorage.getItem("userCart"))[i];

            if(carrito.id==idProd){
                userCart = JSON.parse(localStorage.getItem("userCart"));

            }else{
                userCart = JSON.parse(localStorage.getItem("userCart")); 
                userCart.push(userCartProd);
            }
                  
        }
    }else{
        
        userCart.push(userCartProd);
    }
    
    localStorage.setItem("userCart", JSON.stringify(userCart));
    window.location = "cart.html";  
    
})


//carga el json de product info y llama la funcion 
document.addEventListener("DOMContentLoaded", () => {
    getJSONData(prodInfoURL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProdInfoArray = resultObj.data;

            showProductsInfo();
            showRelatedProd();

        }
    });
});

//carga el json de productcoments y llama funciones de comentarios
document.addEventListener("DOMContentLoaded", () => {
    getJSONData(prodComentsURL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProdComentsArray = resultObj.data;
            showProductsComents();
            ShowNewComent();
        }
    });
});
console.log(prodInfoURL);
console.log(currentProdComentsArray);