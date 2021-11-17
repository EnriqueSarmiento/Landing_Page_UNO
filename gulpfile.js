/** EN ESTE ARCHIVO ESTA TODO REFERIDO A GULP, COMPILACION DE CODIGO SCSS, WATCH, SUBIDA DE IMAGENES WEBP, COMPILADOR DE ARCHIVOS EN LA CARPETA BUILD, LA FUNCION NANO PARA COMPRIMIR LOS ARCHIVOS CSS Y JS, SE PUEDEN AGREGAR MAS FUNCIONES EN ESTE ARCHIVO.  */
/**  RECORDEMOS QUE GULP FUNCIONA PARA AUTOMATIZAR TAREAS TEDIOSAS Y NO TENER QUE HACERLO NOSOTROS MISMO, PODEMOS AGREGAR MAS COSAS EN ESTE ARCHIVO PERO ES IMPORTANTE NO ELIMINAR ESTAS YA EXISTENTES. */

const { src, dest, watch , parallel } = require('gulp');
const sass = require('gulp-dart-sass');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//utilidades css
const autoprefixer = require('autoprefixer');
const postcss    = require('gulp-postcss')
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps')
//tulidades js
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

//dependencias no necesarias CREO
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

//funcion que compila sass
const paths = {
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    jsm: 'src/jsm/**/*.js',
    imagenes: 'src/img/**/*'
}

// css es una función que se puede llamar automaticamente
function css() {
    return src(paths.scss)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss( [autoprefixer(), cssnano()]))
        // .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe( dest('./public/build/css') );
}

function javascript() {
    return src(paths.js)
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe( concat('bundle.js')) // final output file name
      .pipe( terser())
      .pipe(sourcemaps.write('.'))
      .pipe( rename({ suffix: '.min' }))
      .pipe( dest('./public/build/js'))
}

function javascriptModule() {
    return src(paths.jsm)
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe( concat('bundle-module.js')) // final output file name
      .pipe( terser())
      .pipe(sourcemaps.write('.'))
      .pipe( rename({ suffix: '.min' }))
      .pipe( dest('./public/build/js'))
}

function minificar() {
    return src(paths.scss)
    .pipe( sass( {
        outputStyle: 'compressed'
    }))
    .pipe( dest('./build/css'))
 }

 function imagenes() {
     return src(paths.imagenes)
         .pipe(cache(imagemin({ optimizationLevel: 3})))
         .pipe(dest('./public/build/img'))
         .pipe(notify({ message: 'Imagen Completada'}));
 }

function versionWebp() {
    return src(paths.imagenes)
        .pipe( webp() )
        .pipe(dest('./public/build/img'))
        .pipe(notify({ message: 'Imagen Completada'}));
}


function watchArchivos() {
    watch( paths.scss, css );
    watch( paths.js, javascript );
    watch( paths.jsm, javascriptModule );
    watch( paths.imagenes, imagenes );
    watch( paths.imagenes, versionWebp );
}
  
exports.css = css;
exports.minificar= minificar;
// exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.watchArchivo = watchArchivos;

exports.default = parallel(css, javascript, javascriptModule, imagenes, versionWebp, watchArchivos ); 