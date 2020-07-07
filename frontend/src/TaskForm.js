import React from 'react';


export default class TaskForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            empID: '',
            taskID: '',
            wbs: '',
            clientName: ''
        };
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
    }

    handleSubmitForm() {
        this.props.onSubmit({
            taskID: this.state.taskID,
            empID: this.state.empID,
            wbs: this.state.wbs,
            clientName: this.state.clientName
        });
    }

    render() {

        return (
            <>
            <input 
                type="text"
                name="empID"
                placeholder="Emp ID"
                onChange={(e) => this.setState({empID: e.target.value})}
            />
            <input
                type="text"
                name="taskName"
                placeholder="Task Name"
                onChange={(e) => this.setState({taskID: e.target.value})}
            />
            <input
                type="text"
                name="wbsName"
                placeholder="WBS"
                onChange={(e) => this.setState({wbs: e.target.value})}
            />
            <input
                type="text"
                name="clientName"
                placeholder="Client Name" 
                onChange={(e) => this.setState({clientName: e.target.value})}
            />
            <button onClick={this.handleSubmitForm}> Submit </button>
            </>
        );
    }


}
