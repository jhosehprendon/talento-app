import React from 'react';
import { connect } from 'react-redux';
import { fetchCandidate, editCandidate} from '../../store/actions';
import CandidateForm from './CandidateForm';

class CandidateEdit extends React.Component {
    
    componentDidMount() {
        this.props.fetchCandidate(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.fetchCandidate(this.props.match.params.id)
    }

    onSubmit = (formValues) => {
        
        this.props.editCandidate(this.props.match.params.id, formValues)
    }

    render () {
        if(!this.props.candidate) {
            return <div>loading...</div>
        }

        const { name, email } = this.props.candidate

        return (
            <div>
                <h3>Edit Candidate</h3>
                <div className="ui fitted divider"></div>
                <CandidateForm 
                    initialValues={{
                        name: name, 
                        email: email,
                        candidateCV:this.props.candidate.candidateCV
                    }}
                    onSubmit={this.onSubmit}
                    buttonText='Edit Candidate'
                    candidateCV={this.props.candidate.candidateCV}
                    fileMessage='Choose a new file if you want to edit, otherwise leave it'
                />
            </div>
        )
    } 
}

const mapStateToProps = (state, ownProps) => {
    return {
        candidate: state.candidates[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchCandidate, editCandidate})(CandidateEdit);