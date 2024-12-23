// Import necessary modules
import fs from 'fs';
import path from 'path';
import Date from 'date-and-time';

// Utility function to generate a timestamp string
function getTimeString() {
  const now = new Date();
  return now.toISOString(); // Format: YYYY-MM-DDTHH:mm:ss.sssZ
}

// Class for managing log directory and file
export default class Output {
  /**
   * Creates an instance of Output.
   * @constructor
   * @param {*} directory - The directory where the log file is stored.
   * @param {*} filename - The name of the log file.
   * @description This class manages logging, storing logs in memory, and saving them to a file when requested.
   */
  constructor(directory = 'logs', filename = 'console_output.log') {
    this.directory = path.resolve(directory);
    this.filename = filename;
    this.logBuffer = []; // Temporary in-memory storage for log entries

    // Ensure the logs directory exists
    if (!fs.existsSync(this.directory)) {
      fs.mkdirSync(this.directory);
    }
  }

  // Method to log text to the console and store it in memory
  log(text) {
    const timestampedText = `[${getTimeString()}] ${text}`;
    console.log(timestampedText);
    this.logBuffer.push(timestampedText);
  }

  // Method to save buffered logs to the specified file
  save() {
    if (this.logBuffer.length === 0) {
      console.log('No logs to save.');
      return;
    }

    const logFilePath = path.join(this.directory, this.filename);
    const logContent = this.logBuffer.join('\n') + '\n';

    fs.appendFileSync(logFilePath, logContent, 'utf8');
    console.log(`Logs saved to ${logFilePath}`);

    // Clear the buffer after saving
    this.logBuffer = [];
  }

  // Method to set a new directory
  setDirectory(newDirectory) {
    this.directory = path.resolve(newDirectory);
    if (!fs.existsSync(this.directory)) {
      fs.mkdirSync(this.directory);
    }
  }

  // Method to set a new filename
  setFilename(newFilename) {
    this.filename = newFilename;
  }
}
