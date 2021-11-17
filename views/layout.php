
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
        <?php include __DIR__ . '/plantillas/header.php';  ?>
    </header>
    
    <?php   /** ESTO MUESTRA EL CONTENIDO DE LA VISTA POR EL CONTROLADOR */
        echo $contenido 
    ?>
    <footer>
        <?php include __DIR__ . '/plantillas/footer.php';  ?>
    </footer>

    <script src="/build/js/bundle.min.js"></script>
    <script src="/build/js/bundle-module.min.js" type="module"></script>
    <script src="/build/js/sweetalert2.all.min.js"></script>
</body>
</html>
