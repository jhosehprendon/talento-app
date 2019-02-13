import React from 'react';
import { connect } from 'react-redux';
import {fetchCandidates} from '../../store/actions';
import { Link } from 'react-router-dom';

class CandidateList extends React.Component {
    componentDidMount() {
        this.props.fetchCandidates(this.props.projectId)
    }

    renderCandidateList = () => {
        if(this.props.candidates.length < 1) {
            return <div>No Candidates yet</div>
        }

        return this.props.candidates.map(candidate => {
            return (
                <div key={candidate._id}>
                    <Link to={`/candidates/${candidate._id}`} className="header">
                        {candidate.name}
                    </Link> 
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <div style={{textAlign:'right', marginBottom: '30px'}}>
                    <Link to={`/candidates/new/${this.props.projectId}`} className="ui button primary">Add New Candidate</Link>
                </div>
                <div className="ui celled list">
                    {this.renderCandidateList()} 
                </div>
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