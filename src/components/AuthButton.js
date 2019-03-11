import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../store/actions';
import history from '../history';

class AuthButton extends React.Component {

    onSignOutClick = () => {
        this.props.signOut()
        history.push('/app/login')
    }

    renderAuthButton() {
         if (this.props.isSignedIn) {
            return (
                <div>
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
                    <button onClick={() => history.push('/app/signup')} className="ui blue button" style={styles.buttonStyle}>
                        Sign Up
                    </button>
                    <Link to="/app/login" style={{display: 'inline', margin: '14px 10px 0 0', float: 'right', color: 'white'}}>
                        Log In
                    </Link>
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
        marginBottom: '6px',
        float: 'right'
    }
}

const mapStateToProps = state => {
    return {
        isSignedIn: state.auth.isSignedIn
    }
}


export default connect(mapStateToProps, { signOut })(AuthButton)