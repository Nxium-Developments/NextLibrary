const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

class PackageDebugger {
  /**
   * Creates an instance of PackageDebugger.
   * @param {*} projectPath 
   * @description This class provides methods for debugging and managing dependencies in a project.
   * 
   * @example 
   * if (require.main === module) {
   *    const debuggerInstance = new PackageDebugger();
   *    try {
   *        debuggerInstance.loadPackageJson();
   *        debuggerInstance.listInstalledPackages();
   *        debuggerInstance.checkMissingDependencies();
   *        debuggerInstance.verifyPackageVersions();
   *        debuggerInstance.findOutdatedPackages().then(() => {
   *            console.log('Package debugging completed.');
   *        });
   *    } catch (error) {
   *        console.error('Error:', error.message);
   *    }
   * }
   */

  constructor(projectPath = process.cwd()) {
    this.projectPath = projectPath;
    this.packageJsonPath = path.join(this.projectPath, 'package.json');
    this.nodeModulesPath = path.join(this.projectPath, 'node_modules');
    this.dependencies = {};
    this.devDependencies = {};
  }

  // Load package.json
  loadPackageJson() {
    if (!fs.existsSync(this.packageJsonPath)) {
      throw new Error('package.json not found in the specified project path.');
    }
    const packageJson = JSON.parse(fs.readFileSync(this.packageJsonPath, 'utf8'));
    this.dependencies = packageJson.dependencies || {};
    this.devDependencies = packageJson.devDependencies || {};
    console.log('Loaded package.json successfully.');
  }

  // List installed packages
  listInstalledPackages() {
    if (!fs.existsSync(this.nodeModulesPath)) {
      throw new Error('node_modules directory not found. Run `npm install` first.');
    }
    const installedPackages = fs.readdirSync(this.nodeModulesPath).filter(pkg => !pkg.startsWith('.'));
    console.log('Installed packages:', installedPackages);
    return installedPackages;
  }

  // Check for missing dependencies
  checkMissingDependencies() {
    const installedPackages = this.listInstalledPackages();
    const allDependencies = { ...this.dependencies, ...this.devDependencies };

    const missingDependencies = Object.keys(allDependencies).filter(
      dep => !installedPackages.includes(dep)
    );

    if (missingDependencies.length > 0) {
      console.warn('Missing dependencies:', missingDependencies);
    } else {
      console.log('No missing dependencies. All required packages are installed.');
    }

    return missingDependencies;
  }

  // Verify package versions
  verifyPackageVersions() {
    const mismatchedVersions = [];
    const allDependencies = { ...this.dependencies, ...this.devDependencies };

    for (const [packageName, expectedVersion] of Object.entries(allDependencies)) {
      const packageJsonPath = path.join(this.nodeModulesPath, packageName, 'package.json');
      if (fs.existsSync(packageJsonPath)) {
        const installedPackageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        const installedVersion = installedPackageJson.version;
        if (installedVersion !== expectedVersion) {
          mismatchedVersions.push({ packageName, expectedVersion, installedVersion });
        }
      }
    }

    if (mismatchedVersions.length > 0) {
      console.warn('Mismatched package versions:', mismatchedVersions);
    } else {
      console.log('All installed packages match the specified versions.');
    }

    return mismatchedVersions;
  }

  // Find outdated packages
  findOutdatedPackages() {
    return new Promise((resolve, reject) => {
      exec('npm outdated --json', (error, stdout, stderr) => {
        if (error) {
          reject(`Error fetching outdated packages: ${stderr}`);
          return;
        }

        const outdatedPackages = JSON.parse(stdout || '{}');
        if (Object.keys(outdatedPackages).length > 0) {
          console.warn('Outdated packages:', outdatedPackages);
        } else {
          console.log('All packages are up-to-date.');
        }

        resolve(outdatedPackages);
      });
    });
  }
}

module.exports = PackageDebugger;