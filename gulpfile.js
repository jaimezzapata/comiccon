const { src, dest, watch, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const webp = require("gulp-webp");
const avif = require("gulp-avif");
const imagemin = require("gulp-imagemin");
const cache = require("gulp-cache");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");

function compilarSass(done) {
  src("src/scss/**/*.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest("build/css"));
  done();
}

function convertirWebp(done) {
  const opciones = {
    quality: 50,
  };

  src("./src/img/**/*.{png,jpg}")
    .pipe(cache(webp(opciones)))
    .pipe(dest("build/img"));

  done();
}

function convertirAvif(done) {
  const opciones = {
    quality: 50,
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

function javaScript(done) {
  src("src/js/**/*.js").pipe(dest("build/js"));
  done();
}

function dev(done) {
  watch("src/scss/**/*.scss", compilarSass);
  watch("src/js/**/*.js", javaScript);
  done();
}
exports.compilarSass = compilarSass;
exports.calidadImg = calidadImg;
exports.convertirWebp = convertirWebp;
exports.convertirAvif = convertirAvif;
exports.javaScript = javaScript;
exports.dev = parallel(
  calidadImg,
  convertirWebp,
  convertirAvif,
  javaScript,
  dev
);
