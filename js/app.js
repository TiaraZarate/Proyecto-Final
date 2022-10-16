document.addEventListener('DOMContentLoaded', () => {

    // Variables
    const baseDeDatos = [
       { precio: 760,
        id: 1,
        nombre: "FUNDA BRILLOSA",
        imagen: "https://i.pinimg.com/564x/a4/64/20/a46420dba37554b35efbc7894de58bc3.jpg"
      },
      {
        precio: 650,
        id: 2,
        nombre: "FUNDA DRAGON",
        imagen: "https://i.pinimg.com/564x/1c/cf/44/1ccf44ab0013d8724a6852ba345c6a08.jpg"
      },
      {
        precio: 800,
        id: 3,
        nombre: "FUNDA CORAZON",
        imagen: "https://i.pinimg.com/564x/a4/ca/66/a4ca66612467f82f0cae163d94933421.jpg"
      },
      {
        precio: 650,
        id: 4,
        nombre: "FUNDA MARMOL",
        imagen: "https://i.pinimg.com/564x/3c/e1/83/3ce183b03c93d45e4156e40fc958d7b1.jpg"
      },
      {
        precio: 950,
        id: 5 ,
        nombre: "FUNDA MARIPOSA CON CADENITA",
        imagen: "https://i.pinimg.com/564x/31/b8/e0/31b8e01dd8ed726e353294042e4e7c48.jpg"
      },
      {
        precio: 850,
        id:6,
        nombre: "FUNDA DE LINEAS",
        imagen: "https://i.pinimg.com/564x/5c/1e/35/5c1e358cfa9f8fa34916c1e2c50ddf73.jpg"
      },
      
      {
        precio:550,
        id: 7 ,
        nombre: " FUNDA TRANPARENTE CON BORDE DE COLOR",
        imagen: "https://i.pinimg.com/564x/36/4d/ca/364dca926fea13cb099fa97c71bd06d7.jpg"
      },
      {
        precio: 600 ,
        id:8,
        nombre: "FUNDA BASICA",
        imagen: "https://i.pinimg.com/564x/57/f9/16/57f916cb1f2f2af1ee58d10780aaa2c0.jpg"
      },
      {
        precio: 1100,
        id: 9,
        nombre: "FUNDA PARA COMPARTIR",
        imagen: "https://i.pinimg.com/564x/c5/f3/ed/c5f3ed3a276ff5906dc32522748c5bf1.jpg"
      },
      {
        precio: 1000,
        id:10 ,
        nombre: "FUNDA ANIME (personalizada)",
        imagen: "https://i.pinimg.com/564x/dc/ad/8a/dcad8a3a6929a9b0731e285ccc267c73.jpg"
      },
      {
        precio:1200 ,
        id:11 ,
        nombre: "FUNDA PERSONALIZADA (a tu gusto!)",
        imagen: "https://i.pinimg.com/564x/ec/d6/be/ecd6bed68006d84a50b67ed10e43c9bf.jpg"
      },
      {
        precio: 1800,
        id:12 ,
        nombre: "FUNDA PUFFER",
        imagen: "https://i.pinimg.com/564x/3b/f3/e2/3bf3e2847faaaadc77ed4866f8a1e292.jpg"
      },
      {
        precio: 1400,
        id:13 ,
        nombre: "FUNDA CORAZONES 3D",
        imagen: "https://i.pinimg.com/564x/d7/5a/04/d75a044929da34343b6fa0cc29cec783.jpg"
      },

      {
        precio: 800,
        id:14 ,
        nombre: "FUNDA LLAMAS",
        imagen: "https://i.pinimg.com/564x/2e/d2/c6/2ed2c6c2fa198fa7531a26747cd26de2.jpg"
      },
 
    ];

    let carrito = [];
    const divisa = '$';
    const DOMitems = document.querySelector('#items');
    const DOMcarrito = document.querySelector('#carrito');
    const DOMtotal = document.querySelector('#total');
    const DOMbotonVaciar = document.querySelector('#boton-vaciar');
    const miLocalStorage = window.localStorage; 

    // Funciones

     //Dibuja todos los productos a partir de la base de datos.
  
    function renderizarProductos() {
        baseDeDatos.forEach((info) => {
            // Estructura
            const miNodo = document.createElement('div');
            miNodo.classList.add('card', 'col-sm-4');
            // Body
            const CardBody = document.createElement('div');
            CardBody.classList.add('card-body');
            // Titulo
            const miTitle = document.createElement('h5');
            miTitle.classList.add('card-title');
            miTitle.textContent = info.nombre;
            // Imagen
            const Imagen = document.createElement('img');
            Imagen.classList.add('img-fluid');
            Imagen.setAttribute('src', info.imagen);
            // Precio
            const miPrecio = document.createElement('p');
            miPrecio.classList.add('card-text');
            miPrecio.textContent = `${info.precio}${divisa}`;
            // Boton 
            const Boton = document.createElement('button');
            Boton.classList.add('btn', 'btn-dark');
            Boton.textContent = 'comprar';
            Boton.setAttribute('marcador', info.id);
            Boton.addEventListener('click', agregarProductoAlCarrito);
            // Insertamos
            CardBody.appendChild(Imagen);
            CardBody.appendChild(miTitle);
            CardBody.appendChild(miPrecio);
            CardBody.appendChild(Boton);
            miNodo.appendChild(CardBody);
            DOMitems.appendChild(miNodo);
        });
    }

   //añade producto al carrito
    function agregarProductoAlCarrito(evento) {

        carrito.push(evento.target.getAttribute('marcador'))
        renderizarCarrito();
        guardarCarritoEnLocalStorage();

    }


    function renderizarCarrito() {
        // Vaciamos todo el html
        DOMcarrito.textContent = '';
        // Quitamos los duplicados
        const carritoSinDuplicados = [...new Set(carrito)];
        // Generamos los Nodos a partir de carrito
        carritoSinDuplicados.forEach((item) => {
            // Obtenemos el item que necesitamos de la variable base de datos
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                // ¿Coincide las id? Solo puede existir un caso
                return itemBaseDatos.id === parseInt(item);
            });
            // Cuenta el número de veces que se repite el producto
            const numeroUnidadesItem = carrito.reduce((total, itemId) => {
                // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
                return itemId === item ? total += 1 : total;
            }, 0);
            // Creamos el nodo del item del carrito
            const miNodo = document.createElement('li');
            miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
            miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}${divisa}`;
            // Boton de borrar
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-danger', 'mx-5');
            miBoton.textContent = 'X';
            miBoton.style.marginLeft = '1rem';
            miBoton.dataset.item = item;
            miBoton.addEventListener('click', borrarItemCarrito);
            // Mezclamos nodos
            miNodo.appendChild(miBoton);
            DOMcarrito.appendChild(miNodo);
        });
        // Renderizamos el precio total en el HTML
        DOMtotal.textContent = calcularTotal();
    }

    //borrar un elemento
    function borrarItemCarrito(evento) {
        const id = evento.target.dataset.item;

        carrito = carrito.filter((carritoId) => {
            return carritoId !== id;
        });
        
        renderizarCarrito();
        guardarCarritoEnLocalStorage();

    }

    
     //Calcula el precio total teniendo en cuenta los productos repetidos
 
    function calcularTotal() {
        // Recorremos el array del carrito 
        return carrito.reduce((total, item) => {
            // De cada elemento obtenemos su precio
            const miItem = baseDeDatos.filter((itemBaseDatos) => {
                return itemBaseDatos.id === parseInt(item);
            });
            // Los sumamos al total
            return total + miItem[0].precio;
        }, 0).toFixed(2);
    }

     //Vacia el carrito y vuelve a dibujarlo

    function vaciarCarrito() {
        // Limpiamos los productos guardados
        carrito = [];
        // Renderizamos los cambios
        renderizarCarrito();
        // Borra LocalStorage
        localStorage.clear();

    }

    function guardarCarritoEnLocalStorage () {
        miLocalStorage.setItem('carrito', JSON.stringify(carrito));
    }

    function cargarCarritoDeLocalStorage () {
        if (miLocalStorage.getItem('carrito') !== null) {
            carrito = JSON.parse(miLocalStorage.getItem('carrito'));
        }
    }

    // Eventos
    DOMbotonVaciar.addEventListener('click', vaciarCarrito);

    // Inicio
    cargarCarritoDeLocalStorage();
    renderizarProductos();
    renderizarCarrito();
});