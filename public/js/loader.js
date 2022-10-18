/**
 * Set up the page.
 */

/**
 * Load the data from a file.
 */
loadData = () => {
    window.console.debug('loadData called');
    fetch('/js/files/matches.json', {mode: 'no-cors'})
        .then(response => response.json())
        .then(json => populateTable(json.matches));
}

/**
 * Populate the table with JSON data.
 *
 * @param matches JSON object.
 */
populateTable = (matches) => {
    const table = document.querySelector("table");
    clearTable(table);
    window.console.log(matches);

    // Create table with match data.
    matches.forEach((match) => {
        let row = document.createElement('tr');
        row.classList.add('match');
        let giver = document.createElement('td');
        giver.classList.add('giver')
        giver.appendChild(document.createTextNode(match['giver']));
        let receiver = document.createElement('td');
        receiver.classList.add('receiver');
        receiver.appendChild(document.createTextNode(match["receiver"]));
        row.appendChild(giver);
        row.appendChild(receiver);
        table.appendChild(row);
    });
}

/**
 * Clear the table of data.
 *
 * @param table HTML DOM Element for table.
 */
clearTable = (table) => {
    while (table.childElementCount > 1) {
        table.removeChild(table.lastChild);
    }
}

window.onload = () => {
    window.console.debug('onload called');
    loadData.call();
}
