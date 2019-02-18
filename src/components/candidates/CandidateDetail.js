import React from 'react';
import { connect } from 'react-redux';
import { fetchCandidate } from '../../store/actions';
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

        const { name, email } = this.props.candidate

        return (
            <div style={{marginTop: '50px'}}>
                <div className="ui card" style={{margin: 'auto', float: 'left', marginRight: '5%'}}>
                    <div className="content">
                        <h1 className="header">{name}</h1>
                        <div className="ui fitted divider"></div>
                        <h5>Email</h5>
                        <p>{email}</p>
                    </div>   
                </div>
                <div className="ui card" style={{margin: 'auto', marginTop: '50px', width: '60%'}}>
                    <h5 style={{margin:'10px'}}>Candidates for this position</h5>
                    <div className="content">
                        <TaskList 
                            tasks={['First Phone Interview', 'Technical Interview']}
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

export default connect(mapStateToProps, {fetchCandidate})(CandidateDetail)