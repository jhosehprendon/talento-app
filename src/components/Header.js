import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthButton from './AuthButton';
import {getUser} from '../store/actions'

class Header extends React.Component  {

    state = {
        userName: ''
    }

    componentDidMount() {
        this.setState({userName: localStorage.getItem('userName')})
        const userId = localStorage.getItem('userId')
        this.props.getUser(userId)
    }

    render() {
        return (
            <div className="ui sencondary pointing menu">
                <Link to="/" className="item">
                    Talento
                </Link>
                
                <div className="right menu">
                    <div style={{marginTop: '14px', marginRight: '10px', color: '#585858'}}>{localStorage.getItem('userId') !== null ? this.state.userName  : null}</div>
                    <AuthButton />
                </div>
            </div>
        )
    } 
}


export default connect(null, {getUser})(Header);