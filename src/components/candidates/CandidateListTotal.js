import React from 'react';
import { connect } from 'react-redux';
import {fetchCandidatesTotal} from '../../store/actions';
import { Link } from 'react-router-dom';

class CandidateListTotal extends React.Component {
    componentDidMount() {
        this.props.fetchCandidatesTotal(localStorage.getItem('userId'))
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
                <div key={candidate._id} style={{margin: '20px'}}>
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
                 <h2>Candidates</h2>
                <h4 className="ui horizontal divider header" style={{marginTop:'-15px', marginBottom: '40px'}}>
                <i class="users icon"></i>
                </h4>
                <div className="ui card" style={{margin: 'auto', float: 'left', marginRight: '5%', width: '100%', backgroundColor: '#fcfcfd', marginBottom: '30px'}}>
                    <div className="content">
                        {this.renderCandidateList()} 
                    </div>
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

export default connect(mapStateTopProps, {fetchCandidatesTotal})(CandidateListTotal)