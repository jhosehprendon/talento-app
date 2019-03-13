import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signUp, changeAuthNull, changeAuthBack } from '../store/actions';
import AuthForm from './AuthForm';

class Signup extends React.Component {

    state = {
        trySingup: false
    }

    componentDidMount() {
        this.props.changeAuthNull()
    }

    componentWillUnmount() {
        this.props.changeAuthBack()
    }


    onSubmit = (formValues) => {
        this.setState({ trySingup: true })

        this.props.signUp(formValues).then(() => {
            this.setState({trySingup: false})
        })
    
        
    }

    renderSpinner = () => {
        if(this.state.trySingup) {
            return (
                <div style ={{marginTop: '20px'}} class="ui active centered inline loader"></div>
            )
        } else {
            return null
        }
    }

    render() {
        return (    
            <div class="ui placeholder segment">
                <div class="ui two column very relaxed stackable grid">
                    <div class="column">
                        <AuthForm onSubmit={this.onSubmit} authMode='SignUp' />
                        {this.renderSpinner()}
                        <div style={{color: 'red', textAlign: 'center'}}>{this.props.authError}</div>
                    </div>
                    <div class="middle aligned column">
                        <Link to={localStorage.getItem('userId') ? `/app` : `/app/login`} className="header ui big button" style={{padding: '10px'}}>Log In</Link>
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