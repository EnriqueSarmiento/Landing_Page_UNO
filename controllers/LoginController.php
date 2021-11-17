<?php

namespace Controllers;
use MCV\Router;
use Model\Admin;

class LoginController{
    public static function login(Router $router){
        $router->render('/paginas/login', [
            'errores' => $errores
        ]);
    }
    public static function logout(){
        session_start();

        //eliminado el contenido del arreglo session
        $_SESSION = [];
        $_SESSION['login'] = false; 
        $_SESSION['head'] = 'no autenticado';

        header('Location: /');
    }
}