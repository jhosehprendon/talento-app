import React from 'react';
import { Field, reduxForm } from 'redux-form';

class CandidateFormOpen extends React.Component {
    state = {
        candidateCV: null,
        disabled: false ,
        file: null,
        blob: null
    }

    componentDidMount() {

        if(this.props.candidateCV) {

            this.setState({
                file: `http://localhost:3002/${this.props.candidateCV}`,
                candidateCV: this.state.candidateCV
            })
        }
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
                <label style={{fontWeight: 'bold'}}>{label}</label>
                <input type="file" onChange={this.handleChange}/>
                {/* {this.renderError(meta)} */}
            </div>
        )
    }

    renderTextArea = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <textarea 
                    rows="10" 
                    {...input} 
                    autoComplete='off' 
                    placeholder='Please share a paragraph summarizing your professional career and experience'
                />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formValues) => {

        // Candidate applies and is added

        const userId = this.props.userId
        const projectId =this.props.projectId

        let formData = new FormData();
        formData.set('name', formValues.name)
        formData.set('email', formValues.email)
        formData.set('summary', formValues.summary)
        formData.set('linkedin', formValues.linkedin)
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

    } 


    render() {
        return (
            <div className="ui card" style={{margin: 'auto', marginBottom: '50px', width: '30rem'}}>
                <div className="content">
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error"> 
                        <Field name="name" component={this.renderInput} label="Full Name"/>
                        <Field name="email" component={this.renderInput} label="Email"/>
                        <Field name="summary" component={this.renderTextArea} label="Summary"/>
                        <Field name="linkedin" component={this.renderInput} label="LinkedIn Profile"/>
                        <Field name="candidateCV" component={this.renderInputFile} label="Select CV file"/>
                        <div style={{marginTop: '10px'}}>
                            {this.props.errorEditCandidate ? <p style={{color:'#e74c3c'}}>{this.props.errorEditCandidate}</p> : null}
                            <p style={{color:'#6699cc'}}>{this.props.fileMessage}</p>
                            <p>{this.props.candidateCV}</p>
                        </div>
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

    let validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    if(!validateEmail(formValues.email)) {
        errors.email = 'Please enter a valid email'
    }

    if(!formValues.email) {
        errors.description = 'You must enter an email'
    }

    if(!formValues.summary) {
        errors.summary = 'You must enter a summary'
    }

    return errors
}



export default reduxForm({
    form: 'candidateFormOpen',
    validate: validate
})(CandidateFormOpen);
