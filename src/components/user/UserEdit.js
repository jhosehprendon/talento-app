import React from 'react';
import { connect } from 'react-redux';
import { getUser, editUser} from '../../store/actions';
import UserForm from './UserForm';

class UserEdit extends React.Component {

    state = {
        tryEdit: false
    }
    
    componentDidMount() {
        this.props.getUser(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.getUser(this.props.match.params.id)
    }

    onSubmit = (formValues) => {
        this.setState({ tryEdit: true })
        this.props.editUser(this.props.match.params.id, formValues).then(() => {
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
        if(!this.props.user) {
            return <div style ={{marginTop: '10px'}} class="ui active centered inline loader"></div>
        }

        const { name, email } = this.props.user

        return (
            <div>
                <h3>Edit User</h3>
                <div className="ui fitted divider"></div>
                <UserForm 
                    initialValues={{
                        name: name, 
                        email: email
                    }}
                    onSubmit={this.onSubmit}
                />
                {this.renderSpinner()}
            </div>
        )
    } 
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user[0]
    }
}

export default connect(mapStateToProps, {getUser, editUser})(UserEdit);