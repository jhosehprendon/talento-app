import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPortafolioProject } from '../../store/actions';

class PortafolioDetail extends React.Component {


    componentDidMount() {
        window.scrollTo(0,0)
        const { id } = this.props.match.params
        this.props.fetchPortafolioProject(id)
    }


    render() {
        if(!this.props.portafolio) {
            return <div style ={{marginTop: '10px'}} class="ui active centered inline loader"></div>
        }

        const { name, objective, platform, results } = this.props.portafolio

        return (
            <div className="ui card" style={{margin: 'auto', width: '80%', marginBottom: '50px'}}>
                <div style={{display: "flex"}}>
                    <h3 style={{margin:'15px'}}> {name}</h3>
                    <Link style={{marginTop: '17px'}} className="ui basic primary " to={`/user/portafolio/project/edit/${this.props.match.params.id}`}><i className="edit outline icon"></i></Link>
                </div>
                <div className="content">
                    <h4>Objective</h4>
                    <div>{objective}</div>
                    <h4>Platform</h4>
                    <div>{platform}</div>
                    <h4>Results</h4>
                    <div>{results}</div>
                 </div>
            </div>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        portafolio: state.portafolio[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchPortafolioProject})(PortafolioDetail);