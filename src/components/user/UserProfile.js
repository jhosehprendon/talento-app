import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { getUser } from '../../store/actions';
import PortafolioList from '../portafolio/PortafolioList';

class UserProfile extends Component {
    componentDidMount() {
        const userId = localStorage.getItem('userId')
        this.props.getUser(userId).then(() => {
            console.log(this.props.user[0])
        }) 
    }

    renderUserInfo = () => {
        if(!this.props.user[0]) {
            return <div style ={{marginTop: '10px'}} className="ui active centered inline loader"></div>
        }

        return (
            <div>
                <div className="ui card" style={{margin: 'auto', float: 'left', marginBottom: '50px'}}>
                    <div className="content">
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                         <h1 className="header">{this.props.user[0].name}</h1>
                         <Link className="ui basic primary " to={`/user/edit/${localStorage.getItem('userId')}`}><i className="edit outline icon"></i></Link>
                        </div>
                        <h5>{this.props.user[0].email}</h5>
                    </div>   
                </div>
            
                <div className="ui card" style={{margin: 'auto', marginTop: '50px', width: '60%'}}>
                    <h5 style={{margin:'10px'}}><i className="users icon"></i> Portafolio</h5>
                    <div className="content" style={{backgroundColor: '#fcfcfd'}}>
                        <PortafolioList/>
                    </div>
                </div>
            </div>
        )
    }

    render () {
        return this.renderUserInfo()
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}

export default connect(mapStateToProps, { getUser })(UserProfile)