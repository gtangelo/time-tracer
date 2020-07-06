/* global chrome */

import React from 'react';
import TaskForm from './TaskForm.js'
import './Popup.css';

import Task from './Task.js';

import addBtn from './assets/addIcon.png';
import tickBtn from './assets/tickIcon.png';

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.onToggle = this.onToggle.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.updateTimers = this.updateTimers.bind(this);
        setInterval(this.updateTimers, 60000);
        this.state = {showAddTask: false, tasks: {}, taskTimes: {}};
        chrome.storage.local.get(['tasks', 'taskTimes'], result => {
            if (result.hasOwnProperty('tasks')) {
                this.setState({tasks: result.tasks});
            }
            if (result.hasOwnProperty('taskTimes')) {
                this.setState({taskTimes: result.taskTimes});
            }
        });
    }
    
    updateTimers() {
        chrome.storage.local.get(['taskTimes'], result => {
            if (result.hasOwnProperty('taskTimes')) {
                this.setState({taskTimes: result.taskTimes});
            }
        });
    }
    
    onToggle(taskId) {
        var tasks = this.state.tasks;
        tasks[taskId].playing = !tasks[taskId].playing;
        this.setState({tasks: tasks});
        chrome.storage.local.set({tasks: tasks});
    }
    
    onDelete(taskId) {
        var tasks = this.state.tasks;
        delete tasks[taskId];
        this.setState({tasks: tasks}, () => chrome.storage.local.set({tasks: this.state.tasks}));
    }
    
    onCreate(taskId, taskDetails) {
        chrome.storage.local.set({
            tasks: {...this.state.tasks, [taskId]: {...taskDetails, playing: false}}, 
            taskTimes: {...this.state.taskTimes, [taskId]: 0}
        });
        this.setState(prevState => ({
            tasks: {...prevState.tasks, [taskId]: {...taskDetails, playing: false}}, 
            taskTimes: {...prevState.taskTimes, [taskId]: 0},
            showAddTask: false
        }));
    }
    
    render() {
        const taskItems = Object.keys(this.state.tasks).map(task => 
            <Task taskId={task}
                  playing={this.state.tasks[task].playing}
                  onToggle={this.onToggle} 
                  onDelete={this.onDelete}
                  time={this.state.taskTimes[task]}
            />); 
        return (
            <div className="popupContainer">
                <div className="popupHeader">
                    Activities
                    <a href="#" onClick={
                        () => this.setState({showAddTask: !this.state.showAddTask})}>
                        <img src={addBtn} className={
                            "newTaskBtn" + 
                            (this.state.showAddTask ? "Hide" : "Show")}/>
                    </a>
                </div>
                <div className={"newTaskMenu" + 
                                (this.state.showAddTask ? "Show" : "Hide")}>
                    <TaskForm onSubmit={this.onCreate}/>
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
