const prompt = require('prompt-sync')({ sigint: true });

var eventList = []; // to store events
var journal = [];
var wolf;
var day = 1;

function saveToJournal(events, wolf) {
    journal.push({ events, wolf });
}

var no_of_tasks_max = 5
var number_of_days = prompt("enter number of days: "); // the number of times the function get and save data will loop for

function myFunc(n) { // function to get user data and save
    let k = 0;
    while (k < no_of_tasks_max) {
        const event = prompt("Enter events for day " + n + ", 'END' to stop Events entry: ");
        if (event != 'END') { // when the user is done entering tasks for the day, enter 'END'
            eventList.push(event);
            k += 1;
            if (k == no_of_tasks_max) {
                wolf = prompt("Changed to Wolf? 'true / false': ");
                if (wolf == 'true') {
                    wolf = true;
                } else if (wolf == 'false') {
                    wolf = false;
                } else {
                    wolf = false;
                }
            };

        } else {
            wolf = prompt("Changed to Wolf? 'true / false': ");
            if (wolf == 'true') {
                wolf = true;
            } else if (wolf == 'false') {
                wolf = false;
            } else {
                wolf = false;
            }
            k = no_of_tasks_max; // break out of loop
        }
    }
    saveToJournal(eventList, wolf);
}


var j = 0;
while (j < number_of_days) {
    myFunc(day);
    var eventList = [];
    j += 1;
    day += 1;
}

// console.log(journal);


function phi(table) {
    return (table[3] * table[0] - table[2] * table[1]) /
        Math.sqrt((table[2] + table[3]) *
            (table[0] + table[1]) *
            (table[1] + table[3]) *
            (table[0] + table[2]))
}

// console.log(phi([76, 9, 4, 1]))


//

function tableFor(event, journal) {
    let table = [0, 0, 0, 0];
    for (let i = 0; i < journal.length; i++) {
        let entry = journal[i],
            index = 0;
        if (entry.events.includes(event)) {
            index += 1;
        }
        if (entry.wolf) {
            index += 2;
        }
        table[index] += 1;
    }
    return table;
};

console.log(tableFor("pizza", journal));

// to get each of the events in the journal
function journalEvents(journal) {
    let events = [];
    for (let entry of journal) {
        for (let event of entry.events) {
            if (!events.includes(event)) {
                events.push(event);
            }
        }
    }
    return events;
}
console.log(journalEvents(journal));

for (let event of journalEvents(journal)) {
    let correlation = phi(tableFor(event, journal));
    if (correlation > 0.1 || correlation < 0.1) {
        console.log(event + ": ", phi(tableFor(event, journal)));
    }
}