import React from 'react';
import { connect } from 'react-redux';
import { fetchPortafolioProject } from '../../store/actions';

class PortafolioDetail extends React.Component {


    componentDidMount() {
        window.scrollTo(0,0)
        const { id } = this.props.match.params
        console.log('hey')
        this.props.fetchPortafolioProject(id)
    }


    render() {
        if(!this.props.portafolio) {
            return <div style ={{marginTop: '10px'}} class="ui active centered inline loader"></div>
        }

        const { name } = this.props.portafolio

        return (
            <div >
                 {name}
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