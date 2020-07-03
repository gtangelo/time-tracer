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
        this.state = {
            showAddTask: false,
            tasks: [{id: "Task 1", playing: false, time: 0, start: 0}],
        };
    }
    
    onToggle(taskId) {
        var tasks = this.state.tasks;
        for (var i = 0; i < tasks.length; i++) {
            if (tasks[i].id == taskId) {
                if (tasks[i].playing == false) {
                    tasks[i].playing = true;
                    tasks[i].start = Date.now();
                } else {
                    tasks[i].playing = false;
                    if (Date.now() - tasks[i].start > 60000) {
                        tasks[i].time += Date.now() - tasks[i].start;
                    }
                    tasks[i].start = 0;
                }
                this.setState({tasks: tasks});
                break;
            }
        }
    }
    
    createNewTask() {
        return;
    }
    
    render() {
    
        const taskItems = this.state.tasks.map(task => <Task taskId={task.id} onToggle={this.onToggle}/>); 
        
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
                    <a href="#" onClick={this.createNewTask()}>
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
