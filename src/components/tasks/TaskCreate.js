import React from 'react';
import { connect } from 'react-redux';
import { editCandidateTask } from '../../store/actions';
import TaskForm from './TaskForm';

class TaskCreate extends React.Component {

    state = {
        tryCreate: false
    }

    onSubmit = (formValues) => {
        this.setState({ tryCreate: true })
        this.props.editCandidateTask(this.props.match.params.id, formValues).then(() => {
            this.setState({tryCreate: false})
        })
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
        return (
            <div>
                <h3>Add a Task</h3>
                <div className="ui fitted divider"></div>
                <TaskForm 
                    onSubmit={this.onSubmit} 
                />
                {this.renderSpinner()}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        candidate: state.candidates[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {editCandidateTask})(TaskCreate)