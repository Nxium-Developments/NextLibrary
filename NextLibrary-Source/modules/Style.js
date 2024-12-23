// Import necessary modules
import chalk from 'chalk';

// Function to apply styles to a given text
export default function styleText(text, color, bold, italic) {
    /**
     * This function applies styles to a given text based on the provided color, bold, and italic parameters.
     * @param {string} text - The text to apply styles to.
     * @param {string} color - The color to apply to the text (e.g., 'red', 'green', 'blue', etc.).
     * @param {boolean} bold - Whether to apply bold style to the text.
     * @param {boolean} italic - Whether to apply italic style to the text.
     * @returns {string} The styled text with applied styles.
     * @example const styledText = styleText('Hello, world!', 'red', true, false);
     */
  
    // If there's no text, return nothing.
    if (!text) return '';
  
    // Apply styles to the text
    let styledText = chalk[color] ? chalk[color](text) : text;
  
    // If bold or italic are true, apply them
    if (bold) styledText = chalk.bold(styledText);
    if (italic) styledText = chalk.italic(styledText);
  
    return styledText;
  }