import React from 'react';

import './Task.css';

import infoBtn from './assets/infoIcon.png';
import delBtn from './assets/deleteIcon.png';
import playBtn from './assets/playIcon.png';
import pauseBtn from './assets/deleteIcon.png';

// This component is for tasks that can be recorded.

export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {playing: this.props.playing};
        this.onToggle = this.onToggle.bind(this);
    }
    
    onToggle() {
        this.setState({playing: !this.state.playing});
        this.props.onToggle(this.props.taskID);
    }
    
    onDelete() {
        this.props.onDelete(this.props.taskID);
    }
    
    render() {
        return (
            <div className="taskContainer">
                <div className="taskInfo">
                    {this.props.taskID}
                    <br/>
                    {this.props.time}
                </div>
                <div className="taskActions">
                    <img src={infoBtn} className="taskActionBtn"/>
                    <a href="#" onClick={this.props.onDelete.bind(null, this.props.taskId)}>
                        <img src={delBtn}  className="taskActionBtn"/>
                    </a>
                    <a href="#" onClick={this.onToggle}>
                        <img src={this.state.playing ? pauseBtn : playBtn} className="taskActionBtn"/>
                    </a>
                </div>
            </div>
        );
    }
}
