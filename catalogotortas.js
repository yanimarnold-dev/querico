const URL_CATALOGOTORTAS =
    "https://opensheet.elk.sh/12y6c0tJDPs9Nmziu_qpqpqwf79djTgtftWO9VxL1U80/tortas";


const imagenesDirectas = {
    "torta bizcochuelo multifrutal": "https://i.ibb.co/0jfC4cQ2/torta-biscochuelo-multifrutal.jpg",
    "torta bizcochuelo personalizada": "https://i.ibb.co/V0cMB3Pd/torta-biscochuelo-personalizada.jpg",
    "torta selva negra": "https://i.ibb.co/k2Kn6T8n/torta-selva-negra.jpg",
    "torta chaja": "https://i.ibb.co/hJSYQDPJ/torta-chaja.jpg",
    "torta espejo": "https://i.ibb.co/xtfGDjXH/torta-espejo.jpg",
     "torta con crema y durazno": "https://i.ibb.co/NdCjKcdW/torta-con-crema-y-durazno.jpg",
     "torta forrada con detalles": "https://i.ibb.co/9mwP79q3/torta-forrada-con-detalles.jpg",
     "torta matera redonda": "https://i.ibb.co/4nkx6csJ/torta-matera-redonda.jpg",
     "torta matera rectangular": "https://i.ibb.co/LzLqcmzJ/torta-matera-rectangular.jpg",
     "torta invertida de manzanas redonda": "https://i.ibb.co/27v59QMC/torta-invertida-de-manzanas-redonda.jpg",
     "torta invertida de manzanas rectangular": "https://i.ibb.co/JSTdSVs/torta-invertida-de-manzanas-rectangular.jpg",
     "lemon pie": "https://i.ibb.co/nq7fGS82/lemon-pie.png",
"tarta cheesecake frutos rojos": "https://i.ibb.co/LDWBS4HC/tarta-cheesecake-frutos-rojos.jpg",
"tarta de frutillas": "https://i.ibb.co/R4TBzP59/tarta-frutilla.jpg",
"tarta de peras": "https://i.ibb.co/DfvPyhRT/tarta-de-peras.jpg",

};

const imagenesLocales = {
   "torta bizcochuelo multifrutal":"imagenes%20del%20catalogo/torta%20biscochuelo%20multifrutal.jpg",
   "torta bizcochuelo personalizada": "imagenes%20del%20catalogo/torta%20biscochuelo%20personalizada.jpg",
   "torta selva negra": "imagenes%20del%20catalogo/torta%20selva%20negra.jpg",
   "torta chaja": "imagenes%20del%20catalogo/torta%20chaja.jpg",
   "torta espejo": "imagenes%20del%20catalogo/torta%20espejo.jpg",
   "torta con crema y durazno": "imagenes%20del%20catalogo/torta%20con%20crema%20y%20durazno.jpg",
   "torta forrada con detalles": "imagenes%20del%20catalogo/torta%20forrada%20con%20detalles.jpg",
   "torta matera redonda": "imagenes%20del%20catalogo/torta%20matera%20redonda.jpg",
   "torta matera rectangular": "imagenes%20del%20catalogo/torta%20matera%20rectangular.jpg",
   "torta invertida de manzanas redonda": "imagenes%20del%20catalogo/torta%20invertida%20de20%manzanas20%redonda.jpg",
   "torta invertida de manzanas rectangular": "imagenes%20del%20catalogo/torta%20invertida%20de20%manzanas20%rectangular.jpg",
   "lemon pie": "imagenes%20del%20catalogo/lemon20%pie.jpg",
"tarta cheesecake frutos rojos": "imagenes%20del%20catalogo/tarta20%cheesecake20%frutos20%rojos.jpg",
"tarta de frutillas": "imagenes%20del%20catalogo/tarta20%de20%frutillas.jpg",
"tarta de peras": "imagenes%20del%20catalogo/tarta-de-peras.jpg"


};
const listaProductos = document.querySelector("#catalogo-productos");
const estadocatalogo = document.querySelector("#estado-catalogo");



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
        const respuesta = await fetch(URL_CATALOGOTORTAS); 

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

        estadocatalogo.textContent = productosConNombre.length
            ? `Se muestran ${productosConNombre.length} tortas del catálogo.`
            : "No hay productos cargados en la hoja de tortas.";
    } catch (error) {
        console.error("No se pudo cargar el catálogo de tortas:", error);
        estadoCatalogo.textContent =
            "No se pudo cargar el catálogo. Revisá tu conexión e intentá nuevamente.";
        estadocatalogo.classList.add("estado-error");
    }
}

cargarCatalogo();  