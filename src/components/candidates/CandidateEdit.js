import React from 'react';
import { connect } from 'react-redux';
import { fetchCandidate, editCandidate} from '../../store/actions';
import CandidateForm from './CandidateForm';

class CandidateEdit extends React.Component {

    state = {
        tryEdit: false
    }
    
    componentDidMount() {
        this.props.fetchCandidate(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.fetchCandidate(this.props.match.params.id)
    }

    onSubmit = (formValues) => {
        this.setState({ tryEdit: true })
        this.props.editCandidate(this.props.match.params.id, formValues).then(() => {
            this.setState({tryEdit: false})
        })
    }

    renderSpinner = () => {
        if(this.state.tryEdit) {
            return (
                <div style ={{marginTop: '10px'}} class="ui active centered inline loader"></div>
            )
        } else {
            return null
        }
    }

    render () {
        if(!this.props.candidate) {
            return <div style ={{marginTop: '-30px'}} class="ui active centered inline loader"></div>
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
                    errorEditCandidate = {this.props.errorEditCandidate}
                />
                {this.renderSpinner()}
            </div>
        )
    } 
}

const mapStateToProps = (state, ownProps) => {
    return {
        candidate: state.candidates[ownProps.match.params.id],
        errorEditCandidate: state.candidates.errorEditCandidate
    }
}

export default connect(mapStateToProps, {fetchCandidate, editCandidate})(CandidateEdit);