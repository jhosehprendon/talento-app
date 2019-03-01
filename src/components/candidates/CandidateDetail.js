import React from 'react';
import { connect } from 'react-redux';
import { fetchCandidate, downloadCV } from '../../store/actions';
import { Link } from 'react-router-dom';
import TaskList from '../tasks/TaskList';

class CandidateDetail extends React.Component {

    componentDidMount() {
        const { id } = this.props.match.params

        this.props.fetchCandidate(id);
    }

    render() {
        if(!this.props.candidate) {
            return <div>loading...</div>
        }

        const { name, email, tasks, candidateCV } = this.props.candidate

        return (
            <div style={{marginTop: '50px'}}>
                <div className="ui card" style={{margin: 'auto', float: 'left', marginRight: '5%'}}>
                    <div className="content">
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <h3 className="header">{name}</h3>
                            <Link className="ui basic primary " to={`/candidates/edit/${this.props.match.params.id}`}><i className="edit outline icon"></i></Link>
                        </div>
                        <div className="ui fitted divider"></div>
                        <h5>Email</h5>
                        <p>{email}</p>
                        <h5>CV File</h5>
                        <a onClick={() => this.props.downloadCV(candidateCV)}>Download</a>
                        {/* <a href={`http://localhost:3002/${candidateCV}`}>Download</a> */}
                    </div>   
                </div>
                <div className="ui card" style={{margin: 'auto', marginTop: '50px', width: '60%'}}>
                    <h5 style={{margin:'10px'}}><i className="tasks icon"></i> Tasks assigned to this candidate </h5>
                    <div className="content">
                        <TaskList 
                            tasks={tasks}
                            candidateId={this.props.match.params.id}
                        />
                    </div>
                </div>
            </div>
        )
    
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        candidate: state.candidates[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchCandidate, downloadCV})(CandidateDetail)