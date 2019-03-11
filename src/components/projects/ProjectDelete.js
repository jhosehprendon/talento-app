import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Modal from '../Modal';
import history from '../../history';
import { fetchProject, deleteProject } from '../../store/actions';

class ProjectDelete extends React.Component {

    componentDidMount() {
        this.props.fetchProject(this.props.match.params.id)
    }

    renderActions() {
       return (
            <React.Fragment>
                <button onClick={() => this.props.deleteProject(this.props.match.params.id)} className="ui button" style={{color: '#e74c3c'}}>Delete</button>
                <Link className="ui button" to={'/app'}>Cancel</Link>
            </React.Fragment> 
       )       
    }

    renderContent() {
        if(!this.props.project) {
            return 'Are you sure you want to delete this project?'
        }

        return `Are you sure you want to delete this project: ${this.props.project.name}`
    }

    render() {
        return (
            <Modal 
                title= 'Delete project'
                content= {this.renderContent()}
                actions= {this.renderActions()}
                onDismiss= {() => history.push('/')}
            />
        )
    }  
}

const mapStateToProps = (state, ownProps) => {
    return {
        project: state.projects[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchProject, deleteProject})(ProjectDelete);