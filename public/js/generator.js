console.log('Generating new matches...');

// Load the participants to be matched.
const data = require('./files/participants.json');
const participants = data.participants;

// Generate the matches.
let matches = [];
if (validateParticipants(participants)) {
    matches = generateMatches(participants);
}

// Save the file ready for the website.
const matchesdata = {matches: matches};
const datastring = JSON.stringify(matchesdata);
const filesystem = require('fs');
filesystem.writeFileSync(__dirname + '/files/matches.json', datastring);

/**
 * Validate the data from the participants file.
 *
 * TODO: implement.
 *
 * @param participants
 * @returns {boolean}
 */
function validateParticipants(participants) {
    // Check participants is an array and contains more than 1 value. Can't match yourself!
    // Make sure all names are strings.
    // Make sure that there are no duplicate names.
    return true;
}

/**
 * Check that no-one got themselves.
 *
 * @param {Array} givers
 * @param {Array} receivers Shuffled array of the givers.
 * @returns {boolean}
 */
function validateMatches(givers, receivers) {
    for (let i = 0; i < givers.length; i++) {
        // Check noone gets themselves.
        if (givers[i] === receivers[i]) {
            return false;
        }

        // Check there are no closed pairs.
        receiver_index = givers.findIndex((giver) => giver === receivers[i]);
        if (receivers[receiver_index] === givers[i]) {
            return false;
        }
    }
    return true;
}

/**
 * For a list of participants, generate a array of objects containing giver/receiver pairs where noone gets themeselves.
 *
 * @param {Array} participants
 * @returns {Array}
 */
function generateMatches(participants) {
    const MAX_TRIES = 100; // If we can't match everyone with noone selecting themselves in this many goes, give up.
    let count = 0;

    const givers = [...participants]; // We'll leave the data as is for the givers.
    // Now let's shuffle them up and see if it works! Infinite loop, here I come!
    let receivers = shuffle(participants);
    while (!validateMatches(givers, receivers)) {
        receivers = shuffle(participants);
        if (count > MAX_TRIES) {
            throw "Fix your shuffling algorithm. Couldn't match everyone cleanly."
        } else {
            count += 1;
        }
    }

    // combines the givers and receivers into a single array
    let matches = [];
    givers.forEach((giver, index) => {
        matches.push({'giver': giver, 'receiver': receivers[index]});
    });
    return matches;
}

/**
 * Shuffles array in place.
 *
 * Apparently it is a modern Fisher-Yates shuffle algorithm. Thanks jeff from SO.
 *
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
