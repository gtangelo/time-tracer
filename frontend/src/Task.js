import React from 'react';

import './Task.css';

import info from './assets/info.png';
import del from './assets/delete.png';
import play from './assets/play.png';
import pause from './assets/pause.png';

export default class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {playing: this.props.playing};
        this.onToggle = this.onToggle.bind(this);
    }
    
    onToggle() {
        this.setState({playing: !this.state.playing});
        this.props.onToggle(this.props.taskId);
    }
    
    onDelete() {
        this.props.onDelete(this.props.taskId);
    }
    
    render() {
        return (
            <div className="taskContainer">
                <div className="taskTimeDisplay" placeholder="NULL">
                    {this.props.time}
                </div>
                <div className="taskActions">
                    <a href="#" onClick={this.onToggle}>
                        <img src={this.state.playing ? pause : play} className="action-button"/>
                    </a>
                    <a href="#" onClick={this.props.onDelete.bind(null, this.props.taskId)}>
                        <img src={del}  className="delete-button"/>
                    </a>
                </div>
                <div className="taskIDdisplay" placeholder="Task Name">
                    {this.props.taskId}
                </div>
                <img src={info} className="info-button"/>
            </div>
        );
    }
}
