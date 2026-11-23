import { useState } from 'react';
import Card from '../components/ui/Card.jsx';
import FormField from '../components/ui/FormField.jsx';
import { loginHttp } from '../services/LoginService.jsx';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {

    const navigator = useNavigate()
    const[errors, setErrors]=useState({})
    const[serverError, setServerError]= useState('')
    const[submitting, setSubmitting]=useState(false)

  async function handleLogin(e){
    e.preventDefault();
    setErrors({})
    setServerError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')?.trim();
    const password = formData.get('password')?.trim();

    const nextErrors={}
    if(!email) nextErrors.email= 'Email is mandatory'
    if(!password) nextErrors.password = 'Password is mandatory'

    if(Object.keys(nextErrors).length>0){
      setErrors(nextErrors)
      return
    }

    try{
      setSubmitting(true)
      const response = await loginHttp.login({email, password})
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      navigator("/patients")
    }
    catch(err){
      setServerError(err.response?.data?.message || 'Login not successful, please try again later')
    }
    finally{
      setSubmitting(false)
    }

  }
  return (
    <div className="narrow">
      <Card title="Log in">
        <form className="form" noValidate onSubmit={handleLogin}>
          <FormField label="Email" type="text" name="email"/>
          <FormField label="Password" type="password" name="password"/>
          <div className="form__actions">
            <button type="submit" disabled={submitting} className="btn">{submitting? 'Submitting': 'Login'}</button>
            <p>Don't have an account? <a href="/register"> Register here</a></p>
          </div>
        </form>
      </Card>
    </div>
  );
}
