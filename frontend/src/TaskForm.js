import React from 'react';


export default class TaskForm extends React.Component {
    constructor(props) {
        super(props)
    
    }


    OnChangeHandler = (event) => {
        this.setState({
            taskName: event.target.value,
            empID: event.target.value,
            wbsName: event.target.value,
            clientName: event.target.value

        });
    }

    handleSubmitForm() {
        let taskPayLoad = {
            taskName: '',
            clientName: '',
            wbsName: '',
            empID: ''
        }
        fetch({
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(taskPayLoad),
            mode: 'no-cors'
        })
            .then(response => console.log(response))
            .catch((error) => console.log(error))
    }

    render() {

        return (
            <form>
                <label>
                    <input type="text" name="empID" placeholder="Emp ID" onChange= {this.OnChangeHandler}  />
                </label>
                <label>
                    <input type="text" name="taskName" placeholder="Task Name" onChange= {this.OnChangeHandler} />
                </label>
                <label>
                    <input type="text" name="wbsName" placeholder="WBS" onChange= {this.OnChangeHandler}/>
                </label>
                <label>
                    <input type="text" name="clientName" placeholder="Client Name" onChange= {this.OnChangeHandler} />
                </label>

                <button onClick={this.handleSubmitForm}> Submit </button>


            </form >



        );
    }


}