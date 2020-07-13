 /* global chrome */

 import React from 'react';
 import './HistoryScreen.css';
 
 import Task from './Task.js';
 import Past from './Past.js';
 import uploadBtn from './assets/uploadIcon.png'
 
 
 export default class UploadScreen extends React.Component {
     constructor(props) {
         super(props);
         this.setPlaying = this.setPlaying.bind(this);
    }
     
    setPlaying() {
        this.props.setPlaying(false);
    }
     
     time(a) {
         var t = 0;
         for (var i = 0; i < a.length; i++) {
             t += a[i].time;
         }
         var hrs = Math.floor(t / 60);
         if (hrs < 10) {
             hrs = "0" + hrs;
         }
         var mins = t % 60;
         if (mins < 10) {
             mins = "0" + mins;
         }
         return hrs + ":" + mins;
     }
     
     render() {
         const pastItems = this.props.past.map(day =>
             <Past allTasks={this.props.tasks} tasks={day.tasks} date={day.date} time={this.time(day.tasks)}/>);
         return (
         <>
             <div className="popupHeader">
                Upload Task
             </div>
 
             <div className="uploadTaskGreyBox">
                {pastItems}
                <div className="uploadButton"> 
                    <img src={uploadBtn}/>
                    <div className="uploadTxt">Upload</div>
                </div>
             </div>
         </>
         );
     }
 }
 