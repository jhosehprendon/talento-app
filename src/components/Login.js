import React from 'react';
import { connect } from 'react-redux';
import { logIn, changeAuthNull, changeAuthBack } from '../store/actions';
import AuthForm from './AuthForm';

class Login extends React.Component {

    state = {
        tryLogin: false
    }


    componentDidMount() {
        this.props.changeAuthNull()
    }

    componentWillUnmount() {
        this.props.changeAuthBack()
    }

    onSubmit = (formValues) => {
        this.setState({ tryLogin: true })

        this.props.logIn(formValues).then(() => {
            this.setState({tryLogin: false})
        })
    }

    renderSpinner = () => {
        if(this.state.tryLogin) {
            return (
                <div style ={{marginTop: '20px'}} class="ui active centered inline loader"></div>
            )
        } else {
            return null
        }
    }

    render() {
        return (
            <div>
                <h3 style={{textAlign: 'center'}}>Log In</h3>
                <AuthForm onSubmit={this.onSubmit} authMode='LogIn' />
                {this.renderSpinner()}
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