import React from 'react';
import { Field, reduxForm } from 'redux-form';

class AuthForm extends React.Component {

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

    renderInputPassword = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input type="password" {...input} autoComplete='off' />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues)
    }

    render() {
        return (
            <div class="ui card" style={{margin: 'auto', marginTop: '50px'}}>
                <div class="content">
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error"> 
                        <Field name="email" component={this.renderInput} label="Enter email"/>
                        <Field name="password" component={this.renderInputPassword} label="Enter password"/>
                        <button className="ui button primary">{this.props.authMode}</button>
                    </form>
                </div>
            </div>
        )
    }  
}

const validate = (formValues) => {
    const errors = {}

    if(!formValues.email) {
        errors.email = 'You must enter an email'
    }

    if(!formValues.password) {
        errors.password = 'You must enter a password'
    }

    return errors
}


export default reduxForm({
    form: 'AuthForm',
    validate: validate
})(AuthForm);