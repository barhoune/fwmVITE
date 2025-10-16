import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'
import less from 'less'
import postcss from 'postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import chokidar from 'chokidar'
import { minify as terserMinify } from 'terser'
import notifier from 'node-notifier'
import pc from 'picocolors'

const baseFolder = "../"
const testFolder = "fwmTEST"
const devFolder = "fwmDEV"
const fedevFolder = "fwmFEDEV"
const iconPath = path.join(process.cwd(), 'notifcation.png');

// const stylePathsOld = [
//   path.join(baseFolder, '/', testFolder, '/*/includes/default/styles.less'),
//   path.join(baseFolder, '/', testFolder, '/*/includes/mobile/styles.less'),
//   path.join(baseFolder, '/', devFolder, '/*/httpdocs/includes/default/styles.less'),
//   path.join(baseFolder, '/', devFolder, '/*/httpdocs/includes/mobile/styles.less'),
//   path.join(baseFolder, '/', fedevFolder, '/*/httpdocs/includes/default/styles.less'),
//   path.join(baseFolder, '/', fedevFolder, '/*/httpdocs/includes/mobile/styles.less'),
// ]

const stylePathsNew = [
  // TEST
  //V5
  "../fwmTEST/*/includes/default/local_templates/components/*/*.less",
  "../fwmTEST/*/includes/default/local_templates/panels-editor/*/*.less",
  "../fwmTEST/*/includes/default/local_templates/panels/*/*.less",
  "../fwmTEST/*/includes/default/local_templates/sidebar/*/*.less",
  "../fwmTEST/*/includes/default/local_templates/sections/*/*.less",
  // V5.5
  "../fwmTEST/*/includes/default/components/*/*.less",
  "../fwmTEST/*/includes/default/panels-editor/*/*.less",
  "../fwmTEST/*/includes/default/panels/*/*.less",
  "../fwmTEST/*/includes/default/sidebar/*/*.less",
  "../fwmTEST/*/includes/default/sections/*/*.less",

  // DEV - This was intended for Chris and Kevin in the past - Only Uncomment for DSS redesigns
  // "../fwmDEV/*/httpdocs/includes/default/local_templates/components/*/*.less",
  // "../fwmDEV/*/httpdocs/includes/default/local_templates/panels-editor/*/*.less",
  // "../fwmDEV/*/httpdocs/includes/default/local_templates/panels/*/*.less",
  // "../fwmDEV/*/httpdocs/includes/default/local_templates/sidebar/*/*.less",
  // "../fwmDEV/*/httpdocs/includes/default/local_templates/sections/*/*.less",

  // FEDEV
  // V5
  "../fwmFEDEV/*/httpdocs/includes/default/local_templates/components/*/*.less",
  "../fwmFEDEV/*/httpdocs/includes/default/local_templates/panels-editor/*/*.less",
  "../fwmFEDEV/*/httpdocs/includes/default/local_templates/panels/*/*.less",
  "../fwmFEDEV/*/httpdocs/includes/default/local_templates/sidebar/*/*.less",
  "../fwmFEDEV/*/httpdocs/includes/default/local_templates/sections/*/*.less",
  // V5.5
  "../fwmFEDEV/*/httpdocs/includes/default/components/*/*.less",
  "../fwmFEDEV/*/httpdocs/includes/default/panels-editor/*/*.less",
  "../fwmFEDEV/*/httpdocs/includes/default/panels/*/*.less",
  "../fwmFEDEV/*/httpdocs/includes/default/sidebar/*/*.less",
  "../fwmFEDEV/*/httpdocs/includes/default/sections/*/*.less",
]

const jsPathsNew = [
  path.join(baseFolder, '/', testFolder, '/*/includes/default/**/local_templates/**/**/*.js'),
  path.join(baseFolder, '/', devFolder, '/*/httpdocs/includes/default/**/local_templates/**/**/*.js'),
  path.join(baseFolder, '/', fedevFolder, '/*/httpdocs/includes/default/**/local_templates/**/**/*.js'),
  path.join(baseFolder, '/', fedevFolder, '/*/includes/default/**/components/**/*.js')
]

const processors = [
  autoprefixer({ grid: true, overrideBrowserslist: ['defaults'] }),
  cssnano({ minifyFontValues: false, discardUnused: false })
]

async function compileLess(file, outDir) {
  try {
    const data = fs.readFileSync(file, 'utf8')
    const output = await less.render(data, { filename: file, javascriptEnabled: true })
    const post = await postcss(processors).process(output.css, { from: undefined })
    const outFile = path.join(outDir, path.basename(file, '.less') + '.css')
    fs.mkdirSync(outDir, { recursive: true })
    fs.writeFileSync(outFile, post.css)
    logTask('LESS', 'Less Compiled, Prefixed and Minified', file)
  } catch (err) {
    console.error('LESS ERROR:', err.message)
  }
}

async function minifyJS(file, outDir) {
  try {
    const data = fs.readFileSync(file, 'utf8')
    const minified = await terserMinify(data)
    const outFile = path.join(outDir, path.basename(file))
    fs.mkdirSync(outDir, { recursive: true })
    fs.writeFileSync(outFile, minified.code)
    logTask('JS', 'JS Compiled, Prefixed and Minified', file)
  } catch (err) {
    console.error('JS ERROR:', err.message)
  }
}

function logTask(type, message, file) {
  notifier.notify({ title: `${type} Minified`, message: path.basename(file), icon: iconPath })
  const time = new Date().toTimeString().split(' ')[0]
  console.log(pc.gray(`[${time}]`), pc.magenta('vite-notify:'), pc.green(`[${type}]`), message)
}

export default defineConfig({
  plugins: [
    {
      name: 'inplace-minifier',
      apply: 'serve',
      configureServer() {
        console.log('[inplace-minifier] watching LESS & JS files...')
        // chokidar.watch([...stylePathsOld, ...stylePathsNew, ...jsPathsNew], {
        chokidar.watch([...stylePathsNew, ...jsPathsNew], {
          ignoreInitial: true,
        })
          .on('change', (file) => {
            if (file.endsWith('.less')) {
              // const isOld = stylePathsOld.some(p => file.includes('styles.less'))
              const outDir = path.join(path.dirname(file), 'min')
              compileLess(file, outDir)
            }
            if (file.endsWith('.js')) {
              const outDir = path.join(path.dirname(file), 'min')
              minifyJS(file, outDir)
            }
          })
      }
    }
  ],
  clearScreen: false,
  logLevel: 'error'
})
