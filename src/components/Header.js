import React from 'react';
import { Link } from 'react-router-dom';
import AuthButton from './AuthButton';
import './Header.css'

class Header extends React.Component  {

    render() {
        return (
            <div>
                <ul>
                    <div className="ui container">
                        <Link to="/app" className="item"><li style={{float:'left', fontSize: '18px'}}><p style={{color: 'white'}}>Softhunt</p></li></Link>
                        <div>
                            <AuthButton />
                            <div style={{marginTop: '16px', marginRight: '10px', color: 'white', float: 'right'}}>{localStorage.getItem('userName') !== null ? localStorage.getItem('userName').split(' ')[0]  : null}</div>
                        </div>
                    </div>
                </ul>
            </div>
        )
    } 
}


export default Header;


