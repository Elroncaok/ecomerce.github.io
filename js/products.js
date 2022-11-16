//copio desde categories.js las constantes para ordear 
const ORDER_ASC_BY_COST = "AZ";
const ORDER_DESC_BY_COST = "ZA";
const ORDER_BY_PROD_COUNT = "Cost.";
let currentProductsarray = [];
let currentjsonarray = [];
//creo variables indefinidas y vacias para insertar aca los valores de filtro /busqueda
let currentSortCriteria = undefined;
let minCost = undefined;
let maxCost = undefined;
let antonioMaeso = "";

//creo variable obteniendo informacion desde localstorage
let idNumero = localStorage.getItem("catID");

//creo constante con URL de init, id producto y string 
const allProducts_url = PRODUCTS_URL+idNumero+".json";

//sort para ordenar el array, segun los valores dados
function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            //utilizo parseint para transformar entero a numerico
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}


function setProdID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}

    
    function showProductsList(){
        //creo variable para modificar la presentación del sitio
        let nombreCat = document.getElementById("nombreCat");
        nombreCat.innerHTML = currentjsonarray.catName;
        let htmlContentToAppend = "";
        //utilizo el for para recorrer array e insertarlo en string vacio
        for(let i = 0; i < currentProductsarray.length; i++){
            let product = currentProductsarray[i];

            //condiciones que deben cumplir los elementos del json
            //utilizo parseint otra vez.
            if ((((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost)))
            &&(product.name.toLowerCase().includes(antonioMaeso.toLowerCase())))
            {

                //utilizo codigo de categories.js para reducir trabajo y mantener formato
                //el onclick me dio en categories la orientacion hacia local storage
                //el oneclick va ser utilizado para redirigir los productos oir su id
                htmlContentToAppend += `
                <div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${product.name} - ${product.currency} ${product.cost}</h4>
                                <small class="text-muted">${product.soldCount} vendidos</small>
                            </div>
                            <p class="mb-1">${product.description}</p>
                        </div>
                    </div>
                </div>
                `
            }
    
                //creo objeto con un div del html
                let container = document.getElementById("lista-productos")
            //le introduzco el html en formato string redactado antes
            container.innerHTML = htmlContentToAppend;
        }
    };   
    
    function sortAndShowProducts(sortCriteria, productsArray){
        currentSortCriteria = sortCriteria;
    
        if(productsArray != undefined){
            currentProductsarray = productsArray;
        }
    
        currentProductsarray = sortProducts(currentSortCriteria, currentProductsarray);
    
        //Muestro las categorías ordenadas
        showProductsList();
    }

document.addEventListener("DOMContentLoaded", function (e) {
        getJSONData(allProducts_url).then(function (resultObj) {
            if (resultObj.status === "ok") {
                currentProductsarray = resultObj.data.products;
                currentjsonarray = resultObj.data;
                showProductsList();
                //sortAndShowCategories(ORDER_ASC_BY_COST, resultObj.data);
            }
        });

       //boton valor ascendente
        document.getElementById("sortAsc").addEventListener("click", function(){
            sortAndShowProducts(ORDER_ASC_BY_COST);
        });
        
        //boton valor descendente
        document.getElementById("sortDesc").addEventListener("click", function(){
            sortAndShowProducts(ORDER_DESC_BY_COST);
        });
        
        //boton descendente por cantidad de ventas
        document.getElementById("sortByCount").addEventListener("click", function(){
            sortAndShowProducts(ORDER_BY_PROD_COUNT);
        });
    
        //boton limpiar filtro de min y max costo
        document.getElementById("clearRangeFilter").addEventListener("click", function(){
            document.getElementById("rangeFilterCountMin").value = "";
            document.getElementById("rangeFilterCountMax").value = "";
    
            minCost = undefined;
            maxCost = undefined;
    
            showProductsList();
        });
    
        document.getElementById("rangeFilterCount").addEventListener("click", function(){
            //Obtengo el mínimo y máximo de los intervalos para filtrar por costo
            minCost = document.getElementById("rangeFilterCountMin").value;
            maxCost = document.getElementById("rangeFilterCountMax").value;
    
            if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
                minCost = parseInt(minCost);
            }
            else{
                minCost = undefined;
            }
    
            if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
                maxCost = parseInt(maxCost);
            }
            else{
                maxCost = undefined;
            }
            showProductsList();
    }); 

    //actualizo el valor de la barra de busqueda para que filtre los elementos que coincidan
    document.getElementById("searchProduct").addEventListener("input", function(){

        antonioMaeso = document.getElementById("searchProduct").value;
        
        showProductsList();
        

    });
});
