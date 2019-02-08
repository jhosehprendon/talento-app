import React from 'react';
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/index';
import ProductForm from './ProductForm';

class ProjectCreate extends React.Component {

    onSubmit = (formValues) => {
        this.props.createProject(formValues)
    }

    render() {
        return (
            <div>
                <h3>Create a Project</h3>
                <ProductForm 
                    onSubmit={this.onSubmit} 
                    buttonText='Create Project' 
                    imageMessage='You must select a project image'
                />
            </div>    
        )
    }
}

export default connect(null, {createProject})(ProjectCreate)