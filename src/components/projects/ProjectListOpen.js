import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProjects, changeHeaderOpen } from '../../store/actions/index';

class ProjectList extends React.Component {

    componentDidMount() {
        this.props.fetchProjects(this.props.match.params.userId).then(() => this.props.changeHeaderOpen('Jobs.'))
    }

    renderList = () => {
        if(this.props.projects.length < 1) {
            return <div>No Jobs listed</div>
        }

        return this.props.projects.map(project => {
            let status = project.projectStatus.find(el => el.status === true).prop
            let color = project.projectStatus.find(el => el.prop === status).color
            if(project.projectStatus[0].status === true) {
                return (            
                    <div className="ui celled list" key={project._id}>
                        <div className="ui items">
                            <div className="item" >
                                <div className="content" style={{fontSize: '12px'}}>
                                    <Link to={`/jobs/${this.props.match.params.userId}/${project._id}`} className="header">
                                        {project.name} <span style={{marginLeft: '15px', fontSize: '14px', color: color}}>{status}</span>
                                    </Link>       
                                </div>
                            </div>
                            <div className="ui divider"></div>
                        </div>            
                    </div>
                )
            }
            
        })
    }

    render() {
        return(
            <div className="ui container" style={{marginTop: '60px'}}>
                <div className="ui celled list">
                    <div className="ui card" style={{margin: 'auto', float: 'left', marginRight: '5%', width: '100%', backgroundColor: '#fcfcfd', marginBottom: '40px'}}>
                        <div className="content">
                            {this.renderList()}
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        projects: state.projects.projects
    }
}

export default connect(mapStateToProps, {fetchProjects, changeHeaderOpen})(ProjectList)