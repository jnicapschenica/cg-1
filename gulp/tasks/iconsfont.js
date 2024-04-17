export const iconsfont = () => {
    return app.gulp.src(app.path.src.iconsfont)
        .pipe(app.gulp.dest(app.path.build.iconsfont))
}