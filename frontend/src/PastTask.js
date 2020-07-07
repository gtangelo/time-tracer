import React from 'react';

import './Task.css';

import infoBtn from './assets/infoIcon.png';
import delBtn from './assets/deleteIcon.png';

// This component is for tasks that do not have a record button.

// replace play/pause button with a pencil for editing the time.

export default class PastTask extends React.Component {
    render() {
        return (
            <div className="taskContainer">
                <div className="taskInfo">
                    {this.props.taskID}
                    <br/>
                    {this.props.time}
                </div>
            </div>
        );
    }
}
