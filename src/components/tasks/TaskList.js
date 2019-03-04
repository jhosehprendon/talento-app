import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {editCandidateTaskStatus, fetchCandidate} from '../../store/actions'

class TaskList extends React.Component {

    onChangeTaskStatus = (status, i) => {
        status = { completed: status }
        this.props.editCandidateTaskStatus(this.props.candidateId, i, status).then(() => {
            this.props.fetchCandidate(this.props.candidateId);
        })
    }

    renderTaskList = () => {

        if(this.props.tasks.length < 1 ) {
            return <div>No Tasks yet</div>
        }

        return this.props.tasks.map((task, i) => {
            return (
                <div key={task.name} style={{margin: '10px'}}>
                       <input type="checkbox" checked={task.completed.completed} onChange={() => this.onChangeTaskStatus(!task.completed.completed, i)} /> <Link 
                        to={`/tasks/${i}/${this.props.candidateId}`} 
                        className="header"
                    >
                        {task.name}
                    </Link> 
                    {task.completed.completed ? <p>Completed</p> : <p>Not completed</p>}
                    <div className="ui fitted divider"></div>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <div style={{textAlign:'right', marginBottom: '30px'}}>
                    <Link to={`/tasks/new/${this.props.candidateId}`} className="ui button primary">Add Task <i style={{marginLeft: '5px'}} className="plus circle icon"></i></Link>
                </div>
                    {this.renderTaskList()} 
            </div>
        )
    }
}


export default connect(null, {editCandidateTaskStatus, fetchCandidate})(TaskList)