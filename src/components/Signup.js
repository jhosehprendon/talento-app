import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signUp, changeAuthNull, changeAuthBack } from '../store/actions';
import AuthForm from './AuthForm';

class Signup extends React.Component {

    componentDidMount() {
        this.props.changeAuthNull()
    }

    componentWillUnmount() {
        this.props.changeAuthBack()
    }


    onSubmit = (formValues) => {
        this.props.signUp(formValues)
    }

    render() {
        return (    
            <div class="ui placeholder segment">
                <div class="ui two column very relaxed stackable grid">
                    <div class="column">
                        <AuthForm onSubmit={this.onSubmit} authMode='SignUp' />
                    </div>
                    <div class="middle aligned column">
                        <Link to={'/login'} className="header ui big button" style={{padding: '10px'}}>Log In</Link>
                    </div>
                </div>
                <div class="ui vertical divider">
                    Or
                </div>
            </div>
        )
    }  
}

const mapStateToProps = state => {
    return {
        authError: state.auth.error,
        isSignedIn: state.auth.isSignedIn
    } 
}


export default connect(mapStateToProps, { signUp, changeAuthNull, changeAuthBack })(Signup)