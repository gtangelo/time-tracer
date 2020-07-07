 /* global chrome */

import React from 'react';
import TaskForm from './TaskForm.js'
//import './HistoryScreen.css';

import Task from './Task.js';
import Past from './Past.js';

import addBtn from './assets/addIcon.png';
import tickBtn from './assets/tickIcon.png';

export default class HistoryScreen extends React.Component {
    
    setPlaying(taskID) {
        
    }
    
    render() {
        const todayItems = this.props.today.tasks.map(task =>
            <Task taskID={task.taskID}
                  playing={this.props.playing == task.taskID}
                  time={task.time}
                  onToggle={this.onToggle}
                  onDelete={this.onDelete}
              />);
        const pastItems = this.props.past.map(day =>
            <Past tasks={day.tasks} date={day.date}/>);
        return (
        <>
            <div className="popupHeader">
                Timeline
            </div>
            <div className="daysContainer">
                <div className="todayContainer">
                    {todayItems}
                </div>
                {pastItems}
            </div>
        </>
        );
    }
}
