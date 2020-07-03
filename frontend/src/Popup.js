/* global chrome */

import React from 'react';

import './Popup.css';

import Task from './Task.js';

import addBtn from './assets/addIcon.png';
import tickBtn from './assets/tickIcon.png';

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.onToggle = this.onToggle.bind(this);
        this.createNewTask = this.createNewTask.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.state = {showAddTask: false, tasks: {}};
        chrome.storage.local.get(['tasks'], result => {
            this.setState({tasks: result.tasks});
        });
    }
    
    timerUpdate(taskId) {
        var tasks = this.state.tasks;
        tasks[taskId].time += 1;
        this.setState({tasks: tasks}, () => chrome.storage.local.set({tasks: this.state.tasks}));
    }
    
    onToggle(taskId) {
        var tasks = this.state.tasks;
        if (tasks[taskId].playing) {
            tasks[taskId].playing = false;
            clearInterval(tasks[taskId].timerId);
            tasks[taskId].timerId = 0;
        } else {
            tasks[taskId].playing = true;
            tasks[taskId].timerId = setInterval(this.timerUpdate.bind(this, taskId), 60000);
        }
        this.setState({tasks: tasks}, () => chrome.storage.local.set({tasks: this.state.tasks}));
    }
    
    onDelete(taskId) {
        var tasks = this.state.tasks;
        delete tasks[taskId];
        this.setState({tasks: tasks}, () => chrome.storage.local.set({tasks: this.state.tasks}));
    }
    
    createNewTask(taskId) {
        // Add new task to state, and then also to local storage
        this.setState(prevState => ({tasks: {...prevState.tasks, [taskId]: {playing: false, time: 0}}}));
        chrome.storage.local.set({tasks: this.state.tasks});
    }
    
    render() {
        const taskItems = Object.keys(this.state.tasks).map(task => <Task taskId={task} onToggle={this.onToggle} onDelete={this.onDelete}/>); 
        return (
            <div className="popupContainer">
                <div className="popupHeader">
                    Time Tracer
                        <div className="popupActions">
                            <a href="#" onClick={() => this.setState({showAddTask: !this.state.showAddTask})}>
                                <img src={addBtn} className={"newTaskBtn" + (this.state.showAddTask ? "Hide" : "Show")}/>
                            </a>
                        </div>
                </div>
                <div className={"newTaskMenu" + (this.state.showAddTask ? "Show" : "Hide")}>
                    <a href="#" onClick={this.createNewTask.bind(null, "hi")}>
                        <img src={tickBtn} className={"tickBtn"}/>
                    </a>
                </div>
                <div className="popupBody">
                    <div className="taskList">
                        {taskItems}
                    </div>
                </div>
            </div>
        );
    }
}
