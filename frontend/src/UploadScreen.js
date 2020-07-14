import React from 'react';
import './HistoryScreen.css';

import Task from './TaskUpdate.js';
import Past from './Past.js';

import SendTask from './Send.js'
 
export default class UploadScreen extends React.Component {
    constructor(props) {
        super(props);
        this.setPlaying = this.setPlaying.bind(this);
    }
     
    setPlaying() {
        this.props.setPlaying(false);
    }
     
    time(a) {
        var t = 0;
        for (var i = 0; i < a.length; i++) {
            t += a[i].time;
        }
        var hrs = Math.floor(t / 60);
        if (hrs < 10) {
            hrs = "0" + hrs;
        }
        var mins = t % 60;
        if (mins < 10) {
            mins = "0" + mins;
        }
        return hrs + ":" + mins;
    }
     
    render() {
        const totalTime = this.time(this.props.today.tasks);
        const todayItems = this.props.today.tasks.map(task => {
            for (var i = 0; i < this.props.tasks.length; i++) {
                if (this.props.tasks[i].taskID === task.taskID) {
                    return <Task
                        taskID={task.taskID}
                        playing={this.props.playing === task.taskID}
                        time={task.time}
                        colour={this.props.tasks[i].colour}
                        onToggle={this.setPlaying}
                    />
                }
            }
        });

        const pastItems = this.props.past.map(day =>
            <Past
                allTasks={this.props.tasks}
                tasks={day.tasks}
                date={day.date} 
                time={this.time(day.tasks)}
            />);

        return (
            <>
                <div className="popupHeader">Upload Task</div>
                <div className="uploadTaskGreyBox">
                    <div className="todayContainer">
                        <div className="dayHeading">
                            <div className="dateHeading">Today</div>
                            <div className="timeHeading">{totalTime}</div>
                        </div>
                        {todayItems}
                    </div>
                    {pastItems}
                    <SendTask/>
                </div>
            </>
        );
    }
}
