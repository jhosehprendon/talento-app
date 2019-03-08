import React from 'react';
import { connect } from 'react-redux';
import { createCandidateOpen, fetchProject, changeHeaderOpen } from '../../store/actions';
import CandidateFormOpen from './CandidateFormOpen';

class CandidateCreateOpen extends React.Component {

    state= {
        applied: false
    }

    componentDidMount() {
        const { projectId } = this.props.match.params
        window.scrollTo(0,0)
        this.props.fetchProject(projectId).then(() => this.props.changeHeaderOpen(`${this.props.project.name} - ${this.props.project.location}`))
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
                    <p style={{fontSize:'15px', textAlign: 'center'}}>You have applied succesfully to the {this.props.project.name} position</p>
                </div>
            )
        } else {
            return (
            <div>
                <h1 style={{ marginTop: '80px', marginLeft: '15%'}}>Job Description</h1>
                <div className="ui divider" style={{marginLeft: '15%', marginRight: '15%'}}></div>
                <div style={{margin: '35px 15% 45px 15%'}}>
                    <div>
                        <h3><i class="address card outline icon"></i> {this.props.project.name}</h3>
                        <h3 style={{marginTop:'-10px'}}><i className="map marker alternate icon"></i> {this.props.project.location}</h3>
                        <div style={{marginTop: '40px'}}>
                            <p style={{fontSize:'15px', lineHeight: '1.5'}}>{this.props.project.description.split('\n\n').map((el, i) => <div style={{marginBottom: '20px'}} key={i}>{el}</div>)}</p>
                        </div>
                    </div>
                </div>
                <div className="ui divider" style={{marginLeft: '15%', marginRight: '15%'}}></div>
                <h1 style={{ marginTop: '50px', textAlign: 'center'}}>Apply</h1>
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

export default connect(mapStateToProps, {createCandidateOpen, fetchProject, changeHeaderOpen})(CandidateCreateOpen)