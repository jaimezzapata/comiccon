const { src, dest, watch, parallel } = require('gulp');
const sass = require("gulp-sass")(require("sass"));
const plumber = require('gulp-plumber')

const webp = require('gulp-webp');

function compilarSass(done) {
    src('src/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(dest('build/css'));
    done();
}

function convertirWebp(done){

    const opciones = {
        quality: 50
    }

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
exports.dev = parallel(dev, convertirWebp, compilarSass);