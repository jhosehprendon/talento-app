import React from 'react';
import { connect } from 'react-redux';
import { fetchProject, getUserInfo, editProject, getUser } from '../../store/actions';
import CandidateList from '../candidates/CandidateList';
import InviteForm from './InviteForm';

class ProjectDetail extends React.Component {

    state = {
        showInvite: false,
        noEmailError: ''
    }

    componentDidMount() {
        const { id } = this.props.match.params
        this.props.fetchProject(id);

        const userId = localStorage.getItem('userId')
        this.props.getUser(userId)
    }

    onShowInvite = () => {
        this.setState({ showInvite: !this.state.showInvite })
    }

    onSendInvite = async (formValues) => {
        await this.props.getUserInfo(formValues)
        if(this.props.userId.length < 1) {
            this.setState({ noEmailError: 'Email not found'})
        } else {
            const userId = {userId: this.props.userId}
            this.props.editProject(this.props.match.params.id, userId)
        }
        

    }

    clearNoEmailError = () => {
        this.setState({ noEmailError: '' })
    }

    renderInvite = () => {
        if(this.state.showInvite) {
            return (
                <InviteForm 
                    onSubmit={this.onSendInvite}
                    buttonText='Send Invite'
                    noEmailError={this.state.noEmailError}
                    clearNoEmailError={this.clearNoEmailError}
                />
            )
        } else {
            return null
        }
    }

    render() {
        if(!this.props.project) {
            return <div>loading...</div>
        }

        const { name, description, location, seniority, company } = this.props.project

        return (
            <div >
                <div className="ui card" style={{margin: 'auto', float: 'left', marginBottom: '50px'}}>
                    <div className="content">
                        <h1 className="header">{name}</h1>
                        <div className="ui fitted divider"></div>
                        <h5>Description</h5>
                        <p>{description}</p>
                        <h5>Location</h5>
                        <p>{location}</p>
                        <h5>Seniority Level</h5>
                        <p>{seniority}</p>
                        <h5>Company</h5>
                        <p>{company}</p>
                        <h5>Created by</h5>
                        <p>{this.props.user.user[0].name}</p>
                    </div>   
                    <button onClick={this.onShowInvite} to={`/candidates/new/${this.props.projectId}`} className="ui button primary">Invite Team Member<i style={{marginLeft:'10px'}} className="user plus icon"></i></button>
                    {this.renderInvite()}
                </div>
            
                <div className="ui card" style={{margin: 'auto', marginTop: '50px', width: '60%'}}>
                    <h5 style={{margin:'10px'}}><i className="users icon"></i> Candidates for this position</h5>
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
        project: state.projects[ownProps.match.params.id],
        userId: state.user.userId,
        user: state.user.user
    }
}

export default connect(mapStateToProps, {fetchProject, getUserInfo, editProject, getUser})(ProjectDetail);