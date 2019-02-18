import React from 'react';
import { connect } from 'react-redux';
import { fetchCandidate } from '../../store/actions';

class TaskDetail extends React.Component {
    componentDidMount() {
        this.props.fetchCandidate(this.props.match.params.candidateId)
    }

    render() {
        if(!this.props.candidate) {
            return <div>loading...</div>
        }

        const { name, description } = this.props.candidate.tasks[this.props.match.params.id]

        return (
            <div style={{marginTop: '50px'}}>
                <div className="ui card" style={{margin: 'auto', float: 'left', marginRight: '5%'}}>
                    <div className="content">
                        <h1 className="header">{name}</h1>
                        <div className="ui fitted divider"></div>
                        <h5>Description</h5>
                        <p>{description}</p>
                    </div>   
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        candidate: state.candidates[ownProps.match.params.candidateId]
    }
}

export default connect(mapStateToProps, { fetchCandidate })(TaskDetail)