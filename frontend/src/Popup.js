import React from 'react';
import { CSSTransition } from 'react-transition-group'; 

import './Popup.css';

import Task from './Task.js';

import addBtn from './assets/addIcon.png';

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddTask: false,
            tasks: ["Task 1", "Task 2"],
        };
    }
    
    render() {
    
        const taskItems = this.state.tasks.map(taskName => <Task taskName={taskName}/>); 
        
        const animClassNames = {
            enter: "addTaskEnter",
            enterActive: "addTaskEnterActive",
            exit: "addTaskExit",
            exitActive: "addTaskExitActive"
        };
        
        return (
            <div className="popupContainer">
                <div className="popupHeader">
                    Time Tracer
                        <div className="popupActions">
                            <a href="#"onClick={() => this.setState({showAddTask: !this.state.showAddTask})}>
                                <img src={addBtn} className={"newTaskBtn" + (this.state.showAddTask ? "Hide" : "Show")}/>
                            </a>
                        </div>
                    
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
