// Import necessary modules
const readline = require('readline');

// Create a readline interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Prompt user for input
module.exports = function createPrompt(question) {
    /**
     * Creates a prompt for user input.
     * @param {string} question - The question to be asked.
     * @returns {string} The user's input.
     * @example const prompt = await createPrompt('What is your name?');
     */
    rl.question(question + ': ', (text) => {
      return text;
    });
};
  