import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup'
import apiBack from '../../API/apiBack';

const initialValues = {
    username: '',
    password: '',
    rememberMe: ''
}
const validationSchema = yup.object().shape({
    username: yup.string().required("Champs obligatoire."),
    password: yup.string().required("Password obligatoire.")
})

class FormLogin extends Component {

    state = {
        token: null,
        load: true
    }
    
    submit = (values) => {
        
        apiBack.post('/authenticate', values)
        .then(resp =>{
            if (resp.status === 200) {
                localStorage.setItem('token', resp.data.id_token)
                this.props.connectedTrue()
                this.props.updatePanier()
                this.props.history.push('/')
            }            
        })
    }

    render() {
        return (
            <div className="container card shadow mt-5 p-3 col-4">
                <Formik initialValues={initialValues}
                    onSubmit={this.submit}
                    validationSchema={validationSchema}>

                    { ( ) => (
                        <Form>
                            <div className="row">
                                <div className="col-12">
                                    <Field type="text" name="username" placeholder="Pseudonyme" className="form-control mt-3"/>
                                    <ErrorMessage name="username" component="small" className="text-danger float-end"/>
                                    <Field
                                        type="password" name="password" placeholder="Mot de passe" 
                                        className="form-control mt-4" autoComplete="off"/>
                                    <ErrorMessage name="password" component="small" className="text-danger float-end"/>
                                 </div>
                            </div>
                            <div className="row">
                                <div className="col-12 mt-4">
                                <button type="submit" className="btn btn-success btn-block">Envoyer</button>
                                </div>
                            </div>

                        </Form>
                    ) }

                </Formik>
            </div>
        );
    }
}

export default FormLogin;