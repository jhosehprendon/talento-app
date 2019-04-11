import React from 'react';
import { connect } from 'react-redux';
import { fetchPortafolioProject, editPortafolioProject} from '../../store/actions';
import PortafolioForm from './PortafolioForm';

class PortafolioEdit extends React.Component {

    state = {
        tryEdit: false
    }
    
    componentDidMount() {
        window.scrollTo(0,0)
        const { id } = this.props.match.params
        this.props.fetchPortafolioProject(id)
    }

    componentWillUnmount() {
        this.props.fetchPortafolioProject(this.props.match.params.id)
    }

    onSubmit = (formValues) => {
        this.setState({ tryEdit: true })
        this.props.editPortafolioProject(this.props.match.params.id, formValues).then(() => {
            this.setState({tryEdit: false})
        })
    }

    renderSpinner = () => {
        if(this.state.tryEdit) {
            return (
                <div style ={{marginTop: '-40px'}} class="ui active centered inline loader"></div>
            )
        } else {
            return null
        }
    }

    render () {
        if(!this.props.portafolio) {
            return <div style ={{marginTop: '10px'}} class="ui active centered inline loader"></div>
        }

        const { name, objective, platform, results } = this.props.portafolio

        return (
            <div>
                <h3>Edit Project</h3>
                <div className="ui fitted divider"></div>
                <PortafolioForm 
                    buttonText= 'Edit Project'
                    initialValues={{
                        name: name, 
                        objective: objective,
                        platform: platform,
                        results: results,
                    }}
                    onSubmit={this.onSubmit}
                />
                {this.renderSpinner()}
            </div>
        )
    } 
}

const mapStateToProps = (state, ownProps) => {
    return {
        portafolio: state.portafolio[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {fetchPortafolioProject, editPortafolioProject})(PortafolioEdit);