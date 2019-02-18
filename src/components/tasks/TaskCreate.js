import React from 'react';
import { connect } from 'react-redux';
import { editCandidate } from '../../store/actions';
import TaskForm from './TaskForm';

class TaskCreate extends React.Component {


    onSubmit = (formValues) => {
        this.props.editCandidate(this.props.match.params.id, formValues)
    }

    render() {
        return (
            <div>
                <h3>Add a Task</h3>
                <div className="ui fitted divider"></div>
                <TaskForm 
                    onSubmit={this.onSubmit} 
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

export default connect(mapStateToProps, {editCandidate})(TaskCreate)