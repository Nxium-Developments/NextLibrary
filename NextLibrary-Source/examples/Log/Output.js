const Output = require('nextlibrary-unofficial');

const logger = new Output();

// Log messages
logger.log('This is the first log entry.');
logger.log('This is the second log entry.');

// Save logs to file
logger.save();

// Check log file content (logs directory) for saved messages.
const savedLogs = fs.readFileSync('logs/console_output.log', 'utf8');
console.log('Saved logs:', savedLogs);