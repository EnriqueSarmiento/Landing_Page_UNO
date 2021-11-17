
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aplicacion Web</title>
    <link rel="stylesheet" href="/build/css/app.css">
    <link rel="stylesheet" href="/build/css/bootstrap-icons.css">


</head>
<body>

        <header>
            <div class="header 
                <?php if($_SERVER['REQUEST_URI'] === '/login'){ ?>
                    d-none
                <?php } ?> 
            ">
                <a href="/">inicio</a>
                <a href="/nosotros">Nosotros</a>
                <a href="/servicios">Servicios</a>
                <a href="/contacto">Contactos</a>
                <a href="/login">Iniciar Sesión</a>
            </div>
        </header>
    
    <div class="contenido-vista">
    <?php   /** ESTO MUESTRA EL CONTENIDO DE LA VISTA POR EL CONTROLADOR */
        echo $contenido 
    ?>
        


    </div>



    <footer>
        <div class="footer 
            <?php if($_SERVER['REQUEST_URI'] === '/login'){ ?>
                    d-none
            <?php } ?> 
        ">
            <p>Todos los derechos reservados</p>
        </div>
    </footer>

    <script src="/build/js/bundle.min.js"></script>
    <script src="/build/js/bundle-module.min.js" type="module"></script>
    <script src="/build/js/sweetalert2.all.min.js"></script>
</body>
</html>
