import gulpTypescript from "gulp-typescript";

var tsProject = gulpTypescript.createProject('tsconfig.json');

export const ts = () => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(app.gulp.dest("src/js/"))
}