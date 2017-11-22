var path = require( 'path' );

module.exports = {
  // CSS filenames
  datasvgcss: '../../scss/icons/icons.data.svg.css',
  datapngcss: '../../scss/icons/icons.data.png.css',
  urlpngcss: '../../scss/icons/icons.fallback.css',

  // preview HTML filename
  previewhtml: 'preview.html',

  // grunticon loader code snippet filename
  loadersnippet: '../../vendor/grunticon/grunticon.loader.min.js',

  // Include loader code for SVG markup embedding
  enhanceSVG: false,

  // Make markup embedding work across domains (if CSS hosted externally)
  corsEmbed: false,

  // folder name (within dest) for png output
  pngfolder: 'png',

  // prefix for CSS classnames
  cssprefix: '.icon--',

  dynamicColorOnly: true,

  // css file path prefix
  // this defaults to '/' and will be placed before the 'dest' path
  // when stylesheets are loaded. It allows root-relative referencing
  // of the CSS. If you don't want a prefix path, set to to ''
  cssbasepath: '',

  // template: path.join( __dirname, 'default-css.hbs' ),
  // previewTemplate: path.join( __dirname, 'templates/preview-custom.hbs' ),

  compressPNG: true
};
