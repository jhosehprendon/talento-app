import React from 'react';
import { Field, reduxForm } from 'redux-form';

class CandidateForm extends React.Component {
    state = {
        candidateCV: null,
        disabled: false ,
        file: null,
        blob: null
    }

    renderError = ({ error, touched }) => {
        if(touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete='off' />
                {this.renderError(meta)}
            </div>
        )
    }

    handleChange = (event) => {
        this.setState({
            candidateCV: event.target.files[0],
            disabled: false,
            file: URL.createObjectURL(event.target.files[0])
        })   

    }

    renderInputFile = ({label, meta}) => {
     
        // const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div>
                <label>{label}</label>
                <input type="file" onChange={this.handleChange}/>
                {/* {this.renderError(meta)} */}
            </div>
        )
    }

    onSubmit = (formValues) => {

        // Addind candidate
        if(this.props.buttonText === 'Add Candidate') {

            const userId = localStorage.getItem('userId')
            const projectId =this.props.projectId

            let formData = new FormData();
            formData.set('name', formValues.name)
            formData.set('email', formValues.email)
            formData.set('userId', userId)
            formData.set('projectId', projectId)

            // NO CV
            if(this.state.candidateCV === null) {

                var arr = []

                for (var key of formData.entries()) {
                    var obj = {}
                    obj['propName'] = key[0]
                    obj['value'] = key[1]
                    arr.push(obj)
                }

                this.props.onSubmit(arr)
            } else {
                // WITH CV
                formData.set('candidateCV', this.state.candidateCV)
                this.props.onSubmit(formData)
            }

        } else {
            // Edit Candidate
            let formData = new FormData();
            formData.set('name', formValues.name)
            formData.set('email', formValues.email)

            // NO CV
            if(this.state.candidateCV === null) {
                var arr = []

                for (var key of formData.entries()) {
                    var obj = {}
                    obj['propName'] = key[0]
                    obj['value'] = key[1]
                    arr.push(obj)
                }
    
                this.props.onSubmit(arr)

            } else {
                // WITH CV
                formData.set('candidateCV', this.state.candidateCV)
                this.props.onSubmit(formData)
            }

           
        }
        
    } 

    render() {
        return (
            <div className="ui card" style={{margin: 'auto', marginTop: '50px'}}>
                <div className="content">
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error"> 
                        <Field name="name" component={this.renderInput} label="Enter candidate name"/>
                        <Field name="email" component={this.renderInput} label="Enter candidate email"/>
                        <Field name="candidateCV" component={this.renderInputFile} label="Select CV file"/>
                        <button style={{marginTop: '15px'}} className="ui button primary">{this.props.buttonText}</button>
                    </form>
                </div>
            </div>
        )
    }
}

const validate = (formValues) => {
    
    const errors = {}

    if(!formValues.name) {
        errors.name = 'You must enter a name'
    }

    if(!formValues.email) {
        errors.description = 'You must enter an email'
    }

    return errors
}



export default reduxForm({
    form: 'candidateForm',
    validate: validate
})(CandidateForm);
