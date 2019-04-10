import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPortafolio } from '../../store/actions/index';

class PortafolioList extends React.Component {

    componentDidMount() {
        const userId = localStorage.getItem('userId')
        this.props.fetchPortafolio(userId)
    }

    // state = {
    //     showPublicLink: false
    // }

    // renderAdmin = (project) => {
    //     // const currentUserId = localStorage.getItem('userId')
    //     // if(project.userIds[0]._id === currentUserId && !!currentUserId) {
    //         return (
    //             <div className="right floated content">
    //                 <Link  to={`/app/projects/edit/${project._id}`}><i style={{margin: "auto"}} className="edit outline icon"></i></Link>
    //                 <Link to ={`/app/projects/delete/${project._id}`} style={{color: '#bdc3c7'}}>
    //                     <i style={{margin: "auto", marginLeft: '10px'}} className="trash alternate outline icon"></i>
    //                 </Link>
    //             </div>
    //         )
    //     // }
    // }

    // renderLinkButton = () => {
    //     if(!this.state.showPublicLink) {
    //         return (
    //             <button className="ui button primary" onClick={() => this.setState({ showPublicLink: true })}>Get Your Job List Link</button>
    //         )
    //     } else {
    //         return(
    //             <div>
    //                 <button className="ui button primary" onClick={() => this.setState({ showPublicLink: false })}>Hide Link</button>
    //                 <Link target="_blank" to={`/jobs/${localStorage.getItem('userId')}`}>Click here</Link>
    //             </div>
    //         )
    //     }
    // }

    renderList = () => {
        if(this.props.portafolio.length < 1) {
            return <div>No projects added to your portafolio</div>
        }

        return this.props.portafolio.map(project => {

            return (            
                <div className="ui celled list" key={project._id}>
                    <div className="ui items">
                        <div className="item" >
                            <div className="content" style={{fontSize: '12px'}}>
                                <Link to={`/user/portafolio/${project._id}`} className="header">
                                    {project.name}
                                </Link>       
                                    {/* {this.renderAdmin(project)} */}
                            </div>
                        </div>
                        <div className="ui divider"></div>
                    </div>            
                </div>
            )
        })
    }

    renderCreate = () => {
        if(this.props.isSignedIn) {
            return (
                <div style={{textAlign:'right'}}>
                    <Link to={`/user/portafolio/new`} className="ui button primary"><i className="plus circle icon"></i>Add project to portafolio</Link>
                </div>
            )
        }
    }

    render() {

        if(!this.props.isSignedIn) {
            return <div></div>
        }

        return(
            <div>
                {/* <div style={{marginBottom: '20px'}}>
                    <Link to={`/app/candidates`}>My Candidates</Link>
                </div>
                {this.renderLinkButton()} */}
                {this.renderCreate()}
                <div className="ui celled list">
                    <div className="ui card" style={{margin: 'auto', float: 'left', marginRight: '5%', width: '100%', backgroundColor: '#fcfcfd', marginBottom: '30px'}}>
                        <div className="content">
                            {this.renderList()}
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        portafolio: state.portafolio.portafolio,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, {fetchPortafolio})(PortafolioList)