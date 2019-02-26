import React from 'react';
import { Link } from 'react-router-dom';

class NoteList extends React.Component {

    // renderNote = () => {
    //     <p>{note}</p>
    // }

    renderNoteList = () => {

        if(this.props.notes.length < 1 ) {
            return <div>No Notes created yet</div>
        }

        return this.props.notes.map((note, i) => {
            return (
                <div key={i} style={{margin: '10px'}}>
                    {/* <Link 
                        to={`/tasks/${i}/${this.props.candidateId}`} 
                        className="header"
                    >
                        {task.name}
                    </Link>  */}
                    <p><span style={{fontWeight: 'bold'}}>{note.note.split(' ')[0]}</span> {note.note.split(' ').slice(1).join(' ')}</p>
                    <div className="ui fitted divider"></div>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <div style={{textAlign:'right', marginBottom: '30px'}}>
                    <Link to={`/notes/new/${this.props.taskId}/${this.props.candidateId}`} className="ui button primary">Add a Note <i style={{marginLeft: '5px'}} className="plus circle icon"></i></Link>
                </div>
                    {this.renderNoteList()} 
            </div>
        )
    }
}


export default NoteList