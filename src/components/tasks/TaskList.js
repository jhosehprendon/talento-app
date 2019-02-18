import React from 'react';
import { Link } from 'react-router-dom';

class TaskList extends React.Component {

    renderTaskList = () => {

        if(this.props.tasks.length < 1 ) {
            return <div>No Tasks yet</div>
        }

        return this.props.tasks.map((task, i) => {
            return (
                <div key={task.name} style={{margin: '10px'}}>
                    <Link 
                        to={`/tasks/${i}/${this.props.candidateId}`} 
                        className="header"
                    >
                        {task.name}
                    </Link> 
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


export default TaskList