import React from 'react';
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/index';
import ProjectForm from './ProjectForm';

class ProjectCreate extends React.Component {

    onSubmit = (formValues) => {
        this.props.createProject(formValues)
    }

    render() {
        return (
            <div>
                <h3>Create a Job</h3>
                <div className="ui fitted divider"></div>
                <ProjectForm 
                    onSubmit={this.onSubmit} 
                    buttonText='Create a Job' 
                />
            </div>    
        )
    }
}

export default connect(null, {createProject})(ProjectCreate)