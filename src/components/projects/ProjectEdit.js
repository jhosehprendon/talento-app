import React from 'react';
import { connect } from 'react-redux';
import { fetchProject, editProject} from '../../store/actions';
import ProjectForm from './ProjectForm';

class ProjectEdit extends React.Component {

    state = {
        tryEdit: false
    }
    
    componentDidMount() {
        this.props.fetchProject(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.fetchProject(this.props.match.params.id)
    }

    onSubmit = (formValues) => {
        this.setState({ tryEdit: true })
        this.props.editProject(this.props.match.params.id, formValues).then(() => {
            this.setState({tryEdit: false})
        })
    }

    renderSpinner = () => {
        if(this.state.tryEdit) {
            return (
                <div style ={{marginTop: '-40px'}} class="ui active centered inline loader"></div>
            )
        } else {
            return null
        }
    }

    render () {
        if(!this.props.project) {
            return <div style ={{marginTop: '10px'}} class="ui active centered inline loader"></div>
        }

        const { name, description, location, seniority, company } = this.props.project

        return (
            <div>
                <h3>Edit Project</h3>
                <div className="ui fitted divider"></div>
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
                {this.renderSpinner()}
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