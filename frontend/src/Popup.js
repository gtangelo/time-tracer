import React from 'react';
import { CSSTransition } from 'react-transition-group'; 
import Fade from 'react-reveal/Fade';

import './Popup.css';

import Task from './Task.js';

import addBtn from './assets/addIcon.png';

import tickBtn from './assets/tickIcon.png';

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

                
                <div className={"newTaskMenu" + (this.state.showAddTask ? "Show" : "Hide")}>
                <Fade delay = {500} >
                    <form style={{ display: (this.state.showAddTask ? 'block' : 'none') }}>
                        <label>
                            <input type="text" name="taskName" placeholder= "Task Name" />
                        </label>
                        <label> 
                            <input type="text" name="WBSName" placeholder= "WBS"/>
                        </label>
                        <label> 
                            <input type="text" name="clientName" placeholder= "Client Name"/>
                        </label>

                        
                        <input id = "submit" type="image" src= {tickBtn} alt="Submit">
                            </input> 

                    </form>
                </Fade>
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
