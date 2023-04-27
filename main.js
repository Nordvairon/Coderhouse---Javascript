class Producto {
    constructor(nombre, precio) {
      this.nombre = nombre;
      this.precio = precio;
    }
  }
  
  let carritoDeCompras = []; // Matriz vacía para almacenar productos
  
  // Crear una función para agregar un producto al carrito de compras
  function agregarAlCarrito() {
    let nombre = prompt("Ingrese el nombre del producto:");
    let precio = parseFloat(prompt("Ingrese el precio del producto:"));
  
    let producto = new Producto(nombre, precio);
    carritoDeCompras.push(producto);
    console.log(`El producto ${nombre} fue agregado al carrito de compras.`);
  }
  
  // Crear una función para calcular el total de la compra
  function calcularTotal() {
    let subtotal = 0;
    for (let i = 0; i < carritoDeCompras.length; i++) {
      subtotal += carritoDeCompras[i].precio;
    }
    let iva = subtotal * 0.21; // Calcular el IVA
    let total = subtotal + iva; // Sumar el IVA al subtotal para obtener el precio final
    return total;
  }
  
  // Ciclo para seguir agregando productos al carrito de compras hasta que el usuario decida finalizar la compra
  let seguirComprando = true;
  while (seguirComprando) {
    agregarAlCarrito();
  
    let seguirComprandoInput = prompt("¿Desea seguir comprando? (S/N)");
    if (seguirComprandoInput.toUpperCase() === "N") {
      seguirComprando = false;
    }
  }
  
  // Resultado de los datos procesados
  console.log(`El carrito de compras contiene los siguientes productos:`);
  console.log(carritoDeCompras);
  console.log(`El subtotal de la compra es: ${calcularTotal()}`);
  console.log(`El IVA es: $${(calcularTotal() * 0.21).toFixed(2)}`);
  console.log(`El total de la compra es: $${calcularTotal().toFixed(2)}`);
  
