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

    renderBreak = (i) => {
        const tasksLen = this.props.tasks.length;
        if (tasksLen === i + 1) {
            return null
          } else {
            return <div className="ui divider"></div>
          }

    }

    renderTaskList = () => {

        if(this.props.tasks.length < 1 ) {
            return <div>No Tasks yet</div>
        }

        return this.props.tasks.map((task, i) => {
            return (
                <div key={task.name} style={{margin: '10px'}}>
                       <input type="checkbox" value={task.completed.completed} checked={task.completed.completed} onChange={() => this.onChangeTaskStatus(!task.completed.completed, i)} /> <Link 
                        to={`/tasks/${i}/${this.props.candidateId}`} 
                        className="header"
                    >
                        {task.name}
                    </Link> 
                    <div style={{float: 'right' }}>{task.completed.completed ? <p style={{color: '#27ae60'}}>Completed</p> : <p style={{color: '#e74c3c'}}>Not completed</p>}</div>
                    {this.renderBreak(i)}
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