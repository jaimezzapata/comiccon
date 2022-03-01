const { src, dest, watch, parallel } = require('gulp');
const sass = require("gulp-sass")(require("sass"));
const plumber = require('gulp-plumber');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

function compilarSass(done) {
    src('src/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(dest('build/css'));
    done();
};

function convertirWebp(done){

    const opciones = {
        optimizationLevel: 3
    };

    src('./src/img/**/*.{png,jpg}')
    .pipe( cache( imagemin(opciones) ) )
    .pipe( dest('build/img') )

    done();
}

function calidadImg(done){


    src('./src/img/**/*.{png,jpg}')
    .pipe( webp(opciones) )
    .pipe( dest('build/img') )
    done();
}

function dev(done) {
    watch('src/scss/**/*.scss')
    done();
}
exports.compilarSass = compilarSass;
exports.convertirWebp = convertirWebp;
exports.dev = parallel(convertirWebp, dev, compilarSass);