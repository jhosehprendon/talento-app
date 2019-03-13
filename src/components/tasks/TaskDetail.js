import React from 'react';
import { connect } from 'react-redux';
import { fetchCandidate } from '../../store/actions';
import NoteList from './NoteList';

class TaskDetail extends React.Component {
    componentDidMount() {
        this.props.fetchCandidate(this.props.match.params.candidateId)
    }

    render() {
        if(!this.props.candidate) {
            return <div style ={{marginTop: '10px'}} class="ui active centered inline loader"></div>
        }

        const { name, description, notes } = this.props.candidate.tasks[this.props.match.params.id]

        return (
            <div style={{marginTop: '50px'}}>
                <div className="ui card" style={{margin: 'auto', float: 'left', marginRight: '5%'}}>
                    <div className="content">
                        <h1 className="header">{name}</h1>
                        <div className="ui fitted divider"></div>
                        <h5>Description</h5>
                        <p>{description}</p>
                    </div>   
                </div>
                <div className="ui card" style={{margin: 'auto', marginTop: '50px', width: '60%'}}>
                    <h5 style={{margin:'10px'}}><i className="clipboard outline icon"></i> Notes on this Task</h5>
                    <div className="content">
                        <NoteList 
                            notes={notes}
                            candidateId={this.props.match.params.candidateId}
                            taskId={this.props.match.params.id}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        candidate: state.candidates[ownProps.match.params.candidateId]
    }
}

export default connect(mapStateToProps, { fetchCandidate })(TaskDetail)