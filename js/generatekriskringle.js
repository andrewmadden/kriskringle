// get html dom elements
const yearSelector = document.querySelector(".yearSelect");
const table = document.querySelector("table");

// get data
const currentYear = (new Date()).getFullYear();
const next5Years = [];
for (let i = 0;i < 5;i++) {
    next5Years.push(currentYear+i);
}
const cousins = ['Andrew', 'Ashleigh', 'Hannah', 'Georgia', 'Joshua', 'Sam'];
let cousinsMatched = [];

// populate year selector
next5Years.forEach((year) => {
    let option = document.createElement('option');
    let yearText = document.createTextNode(year);
    option.appendChild(yearText);
    option.setAttribute('value', year);
    yearSelector.appendChild(option);
});

// populate giver and receiver
populateReceiver.call(yearSelector.firstChild); // gives the function the first year as context

// set up listener
yearSelector.addEventListener('change', populateReceiver);

// functions
function populateReceiver() {
    console.log(`The year is ${this.value}!`);
    const match  = generateCousinMatch(this.value);
    clearTable();

    // create table with match data
    match.forEach((matchPair) => {
        let row = document.createElement('tr');
        let giver = document.createElement('td');
        let receiver = document.createElement('td');
        let giverText = document.createTextNode(matchPair['giver']);
        let receiverText = document.createTextNode(matchPair["receiver"]);
        giver.appendChild(giverText);
        receiver.appendChild(receiverText);
        row.appendChild(giver);
        row.appendChild(receiver);
        table.appendChild(row);
    });
}

function clearTable() {
    while (table.childElementCount > 1) {
        table.removeChild(table.lastChild);
    }
}

function generateCousinMatch(year) {
    let spinner = (year*9)%(cousins.length - 1) + 1;
    let cousinCopy = [...cousins]; // create copy of cousin array
    // rotates the cousin array randomly, never returning to the original position
    let cousinStart = cousinCopy.splice(spinner);
    let cousinEnd = cousinCopy.splice(0, spinner);
    let randCousins = cousinStart.concat(cousinEnd);

    // combines the givers and receivers into a single array
    let match = [];
    for (let i=0;i<cousins.length;i++) {
        match.push({'giver': cousins[i], 'receiver': randCousins[i]});
    }
    return match;
}