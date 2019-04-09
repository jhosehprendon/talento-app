import React from 'react';
import { connect } from 'react-redux';
import { createProject } from '../../store/actions/index';
import PortafolioForm from './PortafolioForm';

class PortafolioCreate extends React.Component {

    state = {
        tryCreate: false
    }

    onSubmit = (formValues) => {
        this.setState({ tryCreate: true })

        this.props.createProject(formValues).then(() => {
            this.setState({tryCreate: false})
        })
    }

    renderSpinner = () => {
        if(this.state.tryCreate) {
            return (
                <div style ={{marginTop: '-40px'}} class="ui active centered inline loader"></div>
            )
        } else {
            return null
        }
    }

    render() {
        return (
            <div>
                <h3>Create a Project</h3>
                <div className="ui fitted divider"></div>
                <PortafolioForm 
                    onSubmit={this.onSubmit} 
                    buttonText='Create project' 
                />
                {this.renderSpinner()}
            </div>    
        )
    }
}

export default connect(null, {createProject})(PortafolioCreate)