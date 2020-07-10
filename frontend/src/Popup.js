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
        setInterval(this.updateTimer, 1000);
        this.state = {tasks: [], today: {}, past: [], showByTask: true, playing: false}
        chrome.storage.local.get({tasks: [], today: {}, past: [], playing: false}, r => {
            this.setState({tasks: r.tasks, today: r.today, past: r.past, playing: r.playing});
            console.log(this.state);
        });
    }
    
    updateTimer() {
        if (this.state.playing) {
            chrome.storage.local.get({today: {}}, r => {
                console.log(r);
                this.setState({today: r.today});
            });
        }
    }
    
    setPlaying(taskID) {
        this.state.playing = taskID;
        chrome.storage.local.set({playing: taskID});
        this.setState({playing: taskID});
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
        this.setState({
            tasks: tasks, 
        });
    }
    
    render() {
        return (    
            <div className="popupContainer">
                <div className="menuContainer">
                <div className="menu">
                    <div className={"menuBtn"+(this.state.showByTask?"On":"Off")}
                         onClick={() => this.setState({showByTask: true})}
                    />
                    <div className={"menuBtn"+(this.state.showByTask?"Off":"On")}
                         onClick={() => this.setState({showByTask: false})}
                    />
                </div>
                </div>
                <div className="screen">
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
            </div>
        );
    }
}
