import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthButton from './AuthButton';
import {getUser} from '../store/actions'

class Header extends React.Component  {
    componentDidMount() {
        const userId = localStorage.getItem('userId')
        this.props.getUser(userId)
    }

    renderName = () => {
        if(!this.props.user.user) {
            return null
        } else {
            return this.props.user.user[0].name.split(' ')[0]
        }
    }

    render() {
        return (
            <div className="ui sencondary pointing menu">
                <Link to="/" className="item">
                    Talento
                </Link>
                
                <div className="right menu">
                    <div style={{marginTop: '14px', marginRight: '10px', color: '#585858'}}>{this.renderName()}</div>
                    <AuthButton />
                </div>
            </div>
        )
    } 
}

const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps, {getUser})(Header)