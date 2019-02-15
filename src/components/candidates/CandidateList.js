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
                <div key={candidate._id} style={{margin: '10px'}}>
                    <Link to={`/candidates/${candidate._id}`} className="header">
                        {candidate.name}
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
                    <Link to={`/candidates/new/${this.props.projectId}`} className="ui button primary">Add New Candidate <i style={{marginLeft: '5px'}} className="plus circle icon"></i></Link>
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