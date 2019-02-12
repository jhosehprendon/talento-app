import React from 'react';
import { connect } from 'react-redux';
import {fetchCandidates} from '../../store/actions';
import { Link } from 'react-router-dom';

class CandidateList extends React.Component {
    componentDidMount() {
        this.props.fetchCandidates()
    }

    renderCandidateList = () => {
        return this.props.candidates.map(candidate => {
            return (
                <div key={candidate._id}>
                    <p>Name: {candidate.name}, Email: {candidate.email}</p>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <div style={{textAlign:'right', marginBottom: '30px'}}>
                    <Link to="/candidates/new" className="ui button primary">Add New Candidate</Link>
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