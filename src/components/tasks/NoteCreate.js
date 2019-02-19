import React from 'react';
import { connect } from 'react-redux';
import { editCandidateNote } from '../../store/actions';
import NoteForm from './NoteForm';

class NoteCreate extends React.Component {


    onSubmit = (formValues) => {
        this.props.editCandidateNote(this.props.match.params.candidateId, this.props.match.params.taskId, formValues)
    }

    render() {
        return (
            <div>
                <h3>Add a Note</h3>
                <div className="ui fitted divider"></div>
                <NoteForm 
                    onSubmit={this.onSubmit} 
                />
            </div>
        )
    }
}

export default connect(null, {editCandidateNote})(NoteCreate)