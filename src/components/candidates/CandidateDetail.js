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
            <div style={{marginTop: '50px'}}>
                <div className="ui card" style={{margin: 'auto', float: 'left', marginRight: '5%'}}>
                    <div className="content">
                        <h1 className="header">{name}</h1>
                        <h5>Email</h5>
                        <p>{email}</p>
                    </div>   
                </div>
                <div className="ui grid">
                <div className="four wide column">
                    <div className="ui vertical fluid tabular menu">
                        <a href='https://semantic-ui.com/collections/menu.html' className="item active">
                            First phone interview
                        </a>
                        <a href='https://semantic-ui.com/collections/menu.html' className="item">
                            Technical Interview
                        </a>
                        <a href='https://semantic-ui.com/collections/menu.html' className="item">
                            Offer
                        </a>
                    </div>
                    </div>
                    <div className="twelve wide stretched column">
                        <div className="ui segment">
                        This is an stretched grid column. This segment will always match the tab height
                        </div>
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