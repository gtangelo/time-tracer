import React from 'react';
import './TaskForm.css'

const initialState = {
    empID: '',
    taskID: '',
    wbs: '',
    clientName: '',
    colour: "rgba(0,255,0)",
    teamName: '',
    taskError: "",
    selectError: ""
}

export default class TaskForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = initialState;
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    validate() {
        let taskError = "";
        let selectError = "";


        if (this.state.taskID.length < 2) {
            taskError = 'Task name is too short!';
        }

        if ((!this.state.empID) || (!this.state.wbs) || (!this.state.clientName) || (!this.state.teamName)) {
            selectError = ' Please check all fields have been selected';
        }

        if (taskError || selectError) {
            this.setState({ taskError , selectError});
            return false;
        }

        return true;
    }

    handleSubmitForm = event => {
        event.preventDefault();
    
        const isValid = this.validate();
        if (isValid) {
            this.props.onSubmit({
                taskID: this.state.taskID,
                empID: this.state.empID,
                wbs: this.state.wbs,
                clientName: this.state.clientName,
                colour: this.state.colour,
                teamName: this.state.teamName



            });

            // Clear the form, which will allow the user to resubmit after
            // correcting errors

            this.setState(initialState);
        }


    }

    render() {
        return (
            <form>
                <div id="fields">

                    <label for="taskName">Task Name</label>
                 
                        <input
                            type="text"
                            name="taskName"
                            placeholder="Task 1"
                            onChange={(e) => this.setState({ taskID: e.target.value })}
                        />
                       
             

                    <label for="clientName">Client</label>
                    <select
                        name="clientName"
                        placeholder="John Smith"
                        onChange={(e) => this.setState({ clientName: e.target.value })}>
                        <option value="" disabled selected>-- Select Option --</option>
                        <option value="ausGov"> Australian Gov</option>
                        <option value="mcdonalds"> McDonald's</option>
                        <option value="volvo"> Volvo</option>
                        <option value="ericsson"> Ericsson</option>
                        <option value="nestle"> Nestlé </option>
                        <option value="volkswagen"> Volkswagen </option>
                        <option value="nokia"> Nokia </option>
                    </select>

                    <label for="teamName">Team:</label>
                    <select
                        name="teamName"
                        placeholder="Team X"
                        onChange={(e) => this.setState({ teamName: e.target.value })}>
                        <option value="" disabled selected>-- Select Option --</option>
                        <option value="team1"> Team 1</option>
                        <option value="team2"> Team 2</option>
                        <option value="team3"> Team 3</option>
                    </select>

                    <label for="empID">EID:</label>

                    <select
                        name="empID"
                        onChange={(e) => this.setState({ empID: e.target.value })}>
                        <option value="" disabled selected>-- Select Option --</option>
                        <option value="eid1"> EID 1</option>
                        <option value="eid2"> EID 2</option>
                        <option value="eid3"> EID 3</option>
                    </select>

                    <label for="wbsName">WBS:</label>
                    <select
                        name="wbsName"
                        onChange={(e) => this.setState({ wbs: e.target.value })}>
                        <option value="" disabled selected>-- Select Option --</option>
                        <option value="wbs1"> WBS 1</option>
                        <option value="wbs2"> WBS 2</option>
                        <option value="wbs3"> WBS 3</option>
                    </select>
                </div>
                <div id="task">
                    <button
                        onClick={this.handleSubmitForm}>
                        Create Task
            </button>

            <div class = "validation"> {this.state.taskError} {this.state.selectError}</div>
                </div>
            </form>
        );
    }
}
