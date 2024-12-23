const Debugger = require('nextlibrary-unofficial');

// Initialize debugger
const debuggerInstance = new Debugger({ enabled: true, currentLevel: 'info' });

// Log different levels
debuggerInstance.info('This is an info message');
debuggerInstance.warn('This is a warning');
debuggerInstance.error('An error occurred', { code: 500 });
debuggerInstance.debug('Debugging info: x = 42');

// Change log level
debuggerInstance.setLevel('error');

// Test filtering
debuggerInstance.info('This message will not appear'); // Won't log because level is 'error'
debuggerInstance.error('This error message will appear');

// Disable debugging
debuggerInstance.toggle(false);
debuggerInstance.error('This message will not appear');
