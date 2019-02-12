import React from 'react';
import { connect } from 'react-redux';
// import { createCandidate } from '../../store/actions';
import CandidateForm from './CandidateForm';

class CandidateCreate extends React.Component {
    render() {
        return (
            <div>
                <h3>Add a Candidate</h3>
                <CandidateForm 
                    onSubmit={this.onSubmit} 
                    buttonText='Add Candidate' 
                />
            </div>
        )
    }
}

export default connect(null)(CandidateCreate)