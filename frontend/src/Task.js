import React from 'react';

import './Task.css';

import infoBtn from './assets/infoIcon.png';
import delBtn from './assets/deleteIcon.png';
import playBtn from './assets/playIcon.png';
import pauseBtn from './assets/deleteIcon.png';

export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {playing: false};
        this.onToggle = this.onToggle.bind(this);
    }
    
    onToggle() {
        this.setState({playing: !this.state.playing});
        this.props.onToggle(this.props.taskId);
    }
    
    render() {
        return (
            <div className="taskContainer">
                <div className="taskInfo">
                    {this.props.taskId}
                </div>
                <div className="taskActions">
                    <img src={infoBtn} className="taskActionBtn"/>
                    <img src={delBtn}  className="taskActionBtn"/>
                    <a href="#" onClick={this.onToggle}>
                    <img src={this.state.playing ? pauseBtn : playBtn} className="taskActionBtn"/>
                    </a>
                </div>
            </div>
        );
    }
}
