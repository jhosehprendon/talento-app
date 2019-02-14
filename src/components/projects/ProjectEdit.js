import React from 'react';
import { connect } from 'react-redux';
import { fetchProject, editProject} from '../../store/actions';
import ProjectForm from './ProjectForm';

class ProjectEdit extends React.Component {
    
    componentDidMount() {
        this.props.fetchProject(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.fetchProject(this.props.match.params.id)
    }

    onSubmit = (formValues) => {
        
        this.props.editProject(this.props.match.params.id, formValues)
    }

    render () {
        if(!this.props.project) {
            return <div>loading...</div>
        }

        const { name, description, location, seniority, company } = this.props.project

        return (
            <div>
                <h3>Edit Project</h3>
                <ProjectForm 
                    initialValues={{
                        name: name, 
                        description: description,
                        location: location,
                        seniority: seniority,
                        company: company
                    }}
                    onSubmit={this.onSubmit}
                    buttonText='Edit Project'
                />
            </div>
        )
    } 
}

const mapStateToProps = (state, ownProps) => {
    return {
        project: state.projects[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchProject, editProject})(ProjectEdit);