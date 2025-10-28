import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'
import less from 'less'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import chokidar from 'chokidar'
import { minimatch } from 'minimatch'
import { minify as terserMinify } from 'terser'
import { stylePathsNew, jsPathsNew, stylePathsOld } from './paths.js'
import { logTask, logError } from './notifier.js'

const processors = [
  autoprefixer({ grid: true, overrideBrowserslist: ['defaults'] }),
  cssnano({ minifyFontValues: false, discardUnused: false })
]

async function compileLess(file, outDir,isOldFile) {
  try {
    const data = fs.readFileSync(file, 'utf8')
    const output = await less.render(data, { filename: file, javascriptEnabled: true })
    const post = await postcss(processors).process(output.css, { from: undefined })
    const outFile = path.join(outDir, path.basename(file, '.less') + '.css')
    const type = isOldFile ? 'OLD LESS' : 'LESS'
    fs.mkdirSync(outDir, { recursive: true })
    fs.writeFileSync(outFile, post.css)
    logTask(type, 'Less Compiled, Prefixed and Minified', file)
  } catch (err) {
    logError('LESS', file, err)
  }
}

async function minifyJS(file, outDir) {
  try {
    const data = fs.readFileSync(file, 'utf8')
    const minified = await terserMinify(data)
    fs.mkdirSync(outDir, { recursive: true })
    const outFile = path.join(outDir, path.basename(file, '.js') + '-min.js')
    fs.writeFileSync(outFile, minified.code)
    logTask('JS', 'JS Compiled, Prefixed and Minified', file)
  } catch (err) {
    logError('JS', file, err)
  }
}
global.__vite_watchers ||= []
global.__watchOldPaths ||= true;

export default defineConfig({
  server: {
    hmr: true
  },
  plugins: [
    {
      name: 'vite-minifier',
      apply: 'serve',
      configureServer() {
        //?INFO: Set Debug to TRUE when facing issues with multiple compiles at once
        let debug = false

        if (global.__vite_watchers[0]) {
          console.log('[DEBUG] Closing old watcher...')
          global.__vite_watchers[0].close()
        }

        const watchedLessFiles = [...stylePathsNew];
        if (global.__watchOldPaths) { watchedLessFiles.push(...stylePathsOld); }
        const watcher = chokidar.watch([...watchedLessFiles, ...jsPathsNew], { ignoreInitial: true, usePolling: false });

        watcher.on('change', (file) => {
          const fileNormalized = file.replace(/\\/g, '/');
          const isOldFile = global.__watchOldPaths && stylePathsOld.some(oldGlob => { const patternNormalized = oldGlob.replace(/\\/g, '/'); return minimatch(fileNormalized, patternNormalized); });
          const outDir = isOldFile ? path.dirname(file) : path.join(path.dirname(file), 'min');          
          if (file.endsWith('.less')) { compileLess(file, outDir, isOldFile) }
          if (file.endsWith('.js')) { minifyJS(file, outDir) }
        })

        global.__vite_watchers[0] = watcher

        if (debug) {
          console.log('[DEBUG] Created new Chokidar watcher')
          console.log(`[DEBUG] Total watchers: ${global.__vite_watchers.length}`)
        }
      }
    }
  ]
})