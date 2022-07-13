const compra = new Carrito()
const listaCompra = document.querySelector('#lista-compra tbody')
const carrito = document.getElementById('carritoCart')
const procesarCompraBtn = document.getElementById('boton-comprar')
const cliente = document.getElementById('cliente')
const correo = document.getElementById('correo')



cargarEventos()

function cargarEventos() {

    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

    //Eliminar productos del carrito
    carrito.addEventListener('click',(e)=> {compra.eliminarProducto(e)});

    compra.calcularTotal();

    //cuando se selecciona procesar Compra
    procesarCompraBtn.addEventListener('click', procesarCompra);

    carrito.addEventListener('change', (e) => { compra.obtenerEvento(e) });
    carrito.addEventListener('keyup', (e) => { compra.obtenerEvento(e) });
}


function procesarCompra(e) {
    e.preventDefault();
    
    if(compra.obtenerProductosLocalStorage().length === 0) {
        swal({
            title: "No se puede realizar la compra",
            text: "No hay productos seleccionados, por favor seleccione alguno.",
            icon: "error",
          }).then(function(){
              window.location = '../index.html'
          })
    }
    else if (cliente.value === '' || correo.value === '') {
        swal({
            title: "No se puede realizar la compra",
            text: "Ingrese los campos requeridos",
            icon: "error",
          })
    }
    else {
        const cargandoGif = document.querySelector('#cargando')
        cargandoGif.style.display = 'block'
        const enviado = document.createElement('img')
        enviado.src = '../img/mail.gif'
        enviado.width = '40'
        enviado.style.display = 'block'

        setTimeout(() => {
            cargandoGif.style.display = 'none'
            document.querySelector('#loaders').appendChild(enviado)
            setTimeout(() => {
                enviado.remove()
                compra.vaciarLocalStorage()
                window.location = '../index.html'
            }, 2000);
        }, 3000);
    }
}