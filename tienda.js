// Variables globales
let carrito = [];

// Clase Producto
class Producto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = precio;
  }
}

// Función para agregar un producto al carrito
const agregarAlCarrito = (nombre, precio) => {
  if (nombre && precio) {
    const producto = new Producto(nombre, precio);
    carrito = [...carrito, producto];
  }
  mostrarCarrito();
}

// Función para eliminar un producto del carrito
const eliminarDelCarrito = (nombre, precio) => {
  carrito = carrito.filter(producto => producto.nombre !== nombre || producto.precio !== precio);
  mostrarCarrito();
}

// Función para vaciar el carrito
const vaciarCarrito = () => {
  carrito = [];
  mostrarCarrito();
}

// Función para mostrar el carrito
const mostrarCarrito = () => {
  const carritoElemento = document.getElementById("carrito");
  carritoElemento.innerHTML = "";

  let subtotal = 0;

  carrito.forEach(producto => {
    const { nombre, precio } = producto;
    carritoElemento.innerHTML += `
      <li>
        <h3>${nombre}</h3>
        <p class='precio'>${precio}</p>
        <button onclick="eliminarDelCarrito('${nombre}', ${precio})">Eliminar del carrito</button>
      </li>
    `;
    subtotal += precio;
  });

  const iva = subtotal * 0.21;
  const total = subtotal + iva;

  const subtotalElemento = document.getElementById("subtotal");
  subtotalElemento.innerHTML = `
    <p>Subtotal: $${subtotal.toFixed(2)}</p>
    <p>IVA: $${iva.toFixed(2)}</p>
    <p>Total: $${total.toFixed(2)}</p>
  `;
}

// Operador ternario 
const esNumero = (valor) => (typeof valor === 'number') ? true : false;

// Operador AND
const calcularPrecio = (precioUnitario, cantidad) => {
  const esValido = esNumero(precioUnitario) && esNumero(cantidad);
  return esValido ? precioUnitario * cantidad : 0;
}

// Operador OR
const obtenerNombre = (usuario) => {
  const nombre = usuario && usuario.nombre || 'Nombre por defecto';
  return nombre;
}