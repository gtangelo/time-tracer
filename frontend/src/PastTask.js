import React from 'react';

import './Task.css';

import infoBtn from './assets/infoIcon.png';
import delBtn from './assets/deleteIcon.png';

// This component is for tasks that do not have a record button.

// replace play/pause button with a pencil for editing the time.

export default class PastTask extends React.Component {

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
        return (
            <div className="taskContainer">
                <div className="taskInfo">
                    <div className="taskColor"/>
                    <div className="taskID">
                        {this.props.taskID}
                    </div>
                </div>
                <div className="taskStart">
                    <div className="taskStartTxt">
                        {this.time()}
                    </div>
                </div>
            </div>
        );
    }
}
