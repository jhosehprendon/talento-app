import React from 'react';
import { Field, reduxForm } from 'redux-form';

class CandidateForm extends React.Component {
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

    onSubmit = (formValues) => {
        const userId = localStorage.getItem('userId')
        const projectId =this.props.projectId
        console.log(projectId)
        this.props.onSubmit({...formValues, userId, projectId})
        
    }

    render() {
        return (
            <div className="ui card" style={{margin: 'auto', marginTop: '50px'}}>
                <div className="content">
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error"> 
                        <Field name="name" component={this.renderInput} label="Enter candidate name"/>
                        <Field name="email" component={this.renderInput} label="Enter candidate email"/>
                        <button style={{marginTop: '15px'}} className="ui button primary">{this.props.buttonText}</button>
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

    if(!formValues.email) {
        errors.description = 'You must enter an email'
    }

    return errors
}



export default reduxForm({
    form: 'candidateForm',
    validate: validate
})(CandidateForm);
