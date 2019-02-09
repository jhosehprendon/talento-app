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
                <textarea rows="10" {...input} autoComplete='off'/>
                {this.renderError(meta)}
            </div>
        )
    }



    onSubmit = (formValues) => {
        const userId = localStorage.getItem('userId')

        this.props.onSubmit({...formValues, userId})
        
    }
    
    render() {
        return (
            <div className="ui card" style={{margin: 'auto', marginTop: '50px'}}>
                <div className="content">
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error"> 
                        <Field name="name" component={this.renderInput} label="Enter project name"/>
                        <Field name="description" component={this.renderTextArea} label="Enter project description"/>
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

    if(!formValues.description) {
        errors.description = 'You must enter a description'
    }

    return errors
}



export default reduxForm({
    form: 'projectForm',
    validate: validate
})(ProjectForm);