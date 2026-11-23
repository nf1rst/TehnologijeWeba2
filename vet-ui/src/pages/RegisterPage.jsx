import { useState } from "react";
import Card from "../components/ui/Card";
import FormField from "../components/ui/FormField";
import { registrationHttp } from "../services/RegistrationService";
import { useNavigate } from "react-router-dom";

export default function RegisterPage(){
    const navigator = useNavigate()
    const[errors, setErrors]=useState({})
    const[serverError, setServerError]=useState('')
    const[submitting, setSubmitting]=useState(false)


    async function handleSubmit(e){
        e.preventDefault();
        setErrors({})
        setServerError('')

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name')?.trim()
        const email = formData.get('email')?.trim()
        const password = formData.get('password').trim()
        const confirmPassword = formData.get('confirmPassword')?.trim()

        const nextErrors={};
        if(!name) nextErrors.name='Name is required'
        if(!email) nextErrors.email='Email is required'
        if(!password) nextErrors.password = 'Password is required'
        if(password!==confirmPassword)nextErrors.confirmPassword='Confirming the password is required'
     
        if(Object.keys(nextErrors).length>0){
            setErrors(nextErrors)
            return
        }

        try{
            setSubmitting(true)
            var response =  await registrationHttp.register({name, email, password});
            localStorage.setItem('token', response.token)
            localStorage.setItem('user', JSON.stringify(response.user))
            navigator('/login')
        }
        catch(err){
            setServerError(err.response?.data?.message || 'Registration failed, please try again');        
        }
        finally{
            setSubmitting(false)
        }
    }

    return( 
        <div className="narrow">
            <Card title="Registration">
        <form className="form" onSubmit={handleSubmit}>
            {serverError && <p className="field__error" role="alert">{serverError}</p>}
          <FormField label="Name" type="text" name="name"/>
          <FormField label="Email" type="text" name="email"/>
          <FormField label="Password" type="password" name="password"/>
          <FormField label="Confirm Password" type="password" name="confirmPassword"/>
        <div className="form__actions">
            <button type="submit" disabled={submitting} className="btn">{submitting? 'Registering': 'Register'}</button>
            <p>Already have an account? <a href="/login">Login here</a></p>
          </div>
        </form>
    </Card>
        </div>
    );
}