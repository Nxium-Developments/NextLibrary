class Debugger {
  /**
   * Creates an instance of Debugger.
   * @param {*} options 
   * @description This class handles logging messages with different log levels.
   * The constructor takes an options object with the following properties:
   * - enabled: A boolean value indicating whether debugging is enabled. Default is true.
   * - levels: An array of available log levels. Default is ['info', 'warn', 'error', 'debug'].
   * - currentLevel: The current log level. Default is 'debug'.
   * 
   * The class provides methods to log messages with different log levels, set the log level, toggle debugging, and retrieve the current log level.
   * 
   * @example
   * const debuggerInstance = new Debugger();
   * debuggerInstance.info('This is an info message');
   * debuggerInstance.warn('This is a warning');
   * debuggerInstance.error('An error occurred', { code: 500 });
   * debuggerInstance.debug('Debugging info: x = 42');
   * debuggerInstance.setLevel('error');
   * debuggerInstance.toggle(false);
   */

  constructor(options = {}) {
    this.enabled = options.enabled ?? true; // Toggle debugging
    this.levels = options.levels || ['info', 'warn', 'error', 'debug']; // Log levels
    this.currentLevel = options.currentLevel || 'debug'; // Default log level
  }

  log(level, message, ...args) {
    if (!this.enabled) return;
    if (!this.levels.includes(level)) {
      console.error(`Invalid log level: ${level}`);
      return;
    }

    // Only log messages that are within the allowed log level
    if (this.levels.indexOf(level) <= this.levels.indexOf(this.currentLevel)) {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] [${level.toUpperCase()}]: ${message}`, ...args);
    }
  }

  info(message, ...args) {
    this.log('info', message, ...args);
  }

  warn(message, ...args) {
    this.log('warn', message, ...args);
  }

  error(message, ...args) {
    this.log('error', message, ...args);
  }

  debug(message, ...args) {
    this.log('debug', message, ...args);
  }

  setLevel(level) {
    if (this.levels.includes(level)) {
      this.currentLevel = level;
      this.info(`Log level set to: ${level}`);
    } else {
      this.error(`Invalid log level: ${level}`);
    }
  }

  toggle(enable) {
    this.enabled = enable;
    const status = enable ? 'enabled' : 'disabled';
    console.log(`Debugger ${status}`);
  }
}

module.exports = Debugger;
