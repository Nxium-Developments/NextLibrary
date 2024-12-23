const fs = require('fs');
const path = require('path');

module.exports = class Config {
  /**
   * Creates an instance of Config.
   * @param {*} configDir 
   * @param {*} buildConfig 
   * @param {*} docsDir 
   * @param {*} docsFile 
   * @description This class handles configuration settings for NextLibrary.
   * 
   * The constructor takes the following parameters:
   * - configDir: The directory where the config files are stored. Default is 'config'.
   * - buildConfig: The name of the build config file. Default is 'BUILD_CONFIG'.
   * - docsDir: The directory where the documentation files are stored. Default is 'docs'.
   * - docsFile: The name of the documentation file. Default is 'README.md'.
   * 
   * The class provides methods to save, retrieve, and update configuration settings.
   * 
   * @example
   * const config = new Config();
   * config.saveConfig('appName', 'MyApplication');
   * config.saveConfig('version', '1.0.0');
   * 
   * const savedVersion = config.getConfig('version');
   * console.log('Saved version:', savedVersion); // Output: 1.0.0
   * 
   * config.updateConfig('version', '1.0.1');
   * const updatedVersion = config.getConfig('version');
   * console.log('Updated version:', updatedVersion); // Output: 1.0.1
   * 
   * config.setDirectory('./newConfig', 'config');
   * config.saveConfig('newSetting', 'newValue');
   * 
   * config.setFilename('NEW_BUILD_CONFIG', 'buildConfig');
   * config.saveConfig('testKey', 'testValue');
   * 
   * config.setDirectory('./newDocs', 'docs');
   * config.setFilename('NEW_README.md', 'docsFile');
   * 
   */

  constructor(configDir = 'config', buildConfig = 'BUILD_CONFIG', docsDir = 'docs', docsFile = 'README.md') {
    this.configDir = path.resolve(configDir);
    this.docsDir = path.resolve(docsDir);
    this.buildConfig = buildConfig;
    this.docsFile = docsFile;

    // Ensure the config directory exists
    this.ensureDirectoryExists(this.configDir);

    // Ensure the docs directory exists
    this.ensureDirectoryExists(this.docsDir);

    // Ensure the build config file exists
    this.ensureFileExists(path.join(this.configDir, this.buildConfig), '{}');

    // Ensure the docs file exists
    this.ensureFileExists(path.join(this.docsDir, this.docsFile), '# No Documentation Set');
  }

  // Utility method to ensure a directory exists
  ensureDirectoryExists(directory) {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
  }

  // Utility method to ensure a file exists with default content
  ensureFileExists(filePath, defaultContent) {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, defaultContent);
    }
  }

  // Method to save a build configuration setting
  saveConfig(setting, value) {
    try {
      const configPath = path.join(this.configDir, this.buildConfig);
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      config[setting] = value;
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    } catch (err) {
      console.error('Error saving configuration:', err);
    }
  }

  // Method to update a build configuration setting
  updateConfig(setting, value) {
    try {
      this.saveConfig(setting, value); // Reuse saveConfig to ensure changes are persisted
    } catch (err) {
      console.error('Error updating configuration:', err);
    }
  }

  // Method to get a build configuration setting
  getConfig(setting) {
    try {
      const configPath = path.join(this.configDir, this.buildConfig);
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      return config[setting];
    } catch (err) {
      console.error('Error getting configuration:', err);
      return undefined;
    }
  }

  // Method to set a new directory
  setDirectory(newDirectory, whichDir) {
    const targetDir = path.resolve(newDirectory);
    this.ensureDirectoryExists(targetDir);

    if (whichDir === 'config') {
      this.configDir = targetDir;
    } else if (whichDir === 'docs') {
      this.docsDir = targetDir;
    } else {
      console.error(`Invalid directory type: ${whichDir}`);
    }
  }

  // Method to set a new filename
  setFilename(newFilename, whichFile) {
    if (whichFile === 'buildConfig') {
      this.buildConfig = newFilename;
    } else if (whichFile === 'docsFile') {
      this.docsFile = newFilename;
    } else {
      console.error(`Invalid file type: ${whichFile}`);
    }
  }
};
