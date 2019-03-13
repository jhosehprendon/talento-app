import React from 'react';
import { Field, reduxForm } from 'redux-form';

class InviteForm extends React.Component {
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
        if(meta.touched) {
            this.props.clearNoEmailError()
        }
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete='off' />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues.email)  
    }

    render() {
        return (
                <div style={{padding: '20px'}}>
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error"> 
                        <Field name="email" component={this.renderInput} label="Enter colleague email"/>
                        <button style={{marginTop: '15px'}} className="ui button primary">{this.props.buttonText}</button>
                        <p style={{color:'#e74c3c'}}>{this.props.noEmailError}</p>
                    </form>
                </div>
        )
    }
}

const validate = (formValues) => {
    
    const errors = {}

    let validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    if(!validateEmail(formValues.email)) {
        errors.email = 'Please enter a valid email'
    }

    if(!formValues.email) {
        errors.email = 'You must enter a email'
    }

    return errors
}



export default reduxForm({
    form: 'inviteForm',
    validate: validate
})(InviteForm);