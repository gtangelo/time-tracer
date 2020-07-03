updateTimers = () => {
    chrome.storage.local.get(['tasks', 'taskTimes'], result => {
        console.log('time!');
        if (result.hasOwnProperty('tasks') && result.hasOwnProperty('taskTimes')) {
            var taskIds = Object.keys(result.tasks);
            for (var i = 0; i < taskIds.length; i++) {
                if (result.tasks[taskIds[i]].playing) {
                    result.taskTimes[taskIds[i]] += 1;
                }
            }
            chrome.storage.local.set({taskTimes: result.taskTimes});
        }
    });
}

setInterval(updateTimers, 1000);
