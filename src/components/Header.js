import React from 'react';
import { Link } from 'react-router-dom';
import AuthButton from './AuthButton';

const Header = () => {
    return (
        <div className="ui sencondary pointing menu">
            <Link to="/" className="item">
                Talento
            </Link>
            <div className="right menu">
                <AuthButton />
            </div>
        </div>
    )
}

export default Header