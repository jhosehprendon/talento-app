import React from 'react';
import { Link } from 'react-router-dom';
import AuthButton from './AuthButton';

class Header extends React.Component  {

    render() {
        return (
            <div className="ui sencondary pointing menu">
                <Link to="/" className="item">
                    Dashtal
                </Link>
                
                <div className="right menu">
                    <div style={{marginTop: '14px', marginRight: '10px', color: '#585858'}}>{localStorage.getItem('userName') !== null ? localStorage.getItem('userName').split(' ')[0]  : null}</div>
                    <AuthButton />
                </div>
            </div>
        )
    } 
}


export default Header;