import React from 'react';
import { Field, reduxForm } from 'redux-form';

class ProjectForm extends React.Component {

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
                <textarea rows="10" {...input} autoComplete='off' placeholder='Provide relevant and detailed information about the position. Mention skills needed, experience, daily work, location, company, expectations, etc'/>
                {this.renderError(meta)}
            </div>
        )
    }



    onSubmit = (formValues) => {
        if(this.props.buttonText === 'Create a Job') {
            var _id = localStorage.getItem('userId')
            var name = localStorage.getItem('userName')
            var userIds =[]
            userIds.push({_id, name})
        }
        
        this.props.onSubmit({...formValues, userIds}) 
    }
    
    render() {
        return (
            <div className="ui card" style={{margin: 'auto', marginTop: '50px', marginBottom: '50px'}}>
                <div className="content">
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error"> 
                        <Field name="name" component={this.renderInput} label="Job Title"/>
                        <Field name="location" component={this.renderInput} label="City or Remote"/>
                        <Field name="seniority" component={this.renderInput} label="Seniority Level"/>
                        <Field name="company" component={this.renderInput} label="Company Requiring Candidate"/>
                        <Field name="description" component={this.renderTextArea} label="Job Description"/>
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

    if(!formValues.location) {
        errors.location = 'You must enter City or Remote'
    }

    if(!formValues.seniority) {
        errors.seniority = 'You must enter Seniority Level'
    }

    if(!formValues.company) {
        errors.company = 'You must enter which company requires this position'
    }

    if(!formValues.description) {
        errors.description = 'You must enter a description'
    }

    return errors
}



export default reduxForm({
    form: 'projectForm',
    validate: validate
})(ProjectForm);