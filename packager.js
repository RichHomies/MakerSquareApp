var packager = require('electron-packager')

console.log(__dirname+ '/electron')
var opts = {
  dir: __dirname+ '/electron',
  name: 'MakerSquare',
  platform: 'darwin',
  version: '0.35.4',
  arch: 'x64',
  icon: './atom.icns',
  ignore: "electron/node_modules/(electron-packager|electron-prebuilt)"

}

packager(opts, function done (err, appPath) { 
  if(err){
    console.log('err ', err);
  } else  {
    console.log('apppath', appPath);
  }
})

