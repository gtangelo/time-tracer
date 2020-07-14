// This script defines and runs a function every minute, to check if a task is
// currently being recorded. If it is, then it checks if the task already exists
// in today's list. If it does, it adds 1 minute to the timer. If it does not
// exist, it gets added in. If no task is playing, nothing happens. If today's
// list does not exist, then it gets created, and the old today gets moved into
// the past.

updateTimer = () => {
    chrome.storage.local.get({
        today: {},
        past: [], 
        tasks: [], 
        playing: false
    }, r => {
        console.log(r.playing);
        if (r.playing) {
            let date = new Date();
            let day = date.getDate() + '/' + date.getMonth() + '/' + date.getYear();
            if (r.today.date === day) {
                success: {
                    for (var i = 0; i < r.today.tasks.length; i++) {
                        if (r.today.tasks[i].taskID == r.playing) {
                            r.today.tasks[i].time++;
                            break success;
                        }
                    }
                    r.today.tasks.push({taskID: r.playing, time: 1});
                }
                chrome.storage.local.set({today: r.today});
            } else {
                r.past.push(r.today);
                chrome.storage.local.set({today: {tasks: [{taskID: r.playing, time: 1}], date: day}, past: r.past});
            }
        }
    });
}

let date = new Date();
let day = date.getDate() + '/' + date.getMonth() + '/' + date.getYear();
chrome.storage.local.clear();
chrome.storage.local.set(
    {
        tasks: [{
            taskID: "Meeting", 
            colour: "rgba(0,255,0)",
            empID: "eid1",
            wbs: "wbs2",
            clientName: "nokia",
            teamName: "team2"
        }, {
            taskID: "Research",
            colour: "rgba(255,0,0)",
            empID: "eid3",
            wbs: "wbs1",
            clientName: "ausGov",
            teamName: "team2"
        }, {
            taskID: "Presentation Practice",
            colour: "rgba(255,0,0)",
            empID: "eid2",
            wbs: "wbs1",
            clientName: "volvo",
            teamName: "team1"
        }, {
            taskID: "Documentation",
            colour: "rgba(255,0,0)",
            empID: "eid2",
            wbs: "wbs2",
            clientName: "nestle",
            teamName: "team3"
        }],
        today: {
            tasks: [{
                taskID: "Meeting", 
                time: 289
            }, {
                taskID: "Research", 
                time: 957
            }, {
                taskID: "Presentation Practice", 
                time: 376
            }, {
                taskID: "Documentation", 
                time: 95
            },], 
            date: day
        },
        past: [
            {tasks: [{taskID: "Meeting", time: 1999}], date: "6/7/2020"},
            {tasks: [{taskID: "Documentation", time: 124}], date: "5/7/2020"}
        ],
        playing: false,
        showByTask: true
    }
);

setInterval(updateTimer, 1000);
