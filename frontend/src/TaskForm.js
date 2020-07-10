import React from 'react';
import './TaskForm.css';

export default class TaskForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            empID: '',
            taskID: '',
            wbs: '',
            clientName: '',
            teamName: ''
        };
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    handleSubmitForm() {
        this.props.onSubmit(this.state.taskID, {
            empID: this.state.empID,
            wbs: this.state.wbs,
            clientName: this.state.clientName,
            teamName: this.state.teamName
        });
    }

    render() {

        return (
            <>
        <div id = "task">
                <input
                    type="text"
                    name="taskName"
                    placeholder="Task Name"
                    onChange={(e) => this.setState({ taskID: e.target.value })}
                />
                  <button onClick={this.handleSubmitForm}> </button>
        </div>
        <div id = "fields">
            <label for="empID">Emp ID:</label>
                <input
                    type="text"
                    name="empID"
                    onChange={(e) => this.setState({ empID: e.target.value })}
                />
              
           
                <label for="wbsName">WBS:</label>
                <select
                    name="wbsName"
                    onChange={(e) => this.setState({ wbs: e.target.value })}>
                    <option value="wbs1"> WBS 1</option>
                    <option value="wbs2"> WBS 2</option>
                    <option value="wbs3"> WBS 3</option>
                </select>
           
          
                <label for="teamName">Team:</label>
                <select
                    name="teamName"
                    onChange={(e) => this.setState({ teamName: e.target.value })}>
                    <option value="team1"> Team 1</option>
                    <option value="team2"> Team 2</option>
                    <option value="wbs3"> Team 3</option>
                </select>
          
                <label for="clientName">Client:</label>
                <select
                    name="clientName"
                    onChange={(e) => this.setState({ clientName: e.target.value })}>
                    <option value="ausGov"> Australian Gov</option>
                    <option value="mcdonalds"> McDonald's</option>
                    <option value="volvo"> Volvo</option>
                    <option value="ericsson"> Ericsson</option>
                    <option value="nestle"> Nestlé </option>
                    <option value="volkswagen"> Volkswagen </option>
                    <option value="nokia"> Nokia </option>
                </select>
            </div>  
              
            </>
        );
    }


}
