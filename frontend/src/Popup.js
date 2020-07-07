/* global chrome */

import React from 'react';

import ActivityScreen from './ActivityScreen.js';
import HistoryScreen from './HistoryScreen.js';
import './Popup.css';

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.setPlaying = this.setPlaying.bind(this);
        this.createTask = this.createTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.updateTimer = this.updateTimer.bind(this);
        setInterval(this.updateTimer, 60000);
        var dummyData = this.dummyData();
        this.state = {...dummyData, showByTask: false, playing: false}
        chrome.storage.local.set(dummyData);
        /*
        this.state = {tasks: [], today: {}, past: [], showByTask: true, playing: false};
        chrome.storage.local.get({tasks: [], today: {}, past: [], playing: false}, r => {
            this.setState({tasks: [], today: r.today, past: r.past, playing: r.playing})
        });
        */
    }
    
    dummyData() {
        chrome.storage.local.clear();
        return {
            tasks: [{taskID: "Meeting"}, {taskID: "Break"}],
            today: {
                tasks: [{taskID: "Meeting", time: 61}, {taskID: "Break", time: 5}], 
                date: "7/7/2020"
            },
            past: [{tasks: [{taskID: "Meeting", time: 20}], date: "6/7/2020"},
                   {tasks: [{taskID: "Break", time: 124}], date: "5/7/2020"}
            ],
            playing: false
        }
    }
    
    updateTimer() {
        if (this.state.playing) {
            chrome.storage.local.get({today: {}}, r => {
                this.setState({today: r.today.tasks});
            });
        }
    }
    
    setPlaying(taskID) {
        this.state.playing = taskID;
        chrome.storage.local.set({playing: taskID});
    }
    
    deleteTask(taskID) {
        // does not yet delete activity, just the task from the menu
        var tasks = this.state.tasks;
        for (var i = 0; i < tasks.length; i++) {
            if (tasks.taskID == taskID) {
                tasks.splice(i, 1);
                break;
            }
        }
        this.setState({tasks: tasks});
        chrome.storage.local.set({tasks: tasks});
    }
    
    createTask(taskDetails) {
        var tasks = this.state.tasks;
        tasks.push(taskDetails);
        chrome.storage.local.set({
            tasks: tasks, 
        });
        this.setState(prevState => ({
            tasks: tasks, 
            showAddTask: false
        }));
    }
    
    render() {
        return (
            <div className="popupContainer">
                {
                    this.state.showByTask
                ? 
                    <ActivityScreen
                        tasks={this.state.tasks}
                        playing={this.state.playing}
                        setPlaying={this.setPlaying}
                        createTask={this.createTask}
                        deleteTask={this.deleteTask}
                    /> 
                : 
                    <HistoryScreen
                        today={this.state.today}
                        playing={this.state.playing}
                        setPlaying={this.setPlaying}
                        past={this.state.past}
                    />
                }
            </div>
        );
    }
}
/*
<HistoryScreen
                        today={this.state.today}
                        past={this.state.past}
                        setPlaying={this.setPlaying}
                    />
*/
