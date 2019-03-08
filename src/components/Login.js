import React from 'react';
import { connect } from 'react-redux';
import { logIn, changeAuthNull, changeAuthBack } from '../store/actions';
import AuthForm from './AuthForm';

class Login extends React.Component {

    componentDidMount() {
        this.props.changeAuthNull()
    }

    componentWillUnmount() {
        this.props.changeAuthBack()
    }

    onSubmit = (formValues) => {
        this.props.logIn(formValues)
    }

    render() {
        return (
            <div>
                <h3 style={{textAlign: 'center'}}>Log In</h3>
                <AuthForm onSubmit={this.onSubmit} authMode='LogIn' />
                <div style={{color: 'red', textAlign: 'center'}}>{this.props.authError}</div>
            </div>    
        )
    }  
}

const mapStateToProps = state => {
    return {
        authError: state.auth.loginError
    } 
}


export default connect(mapStateToProps, { logIn, changeAuthNull, changeAuthBack })(Login)