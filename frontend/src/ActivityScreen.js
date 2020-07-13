/* global chrome */

import React from 'react';
import TaskForm from './TaskForm.js'
import './ActivityScreen.css';

import Task from './Task.js';
import Past from './Past.js';

import addBtn from './assets/deleteIcon.png';

export default class ActivityScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showAddTask: true};
        this.setPlaying = this.setPlaying.bind(this);
    }
    
    setPlaying(taskID) {
        if (this.props.playing === taskID) {
            this.props.setPlaying(false);
        } else {
            this.props.setPlaying(taskID);
        }
    }
    
    
    render() {
        const tasks = this.props.tasks.map(task => 
            <div>
                <Task taskID={task.taskID}
                  playing={task.taskID === this.props.playing}
                  onToggle={this.setPlaying}
                  colour={task.colour}
                />
                <div className="break"/>
            </div>
            );
        
        return (
            <>
                <div className="titleHeader">
                    Task Log
                </div>

                <div className="greyBox">
                    <div className="taskList">
                        {tasks}
                    </div>
                </div>

                <div className="titleHeader">
                    Add Task
                    <a href="#" onClick={
                        () => this.setState({showAddTask: !this.state.showAddTask})}>
                        <img src={addBtn} className={
                            "newTaskBtn" + 
                            (this.state.showAddTask ? "Hide" : "Show")}/>
                    </a>
                </div>

                <div className={"newTaskMenu" + 
                                (this.state.showAddTask ? "Show" : "Hide")}>
                    <TaskForm onSubmit={this.props.createTask}/>
                </div>

            </>
        );
    }
}
