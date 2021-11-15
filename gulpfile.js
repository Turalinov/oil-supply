const {src, dest, task, series, watch, parallel} = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const fileinclude = require('gulp-file-include');

const env = process.env.NODE_ENV;
const {SRC_PATH, DIST_PATH, STYLES_LIBS, JS_LIBS} = require('./gulp.config');

task("clean", () => {
  return src(`${DIST_PATH}/**/*`, {read: false})
    .pipe(rm())
});

task("copy:html", () => {
  return src(`${SRC_PATH}/*.html`)
    .pipe(plumber())
    .pipe(fileinclude())
    .pipe(dest(DIST_PATH))
    .pipe(reload({stream: true}))
});

task("styles", () => {
  return src([
    ...STYLES_LIBS,
    `${SRC_PATH}/styles/main.scss`
  ])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    // .pipe(px2rem())
    .pipe(gulpif(env === 'prod',
      autoprefixer({
        overrideBrowserslist: ["last 2 versions"],
        cascade: false
      })
    ))
    .pipe(gulpif(env === 'prod', gcmq()))
    .pipe(gulpif(env === 'prod', cleanCSS()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({stream: true}))
});

task('images', () => {
  return src([`${SRC_PATH}/images/*.png`, `${SRC_PATH}/images/*.svg`])
    .pipe(dest(`${DIST_PATH}/images/`))
})


task('json', () => {
  return src([`${SRC_PATH}/json/*.json`])
    .pipe(dest(`${DIST_PATH}/json/`))
})
task('php', () => {
  return src([`${SRC_PATH}/*.php`])
    .pipe(dest(`${DIST_PATH}`))
})
task('php-mailer', () => {
  return src([`${SRC_PATH}/PHPMailer/*/**`])
    .pipe(dest(`${DIST_PATH}/PHPMailer/`))
})


task('icons', () => {
  return src(`${SRC_PATH}/images/icons/*.svg`)
    .pipe(svgo({
      plugins: [
        {
          removeAttrs: { attrs: "(fill|stroke|style|width|heigth|data.*)"}
        }
      ]
    }))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "../sprite.svg"
        }
      }
    }))
    .pipe(dest(`${DIST_PATH}/images/icons`))
})

task('favicon', () => {
  return src(`${SRC_PATH}/*.ico`)
    .pipe(dest(DIST_PATH))
})


task('fonts', () => {
  return src([`${SRC_PATH}/fonts/*.woff`, `${SRC_PATH}/fonts/*.woff2`])
    .pipe(dest(`${DIST_PATH}/fonts/`))
})

task('libs', () => {
  return src([`${SRC_PATH}/libs/*.js`])
    .pipe(dest(`${DIST_PATH}/libs/`))
})



task('scripts', () => {
  return src([
    ...JS_LIBS,
    `${SRC_PATH}/scripts/*.js`
  ])
    .pipe(gulpif(env === 'dev', sourcemaps.init()))
    .pipe(concat('main.min.js', {newLine: ";"}))
    // .pipe(gulpif(env === 'prod', babel({
    //   presets: ['@babel/env']
    // })))
    .pipe(gulpif(env === 'prod', uglify()))
    .pipe(gulpif(env === 'dev', sourcemaps.write()))
    .pipe(dest(DIST_PATH))
    .pipe(reload({stream: true}))
})

task('server', () => {
  browserSync.init({
    server: {
      baseDir: `./${DIST_PATH}`
    },
    open: false
  })
})

task('watch', () => {
  watch(`./${SRC_PATH}/styles/**/*`, series('styles'))
  watch(`./${SRC_PATH}/**/*.html`, series('copy:html'))
  watch(`./${SRC_PATH}/scripts/*`, series('scripts'))
  watch(`./${SRC_PATH}/images/icons/*.svg`, series('icons'))
  watch(`./${SRC_PATH}/json/*.json`, series('json'))
  watch(`./${SRC_PATH}/*.php`, series('php'))
  watch(`./${SRC_PATH}/libs/*.js`, series('libs'))
  watch([`./${SRC_PATH}/images/*.png`, `./${SRC_PATH}/images/*.svg`], series('images'))
  watch([`./${SRC_PATH}/fonts/*.woff`, `./${SRC_PATH}/fonts/*.woff2`], series('fonts'))
})

task('default',
  series(
    "clean",
    parallel("copy:html", "styles", "scripts", "icons", "favicon", "images", "json", "php", "libs", "php-mailer", "fonts"),
    parallel("watch", "server")
  )
)


task("build",
  series(
    "clean",
    parallel("copy:html", "styles", "scripts", "icons", "favicon", "images", "json", "php", "libs", "php-mailer", "fonts")
  )
)
