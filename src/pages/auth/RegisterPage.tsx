import React, { useState, useRef, useEffect } from 'react';
import AuthLayout from '../../components/layout/AuthLayout';
import { Link } from 'react-router-dom';
import { FormHeader } from '../../components/common/typography';
import { InputField, FormLink } from '../../components/common/form';
import { FormButton } from '../../components/common/buttons';
import { RegistrationData } from '../../../types';
import { register } from '../../apis/auth';
import { useAuthDispatch } from '../../services/Auth/AuthProvider';

const defaultRegistrationData: RegistrationData = {
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
};

const RegisterPage: React.FC = (props: any) => {
  const [registrationData, setRegistrationData] = useState(
    defaultRegistrationData
  );
  const [errorMessage, setErrorMessage] = useState(defaultRegistrationData);
  const [isLoading, setIsLoading] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);

  const authDispatch = useAuthDispatch();

  useEffect(() => {
    nameRef.current && nameRef.current.focus();
  }, []);

  const handleChange = <P extends keyof RegistrationData>(
    prop: P,
    value: RegistrationData[P]
  ) => {
    setRegistrationData({ ...registrationData, [prop]: value });
    setErrorMessage({
      ...errorMessage,
      [prop]: '',
    });
    setIsLoading(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    register(registrationData)
      .then((response) => {
        authDispatch({
          type: 'LOGIN',
          payload: response.data,
        });
        props.history.push('/app');
      })
      .catch((err) => {
        if (err.response.status === 422) {
          setErrorMessage({
            email: err.response.data.errors.email
              ? err.response.data.errors.email[0]
              : '',
            password: err.response.data.errors.password
              ? err.response.data.errors.password[0]
              : '',
            name: err.response.data.errors.name
              ? err.response.data.errors.name[0]
              : '',
            password_confirmation: err.response.data.errors
              .password_confirmation
              ? err.response.data.errors.password_confirmation[0]
              : '',
          });
        }
      });
  };

  return (
    <AuthLayout>
      <form className="register-form" onSubmit={handleSubmit}>
        <FormHeader>Create new account</FormHeader>
        <InputField
          isError={!!errorMessage.name}
          type="text"
          id="name"
          placeholder="Full Name"
          ref={nameRef}
          onChange={(e) => {
            handleChange('name', e.target.value);
          }}
        />
        {errorMessage.name && (
          <span className="form-error">{errorMessage.name}</span>
        )}
        <InputField
          isError={!!errorMessage.email}
          type="email"
          id="email"
          placeholder="Email"
          onChange={(e) => {
            handleChange('email', e.target.value);
          }}
        />
        {errorMessage.email && (
          <span className="form-error">{errorMessage.email}</span>
        )}
        <InputField
          isError={!!errorMessage.password}
          type="password"
          id="password"
          placeholder="Password"
          onChange={(e) => {
            handleChange('password', e.target.value);
          }}
        />
        {errorMessage.password && (
          <span className="form-error">{errorMessage.password}</span>
        )}
        <InputField
          isError={!!errorMessage.password_confirmation}
          className="last-input"
          type="password"
          id="password_confirmation"
          placeholder="Password Confirmation"
          onChange={(e) => {
            handleChange('password_confirmation', e.target.value);
          }}
        />
        {errorMessage.password_confirmation && (
          <span className="form-error">
            {errorMessage.password_confirmation}
          </span>
        )}
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
