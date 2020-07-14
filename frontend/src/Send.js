/* global chrome */

import React from 'react';
import './HistoryScreen.css';
import uploadBtn from './assets/uploadIcon.png'

// Manages the backend and post data to ASW through lambda functions and
// into dynamodb

function SendTask() {

	// // Specifically used to send other details besides time
	// function handleSubmitForm (taskID, empID, wbs, clientName, teamName) {
	// 	let taskPayload ={
	// 		taskID: taskID,
	// 		empID: empID,
	// 		wbs: wbs,
	// 		clientName: clientName,
	// 		teamName: teamName
	// 	}
	// 	fetch('https://ta3rb2y186.execute-api.us-east-2.amazonaws.com/task', {
	// 		method: 'POST',
	// 		header: {
	// 			'Content Type': 'application/json'
	// 		},
	// 		body: JSON.stringify(taskPayload),
	// 		mode: 'no-cors'
	// 	})
	// 	.then(response => console.log(response))
	// 	.catch((error) => console.log(error))
	// }

	function handleSubmitFormTime (taskID, sentTime) {
		let taskPayload ={
			taskID: taskID,
			time: sentTime
		}
		fetch('https://ta3rb2y186.execute-api.us-east-2.amazonaws.com/task', {
			method: 'POST',
			header: {
				'Content Type': 'application/json'
			},
			body: JSON.stringify(taskPayload),
			mode: 'no-cors'
		})
		.then(response => console.log(response))
		.catch((error) => console.log(error))
	}


	function submitTask () {
		// // Sends data besides time to dynamodb
		// chrome.storage.local.get('tasks', taskList => {
		//     for (var i = 0; i < taskList.tasks.length; i++) {
		//         console.log(taskList.tasks[i].taskID)
		//         handleSubmitForm (
		//             taskList.tasks[i].taskID, 
		//             taskList.tasks[i].empID,
		//             taskList.tasks[i].wbs,
		//             taskList.tasks[i].clientName,
		//             taskList.tasks[i].teamName
		//         )
		//     }
		// })
		
		chrome.storage.local.get('today', function(timeList) {
			for (var i = 0; i < timeList.today.tasks.length; i++) {
				console.log(timeList.today.tasks[i].time)
				handleSubmitFormTime (
					timeList.today.tasks[i].taskID,
					timeList.today.tasks[i].time
				)
			}
		})
	}

	return (

		<div>
			<div className="uploadButton" onClick={submitTask}> 
				<img src={uploadBtn}/>
				<div className="uploadTxt">Upload</div>
			</div>
		</div>

	)
}

export default SendTask;
