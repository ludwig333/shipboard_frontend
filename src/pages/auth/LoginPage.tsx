import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/layout/AuthLayout';
import { FormHeader } from '../../components/common/typography';
import { InputField, FormLink } from '../../components/common/form';
import { FormButton } from '../../components/common/buttons';
import { useAuthDispatch } from '../../services/Auth/AuthProvider';
import { login } from '../../apis/auth';
import { CredentialData } from '../../../types';

const defaultCredentials: CredentialData = {
  email: '',
  password: '',
};

const LoginPage: React.FC = (props: any) => {
  const [credential, setCredentials] = useState(defaultCredentials);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);

  const authDispatch = useAuthDispatch();

  useEffect(() => {
    emailRef.current && emailRef.current.focus();
  }, []);

  const handleChange = <P extends keyof CredentialData>(
    prop: P,
    value: CredentialData[P]
  ) => {
    setCredentials({ ...credential, [prop]: value });
    setErrorMessage('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    login(credential)
      .then((response) => {
        console.log(response.data);
        authDispatch({
          type: 'LOGIN',
          payload: response.data,
        });
        props.history.push('/app');
      })
      .catch((err) => {
        if (err.response.status === 422) {
          setErrorMessage(err.response.data.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AuthLayout type="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <FormHeader>Sign in to account</FormHeader>
        <InputField
          isError={!!errorMessage}
          id="email"
          placeholder="Type your email"
          ref={emailRef}
          type="email"
          value={credential.email}
          onChange={(e) => {
            handleChange('email', e.target.value);
          }}
        />
        {errorMessage && <span className="form-error">{errorMessage}</span>}
        <InputField
          isError={!!errorMessage}
          className="last-input"
          id="password"
          placeholder="Type your password"
          type="password"
          value={credential.password}
          onChange={(e) => {
            handleChange('password', e.target.value);
          }}
        />
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
