import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProjects } from '../../store/actions/index';

class ProjectList extends React.Component {

    componentDidMount() {
        this.props.fetchProjects()
    }

    renderAdmin = (project) => {
        const currentUserId = localStorage.getItem('userId')
        if(project.userId === currentUserId && !!currentUserId) {
            return (
                <div className="right floated content">
                    <Link className="ui button basic primary " to={`/projects/edit/${project._id}`}>Edit</Link>
                    <Link to ={`/projects/delete/${project._id}`} className="ui button basic negative ">
                        Delete
                    </Link>
                </div>
            )
        }
    }

    renderList = () => {
        this.props.projects.map(project => {
            return (
                <div className="ui celled list">
                    <div className="ui items">
                        <div className="item" key={project._id}>
                            <div className="content">
                                <Link className="header" to={`/projects/${project._id}`} className="header">
                                    {project.name}
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
                    <Link to="/projects/new" className="ui button primary">Create Project</Link>
                </div>
            )
        }
    }

    render() {

        if(!this.props.projects) {
            return <div>loading...</div>
        }

        return(
            <div>
                <h2>Projects</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
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