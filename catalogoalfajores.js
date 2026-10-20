const URL_CATALOGOALFAJORES = "https://opensheet.elk.sh/12y6c0tJDPs9Nmziu_qpqpqwf79djTgtftWO9VxL1U80/alfajores";

const imagenesDirectas = {
    "alfajores de maicena x 6": "https://i.ibb.co/GvrFNTZX/alfajores-de-maicena-x-6.jpg",
    "alfajores de maicena x 12": "https://i.ibb.co/WvM4SYcY/alfajores-de-maicena-x-12.jpg",
    "alfajores con bano de chocolate negro x 6": "https://i.ibb.co/d0QL7N0r/alfajores-con-ba-o-de-chocolate-negro-x-6.jpg",
    "alfajores con bano de chocolate negro y mani x 6": "https://i.ibb.co/TDsRjt2p/alfajores-con-ba-o-de-chocolate-negro-y-man-x6.jpg"
};

const imagenesLocales = {
  "alfajores de maicena x 6":"imagenes%20del%20catalogo/alfajores%20de%20maicena%20x%206.jpg",
  "alfajores de maicena x 12":"imagenes%20del%20catalogo/alfajores%20de%20maicena%20x%2012.jpg",
    "alfajores con bano de chocolate negro x 6":"imagenes%20del%20catalogo/alfajores%20con%20bano%20de%20chocolate%20negro%20%20x%206.jpg",
  "alfajores con bano de chocolate negro y mani x 6":"imagenes%20del%20catalogo/alfajores%20con%20bano%20de%20chocolate%20negro%20y%20mani%20x%206.jpg"

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

    if (clase) { 
        elemento.className = clase;
    }
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
    const nombreNormalizado = normalizar(nombre);
    const imagen = document.createElement("img");

    imagen.className = "producto-imagen";
    imagen.alt = (producto.descripcionimagen || nombre).trim();
    imagen.loading = "lazy";

    const urlPlanilla = (producto.imagen || "").trim();
    const esPaginaImgbb = /^https?:\/\/(?:www\.)?ibb\.co\//i.test(urlPlanilla);
    const fuentesImagen = [];

    if (imagenesDirectas[nombreNormalizado]) {
        fuentesImagen.push(imagenesDirectas[nombreNormalizado]);
    }

    if (urlPlanilla && !esPaginaImgbb) {
        fuentesImagen.push(urlPlanilla);
    }
    if (imagenesLocales[nombreNormalizado]) {
        fuentesImagen.push(imagenesLocales[nombreNormalizado]);
    }

    if (fuentesImagen.length > 0) {
        let indiceFuente = 0;

        imagen.addEventListener("error", () => {
            indiceFuente += 1;

            if (indiceFuente < fuentesImagen.length) {
                imagen.src = fuentesImagen[indiceFuente];
            } else {
                imagen.hidden = true;
            }
        });

        imagen.src = fuentesImagen[indiceFuente];
    } else {
        imagen.hidden = true;
    }

    tarjeta.append(imagen, crearTexto("h2", nombre));

    tarjeta.appendChild(
        crearTexto(
            "p",
           (producto.descripcion || "").trim() ||
                "Consultanos por más detalles de este producto.",
            "producto-descripcion"
        )
    );

    tarjeta.appendChild(
        crearTexto("p", (producto.precio || "").trim() || "Consultar precio", "precio")
    );

    const disponibilidad = obtenerDisponibilidad(producto);

    tarjeta.appendChild(
        crearTexto(
            "p",
            disponibilidad.texto,
            `estado-producto ${disponibilidad.clase}`
        )
    );

    return tarjeta;
}

async function cargarCatalogo() {
    try {
        const respuesta = await fetch (URL_CATALOGOALFAJORES); 

      if (!respuesta.ok) {
            throw new Error(`OpenSheet respondió con el estado ${respuesta.status}.`);
        }

        const productos = await respuesta.json();

        if (!Array.isArray(productos)) {
            throw new Error("La respuesta de OpenSheet no tiene el formato esperado.");
        }

        const productosConNombre = productos.filter(
            (producto) => (producto.producto || "").trim()
        );

        listaProductos.replaceChildren(...productosConNombre.map(crearTarjeta));

        estadoCatalogo.textContent = productosConNombre.length
            ? `Se muestran ${productosConNombre.length} Alfajores del catálogo.`
            : "No hay productos cargados en la hoja de alfajores.";
            
    } catch (error) {
        console.error("No se pudo cargar el catálogo de alfajores:", error);
        estadoCatalogo.textContent =
            "No se pudo cargar el catálogo. Revisá tu conexión e intentá nuevamente.";
        estadoCatalogo.classList.add("estado-error");
    }
}

cargarCatalogo();  