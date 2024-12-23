const fs = require('fs');
const path = require('path');

if (!fs.existsSync(path.resolve(__dirname, '../../examples'))) {
    fs.mkdirSync(path.resolve(__dirname, '../../examples'));
    fs.mkdirSync(path.resolve(__dirname, '../../examples/Log'));
    fs.mkdirSync(path.resolve(__dirname, '../../examples/Config'));
    fs.mkdirSync(path.resolve(__dirname, '../../examples/Debugging'));

    fs.copyFileSync(path.resolve(__dirname, './examples/Log/Output.js'), path.resolve(__dirname, '../../examples/Log/Output.js'));
    fs.copyFileSync(path.resolve(__dirname, './examples/Config/Config.js'), path.resolve(__dirname, '../../examples/Config/Config.js'));
    fs.copyFileSync(path.resolve(__dirname, './examples/Debugging/Package.js'), path.resolve(__dirname, '../../examples/Debugging/Package.js'));
    fs.copyFileSync(path.resolve(__dirname, './examples/Debugging/Debug.js'), path.resolve(__dirname, '../../examples/Debugging/Debug.js'));

    console.log('Example files created successfully.');
}

const Config = require('./modules/Config');
const Debugger = require('./modules/Debugger/Debugger');
const PackageDebugger = require('./modules/Debugger/Package');

module.exports = { Config, Debugger, PackageDebugger };