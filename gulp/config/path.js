import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
    build: {
        js: `${buildFolder}/js/`,
        css: `${buildFolder}/css/`,
        iconsfont: `${buildFolder}/iconsfont/`,
        favicon: `${buildFolder}/`,
        html: `${buildFolder}/`,
        images: `${buildFolder}/img`,
        files: `${buildFolder}/files/`,
        json: `${buildFolder}/json/`,
    },
    src: {
        js: `${srcFolder}/js/app.js`,
        images: `${srcFolder}/img/**/*.{jpg,jpeg,png,gif,webp}`,
        svg: `${srcFolder}/img/**/*.svg`,
        favicon: `${srcFolder}/*.ico`,
        scss: `${srcFolder}/scss/style.scss`,
        iconsfont: `${srcFolder}/iconsfont/*.{ttf,eot,woff}`,
        html: `${srcFolder}/*.html`,
        files: `${srcFolder}/files/**/*.*`,
        json: `${srcFolder}/json/*.json`,
    },
    watch: {
        js: `${srcFolder}/js/**/*.js`,
        ts: `${srcFolder}/ts/**/*.ts`,
        scss: `${srcFolder}/scss/**/*.scss`,
        html: `${srcFolder}/**/*.html`,
        images: `${srcFolder}/img**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
        files: `${srcFolder}/files/**/*.*`,
        json: `${srcFolder}/json/*.json`,
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,
}