import React from 'react';

import PastTask from './PastTask.js';

import './Past.css';

// This component is for the task history of days gone by.
// It renders the date of the day in question, and then
// a list of tasks and times for that day. These tasks
// differ from today's tasks, because they can not be recorded.
// Their times can be manually edited, however.

export default class Past extends React.Component {
    render() {
        const dayItems = this.props.tasks.map(task =>
            <PastTask taskID={task.taskID} time={task.time}/>);
        return (
            <div className="dayContainer">
                <div className="dayHeading">
                    <div className="dateHeading">
                        {this.props.date}   
                    </div>
                    <div className="timeHeading">
                        {this.props.time}
                    </div>
                </div>
                {dayItems}
            </div>
        );
    }
}


