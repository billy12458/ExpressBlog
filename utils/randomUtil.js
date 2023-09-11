const random = require('string-random');

class randomUtil {

    /**
     * An empty constructor
     */
    constructor() {

    }

    static getRandomPureString(len) {
        return random(len, {
            letters: true,
            numbers: false,
            specials: false
        });
    }

    static getRandomNumbers(len) {
        return random(len, {
            letters: false,
            numbers: true,
            specials: false
        });
    }
}

module.exports = randomUtil;