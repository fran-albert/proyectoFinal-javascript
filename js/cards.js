// TRAIGO LOS ID'S DE HTML
let camisetasCards = document.getElementById("camisetas");
let buzosCards = document.getElementById("buzos");
let camperasCards = document.getElementById("camperas");
let zapatillasCards = document.getElementById("zapatillas");

// FUNCTION SOBRE CAMISETAS

function imprimirCamisetas(arrayGeneral) {
  let arrayFiltrado = arrayGeneral.filter(
    (element) => element.categoria.toLowerCase() == "camiseta"
  );
  for (let element of arrayFiltrado) {
    let card = document.createElement("card");
    card.className = "card";
    card.style = "width: 18rem";
    card.innerHTML = `
  <img src="${element.img}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${element.titulo}</h5>
    <p class="card-text ">
      ${element.info} <span class="precio"> ${element.precio.toFixed(2)}</span>
    </p>
    <a href="" class="btn btn-primary agregar-carrito" data-id="${element.id}">Comprar</a>
  </div>
    `;
    camisetasCards.appendChild(card);
  }
}


// FUNCTION SOBRE BUZOS

function imprimirBuzos(arrayGeneral) {
  let arrayFiltrado = arrayGeneral.filter(
    (element) => element.categoria.toLowerCase() == "buzo"
  );
  for (let element of arrayFiltrado) {
    let card = document.createElement("card");
    card.className = "card";
    card.style = "width: 18rem";
    card.innerHTML = `
    <img src= ${element.img} class="card-img-top" alt="..."/>
    <div class="card-body">
    <h5 class="card-title">${element.titulo}</h5>
    <p class="card-text ">
      ${element.info} <span class="precio"> ${element.precio.toFixed(2)}</span>
    </p>
    <a href="" class="btn btn-primary agregar-carrito " data-id="2">Comprar</a>
  </div>
    `;
    buzosCards.appendChild(card);
  }
}

// FUNCTION SOBRE CAMPERAS

function imprimirCamperas(arrayGeneral) {
  let arrayFiltrado = arrayGeneral.filter(
    (element) => element.categoria.toLowerCase() == "campera"
  );
  for (let element of arrayFiltrado) {
    let card = document.createElement("card");
    card.className = "card";
    card.style = "width: 18rem";
    card.innerHTML = `
    <img src= ${element.img} class="card-img-top" alt="..."/>
    <div class="card-body">
    <h5 class="card-title">${element.titulo}</h5>
    <p class="card-text ">
      ${element.info} <span class="precio"> ${element.precio.toFixed(2)}</span>
    </p>
    <a href="" class="btn btn-primary agregar-carrito " data-id="3">Comprar</a>
  </div>
    `;
    camperasCards.appendChild(card);
  }
}

// FUNCTION SOBRE ZAPATILLAS

function imprimirZapatillas(arrayGeneral) {
  let arrayFiltrado = arrayGeneral.filter(
    (element) => element.categoria.toLowerCase() == "zapatilla"
  );
  for (let element of arrayFiltrado) {
    let card = document.createElement("card");
    card.className = "card";
    card.style = "width: 18rem";
    card.innerHTML = `
    <img src= ${element.img} class="card-img-top" alt="..."/>
    <div class="card-body">
    <h5 class="card-title">${element.titulo}</h5>
    <p class="card-text ">
      ${element.info} <span class="precio"> ${element.precio.toFixed(2)}</span>
    </p>
    <a href="" class="btn btn-primary agregar-carrito " data-id="4">Comprar</a>
  </div>
    `;
    zapatillasCards.appendChild(card);
  }
}


const prendas = []

function ObtenerPrendas() {
  const datos = "../data/productos.json"
  fetch(datos)
      .then(resultado => resultado.json())
      .then(data => {
        data.clothes.forEach(element => {
          prendas.push(element)
        })
        imprimirCamisetas(prendas)
        imprimirBuzos(prendas)
        imprimirCamperas(prendas)
        imprimirZapatillas(prendas)
      })
}

ObtenerPrendas()