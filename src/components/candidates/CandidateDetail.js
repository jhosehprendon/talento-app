import React from 'react';
import { connect } from 'react-redux';
import { fetchCandidate } from '../../store/actions'

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
            <div >
                <div className="ui card" style={{margin: 'auto', float: 'left'}}>
                    <div className="content">
                        <h1 className="header">{name}</h1>
                        <p>{email}</p>
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