import notifier from 'node-notifier'
import path from 'path'
import pc from 'picocolors'

const iconPath = path.join(process.cwd(), 'notifcation.png')

/**
 * Log compile messages with colors, filename, line/column
 * @param {'LESS' | 'JS' | 'PostCSS'} type 
 * @param {string} filePath 
 * @param {string} message 
 */
export function logTask(type, message, file) {
  notifier.notify({ title: `${type} Minified`, message: path.basename(file), icon: iconPath })
  const time = new Date().toTimeString().split(' ')[0]
  console.log(pc.gray(`[${time}]`), pc.magenta('fwmVITE:'), pc.green(`[${type}]`), message)
}

/**
 * Log errors in full stack trace format, with colors, filename, line/column
 * @param {'LESS' | 'JS' | 'PostCSS'} type 
 * @param {string} filePath 
 * @param {Error} err 
 */
export function logError(type, filePath, err) {
  const time = new Date().toTimeString().split(" ")[0];
  const baseFile = path.basename(filePath);
  notifier.notify({ title: `${type} ERROR`, message: baseFile, icon: iconPath });

  console.error(pc.red(`[${time}] ${type} ERROR in ${baseFile}`));

  if (filePath) {
    let normalizedPath = filePath.replace(/\\/g, "/");
    let includesIndex = normalizedPath.indexOf("/includes/");

    if (includesIndex !== -1) {
      normalizedPath = normalizedPath.slice(includesIndex);
    }

    console.error(pc.yellow(`File: ${normalizedPath}`));
  }


  if (err.line) console.error(pc.yellow(`Line: ${err.line}`));

  if (err.message) {
    const formatted = err.message
      .replace(/Tried -/g, "\nTried -")
      .replace(/,/g, ",\n");
    console.error(pc.red(formatted));
  }
  if (err.stack) console.error(pc.gray(err.stack));
}

