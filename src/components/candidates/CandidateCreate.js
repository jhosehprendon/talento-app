import React from 'react';
import { connect } from 'react-redux';
import { createCandidate } from '../../store/actions';
import CandidateForm from './CandidateForm';

class CandidateCreate extends React.Component {

    state = {
        tryCreate: false
    }

    onSubmit = (formValues) => {
        this.setState({ tryCreate: true })

        this.props.createCandidate(formValues, this.props.match.params.id).then(() => {
            this.setState({tryCreate: false})
        })
    }

    renderSpinner = () => {
        if(this.state.tryCreate) {
            return (
                <div style ={{marginTop: '10px'}} class="ui active centered inline loader"></div>
            )
        } else {
            return null
        }
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
                {this.renderSpinner()}
            </div>
        )
    }
}

export default connect(null, {createCandidate})(CandidateCreate)