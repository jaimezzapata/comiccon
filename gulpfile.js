const { src, dest, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const webp = require("gulp-webp");
const avif = require("gulp-avif");
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");

function compilarSass(done) {
    src("src/scss/**/*.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(dest("build/css"));
    done();
}

function convertirWebp(done) {
    const opciones = {
        quality: 50
    };

    src("./src/img/**/*.{png,jpg}")
        .pipe(cache(webp(opciones)))
        .pipe(dest("build/img"));

    done();
}

function convertirAvif(done) {
    const opciones = {
        quality: 50
    };

    src("./src/img/**/*.{png, jpg}")
        .pipe(cache(avif(opciones)))
        .pipe(dest("build/img"));

    done();
}

function calidadImg(done) {

    const opciones = {
        optimizationLevel: 3,
    };

    src("./src/img/**/*.{png, jpg}")
        .pipe(imagemin(opciones))
        .pipe(dest("build/img"));
    done();
}

function dev(done) {
    watch("src/scss/**/*.scss", compilarSass);
    done();
}
exports.compilarSass = compilarSass;
exports.calidadImg = calidadImg;
exports.convertirWebp = convertirWebp;
exports.convertirAvif = convertirAvif;
exports.dev = parallel(calidadImg, convertirWebp, convertirAvif, dev);
