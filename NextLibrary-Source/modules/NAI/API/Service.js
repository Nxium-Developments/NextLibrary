module.exports = class API {
    /**
     * Creates an instance of API.
     * @param {*} key
     * @description This class handles API keys for NextLibrary.
     * @example First Example
     * const api = new API('YOUR_API_KEY');
     * api.getKey(); // 'YOUR_API_KEY'
     * 
     * @example Second Example
     * const api = new API;
     * api.setKey('YOUR_API_KEY');
     * api.getKey(); // 'YOUR_API_KEY'
     * 
     */

    constructor(key) {
        this.key = key;
    }

    setKey(key) {
        this.key = key;
    }

    getKey() {
        return this.key;
    }
}