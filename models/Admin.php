<?php

namespace Model;

class Admin extends ActiveRecord{
    protected static $tabla = 'nombre de la tabla';
    protected static $columnaBD = ['nombre columas bd'];  

    public $columnas_bd;
 

    public function __construct($args = [])
    {
        $this->columnas_bd = $args['nombre columas bd'] ?? null;


    public function validar(){

        if(!$this->columnas_bd){
            self::$errores['nombre columas bd'] = 'mensaje de error';
        }

        return self::$errores;
    }

    public function usuarioExiste(){
        //Query poasa consultar la base de datos
        $query = "SELECT * FROM ". self::$tabla. " WHERE usuario = '" . $this->usuario . "' LIMIT 1 "; 

        //consultando
        $resultado = self::$db->query($query); 


        if (!$resultado->num_rows) {
            self::$errores[] = 'El usuario NO existe';
            return; 
        }

        return $resultado; 
    }

    public  static function consultarUsuario($usuario){
        //Query poasa consultar la base de datos
        $query = "SELECT * FROM ". self::$tabla. " WHERE usuario = '" . $usuario . "' LIMIT 1 "; 

        //consultando
        $resultado = self::$db->query($query); 


        if ($resultado->num_rows) {
            self::$errores[] = 'El usuario YA existe';
            return; 
        }else{
            $resultado = false;
        }
        return $resultado; 
        
    }

    public function comprobarPassword($resultado){
        $administrador = $resultado->fetch_object(); 

        //verifica el password
        $autenticado = password_verify($this->clave, $administrador->clave); 


        if(!$autenticado){
            self::$errores[] = 'El Password no es correcto';
        }
        
        return $autenticado; 
    }

    public function autenticar(){
        if(!isset($_SESSION)){
            session_start();
        } 

        $informacionUsuario = self::retornaId($this->usuario);

        //Llenamos el arreglo de session
        $_SESSION['login'] = true; 
        $_SESSION['usuario'] = $informacionUsuario->usuario;
        $_SESSION['head'] = 'administrador';
        $_SESSION['id-admin'] = $informacionUsuario->id;

        // //redireccionar al usuario
        // header('location: /admin/area-admin'); 
    }

    public static function retornaId($usuario){
        //Query poasa consultar la base de datos
        $query = "SELECT * FROM ". self::$tabla. " WHERE usuario = '" . $usuario . "' LIMIT 1 "; 

        $resultado = self::consultaSQL($query);

        return array_shift($resultado);

    }

    // OBTENIENDO ADMINISTRADORES Y ORDENANDO LISTANDO EL ID_SERVER DE PRIMERO //
    public static function allPorId($id){
        $query = " SELECT * FROM " . static::$tabla . " ORDER BY FIELD (id, ${id}) DESC, id";

        $resultado = self::consultaSQL($query);

        return $resultado;

        return $query;
    }

}