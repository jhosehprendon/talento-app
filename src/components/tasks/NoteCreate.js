import React from 'react';
import { connect } from 'react-redux';
import { editCandidateNote } from '../../store/actions';
import NoteForm from './NoteForm';

class NoteCreate extends React.Component {

    state = {
        tryCreate: false
    }

    onSubmit = (formValues) => {
        this.setState({ tryCreate: true })
        this.props.editCandidateNote(this.props.match.params.candidateId, this.props.match.params.taskId, formValues).then(() => {
            this.setState({tryCreate: false})
        })
    }

    getCandidateName = () => {
        if(!localStorage.getItem('userName')) {
            return ''
        } else {
            return localStorage.getItem('userName')
        }
    }

    renderSpinner = () => {
        if(this.state.tryCreate) {
            return (
                <div style ={{marginTop: '-30px'}} class="ui active centered inline loader"></div>
            )
        } else {
            return null
        }
    }

    render() {
        var candidateName= this.getCandidateName()
        console.log(candidateName)
        return (
            <div>
                <h3>Add a Note</h3>
                <div className="ui fitted divider"></div>
                <NoteForm 
                    onSubmit={this.onSubmit}
                    candidateName={candidateName} 
                />
                {this.renderSpinner()}
            </div>
        )
    }
}


export default connect(null, {editCandidateNote})(NoteCreate)