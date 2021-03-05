import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import { FormHeader } from '../../components/common/typography';
import { InputField, FormLink } from '../../components/common/form';
import { FormButton } from '../../components/common/buttons';
import { useAuthDispatch } from '../../services/Auth/AuthProvider';
import { login } from '../../apis/auth';
import { CredentialData } from '../../../types';
import { useForm } from "react-hook-form";


const LoginPage: React.FC = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, errors, setError } = useForm();  

  const authDispatch = useAuthDispatch();

  useEffect(() => {
    emailRef.current && emailRef.current.focus();
  }, []);


  const onSubmit = (data) => {
    setIsLoading(true);
    login({
      email: data.email,
      password: data.password
    })
      .then((response) => {
        authDispatch({
          type: 'LOGIN',
          payload: response.data,
        });
        props.history.push('/app');
      })
      .catch((err) => {
        if (err.response.status === 422) {
          if (err.response.data.errors.email) {
            setError('email', {
              type: 'server',
              message: err.response.data.errors.email[0]
            })
          }
          if (err.response.data.errors.password) {
            setError('password', {
              type: 'server',
              message: err.response.data.errors.password[0]
            })
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AuthLayout type="login">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}noValidate>
        <FormHeader>Sign in to account</FormHeader>
        <InputField
          isError={!!errors.email}
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          ref={register({required:true})}
        />
        {errors.email && errors.email.type === 'required' && (<p className="form-error">This field is required</p>)}
        {errors.email && errors.email.type === 'server' && (<p className="form-error">{errors.email.message}</p>)}
        
         <InputField
          isError={!!errors.password}
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          ref={register({required:true})}
        />
        {errors.password && errors.password.type === 'required' && (<p className="form-error">This field is required</p>)}
        {errors.password && errors.password.type === 'server' && (<p className="form-error">{ errors.password.message}</p>)}
       
        <FormButton type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Sign In'}
        </FormButton>
      </form>
      <div className="link">
        <Link to="/forgot-password">
          <FormLink href="#" className="link-left">
            Forgot Password?
          </FormLink>
        </Link>
        <Link to="/register">
          <FormLink href="#" className="link-right">
            Sign Up
          </FormLink>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
