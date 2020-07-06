/* global chrome */

import React from 'react';
import TaskForm from './TaskForm.js'
import './Popup.css';

import Task from './Task.js';
import Past from './Past.js';

import addBtn from './assets/addIcon.png';
import tickBtn from './assets/tickIcon.png';

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.onToggle = this.onToggle.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.updateTimer = this.updateTimer.bind(this);
        setInterval(this.updateTimer, 60000);
        this.state = {showAddTask: false, tasks: {}, today: [], past: [], showByTask: true};
        chrome.storage.local.get({tasks: {}, today: [], past: []}, r => {
            this.setState({tasks: r.tasks, today: r.today, past: r.past})
        });
    }
    
    updateTimer() {
        if (this.state.playing) {
            chrome.storage.local.get({today: {}}, r => {
                this.setState({today: r.today.tasks});
            });
        }
    }
    
    onToggle(taskID) {
        if (this.state.playing == taskID) {
            this.setState({playing: false});
            chrome.storage.local.set({playing: false});
        } else {
            this.setState({playing: taskID});
            chrome.storage.local.set({playing: taskID});
        }
    }
    
    onDelete(taskId) {
        // does not yet delete activity, just the task from the menu
        var tasks = this.state.tasks;
        delete tasks[taskId];
        this.setState({tasks: tasks});
        chrome.storage.local.set({tasks: this.state.tasks});
    }
    
    onCreate(taskId, taskDetails) {
        chrome.storage.local.set({
            tasks: {...this.state.tasks, [taskId]: taskDetails}, 
        });
        this.setState(prevState => ({
            tasks: {...prevState.tasks, [taskId]: taskDetails}, 
            showAddTask: false
        }));
    }
    
    render() {
        if (this.state.showByTask) {
            var todayItems = this.state.today.map(task =>
                <Task taskID={task.taskID}
                      playing={this.state.playing == task.taskID}
                      time={task.time}
                      onToggle={this.onToggle}
                      onDelete={this.onDelete}
                  />);
            var pastItems = this.state.past.map(day =>
                <Past tasks={day.tasks} date={day.date}/>);
            var ret = (
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
                </div>);
        } else {
            var ret = (
                <div className="popupBody">
                    <div className="todayContainer">
                        {todayItems}
                    </div>
                    {pastItems}
                </div>);
        }
        return (
            <>
            {ret}
            </>
        );
    }
}
