import path from 'path'

const baseFolder = "../"
const testFolder = "fwmTEST"
const devFolder = "fwmDEV"
const fedevFolder = "fwmFEDEV"

/**
 * LESS file paths for modern websites (V3/V4)
 * @section old LESS Paths (V3/V4)
 * @type {string[]}
 * @environments TEST | DEV | FEDEV
 * @activeEnvironments TEST | FEDEV
 */

export const stylePathsOld = [
    /** TEST */
    path.join(baseFolder, '/', testFolder, '/*/includes/default/styles.less'),
    path.join(baseFolder, '/', testFolder, '/*/includes/mobile/styles.less'),
    /** DEV */
    //!IMPORTANT:  This was intended for Chris and Kevin in the past - Only Uncomment for DSS redesigns
    // path.join(baseFolder, '/', devFolder, '/*/httpdocs/includes/default/styles.less'),
    // path.join(baseFolder, '/', devFolder, '/*/httpdocs/includes/mobile/styles.less'),
    /** FEDEV */
    path.join(baseFolder, '/', fedevFolder, '/*/httpdocs/includes/default/styles.less'),
    path.join(baseFolder, '/', fedevFolder, '/*/httpdocs/includes/mobile/styles.less'),
];


/**
 * LESS file paths for modern websites (V5 & V5.5)
 * @section New LESS Paths (V5/V5.5)
 * @type {string[]}
 * @environments TEST | DEV | FEDEV
 * @activeEnvironments TEST | FEDEV
 */
export const stylePathsNew = [
    /** TEST - V5 */
    "../fwmTEST/*/includes/default/local_templates/components/*/*.less",
    "../fwmTEST/*/includes/default/local_templates/panels-editor/*/*.less",
    "../fwmTEST/*/includes/default/local_templates/panels/*/*.less",
    "../fwmTEST/*/includes/default/local_templates/sidebar/*/*.less",
    "../fwmTEST/*/includes/default/local_templates/sections/*/*.less",
    /** TEST - V5.5 */
    "../fwmTEST/*/includes/default/components/*/*.less",
    "../fwmTEST/*/includes/default/panels-editor/*/*.less",
    "../fwmTEST/*/includes/default/panels/*/*.less",
    "../fwmTEST/*/includes/default/sidebar/*/*.less",
    "../fwmTEST/*/includes/default/sections/*/*.less",
    /** DEV */
    //!IMPORTANT:  This was intended for Chris and Kevin in the past - Only Uncomment for DSS redesigns
    // "../fwmDEV/*/httpdocs/includes/default/local_templates/components/*/*.less",
    // "../fwmDEV/*/httpdocs/includes/default/local_templates/panels-editor/*/*.less",
    // "../fwmDEV/*/httpdocs/includes/default/local_templates/panels/*/*.less",
    // "../fwmDEV/*/httpdocs/includes/default/local_templates/sidebar/*/*.less",
    // "../fwmDEV/*/httpdocs/includes/default/local_templates/sections/*/*.less",
    /** FEDEV - V5 */
    "../fwmFEDEV/*/httpdocs/includes/default/local_templates/components/*/*.less",
    "../fwmFEDEV/*/httpdocs/includes/default/local_templates/panels-editor/*/*.less",
    "../fwmFEDEV/*/httpdocs/includes/default/local_templates/panels/*/*.less",
    "../fwmFEDEV/*/httpdocs/includes/default/local_templates/sidebar/*/*.less",
    "../fwmFEDEV/*/httpdocs/includes/default/local_templates/sections/*/*.less",
    /** FEDEV - V5.5 */
    "../fwmFEDEV/*/httpdocs/includes/default/components/*/*.less",
    "../fwmFEDEV/*/httpdocs/includes/default/panels-editor/*/*.less",
    "../fwmFEDEV/*/httpdocs/includes/default/panels/*/*.less",
    "../fwmFEDEV/*/httpdocs/includes/default/sidebar/*/*.less",
    "../fwmFEDEV/*/httpdocs/includes/default/sections/*/*.less",
]

/**
 * JS file paths for modern websites (V5 & V5.5)
 * @section New JS Paths (V5/V5.5)
 * @type {string[]}
 * @environments TEST | DEV | FEDEV
 * @activeEnvironments TEST | FEDEV
 */
export const jsPathsNew = [
    /** TEST - V5 */
    path.join(baseFolder, '/', testFolder, '/*/includes/default/local_templates/components/*/*.js'),
    path.join(baseFolder, '/', testFolder, '/*/includes/default/local_templates/panels-editor/*/*.js'),
    path.join(baseFolder, '/', testFolder, '/*/includes/default/local_templates/panels/*/*.js'),
    path.join(baseFolder, '/', testFolder, '/*/includes/default/local_templates/sidebar/*/*.js'),
    path.join(baseFolder, '/', testFolder, '/*/includes/default/local_templates/sections/*/*.js'),
    /** TEST - V5.5 */
    path.join(baseFolder, '/', testFolder, '/*/includes/default/components/*/*.js'),
    path.join(baseFolder, '/', testFolder, '/*/includes/default/panels-editor/*/*.js'),
    path.join(baseFolder, '/', testFolder, '/*/includes/default/panels/*/*.js'),
    path.join(baseFolder, '/', testFolder, '/*/includes/default/sidebar/*/*.js'),
    path.join(baseFolder, '/', testFolder, '/*/includes/default/sections/*/*.js'),
    // DEV
    //!IMPORTANT:  This was intended for Chris and Kevin in the past - Only Uncomment for DSS redesigns
    // path.join(baseFolder, '/', devFolder, '/*/httpdocs/includes/default/local_templates/components/*/*.js'),
    // path.join(baseFolder, '/', devFolder, '/*/httpdocs/includes/default/local_templates/panels-editor/*/*.js'),
    // path.join(baseFolder, '/', devFolder, '/*/httpdocs/includes/default/local_templates/panels/*/*.js'),
    // path.join(baseFolder, '/', devFolder, '/*/httpdocs/includes/default/local_templates/sidebar/*/*.js'),
    // path.join(baseFolder, '/', devFolder, '/*/httpdocs/includes/default/local_templates/sections/*/*.js'),
    /** FEDEV - V5 */
    path.join(baseFolder, '/', fedevFolder, '/*/httpdocs/includes/default/local_templates/components/*/*.js'),
    path.join(baseFolder, '/', fedevFolder, '/*/httpdocs/includes/default/local_templates/panels-editor/*/*.js'),
    path.join(baseFolder, '/', fedevFolder, '/*/httpdocs/includes/default/local_templates/panels/*/*.js'),
    path.join(baseFolder, '/', fedevFolder, '/*/httpdocs/includes/default/local_templates/sidebar/*/*.js'),
    path.join(baseFolder, '/', fedevFolder, '/*/httpdocs/includes/default/local_templates/sections/*/*.js'),
    /** FEDEV - V5.5 */
    path.join(baseFolder, '/', fedevFolder, '/*/httpdocs/includes/default/components/*/*.js'),
    path.join(baseFolder, '/', fedevFolder, '/*/httpdocs/includes/default/panels-editor/*/*.js'),
    path.join(baseFolder, '/', fedevFolder, '/*/httpdocs/includes/default/panels/*/*.js'),
    path.join(baseFolder, '/', fedevFolder, '/*/httpdocs/includes/default/sidebar/*/*.js'),
    path.join(baseFolder, '/', fedevFolder, '/*/httpdocs/includes/default/sections/*/*.js'),
]