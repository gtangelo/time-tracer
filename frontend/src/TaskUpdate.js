import React from 'react';

import './Task.css';


// This component is the same from Task.js but is customised for the update page.

export default class Task extends React.Component {
   
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
                        <div className="taskID">{this.props.taskID}</div>
                    </div>
                    <div className="taskStart">
                        <div className="taskStartTxt">
                        {this.props.time ? this.time() : "START"}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
