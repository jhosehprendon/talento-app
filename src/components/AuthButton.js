import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../store/actions';
import history from '../history';

class AuthButton extends React.Component {

    onSignOutClick = () => {
        this.props.signOut()
        history.push('/login')
    }

    renderAuthButton() {
         if (this.props.isSignedIn) {
            return (
                <div style={{float: 'right'}}>
                    {/* <Link to="/orders" style={{display: 'inline', marginRight: '10px'}}>
                        My Orders
                    </Link> */}
                    <button onClick={this.onSignOutClick} className="ui blue button" style={styles.buttonStyle}>
                        Sign Out
                    </button>
                </div>
            )
        } else if (this.props.isSignedIn === null) {
            return null
        } else if (!this.props.isSignedIn) {
            return (
                <div style={{display: 'inline'}}>
                    <Link to="/login" style={{display: 'inline', marginRight: '10px'}}>
                        Log In
                    </Link>
                    <button onClick={() => history.push('/signup')} className="ui blue button" style={styles.buttonStyle}>
                        Sign Up
                    </button>
                </div>
               
            )
        }
    }

    render() {
        return (
            <div style={{marginRight: '10px'}}>
                {this.renderAuthButton()}
            </div>
        )
    }
}

const styles = {
    buttonStyle: {
        marginTop: '7px', 
        marginBottom: '6px'
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
}


export default connect(mapStateToProps, { signOut })(AuthButton)