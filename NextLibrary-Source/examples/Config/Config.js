const Config = require('nextlibrary-unofficial');

// Initialize the Config class
const config = new Config();

// Save a configuration setting
console.log('Saving configuration setting...');
config.saveConfig('appName', 'MyApplication');
config.saveConfig('version', '1.0.0');

// Retrieve a configuration setting
console.log('Getting configuration settings...');
console.log('appName:', config.getConfig('appName')); // Output: MyApplication
console.log('version:', config.getConfig('version')); // Output: 1.0.0

// Update a configuration setting
console.log('Updating configuration setting...');
config.updateConfig('version', '1.0.1');
console.log('Updated version:', config.getConfig('version')); // Output: 1.0.1

// Change the directory for configuration files
console.log('Changing config directory...');
config.setDirectory('./newConfig', 'config');
config.saveConfig('newSetting', 'newValue'); // Saves in the new directory
console.log('newSetting:', config.getConfig('newSetting')); // Output: newValue

// Change the filename for the build configuration
console.log('Changing build config filename...');
config.setFilename('NEW_BUILD_CONFIG', 'buildConfig');
config.saveConfig('testKey', 'testValue'); // Saves in the new file
console.log('testKey:', config.getConfig('testKey')); // Output: testValue

// Change the documentation directory
console.log('Changing docs directory...');
config.setDirectory('./newDocs', 'docs');

// Change the docs filename
console.log('Changing docs filename...');
config.setFilename('NEW_README.md', 'docsFile');

// Ensure the new docs file exists
console.log('Ensuring new docs file...');
config.ensureFileExists('./newDocs/NEW_README.md', '# Updated Documentation');