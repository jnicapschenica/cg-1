import gulp from 'gulp';
import { path } from "./gulp/config/path.js";
import { plugins } from './gulp/config/plugins.js';

global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins,
}

import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { scss } from './gulp/tasks/scss.js';
import { js } from './gulp/tasks/js.js';
import { ts } from './gulp/tasks/ts.js';
import { images } from './gulp/tasks/images.js';
import { iconsfont } from './gulp/tasks/iconsfont.js';
import { favicon } from './gulp/tasks/favicon.js';
import { json } from './gulp/tasks/json.js';

function watcher() {
    gulp.watch(path.watch.files, copy);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.js, js);
    gulp.watch(path.watch.ts, ts);
    gulp.watch(path.watch.images, images);
    gulp.watch(path.watch.json, json);
}

const jsTasks = gulp.series(ts, js);
const mainTasks = gulp.parallel(copy, html, scss, jsTasks, json, images, iconsfont, favicon);

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks, server);

export { dev };
export { build };

gulp.task('default', dev);