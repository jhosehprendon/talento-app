import React from 'react';
import { connect } from 'react-redux';
import { createCandidate } from '../../store/actions';
import CandidateFormOpen from './CandidateFormOpen';

class CandidateCreateOpen extends React.Component {

    onSubmit = (formValues) => {
        this.props.createCandidate(formValues, this.props.match.params.id)
    }

    render() {
        return (
            <div>
                <div className="ui fitted divider"></div>
                <CandidateFormOpen
                    onSubmit={this.onSubmit} 
                    buttonText='Apply' 
                    projectId={this.props.match.params.id}
                />
            </div>
        )
    }
}

export default connect(null, {createCandidate})(CandidateCreateOpen)