const URL_CATALOGOPANIFICACIONVARIADA = "https://opensheet.elk.sh/12y6c0tJDPs9Nmziu_qpqpqwf79djTgtftWO9VxL1U80/panificacionvariada";

const imagenesDirectas = {
    "pan dulce especial con cobertura de chocolate": "https://i.ibb.co/dsfhnctN/pan-dulce-especial-con-cobertura-de-chocolate.jpg",
    "pan dulce con chips de chocolate": "https://i.ibb.co/zwRp47c/pan-dulce-con-chips-de-chocolate.jpg",
    "pan dulce con chips y cobertura de chocolate": "https://i.ibb.co/TxFSQ7cD/pan-dulce-con-chips-y-cobertura-de-chocolate.jpg",
    "pan dulce con cobertura de glase": "https://i.ibb.co/fGt58tYq/pan-dulce-con-cobertura-de-glase.jpg",
    "pan dulce relleno con crema": "https://i.ibb.co/JWNc54np/pan-dulce-relleno-con-crema.jpg",
    "pan dulce especial de 250 grs": "https://i.ibb.co/dwyBkgYY/pan-dulce-especial-de-250-grs.jpg",
    "pan dulce con membrillo": "https://i.ibb.co/TxRzHXzz/pan-dulce-con-membrillo.jpg",
    "pan dulce especial": "https://i.ibb.co/NdH9YtLs/pan-dulce-especial.jpg",
    "pan dulce con arandanos": "https://i.ibb.co/6JNC33SR/pan-dulce-con-arandanos.jpg",
    "pancitos saborizados con salame": "https://i.ibb.co/YB8hFKnN/pancitos-saborizados-con-salame.jpg",
    "pancitos saborizados con jamon y queso": "https://i.ibb.co/ksc1V2pj/pancitos-saborizados-con-jamon-y-queso.jpg", 
    "pancitos saborizados con cebolla caramelizada y ciboullette": "https://i.ibb.co/27dH3hC0/pancitos-saborizados-con-cebolla-caramelizada-y-ciboullette.jpg",
    "bandeja matera grande": "https://i.ibb.co/nqQQMNF9/bandeja-matera-grande.jpg",
    "bandeja matera chica": "https://i.ibb.co/gMR0rNtG/bandeja-matera-chica.jpg",
    "budin de pan chico": "https://i.ibb.co/4RvHQXX8/budin-de-pan-chico.jpg",
    "budin de pan grande": "https://i.ibb.co/Y4q8Vq4p/budin-de-pan-grande.jpg",
    "masitas surtidas": "https://i.ibb.co/Fbh5YXDq/masitas-varias.jpg",
    "cake cake sin cobertura": "https://i.ibb.co/Lzd3YvyZ/cake-cake-sin-cobertura.jpg",
    "cake cake con cobertura de chocolate": "https://i.ibb.co/jxW4gw4/cake-cake-con-cobertura-chocolate.jpg",
    "rosca con crema pastelera": "https://i.ibb.co/wNXV9jcs/rosca-con-crema-pastelera.jpg",

};



const imagenesLocales = {
  "pan dulce especial con cobertura de chocolate": "imagenes%20del%20catalogo/pan-dulce-especial-con-cobertura-de-chocolate.jpg",
  "pan dulce con chips de chocolate": "imagenes%20del%20catalogo/pan-dulce-con-chips-de-chocolate.jpg",
  "pan dulce con chips y cobertura de chocolate": "imagenes%20del%20catalogo/pan-dulce-con-chips-y-cobertura-de-chocolate.jpg",
  "pan dulce con baño de glase": "imagenes%20del%20catalogo/pan-dulce-con-baño-de-glase.jpg",
  "pan dulce relleno con crema": "imagenes%20del%20catalogo/pan-dulce-relleno-con-crema.jpg",
  "pan dulce especial de 250 grs": "imagenes%20del%20catalogo/pan-dulce-especial-de-250-grs.jpg",
  "pan dulce con membrillo": "imagenes%20del%20catalogo/pan-dulce-con-membrillo.jpg",
  "pan dulce especial": "imagenes%20del%20catalogo/pan-dulce-especial.jpg",
  "pan dulce con arandanos": "imagenes%20del%20catalogo/pan-dulce-con-arandanos.jpg",
  "pancitos saborizados con salame": "imagenes%20del%20catalogo/pancitos-saborizados-con-salame.jpg",
  "pancitos saborizados con jamon y queso": "imagenes%20del%20catalogo/pancitos-saborizados-con-jamon-y-queso.jpg",
  "pancitos saborizados con cebolla caramelizada y ciboullette": "imagenes%20del%20catalogo/pancitos-saborizados-con-cebolla-caramelizada-y-ciboullette.jpg",
  "bandeja matera grande": "imagenes%20del%20catalogo/bandeja-matera-grande.jpg",
  "bandeja matera chica": "imagenes%20del%20catalogo/bandeja-matera-chica.jpg",
  "budin de pan chico": "imagenes%20del%20catalogo/budin-de-pan-chico.jpg",
  "budin de pan grande": "imagenes%20del%20catalogo/budin-de-pan-grande.jpg",
  "masitas surtidas": "imagenes%20del%20catalogo/masitas-varias.jpg",
  "cake cake sin cobertura": "imagenes%20del%20catalogo/cake-cake-sin-cobertura.jpg",
  "cake cake con cobertura de chocolate": "imagenes%20del%20catalogo/cake-cake-con-cobertura-de-chocolate.jpg",
 "rosca con crema pastelera": "imagenes%20del%20catalogo/rosca-con-crema-pastelera.jpg"

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
        const respuesta = await fetch(URL_CATALOGOPANIFICACIONVARIADA); 

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
            ? `Se muestran ${productosConNombre.length} Panificacion variada del catálogo.`
            : "No hay productos cargados en la hoja de panificacion variada.";
            
    } catch (error) {
        console.error("No se pudo cargar el catálogo de panificacion variada:", error);
        estadoCatalogo.textContent =
            "No se pudo cargar el catálogo. Revisá tu conexión e intentá nuevamente.";
        estadoCatalogo.classList.add("estado-error");
    }
}

cargarCatalogo();  