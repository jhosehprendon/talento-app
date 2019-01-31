import React from 'react';
import { connect } from 'react-redux';
import { logIn } from '../store/actions';
import AuthForm from './AuthForm';

class Login extends React.Component {

    onSubmit = (formValues) => {
        this.props.logIn(formValues)
    }

    render() {
        return (
            <div>
                <h3 style={{textAlign: 'center'}}>Log In</h3>
                <AuthForm onSubmit={this.onSubmit} authMode='LogIn' />
                <div style={{color: 'red'}}>{this.props.authError}</div>
            </div>    
        )
    }  
}


export default connect(null, { logIn })(Login)