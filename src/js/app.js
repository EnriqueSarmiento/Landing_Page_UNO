/** EN ESTE ARCHIVO ESTARAN TODAS LAS FUNCIONES DE JAVA SCRIPT NECESARIAS PARA LA DINAMICA DE LA APOLICACION. */

/** POR DEFECTO YA CONTIENE EL DOMContentLoades Y EN ESTE ES DONDE HAREMOS LLAMAR LAS FUNCIONES POR SI SOLAS CUANDO YA SE HA  CARGADO TODA LA APLICACION EN EL NA VEGADOR COMO DARK MODE, EVENTOS DE CLICK, SCROLL, ENTRE OTROS */

/** RECORDEMOS QUE EN LA FUNCUON DE EVENTLISTENERS() ES DONDE SE AGREGARAN LOS EVENTOS POR CLICK ASEREJE */
document.addEventListener('DOMContentLoaded', function(){
  eventListeners();
  navegador();
  servicios();
  AOS.init();
})

function eventListeners(){
  document.getElementById('burger').addEventListener('click', sidebar);

}

// SIDEBAR //
function sidebar(){
    (async () => {
        await Swal.fire({
            title: 'MENU',
            html: `
            <div class="navegacion d-flex flex-column">
                <a class="enlace-nav" href="/">inicio</a>
                <a class="enlace-nav" href="/servicios">Servicios</a>
                <a class="enlace-nav" href="/portafolio">Planes</a>
                <a class="enlace-nav" href="/contacto">Contacto</a>
                <a class="enlace-nav" href="#"><i class="bi bi-search"></i></a>
            </div>

            `
            ,
            position: 'top-end',
            showClass: {
              popup: `
                animate__animated
                animate__fadeInRight
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutRight
                animate__faster
              `
            },
            grow: 'column',
            width: 300,
            heightAuto: false,
            background: '#4E51BF',
            customClass: {
                container: 'contenedor-sidebar',
                popup: 'sidebar',
                header: 'header-sidebar',
                title: 'side-titulo',

                htmlContainer: 'menu-sidebar',
            },
            showConfirmButton: false,
            showCloseButton: true
          })
    })();
}
// NAVEGACION //
function navegador() {
  const navegacion = document.getElementById('contenedor-nav');
  const observer = new IntersectionObserver( function (entries) {
    if(entries[0].isIntersecting){
      if(navegacion.classList.contains('navegacion-scroll')){
        navegacion.style.position = 'absolute';
        navegacion.classList.remove('navegacion-scroll');
        
      }
    }else{
      navegacion.style.position = 'fixed';

      navegacion.classList.add('navegacion-scroll');
    }
  })
  observer.observe(document.querySelector('.header'));
}

//MOSTRANDO INFO SERVICIOS //
function servicios(){
  var servicios = document.querySelectorAll('.servicio');

  // REGISTRAR EL CLICK EN EL SERVICIO //
  for(let i = 0; i < servicios.length; i++){
    // AGREGANDO EL EVENTO A TODOS LOS SERVICIOS //
    servicios[i].addEventListener('click', function(){
      // CERRAR ELEMENTO SI HAY ALGUNO ABIERTO //
      elementos();
      var elemento = servicios[i].nextElementSibling;
      // VERIFICANDO CLASES DEL ELEMENTO Y MOSTRAR O NO MOSTRAR //
      if(elemento.classList.contains('d-none')){
        servicios[i].classList.add('servicio-activo');
        elemento.classList.replace('d-none', 'd-block')
        elemento.classList.replace('animate__zoomOut', 'animate__zoomIn' )
      }else if(elemento.classList.contains('d-block')){
        elemento.classList.replace('animate__zoomIn', 'animate__zoomOut' )
        servicios[i].classList.remove('servicio-activo');

        setTimeout(()=>{
          elemento.classList.replace('d-block','d-none');
        }, 450);
      }
    });
  }
  // FUNCION QUE CIERRA LOS OTROS ELEMENTOS SI ESTAN ABIERTOS //
  function elementos(){
    var elementos = document.querySelectorAll('.mas-info');
    for(let e = 0; e < elementos.length; e++){
      // seleccionando el elemento anterior //
      var claseActivo = elementos[e].previousElementSibling;
      if(elementos[e].classList.contains('d-block')){
        elementos[e].classList.replace('animate__zoomIn', 'animate__zoomOut' )
        // SI EXISTE LA CLAVE DE ACTIVO EN EL SERVICIO, ELIMINARLA// 
        if(claseActivo.classList.contains('servicio-activo')){
          claseActivo.classList.remove('servicio-activo');
        }
        setTimeout(()=>{
          elementos[e].classList.replace('d-block','d-none');
        }, 450);

      }
    }

  }
  
  
}



