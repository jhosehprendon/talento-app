import React from 'react';
import { connect } from 'react-redux';
import { fetchCandidate, downloadCV, editCandidateStatus } from '../../store/actions';
import { Link } from 'react-router-dom';
import TaskList from '../tasks/TaskList';

class CandidateDetail extends React.Component {


    componentDidMount() {
        const { id } = this.props.match.params

        this.props.fetchCandidate(id)
    }


    renderDropdownOptions = () => {
        return this.props.candidate.candidateStatus.map((el, i) => {
            return (    
                <option key={i} value= {el.prop}>{el.prop}</option>
            )
        })
    }

    handleDropdownChange = (event) => {
        this.props.editCandidateStatus(this.props.match.params.id, {value: event.target.value}).then(() => {
            this.props.fetchCandidate(this.props.match.params.id)
        })
      }

    render() {
        if(!this.props.candidate) {
            return <div>loading...</div>
        }

        const { name, email, tasks, candidateCV } = this.props.candidate

        let content = this.props.candidate.candidateStatus.find(el => el.status === true).prop
        let color = this.props.candidate.candidateStatus.find(el => el.prop === content).color

        return (
            <div style={{marginTop: '50px'}}>
                <div className="ui card" style={{margin: 'auto', float: 'left', marginRight: '5%'}}>
                    <div className="content">
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <h3 className="header">{name}</h3>
                            <Link className="ui basic primary " to={`/candidates/edit/${this.props.match.params.id}`}><i className="edit outline icon"></i></Link>
                        </div>
                        <div className="ui fitted divider"></div>
                        <p style={{float: 'right', margin: '10px 0', color: color, fontWeight: 'bold'}}>{content}</p>
                        <h5>Status</h5>
                        <select onChange={this.handleDropdownChange} value={content} className="ui selection dropdown">
                            {this.renderDropdownOptions()}
                        </select>
                        <h5>Email</h5>
                        <p>{email}</p>
                        <h5>CV File</h5>
                        {candidateCV ? <a href='#' onClick={() => this.props.downloadCV(candidateCV)}>Download</a> : <p>No CV uploaded yet</p>}
                    </div>   
                </div>
                <div className="ui card" style={{margin: 'auto', marginTop: '50px', width: '60%'}}>
                    <h5 style={{margin:'10px'}}><i className="tasks icon"></i> Tasks assigned to this candidate </h5>
                    <div className="content" style={{backgroundColor: '#fcfcfd'}}>
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

export default connect(mapStateToProps, {fetchCandidate, downloadCV, editCandidateStatus})(CandidateDetail)