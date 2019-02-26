import React from 'react';
import { Field, reduxForm } from 'redux-form';

class NoteForm extends React.Component {

    renderError = ({ error, touched }) => {
        if(touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }


    renderTextArea = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <textarea rows="10" {...input} autoComplete='off'/>
                {this.renderError(meta)}
            </div>
        )
    }



    onSubmit = (formValues) => {
        formValues.note = this.props.candidateName.split(' ')[0] + ': ' + formValues.note
        this.props.onSubmit(formValues)
    }
    
    render() {
        return (
            <div className="ui card" style={{margin: 'auto', marginTop: '50px', marginBottom: '50px'}}>
                <div className="content">
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error"> 
                        <Field name="note" component={this.renderTextArea}/>
                        <button style={{marginTop: '15px'}} className="ui button primary">Add Note</button>
                    </form>
                </div>
            </div>
        )
    }
}

const validate = (formValues) => {
    
    const errors = {}

    if(!formValues.note) {
        errors.note = 'You must enter a note'
    }

    return errors
}



export default reduxForm({
    form: 'noteForm',
    validate: validate
})(NoteForm);