import React from 'react';
import { connect } from 'react-redux';
import { fetchProject } from '../../store/actions';
import CandidateList from '../candidates/CandidateList';

class ProjectDetail extends React.Component {

    componentDidMount() {
        const { id } = this.props.match.params

        this.props.fetchProject(id);
    }

    render() {
        if(!this.props.project) {
            return <div>loading...</div>
        }

        const { name, description, location, seniority, company } = this.props.project

        return (
            <div >
                <div className="ui card" style={{margin: 'auto', float: 'left'}}>
                    <div className="content">
                        <h1 className="header">{name}</h1>
                        <h5>Description</h5>
                        <p>{description}</p>
                        <h5>Location</h5>
                        <p>{location}</p>
                        <h5>Seniority Level</h5>
                        <p>{seniority}</p>
                        <h5>Company</h5>
                        <p>{company}</p>
                    </div>   
                </div>
                <div className="ui card" style={{margin: 'auto', marginTop: '50px', width: '60%'}}>
                    <h5 style={{margin:'10px'}}>Candidates for this position</h5>
                    <div className="content">
                        <CandidateList projectId={this.props.match.params.id}/>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        project: state.projects[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchProject})(ProjectDetail);