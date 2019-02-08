import React from 'react';
import { Field, reduxForm } from 'redux-form';

class ProjectForm extends React.Component {

    state = {
        productImage: null,
        disabled: false ,
        file: null
    }

    componentDidMount() {

        if(this.props.projectImage) {

            this.setState({
                file: `http://localhost:3002/${this.props.projectImage}`,
                projectImage: this.state.projectImage
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
            projectImage: event.target.files[0],
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
        const userId = localStorage.getItem('userId')
        let formData = new FormData();
        formData.set('name', formValues.name)
        formData.set('price', formValues.price)
        formData.set('userId', userId)

        if(this.state.projectImage === null) {
            var arr = []

            for (var key of formData.entries()) {
                var obj = {}
                obj['propName'] = key[0]
                obj['value'] = key[1]
                arr.push(obj)
            }
            console.log(arr)
            this.props.onSubmit(arr)
            
        } else {
            formData.set('prjectImage', this.state.prjectImage)
            this.props.onSubmit(formData)
        } 
    }

    renderImageMessage = () => {
        if(this.state.disabled) {
            return (
                <p style={{color:'red'}}>{this.props.imageMessage}</p>
            )
        } else {
            return null
        }
    }
    
    render() {
        return (
            <div class="ui card" style={{margin: 'auto', marginTop: '50px'}}>
                <div class="content">
                    <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error"> 
                        <Field name="name" component={this.renderInput} label="Enter project name"/>
                        <Field name="price" type="number" component={this.renderInput} label="Enter project price"/>
                        <Field name="projectImage" component={this.renderInputFile} label="Select project image"/>
                        <div style={{marginTop: '10px'}}>
                            <img style={{width: '120px'}} src={this.state.file} alt={this.state.file}/>
                        </div>
                        {this.renderImageMessage()}
                        <button style={{marginTop: '15px'}} className="ui button primary" disabled={this.state.disabled}>{this.props.buttonText}</button>
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

    if(!formValues.price) {
        errors.price = 'You must enter a price'
    }

    return errors
}



export default reduxForm({
    form: 'projectForm',
    validate: validate
})(ProjectForm);