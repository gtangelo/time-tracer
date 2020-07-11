import React from 'react';

import './Task.css';

import infoBtn from './assets/infoIcon.png';
import playBtn from './assets/playIcon.png';
import pauseBtn from './assets/pauseIcon.png';

// This component is for tasks that can be recorded.

export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.onToggle = this.onToggle.bind(this);
    }
    
    onToggle() {
        this.props.onToggle(this.props.taskID);
    }
    
    onDelete() {
        this.props.onDelete(this.props.taskID);
    }
    
    time() {
        var hrs = Math.floor(this.props.time / 60);
        if (hrs < 10) {
            hrs = "0" + hrs;
        }
        var mins = this.props.time % 60;
        if (mins < 10) {
            mins = "0" + mins;
        }
        return hrs + ":" + mins;
    }
    
    render() {

        console.log(this.props.colour);
        return (
            <div>
                <div className="taskContainer">
                    <div className="taskInfo">
                        <div className="taskColor" style={{backgroundColor: this.props.colour}}/>
                        <div className="taskID">
                            {this.props.taskID}
                        </div>
                    </div>
                    <div className="taskStart" onClick={this.onToggle}>
                        <img src={this.props.playing ? pauseBtn : playBtn} className="taskStartImg"/>
                            <div className="taskStartTxt">
                            {this.props.time ? this.time() : "START"}
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}
