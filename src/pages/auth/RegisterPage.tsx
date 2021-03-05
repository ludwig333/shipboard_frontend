import React, { useState, useRef, useEffect } from 'react';
import AuthLayout from '../../components/layout/AuthLayout';
import { Link } from 'react-router-dom';
import { FormHeader } from '../../components/common/typography';
import { InputField, FormLink } from '../../components/common/form';
import { FormButton } from '../../components/common/buttons';
import { RegistrationData } from '../../../types';
import { registerUser } from '../../apis/auth';
import { useAuthDispatch } from '../../services/Auth/AuthProvider';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';


const RegisterPage: React.FC = (props: any) => {
   const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors, setError } = useForm();  
  const authDispatch = useAuthDispatch();

  const onSubmit = (data) => {
    setIsLoading(true);

    registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
      password_confirmation: data.password_confirmation
    }).then((response) => {
      authDispatch({
        type: 'LOGIN',
        payload: response.data,
      });
      props.history.push('/app');
    })
      .catch((err) => {
        if (err.response.status === 422) {
          if (err.response.data.errors.name) {
            setError('name', {
              type: 'server',
              message: err.response.data.errors.name[0]
            })
          }
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
        } else {
          toast.error('Something went wrong')
        }
      }).finally(() => setIsLoading(false));
  };

  return (
    <AuthLayout>
      <form className="register-form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormHeader>Create new account</FormHeader>
        <InputField
          isError={!! errors.name}
          type="text"
          id="name"
          name="name"
          placeholder="Full Name"
          ref={register({required:true, maxLength: 20, minLength: 3, pattern: /[A-Za-z]{3}/ })}
        />
        {errors.name && errors.name.type === 'required' && (<p className="form-error">This field is required</p>)}
        {errors.name && errors.name.type === 'minLength' && (<p className="form-error">This field is required min length of 3</p>)}
        {errors.name && errors.name.type === 'maxLength' && (<p className="form-error">This field is required max length of 20</p>)}
        {errors.name && errors.name.type === 'pattern' && (<p className="form-error">The name may only contains lettters</p>)}
        {errors.name && errors.name.type === 'server' && (<p className="form-error">{ errors.name.message}</p>)}

        <InputField
          isError={!!errors.email}
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          ref={register({required:true})}
        />
        {errors.email && errors.email.type === 'required' && (<p className="form-error">This field is required</p>)}
        {errors.email && errors.email.type === 'server' && (<p className="form-error">{ errors.email.message}</p>)}

        <InputField
          isError={!!errors.password}
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          ref={register({required:true, minLength: 8})}
        />
        {errors.password && errors.password.type === 'required' && (<p className="form-error">This field is required</p>)}
        {errors.password && errors.password.type === 'minLength' && (<p className="form-error">This field is required min length of 8</p>)}
        {errors.password && errors.password.type === 'server' && (<p className="form-error">{ errors.password.message}</p>)}
        <InputField
          isError={!!errors.password_confirmation}
          type="password"
          name="password_confirmation"
          id="password_confirmation"
          placeholder="Password Confirmation"
          ref={register({required: true})}
        />
        {errors.password_confirmation && errors.password_confirmation.type === 'required' && (<p className="form-error">This field is required</p>)}
      
        <FormButton type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Sign Up'}
        </FormButton>
        <div className="link">
          <Link to="/login">
            <FormLink>Already have account? Sign In</FormLink>
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage;
