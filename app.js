class Producto {
    constructor(id, nombre, precio, stock, img, descripcion, alt) {
        this.id = id
        this.nombre = nombre
        this.cantidad = 1
        this.precio = precio
        this.stock = stock
        this.img = img
        this.descripcion = descripcion
        this.alt = alt
    }
}

class ProductoController {
    constructor() {
        this.listaProductos = []
        this.contenedor_productos = document.getElementById("contenedor_productos")
    }

    async levantar_y_mostrar(controladorCarrito){
        const resp = await fetch("www.lamercaderia.json")
        this.listaProductos = await resp.json()

        this.mostrarEnDOM()
        this.darEventoClickAProductos(controladorCarrito)
    }


        levantarProductos() {
            this.listaProductos = [
                new Producto(1, "Iphone 12", 120000, 10, "./img/productos/iphone12.png", "Un celular gama alta", "Celular"),
                new Producto(2, "Samsung galaxy s21", 150000, 10, "./img/productos/Samsung S21.png", "Un celular gama alta", "Celular"),
                new Producto(3, "Xiaomi mi 11", 175000, 10, "./img/productos/Xiaomi Mi 11.png", "Un celular gama alta", "Celular"),
                new Producto(4, "Airpods Pro", 300000, 10, "./img/productos/airpods.png", "Accesorio / Auriculares", "Auricular bluetooth"),
                new Producto(5, "Galaxy Buds Pro", 100000, 10, "./img/productos/galaxy buds.png", "Accesorio / Auriculares", "Auricular bluetooth"),
                new Producto(6, "Apple Watch", 100000, 10, "./img/productos/apple watch.png", "Accesorio / Auriculares", "Smarthwatch"),
            ]
    }

    mostrarEnDOM() {
        this.listaProductos.forEach(producto => {
            this.contenedor_productos.innerHTML += `
            <div class="card border-primary" style="width: 18rem;">
                <img src="${producto.img}" class="card-img-top" alt="${producto.alt}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">${producto.descripcion}</p>
                    <p class="card-text">Precio: $${producto.precio}</p>
                    <a href="#" id="cpu-${producto.id}" class="btn btn-primary">Añadir al carrito</a>
                </div>
            </div>`
        })
    }

    darEventoClickAProductos(controladorCarrito) {
        this.listaProductos.forEach(producto => {
            const btnAP = document.getElementById(`cpu-${producto.id}`)
            btnAP.addEventListener("click", () => {

                controladorCarrito.agregar(producto)
                controladorCarrito.guardarEnStorage()
                
                controladorCarrito.mostrarEnDOM(contenedor_carrito)

                Toastify({
                    text: `${producto.nombre} añadido!`,
                    duration: 3000,
                    
                    gravity: "bottom", 
                    position: "right",
            
                    style: {
                        background: "linear-gradient(to right,#12cfe0, #81eef7)",
                    }
                }).showToast();
            })
        })
    }
}

class CarritoController {
    constructor() {
        this.precio_total = document.getElementById("precio_total")
        this.listaCarrito = []
        this.contenedor_carrito = document.getElementById("contenedor_carrito")
    }

    calcularTotalYmostrarEnDOM(){
        let total = 0;
        total = this.listaCarrito.reduce((total, producto) => total + producto.cantidad * producto.precio, 0)
        this.precio_total.innerHTML = `Total a pagar: $${total}`;
    }

    verificarSiExisteElProducto(producto){
        return this.listaCarrito.find((elproducto)=>elproducto.id == producto.id)
    }

    agregar(producto) {

        let objeto = this.verificarSiExisteElProducto(producto)

        if( objeto ){
            objeto.cantidad += 1;
        }else{{
            this.listaCarrito.push(producto)
        }}
        
    }

    limpiarCarritoEnStorage(){
        localStorage.removeItem("listaCarrito")
    }

    guardarEnStorage() {
        let listaCarritoJSON = JSON.stringify(this.listaCarrito)
        localStorage.setItem("listaCarrito", listaCarritoJSON)
    }

    verificarExistenciaEnStorage() {
        this.listaCarrito = JSON.parse(localStorage.getItem('listaCarrito')) || []
        if (this.listaCarrito.length > 0) {
            this.mostrarEnDOM()
        }
    }

    limpiarContenedor_Carrito() {
        this.contenedor_carrito.innerHTML = ""
    }

    borrar(producto){
        let posicion = this.listaCarrito.findIndex(miProducto => producto.id == miProducto.id)

        if(  !(posicion == -1)   ){
            this.listaCarrito.splice(posicion,1)
        }
    }

    mostrarEnDOM() {
        this.limpiarContenedor_Carrito()
        this.listaCarrito.forEach(producto => {
            this.contenedor_carrito.innerHTML +=
                `<div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                    <img src="${producto.img}" class="img-fluid rounded-start" alt="${producto.alt}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">Descripcion: ${producto.descripcion}</p>
                            <p class="card-text">Precio: $${producto.precio}</p>
                            <p class="card-text">Cantidad: ${producto.cantidad}</p>
                            <button class="btn btn-danger" id="borrar-${producto.id}"><i class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>`
        })

        this.listaCarrito.forEach(producto => {
            const btnBorrar = document.getElementById(`borrar-${producto.id}`)

            btnBorrar.addEventListener("click", ()=>{
                this.borrar(producto)
                this.guardarEnStorage()
                this.mostrarEnDOM()
            })
        })
        this.calcularTotalYmostrarEnDOM()
    }
}

//CONTROLLERS
const controladorProductos = new ProductoController()
const controladorCarrito = new CarritoController()

controladorProductos.levantar_y_mostrar(controladorCarrito)

//Carrito Verifica en STORAGE y muestra en DOM si hay algo.
controladorCarrito.verificarExistenciaEnStorage()


//DOM
const finalizar_compra = document.getElementById("finalizar_compra")



finalizar_compra.addEventListener("click", () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Ha completado la compra exitosamente!',
        showConfirmButton: false,
        timer: 2000
    })

    //está en DOM
    controladorCarrito.limpiarContenedor_Carrito()
    //está en localStorage
    controladorCarrito.limpiarCarritoEnStorage()
    //está en listaCarrito
    controladorCarrito.listaCarrito = []
})
