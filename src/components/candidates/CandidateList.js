import React from 'react';
import { connect } from 'react-redux';
import {fetchCandidates} from '../../store/actions';
import { Link } from 'react-router-dom';

class CandidateList extends React.Component {
    componentDidMount() {
        this.props.fetchCandidates(this.props.projectId)
    }

    renderBreak = (i) => {
        const candidateLen = this.props.candidates.length;
        if (candidateLen === i + 1) {
            return null
          } else {
            return <div className="ui divider"></div>
          }

    }

    renderCandidateList = () => {
        if(this.props.candidates.length < 1) {
            return <div>No Candidates yet</div>
        }

        return this.props.candidates.map((candidate, i) => {
            let content = candidate.candidateStatus.find(el => el.status === true).prop
            let color = candidate.candidateStatus.find(el => el.prop === content).color
            return (
                <div key={candidate._id} style={{margin: '10px'}}>
                    <Link to={`/app/candidates/${candidate._id}`} className="header">
                        {candidate.name}
                    </Link> 
                    <div style={{float: 'right', color: color}}>{content}</div>
                    {this.renderBreak(i)}
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <div style={{textAlign:'right', marginBottom: '30px'}}>
                    <Link to={`/app/candidates/new/${this.props.projectId}`} className="ui button primary">Add New Candidate <i style={{marginLeft: '5px'}} className="plus circle icon"></i></Link>
                </div>
                    {this.renderCandidateList()} 
            </div>
        )
    }
}

const mapStateTopProps = state => {
    return {
        candidates: state.candidates.candidates
    }
}

export default connect(mapStateTopProps, {fetchCandidates})(CandidateList)