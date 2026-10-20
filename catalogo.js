const URL_CATALOGO = "https://opensheet.elk.sh/12y6c0tJDPs9Nmziu_qpqpqwf79djTgtftWO9VxL1U80/budines";

const imagenesLocales = {
    "budin de limon sin glase": "budin de limon sin glase.jpg",
    "budin de limon con glase": "budin de limon con glase.jpeg",
    "budin de limon y amapolas sin glase": "budin de limon y amapolas sin glase.jpg",
    "budin de limon y amapolas con glase": "budin de limon y amapolas con glase.jpg",
    "budin de limon y arandanos sin glase": "budin de limon con  arandanos sin glase.jpg",
    "budin de limon y arandanos con glase": "budin de limon con arandanos con glase.jpg",
    "budin de naranja sin glase": "budin de naranja sin glase.jpg",
    "budin de naranja con glase": "budin de naranja con glase.jpg",
    "budin de naranja con bano de chocolate": "budin de naranja y baño de chocolate.jpg",
    "budin de mandarina sin glase": "budin de mandarina sin glase.jpg",
    "budin de mandarina con glase": "budin de mandarina con glase.jpg",
    "budin de banana con chips de chocolate y nueces": "budin de banana con chips de chocolate y nueces.jpg",
    "budin de banana con nueces y bano chocolate": "budin de banana con nueces y baño de chocolate.jpeg",
    "budin de remolacha sin glase": "budin de remolacha sin glase.jpg",
    "budin de remolacha con glase": "budin de remolacha con glase.jpg",
    "budin carrot cake": "budin carrot cake.jpg",
    "budin carrot cake con glase": "BUDIN CARROT CAKE O REMOLACHA CON GLASE.jpg",
    "budin de oreos": "budin de oreos sin glase.jpg",
    "budin de chocolate con cerezas y nueces": "budin de chocolate con cerezas.jpg",
    "budin de vainilla con chips de chocolate": "budin de vainilla con chips de chocolate.jpg",
    "budin de dulce de leche con bano dulce leche": "budin de dulce de leche.jpg",
    "budin marmolado": "budin marmolado.jpg",
    "budin de membrillo": "budin de vainilla con membrillo.jpg",
    "budin de peras con canela": "budin de peras con canela.jpg",
    "budin de frutos secos": "budin de frutos secos.jpg",
    "budin de nuez": "budin de nuez sin glase.jpg",
    "budin con frutas": "budin con frutas.jpg",
    "budin ingles": "BUDIN INGLES.jpg"
};

const imagenesRemotas = {
    "budin de naranja sin glase": "https://i.ibb.co/sJwv1gGR/budin-de-naranja-sin-glase.jpg"
};

const listaProductos = document.querySelector("#catalogo-productos");
const estadoCatalogo = document.querySelector("#estado-catalogo");

function normalizar(texto) {
    return (texto || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[(),]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function crearTexto(etiqueta, texto, clase) {
    const elemento = document.createElement(etiqueta);
    elemento.textContent = texto;
    if (clase) elemento.className = clase;
    return elemento;
}

function obtenerDisponibilidad(producto) {
    const disponibilidad = (producto.disponibilidad || "").trim();
    if (disponibilidad) {
        const disponible = normalizar(disponibilidad) === "disponible";
        return {
            texto: disponibilidad,
            clase: disponible ? "disponible" : "sin-stock"
        };
    }

    const stock = Number.parseInt(producto.stock, 10);
    if (Number.isFinite(stock)) {
        return stock > 0
            ? { texto: "Disponible", clase: "disponible" }
            : { texto: "No disponible", clase: "sin-stock" };
    }

    return { texto: "Consultar disponibilidad", clase: "disponibilidad-pendiente" };
}

function crearTarjeta(producto) {
    const tarjeta = document.createElement("article");
    tarjeta.className = "producto-card";

    const nombre = (producto.producto || "Producto").trim();
    const imagen = document.createElement("img");
    imagen.className = "producto-imagen";
    imagen.alt = (producto.descripcionimagen || nombre).trim();
    imagen.loading = "lazy";

    const nombreNormalizado = normalizar(nombre);
    const imagenLocal = imagenesLocales[nombreNormalizado];
    const imagenRemota = imagenesRemotas[nombreNormalizado];
    let intentoImagenLocal = false;

    imagen.addEventListener("error", () => {
        if (!intentoImagenLocal && imagenLocal) {
            intentoImagenLocal = true;
            imagen.src = `imagenes%20del%20catalogo/${encodeURIComponent(imagenLocal).replace(/%2F/gi, "/")}`;
            return;
        }
        imagen.hidden = true;
    });

    const urlImagen = (producto.imagen || "").trim();
    if (imagenRemota) {
        imagen.src = imagenRemota;
    } else if (urlImagen) {
        imagen.src = urlImagen;
    } else if (imagenLocal) {
        intentoImagenLocal = true;
        imagen.src = `imagenes%20del%20catalogo/${encodeURIComponent(imagenLocal)}`;
    } else {
        imagen.hidden = true;
    }

    tarjeta.append(imagen, crearTexto("h2", nombre));

    tarjeta.appendChild(crearTexto(
        "p",
        (producto.descripcion || "").trim() || "Consultanos por más detalles de este producto.",
        "producto-descripcion"
    ));
    tarjeta.appendChild(crearTexto(
        "p",
        (producto.precio || "").trim() || "Consultar precio",
        "precio"
    ));

    const disponibilidad = obtenerDisponibilidad(producto);
    tarjeta.appendChild(crearTexto("p", disponibilidad.texto, `estado-producto ${disponibilidad.clase}`));

    return tarjeta;
}

async function cargarCatalogo() {
    try {
        const respuesta = await fetch(URL_CATALOGO);
        if (!respuesta.ok) {
            throw new Error(`OpenSheet respondió con el estado ${respuesta.status}.`);
        }

        const productos = await respuesta.json();
        if (!Array.isArray(productos)) {
            throw new Error("La respuesta de OpenSheet no tiene el formato esperado.");
        }

        const productosConNombre = productos.filter((producto) => (producto.producto || "").trim());
        listaProductos.replaceChildren(...productosConNombre.map(crearTarjeta));
        estadoCatalogo.textContent = productosConNombre.length
            ? `Se muestran ${productosConNombre.length} budines del catálogo.`
            : "No hay productos cargados en la hoja de budines.";
    } catch (error) {
        console.error("No se pudo cargar el catálogo de budines:", error);
        estadoCatalogo.textContent = "No se pudo cargar el catálogo. Revisá tu conexión e intentá nuevamente.";
        estadoCatalogo.classList.add("estado-error");
    }
}

cargarCatalogo();
