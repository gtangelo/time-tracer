import React from 'react';
import TaskForm from './TaskForm.js'
import './ActivityScreen.css';

import Task from './Task.js';

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

    // time(a) {
    //     var t = 0;
    //     for (var i = 0; i < a.length; i++) {
    //         t += a[i].time;
    //     }
    //     var hrs = Math.floor(t / 60);
    //     if (hrs < 10) {
    //         hrs = "0" + hrs;
    //     }
    //     var mins = t % 60;
    //     if (mins < 10) {
    //         mins = "0" + mins;
    //     }
    //     return hrs + ":" + mins;
    // }
    
    render() {
        const tasks = this.props.tasks.map(task => 
            <Task taskID={task.taskID}
                  playing={task.taskID === this.props.playing}
                  onToggle={this.setPlaying}
            />);
        // const totalTime = this.time(this.props.today.tasks);
        
        return (
            <>
                <div className="popupHeader">Task Log</div>
                {/* <div>
                    {totalTime}
                </div> */}
                <div className="taskList">
                    {tasks}
                </div>                    
                <div className="popupHeader">Add Task</div>
                <div className={"newTaskMenu" + 
                                (this.state.showAddTask ? "Show" : "Hide")}>
                    <TaskForm onSubmit={this.props.createTask}/>
                </div>
            </>
        );
    }
}
