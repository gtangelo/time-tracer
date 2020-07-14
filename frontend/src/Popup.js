/* global chrome */

import React from 'react';

import ActivityScreen from './ActivityScreen.js';
import HistoryScreen from './HistoryScreen.js';

import './Popup.css';

import activityBtn from './assets/timerIcon.png';
import historyBtn from './assets/historyIcon.png';
import uploadBtn from './assets/uploadIcon.png';

import logo from './assets/icon16.png';
import UploadScreen from './UploadScreen.js';

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.setPlaying = this.setPlaying.bind(this);
        this.createTask = this.createTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.updateTimer = this.updateTimer.bind(this);
        setInterval(this.updateTimer, 1000);
        this.state = {
            tasks: [],
            today: {},
            past: [], 
            // showByTask is the main menu
            showByTask: 0, 
            playing: false
        }
        chrome.storage.local.get({
            tasks: [], 
            today: {}, 
            past: [], 
            playing: false}, 
            r => {
            this.setState({tasks: r.tasks, today: r.today, past: r.past, playing: r.playing});
            console.log(this.state);
        });
    }
    
    setIcon(colour) {
        colour = colour.slice(0,-1)+",0.5)";
        var canvas = document.createElement("canvas");
        canvas.width = 16;
        canvas.height = 16;
        var context = canvas.getContext("2d");
        var img = new Image();
        img.onload = () => {
            context.beginPath();
            context.arc(7.5,8.1,6.84,0,2*Math.PI,false);
            context.fillStyle = colour;
            context.fill();
            context.drawImage(img, 0, 0);
            chrome.browserAction.setIcon({imageData: context.getImageData(0,0,16,16)});
        };
        img.src = logo;
    }
    
    updateTimer() {
        if (this.state.playing) {
            chrome.storage.local.get({today: {}}, r => {
                this.setState({today: r.today});
            });
        }
    }
    
    setPlaying(taskID) {
        chrome.storage.local.set({playing: taskID});
        this.setState({playing: taskID});
        if (!taskID) {
            this.setIcon("rgba(255,255,255)");
            chrome.browserAction.setTitle({title: "Time Tracer - Paused"});
        } else {
            for (var i = 0; i < this.state.tasks.length; i++) {
                if (this.state.tasks[i].taskID === taskID) {
                    this.setIcon(this.state.tasks[i].colour);
                }
            }
            chrome.browserAction.setTitle({title: "Tracking: " + taskID});
        }
    }
    
    deleteTask(taskID) {
        // does not yet delete activity, just the task from the menu
        var tasks = this.state.tasks;
        for (var i = 0; i < tasks.length; i++) {
            if (tasks.taskID === taskID) {
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

        var tab = this.state.showByTask;
        var tabState0 = "Off";
        var tabState1 = "Off";
        var tabState2 = "Off";
        if (this.state.showByTask === 0) {
            tab = <ActivityScreen
                tasks={this.state.tasks}
                playing={this.state.playing}
                setPlaying={this.setPlaying}
                createTask={this.createTask}
                deleteTask={this.deleteTask}
            />
            tabState0 = "On"
        } else if (this.state.showByTask === 1) {
            tab = <HistoryScreen
                tasks={this.state.tasks}
                today={this.state.today}
                playing={this.state.playing}
                setPlaying={this.setPlaying}
                past={this.state.past}
            />
            tabState1 = "On"
        } else if (this.state.showByTask === 2) {
            tab = <UploadScreen
                tasks={this.state.tasks}
                today={this.state.today}
                playing={this.state.playing}
                setPlaying={this.setPlaying}
                past={this.state.past}
            />
            tabState2 = "On"
        }

        return (    
            
            <div className="popupContainer">
                <div className="menu">
                        <div className={"menuBtn"+(tabState0)}
                            onClick={() => this.setState({showByTask: 0})}
                        >
                            <img className={"menuBtnImg"+(tabState0)} src={activityBtn}/>
                        </div>
                        <div className={"menuBtn"+(tabState1)}
                            onClick={() => this.setState({showByTask: 1})}
                        >
                            <img className={"menuBtnImg"+(tabState1)} src={historyBtn}/>
                        </div>
                        <div className={"menuBtn"+(tabState2)}
                            onClick={() => this.setState({showByTask: 2})}
                        >
                            <img className={"menuBtnImg"+(tabState2)} src={uploadBtn}/>
                        </div>
                </div>
                {tab}
            </div>
        );
    }
}
