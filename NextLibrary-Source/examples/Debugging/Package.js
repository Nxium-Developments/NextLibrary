const PackageDebugger = require('nextlibrary-unofficial');

// Example usage
if (require.main === module) {
    const debuggerInstance = new PackageDebugger();
    try {
      debuggerInstance.loadPackageJson();
      debuggerInstance.listInstalledPackages();
      debuggerInstance.checkMissingDependencies();
      debuggerInstance.verifyPackageVersions();
      debuggerInstance.findOutdatedPackages().then(() => {
        console.log('Package debugging completed.');
      });
    } catch (error) {
      console.error('Error:', error.message);
    }
  }