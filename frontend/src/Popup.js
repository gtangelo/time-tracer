import React from 'react';

import './Popup.css';

import Task from './Task.js';

export default class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
            tasks: ["Task 1", "Task 2"],
        };
    }
    
    render() {
    
        const taskItems = this.state.tasks.map(taskName => <Task taskName={taskName}/>); 
    
        return (
            <div className="popupContainer">
                <div className="popupHeader">
                    <p className="popupTitle"> Time Tracer </p>
                    <div className="popupActions">
                        <a className="popupAddTaskButton" href="#">
                        
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
