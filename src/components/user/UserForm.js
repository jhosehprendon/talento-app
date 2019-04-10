import React from 'react';
import { Field, reduxForm } from 'redux-form';

class UserForm extends React.Component {

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
        this.props.onSubmit(formValues)
    }

    render() {
        return (
            <div className="ui card" style={{margin: 'auto', marginTop: '50px'}}>
                <div className="content">
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error"> 
                        <Field name="name" component={this.renderInput} label="Name"/>
                        <Field name="email" component={this.renderInput} label="Email"/>
                        <button className="ui button primary">Edit User</button>
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

    let validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    if(!validateEmail(formValues.email)) {
        errors.email = 'Please enter a valid email'
    }

    if(!formValues.email) {
        errors.email = 'You must enter an email'
    }

    return errors
}


export default reduxForm({
    form: 'UserForm',
    validate: validate
})(UserForm);