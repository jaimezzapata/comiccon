const { src, dest, watch } = require('gulp');
const sass = require("gulp-sass")(require("sass"));
const plumber = require('gulp-plumber')

function compilarSass(done) {
    //Identificar archivo a compilar
    src('src/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(dest('src/css'));
    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', compilarSass)
    done();
}
exports.compilarSass = compilarSass;
exports.dev = dev;