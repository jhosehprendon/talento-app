import React from 'react';
import { Field, reduxForm } from 'redux-form';
 

class PortafolioForm extends React.Component {

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
                        <Field name="name" component={this.renderInput} label="Name of Project"/>
                        <Field name="objective" component={this.renderTextArea} label="Objective"/>
                        <Field name="platform" component={this.renderInput} label="Platforms used for marketing"/>
                        <Field name="results" component={this.renderTextArea} label="Results"/>
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

    if(!formValues.objective) {
        errors.objective = 'You must enter an objective'
    }

    if(!formValues.platform) {
        errors.platform = 'You must enter the platforms used'
    }

    // if(!formValues.results) {
    //     errors.results = 'You must enter which company requires this position'
    // }

    return errors
}



export default reduxForm({
    form: 'portafolioForm',
    validate: validate
})(PortafolioForm);