import React from 'react';
import { connect } from 'react-redux';
import { createCandidateOpen, fetchProject } from '../../store/actions';
import CandidateFormOpen from './CandidateFormOpen';

class CandidateCreateOpen extends React.Component {

    state= {
        applied: false
    }

    componentDidMount() {
        const { projectId } = this.props.match.params
        this.props.fetchProject(projectId)
    }

    onSubmit = (formValues) => {
        this.props.createCandidateOpen(formValues, this.props.match.params.userId).then(() => {
            this.setState({ applied: true })
        })
    }

    renderContent = () => {
        if(this.state.applied) {
            return (
                <div>
                    <h1 style={{textAlign: 'center', marginTop: '50px'}}>Thanks!</h1>
                    <p style={{fontSize:'15px', textAlign: 'center'}}>You have applied succesfully to {this.props.project.name} position</p>
                </div>
            )
        } else {
            return (
            <div>
                <h1 style={{textAlign: 'center', marginTop: '50px'}}>Job Description</h1>
                <div style={{float: 'left', position: 'relative', left: '50%', marginTop: '35px'}}>
                    <div style={{float: 'left', position: 'relative', left: '-50%'}}>
                        <h3>{this.props.project.name} - {this.props.project.location}</h3>
                        <p style={{fontSize:'15px'}}>{this.props.project.description}</p>
                    </div>
                </div>
                <CandidateFormOpen
                    onSubmit={this.onSubmit} 
                    buttonText='Apply' 
                    projectId={this.props.match.params.projectId}
                    userId={this.props.match.params.userId}
                />
            </div>
            )
        }
    }

    render() {
        if(!this.props.project) {
            return <div>loading...</div>
        }

        return (
            this.renderContent()
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        project: state.projects[ownProps.match.params.projectId]
    }
}

export default connect(mapStateToProps, {createCandidateOpen, fetchProject})(CandidateCreateOpen)