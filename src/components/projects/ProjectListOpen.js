import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProjects, changeHeaderOpen } from '../../store/actions/index';

class ProjectList extends React.Component {

    componentDidMount() {
        window.scrollTo(0,0)
        this.props.fetchProjects(this.props.match.params.userId).then(() => this.props.changeHeaderOpen('Jobs.'))
    }

    renderBreak = (i) => {
        const projectLen = this.props.projects.length;
        if (projectLen === i + 1) {
            return null
          } else {
            return <div className="ui divider"></div>
          }
    }

    renderList = () => {
        if(this.props.projects.length < 1) {
            return <div>No Jobs listed</div>
        }

        return this.props.projects.map((project, i) => {
            if(project.projectStatus[0].status === true) {
                return (            
                    <div className="ui celled list" key={project._id}>
                        <div className="ui items">
                            <div className="item" >
                                <div className="content" style={{fontSize: '12px', margin:'15px 0'}}>
                                    <Link to={`/jobs/${this.props.match.params.userId}/${project._id}`} className="header">
                                        {project.name} <span style={{marginLeft: '15px', fontSize: '14px', color: '#95a5a6'}}><i className="map marker alternate icon"></i>{project.location}</span>
                                    </Link>       
                                </div>
                            </div>
                            {this.renderBreak(i)}
                        </div>            
                    </div>
                )
            }
            
        })
    }

    render() {
        return(
            <div>
                <h3 style={{ marginTop: '80px', marginLeft: '20%'}}><i class="list alternate outline icon"></i> Check out some of our open positions</h3>
                <div className="ui divider" style={{marginLeft: '20%', width: '60%'}}></div>
            
                <div className="ui container" style={{marginTop: '60px', width: '60%'}}>
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