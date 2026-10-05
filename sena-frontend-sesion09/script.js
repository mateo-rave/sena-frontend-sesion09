const catalogo = [
    { nombre: "Audífonos Nova", precio: 185000, categoria: "tecnologia", activo: true },
    { nombre: "Teclado Mecánico", precio: 245000, categoria: "tecnologia", activo: true },
    { nombre: "Lámpara LED", precio: 78000, categoria: "hogar", activo: true },
    { nombre: "Termo Térmico", precio: 92000, categoria: "hogar", activo: false },
    { nombre: "Balón de Fútbol", precio: 135000, categoria: "deportes", activo: true },
    { nombre: "Guantes Deportivos", precio: 65000, categoria: "deportes", activo: true },
    { nombre: "Morral Urbano", precio: 160000, categoria: "accesorios", activo: true },
    { nombre: "Gorra Classic", precio: 55000, categoria: "accesorios", activo: true },
    { nombre: "Mouse Inalámbrico", precio: 99000, categoria: "tecnologia", activo: true },
    { nombre: "Botella Deportiva", precio: 48000, categoria: "deportes", activo: false }
];

let productosDisponibles = [...catalogo];

const lista = document.querySelector("#productos");
const filtroCategoria = document.querySelector("#categoria");
const ordenPrecio = document.querySelector("#orden");
const resumen = document.querySelector("#resumen");

const dinero = (valor) => `$${valor.toLocaleString("es-CO")}`;

function mostrarProductos() {
    const categoriaElegida = filtroCategoria.value;
    const ordenElegido = ordenPrecio.value;

    let resultado = productosDisponibles.filter(
        ({ categoria }) => categoriaElegida === "todas" || categoria === categoriaElegida
    );

    if (ordenElegido === "menor") {
        resultado = [...resultado].sort((a, b) => a.precio - b.precio);
    } else if (ordenElegido === "mayor") {
        resultado = [...resultado].sort((a, b) => b.precio - a.precio);
    }

    const total = resultado.reduce((acumulado, { precio }) => acumulado + precio, 0);

    resumen.textContent = `${resultado.length} producto(s) | Valor total: ${dinero(total)}`;

    lista.innerHTML = resultado.length
        ? resultado.map(({ nombre, precio, categoria, activo }) => `
            <article class="producto" data-producto="${nombre}">
                <h2>${nombre}</h2>
                <p class="precio">${dinero(precio)}</p>
                <p>Categoría: ${categoria}</p>
                <p class="estado ${activo ? "disponible" : "agotado"}">
                    ${activo ? "Disponible" : "No disponible"}
                </p>
                <button class="btn-eliminar" type="button">Eliminar</button>
            </article>
        `).join("")
        : `<div class="vacio">No hay productos para esta categoría.</div>`;
}

filtroCategoria.addEventListener("change", mostrarProductos);
ordenPrecio.addEventListener("change", mostrarProductos);

lista.addEventListener("click", (evento) => {
    const boton = evento.target.closest(".btn-eliminar");

    if (!boton) return;

    const tarjeta = boton.closest(".producto");
    const nombre = tarjeta?.dataset.producto;

    if (!nombre) return;

    productosDisponibles = productosDisponibles.filter(
        ({ nombre: nombreProducto }) => nombreProducto !== nombre
    );

    mostrarProductos();
});

mostrarProductos();
