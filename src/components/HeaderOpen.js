import React from 'react';
import './HeaderOpen.css';
import { connect } from 'react-redux';

class Header extends React.Component  {

    render() {
        return (
        <div>
            <div class="sample-header">
            <div class="sample-header-section">
                <h1 style={{fontSize: '50px'}}>{this.props.headerOpenContent}</h1>
            </div>
            </div>
        </div>
        )
    } 
}

const mapStateToProps = state => {
    return {
        headerOpenContent: state.projects.headerOpenContent
    }
}


export default connect(mapStateToProps)(Header);