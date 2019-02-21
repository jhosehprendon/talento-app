import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../../store/actions/index';

class ProjectList extends React.Component {

    componentDidMount() {
        const userId = localStorage.getItem('userId')
        this.props.fetchProjects(userId)
    }

    renderAdmin = (project) => {
        const currentUserId = localStorage.getItem('userId')
        if(project.userIds[0].userId === currentUserId && !!currentUserId) {
            return (
                <div className="right floated content">
                    <Link className="ui button basic primary " to={`/projects/edit/${project._id}`}><i style={{margin: "auto"}} className="edit outline icon"></i></Link>
                    <Link to ={`/projects/delete/${project._id}`} className="ui button basic negative ">
                        <i style={{margin: "auto"}} className="trash alternate outline icon"></i>
                    </Link>
                </div>
            )
        }
    }

    renderList = () => {
        if(this.props.projects.length < 1) {
            return <div>No Projects created</div>
        }

        return this.props.projects.map(project => {
            return (
                <div className="ui celled list" key={project._id}>
                    <div className="ui items">
                        <div className="item" >
                            <div className="content" style={{fontSize: '12px'}}>
                                <Link to={`/projects/${project._id}`} className="header">
                                    {project.name} <p style={{fontSize: '12px'}}>for {project.company}</p>
                                </Link>                

                                {this.renderAdmin(project)}
                            </div>
                        </div>
                    </div>
                </div>

            )
        })
    }

    renderCreate = () => {
        if(this.props.isSignedIn) {
            return (
                <div style={{textAlign:'right'}}>
                    <Link to={`/projects/new/${localStorage.getItem('userId')}`} className="ui button primary">Create Project</Link>
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
                <h2>Projects</h2>
                <h4 className="ui horizontal divider header" style={{marginTop:'-15px', marginBottom: '40px'}}>
                    <i className="clipboard outline icon"></i>
                </h4>
                    {this.renderCreate()}
                <div className="ui celled list">
                    {this.renderList()}
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