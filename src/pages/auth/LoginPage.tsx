import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/front/layout/AuthLayout';
import { FormHeader } from '../../components/common/typography';
import { InputField, FormLink } from '../../components/common/form';
import { FormButton } from '../../components/common/buttons';
import { useAuthDispatch } from '../../providers/Auth/AuthServiceProvider';
import { login } from '../../apis/auth';
import { Credential } from '../../../types';

const defaultCredentials: Credential = {
  email: '',
  password: '',
};

const LoginPage = (props: any) => {
  const [credential, setCredentials] = useState(defaultCredentials);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const authDispatch = useAuthDispatch();

  useEffect(() => {
    emailRef.current && emailRef.current.focus();
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      login(credential).then((response) => {
        authDispatch({
          type: 'LOGIN',
          payload: response.data,
        });
        props.history.push('/app');
      });
    } catch (e) {
      alert('error');
    }
  };

  const handleChange = <P extends keyof Credential>(
    prop: P,
    value: Credential[P]
  ) => {
    setCredentials({ ...credential, [prop]: value });
  };

  return (
    <AuthLayout type="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <FormHeader>Sign in to account</FormHeader>
        <InputField
          id="email"
          placeholder="Type your email"
          ref={emailRef}
          type="email"
          value={credential.email}
          onChange={(e) => {
            handleChange('email', e.target.value);
          }}
        />
        <InputField
          className="last-input"
          id="password"
          placeholder="Type your password"
          ref={passwordRef}
          type="password"
          value={credential.password}
          onChange={(e) => {
            handleChange('password', e.target.value);
          }}
        />
        <FormButton type="submit">Sign In</FormButton>
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
