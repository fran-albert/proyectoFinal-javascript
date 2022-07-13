class Carrito {
  //Añadir producto al carrito

  comprarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
      const producto = e.target.parentElement.parentElement;
      this.leerDatosProducto(producto);
    }
  }

  //Leer Datos del Producto

  leerDatosProducto(producto) {
    const infoProducto = {
      // declaro un Objeto con las siguientes propiedades
      imagen: producto.querySelector("img").src,
      titulo: producto.querySelector("h5").textContent,
      precio: producto.querySelector(".precio").textContent,
      id: producto.querySelector("a").getAttribute("data-id"),
      cantidad: 1,
    };
    let productosLS
    productosLS = this.obtenerProductosLocalStorage()
    productosLS.forEach(function(productoLS){
        if(productoLS.id === infoProducto.id) {
            productosLS = productoLS.id;
        }
   });
   if(productosLS === infoProducto.id) {
    swal({
        title: "Producto ya agregado",
        text: "",
        icon: "info",
      });
   } else {
       this.insertarCarrito(infoProducto);
   }
  }

  insertarCarrito(producto) {
    swal({
      title: "Producto agregado",
      text: "",
      icon: 'success',
    });
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>
            <img src= "${producto.imagen}" width =100>
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.cantidad}</td>
        <td>${producto.precio}</td>
        <td>
            <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
        </td>
        `;
    listaProductos.appendChild(row);
    this.guardarProductosLocalStorage(producto);
  }

  eliminarProducto(e) {
    e.preventDefault();
    let producto, productoID;
    if (e.target.classList.contains("borrar-producto")) {
      e.target.parentElement.parentElement.remove();
      producto = e.target.parentElement.parentElement;
      productoID = producto.querySelector("a").getAttribute("data-id");
      swal({
        title: "Has eliminado un Producto",
        text: "",
        icon: "info",
      });
    }
    this.eliminarProductoLocalStorage(productoID);
    this.calcularTotal();
  }

  vaciarCarrito(e) {
    e.preventDefault();
    swal({
      title: "Carrito Vacío",
      text: "",
      icon: "error",
    });
    while (listaProductos.firstChild) {
      listaProductos.removeChild(listaProductos.firstChild);
    }
    this.vaciarLocalStorage();
    return false;
  }

  guardarProductosLocalStorage(producto) {
    let productos;
    //Toma valor de un arreglo con datos del LS
    productos = this.obtenerProductosLocalStorage();
    //Agregar el producto al carrito
    productos.push(producto);
    //Agregamos al LS
    localStorage.setItem("productos", JSON.stringify(productos));
  }

  //Comprobar que hay elementos en el LS
  obtenerProductosLocalStorage() {
    let productoLS;
    //Comprobar si hay algo en LS
    if (localStorage.getItem("productos") === null) {
      productoLS = [];
    } else {
      productoLS = JSON.parse(localStorage.getItem("productos"));
    }
    return productoLS;
  }

  eliminarProductoLocalStorage(productoID) {
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function (productoLS, index) {
      if (productoLS.id === productoID) {
        productosLS.splice(index, 1);
      }
    });
    //Actualizo local Storage
    localStorage.setItem("productos", JSON.stringify(productosLS));
  }

  //Mostrar los productos guardados en el LS
  leerLocalStorage() {
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function (producto) {
      //Construir plantilla
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
            <img src="${producto.imagen}" width=100>                            
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.cantidad}</td>
        <td>${producto.precio}</td>
        <td>
            <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}">
        </td>
         `;
      listaProductos.appendChild(row);
    });
  }
 //Mostrar los productos guardados en el LS en cart.html
  leerLocalStorageCompra() {
    let productosLS;
    productosLS = this.obtenerProductosLocalStorage();
    productosLS.forEach(function (producto) {
      //Construir plantilla
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
            <img src="${producto.imagen}" width=100>                            
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
            <input type="number" class="cantidad form-control" min="1" value=${producto.cantidad}>
        </td>
        <td id="subtotales">${producto.precio * producto.cantidad}</td>
        <td>
            <a href="#" class="borrar-producto fas fa-times-circle" style="font-size: 20px" data-id="${producto.id}">
        </td>
         `;
      listaCompra.appendChild(row);
    });
  }

  vaciarLocalStorage() {
    localStorage.clear();
  }
  
  procesarPedido(e) {
    e.preventDefault();
    if (this.obtenerProductosLocalStorage().length === 0) {
      swal("Alerta", "Tienes el carrito vacío, necesitar llenarlo", "error");
    } else {
      location.href = "../pages/cart.html";
    }
  }

  calcularTotal() {
    let productoLS;
    let subtotal = 0,
      iva = 0,
      total = 0;
    productoLS = this.obtenerProductosLocalStorage();
    for (let i = 0; i < productoLS.length; i++) {
      let elemento = Number(productoLS[i].precio * productoLS[i].cantidad);
      subtotal = subtotal + elemento;
    }
    iva = parseFloat(subtotal * 0.21).toFixed(2);
    total = subtotal * 1.21;
    document.getElementById("subtotal").innerHTML = "$ " + subtotal.toFixed(2);
    document.getElementById("Iva").innerHTML = "$ " + iva;
    document.getElementById("total").innerHTML = "$ " + total.toFixed(2);
  }

  obtenerEvento(e) {
    e.preventDefault();
    let id, cantidad, producto, productosLS;
    if (e.target.classList.contains('cantidad')) {
        producto = e.target.parentElement.parentElement;
        id = producto.querySelector('a').getAttribute('data-id');
        cantidad = producto.querySelector('input').value;
        let actualizarMontos = document.querySelectorAll('#subtotales');
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (productoLS, index) {
            if (productoLS.id === id) {
                productoLS.cantidad = cantidad;                    
                actualizarMontos[index].innerHTML = Number(cantidad * productosLS[index].precio);
            }    
        });
        localStorage.setItem('productos', JSON.stringify(productosLS));        
    }
    else {
        console.log("click afuera");
    }
}
}
