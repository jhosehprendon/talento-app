import React from 'react';
import { connect } from 'react-redux';
import { fetchProject, getUserInfo, editProject, getUser } from '../../store/actions';
import CandidateList from '../candidates/CandidateList';
import InviteForm from './InviteForm';

class ProjectDetail extends React.Component {

    state = {
        showInvite: false,
        noEmailError: '',
        creator: ''
    }

    componentDidMount() {
        const { id } = this.props.match.params
        this.props.fetchProject(id)
    }

    onShowInvite = () => {
        this.setState({ showInvite: !this.state.showInvite })
    }

    onSendInvite = async (formValues) => {
        await this.props.getUserInfo(formValues)
        if(!this.props.userId) {
            this.setState({ noEmailError: 'Email not found'})
        } else {
            const userInfo = {userInfo: this.props.userInfo}
            this.props.editProject(this.props.match.params.id, userInfo)
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

    handleDropdownChange = (event) => {
        this.props.editProject(this.props.match.params.id, {status: event.target.value})
        .then(() => {
            this.props.fetchProject(this.props.match.params.id)
        })
      }


    render() {
        if(!this.props.project) {
            return <div>loading...</div>
        }

        const { name, description, location, seniority, company, userIds } = this.props.project

        let status = this.props.project.projectStatus.find(el => el.status === true).prop
        let color = this.props.project.projectStatus.find(el => el.prop === status).color

        return (
            <div >
                <div className="ui card" style={{margin: 'auto', float: 'left', marginBottom: '50px'}}>
                    <div className="content">
                        <h1 className="header">{name}</h1>
                        <div className="ui fitted divider"></div>
                        <p style={{float: 'right', margin: '10px 0', color: color, fontWeight: 'bold'}}>{status}</p>
                        <h5>Status</h5>
                        <select onChange={this.handleDropdownChange} value={status} className="ui selection dropdown">
                            <option key={1} value='Open'>Open</option>
                            <option key={2} value='Closed'>Closed</option>
                        </select>
                        <h5>Description</h5>
                        {description.split('\n\n').map((el, i) => <div style={{marginBottom: '20px'}} key={i}>{el}</div>)}
                        <h5>Location</h5>
                        <p>{location}</p>
                        <h5>Seniority Level</h5>
                        <p>{seniority}</p>
                        <h5>Company</h5>
                        <p>{company}</p>
                        <h5>Created by</h5>
                        <p>{this.props.project.userIds[0].name}</p>
                        <h5>Memebers assigned</h5>
                        {userIds.map(el => <div key={el._id}>{el.name}</div>)}
                    </div>   
                    <button onClick={this.onShowInvite} to={`/candidates/new/${this.props.projectId}`} className="ui button primary">Invite Team Member<i style={{marginLeft:'10px'}} className="user plus icon"></i></button>
                    {this.renderInvite()}
                </div>
            
                <div className="ui card" style={{margin: 'auto', marginTop: '50px', width: '60%'}}>
                    <h5 style={{margin:'10px'}}><i className="users icon"></i> Candidates for this position</h5>
                    <div className="content" style={{backgroundColor: '#fcfcfd'}}>
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
        userId: state.user.userInfo._id,
        user: state.user.user,
        userInfo: state.user.userInfo
    }
}

export default connect(mapStateToProps, {fetchProject, getUserInfo, editProject, getUser})(ProjectDetail);