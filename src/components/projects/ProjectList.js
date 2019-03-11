import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../../store/actions/index';

class ProjectList extends React.Component {

    componentDidMount() {
        const userId = localStorage.getItem('userId')
        this.props.fetchProjects(userId)
    }

    state = {
        showPublicLink: false
    }

    renderAdmin = (project) => {
        const currentUserId = localStorage.getItem('userId')
        if(project.userIds[0]._id === currentUserId && !!currentUserId) {
            return (
                <div className="right floated content">
                    <Link  to={`/app/projects/edit/${project._id}`}><i style={{margin: "auto"}} className="edit outline icon"></i></Link>
                    <Link to ={`/app/projects/delete/${project._id}`} style={{color: '#bdc3c7'}}>
                        <i style={{margin: "auto", marginLeft: '10px'}} className="trash alternate outline icon"></i>
                    </Link>
                </div>
            )
        }
    }

    renderLinkButton = () => {
        if(!this.state.showPublicLink) {
            return (
                <button className="ui button primary" onClick={() => this.setState({ showPublicLink: true })}>Get Your Job List Link</button>
            )
        } else {
            return(
                <div>
                    <button className="ui button primary" onClick={() => this.setState({ showPublicLink: false })}>Hide Link</button>
                    <Link target="_blank" to={`/jobs/${localStorage.getItem('userId')}`}>Click here</Link>
                </div>
            )
        }
    }

    renderList = () => {
        if(this.props.projects.length < 1) {
            return <div>No Jobs created</div>
        }

        return this.props.projects.map(project => {
            let status = project.projectStatus.find(el => el.status === true).prop
            let color = project.projectStatus.find(el => el.prop === status).color
            return (            
                <div className="ui celled list" key={project._id}>
                    <div className="ui items">
                        <div className="item" >
                            <div className="content" style={{fontSize: '12px'}}>
                                <Link to={`/app/projects/${project._id}`} className="header">
                                    {project.name} <span style={{marginLeft: '15px', fontSize: '14px', color: color}}>{status}</span> <p style={{fontSize: '12px'}}>for {project.company}</p>
                                </Link>       
                                    {this.renderAdmin(project)}
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
                    <Link to={`/app/projects/new/${localStorage.getItem('userId')}`} className="ui button primary"><i className="plus circle icon"></i>Create a Job</Link>
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
                <h2>Jobs</h2>
                <h4 className="ui horizontal divider header" style={{marginTop:'-15px', marginBottom: '40px'}}>
                    <i className="clipboard outline icon"></i>
                </h4>
                    {this.renderLinkButton()}
                    {this.renderCreate()}
                <div className="ui celled list">
                    <div className="ui card" style={{margin: 'auto', float: 'left', marginRight: '5%', width: '100%', backgroundColor: '#fcfcfd', marginBottom: '30px'}}>
                        <div className="content">
                            {this.renderList()}
                        </div>
                        <div style={{textAlign:'center', marginBottom: '20px'}}>
                            <Link to={`/app/projects/new/${localStorage.getItem('userId')}`}><i className="plus circle icon"></i></Link>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        projects: state.projects.projects,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, {fetchProjects})(ProjectList)