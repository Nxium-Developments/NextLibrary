// Default
const Groq = require("groq-sdk");
const API = require("../API/Service.js");

const apiKey = new API;
const groq = new Groq({ apiKey: apiKey.getKey() });

module.exports = async function getResponse(userMessage) {
  /**
   * This will require you to use Groq's API
   * @param {string} userMessage
   * @returns {Promise<string>}
   * @description This function sends a message to the AI service and returns the response.
   * @example
   * const { API, getResponse } = require('@nextlibrary-unofficial');
   * 
   * const api = new API;
   * api.setKey('YOUR_API_KEY');
   * 
   * const response = await getResponse('Hello, how are you?');
   */

  try {
    const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
      model: "llama3-8b-8192",
    })
    .then((chatCompletion) => {
      console.log(chatCompletion.choices[0]?.message?.content || "");
    });

    return completion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error('Error with AI service:', error);
  }
}