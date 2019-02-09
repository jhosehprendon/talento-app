import React from 'react';
import { connect } from 'react-redux';
import { fetchProject } from '../../store/actions';

class ProjectDetail extends React.Component {

    componentDidMount() {
        const { id } = this.props.match.params

        this.props.fetchProject(id);
    }

    render() {
        if(!this.props.project) {
            return <div>loading...</div>
        }

        const { name, description } = this.props.project

        return (
            <div className="ui card" style={{margin: 'auto', marginTop: '50px'}}>
                <div className="content">
                    <h1 className="header">{name}</h1>
                    <h5>Description:</h5>
                    <p>{description}</p>
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