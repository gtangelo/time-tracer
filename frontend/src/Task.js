import React from 'react';

import './Task.css';

import infoBtn from './assets/infoIcon.png';
import delBtn from './assets/deleteIcon.png';
import playBtn from './assets/playIcon.png';

export default class Task extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="taskContainer">
                <div className="taskInfo">
                    {this.props.taskName}
                </div>
                <div className="taskActions">
                    <img src={infoBtn} className="taskActionBtn"/>
                    <img src={delBtn}  className="taskActionBtn"/>
                    <img src={playBtn} className="taskActionBtn"/>
                </div>
            </div>
        );
    }
}
