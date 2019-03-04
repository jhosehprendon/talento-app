import React from 'react';
import { Field, reduxForm } from 'redux-form';

class TaskForm extends React.Component {

    renderError = ({ error, touched }) => {
        if(touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete='off' />
                {this.renderError(meta)}
            </div>
        )
    }

    renderTextArea = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <textarea rows="10" {...input} autoComplete='off'/>
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {
        const notes = []
        const completed = false
        this.props.onSubmit({...formValues, notes, completed})
    }
    
    render() {
        return (
            <div className="ui card" style={{margin: 'auto', marginTop: '50px', marginBottom: '50px'}}>
                <div className="content">
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error"> 
                        <Field name="name" component={this.renderInput} label="Task Name"/>
                        <Field name="description" component={this.renderTextArea} label="Task Description"/>
                        <button style={{marginTop: '15px'}} className="ui button primary">Add Task</button>
                    </form>
                </div>
            </div>
        )
    }
}

const validate = (formValues) => {
    
    const errors = {}

    if(!formValues.name) {
        errors.name = 'You must enter a name'
    }

    if(!formValues.description) {
        errors.description = 'You must enter a description'
    }

    return errors
}



export default reduxForm({
    form: 'taskForm',
    validate: validate
})(TaskForm);