// Get insertion point.
const table = document.querySelector("table");

loadData();

function loadData() {
// get data
    var request = new XMLHttpRequest();
    request.open('GET', 'js/files/matches.json', true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
            // Success!
            const data = JSON.parse(request.responseText);
            const matches = data.matches;
            populateReceiver(matches);
        } else {
            // We reached our target server, but it returned an error
            loadData();
        }
    };

    request.send();
}

function populateReceiver(matches) {
    clearTable();

    // create table with match data
    matches.forEach((match) => {
        let row = document.createElement('tr');
        let giver = document.createElement('td');
        let receiver = document.createElement('td');
        let giverText = document.createTextNode(match['giver']);
        let receiverText = document.createTextNode(match["receiver"]);
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

