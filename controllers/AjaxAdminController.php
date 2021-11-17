<?php

namespace Controllers;
use MCV\Router;
use Model\admin;
use Intervention\Image\ImageManagerStatic as Image; 


class AjaxAdminController{
    // LOGIN AL AREA ADMIN //
    public static function login(Router $router){
        if($_SERVER['REQUEST_METHOD'] === 'POST'){
            // CREANDO UNA NUEVA ESTANCIA PARA EL MODELO ADMIN //
            $auth = new Admin($_POST);

            // VALIDANDONDE ERRORES DEL FORMULARIO //
            $errores = $auth->validar();

            // NO HAY ERRORES, VERIFICAR DATOS //
            if(empty($errores)){
                $resultado = $auth->usuarioExiste();
                // SI EL USUARIO NO EXISTE MOSTRAR ALERTA //
                if(!$resultado){
                    $errores = Admin::getErrores();
                }else{
                    // EL USUARIO EXISTE, VERIFIFCAR PASSWORD //
                    $autenticado = $auth->comprobarPassword($resultado);
                    // SI LA CLAVE ES INCORRECTA MOSTRAR ALERTA //
                    if(!$autenticado){
                        $errores = Admin::getErrores();

                    }else{
                        // EL USUARIO ESTA AUTETICADO //
                        $auth->autenticar();
                        $nota = true;
                    }
                }
            }

            $respuesta = [
                'acceso' => $nota??false,
                'errores' => $errores ?? false,
                'server' => $_SESSION,
                'post' => $_POST
            ];

            
            
            echo json_encode($respuesta);
        }
    }

    // CREACION DE ADMINISTRADORES //
    public static function crearAdmin(Router $router){
    }

    // EDITAR ADMINISTRADOR //
    public static function editarAdmin(Router $router){
        
    }

    // ELIMINANDO ADMINISTRADOR //
    public static function eliminarAdmin(Router $router){
       
    }
   


}