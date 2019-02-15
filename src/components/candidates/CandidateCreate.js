import React from 'react';
import { connect } from 'react-redux';
import { createCandidate } from '../../store/actions';
import CandidateForm from './CandidateForm';

class CandidateCreate extends React.Component {

    onSubmit = (formValues) => {
        this.props.createCandidate(formValues)
    }

    render() {
        return (
            <div>
                <h3>Add a Candidate</h3>
                <div className="ui fitted divider"></div>
                <CandidateForm 
                    onSubmit={this.onSubmit} 
                    buttonText='Add Candidate' 
                    projectId={this.props.match.params.id}
                />
            </div>
        )
    }
}

export default connect(null, {createCandidate})(CandidateCreate)