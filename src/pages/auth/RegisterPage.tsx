import React, { useState, useRef, useEffect } from 'react';
import AuthLayout from '../../components/front/layout/AuthLayout';
import { Link } from 'react-router-dom';
import { FormHeader } from '../../components/common/typography';
import { InputField, FormLink } from '../../components/common/form';
import { FormButton } from '../../components/common/buttons';
import { RegistrationData } from '../../../types';
import { register } from '../../apis/auth';
import { useAuthDispatch } from '../../providers/Auth/AuthServiceProvider';


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
  const [errorMessage, setErrorMessage] = useState(null);
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
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      register(registrationData).then((response) => {
        authDispatch({
          type: 'LOGIN',
          payload: response.data
        });
        props.history.push('/app');
      });
    } catch (e) {
      alert('error');
    }
  };

  return (
    <AuthLayout>
      <form className="register-form" onSubmit={handleSubmit}>
        <FormHeader>Create new account</FormHeader>
        <InputField
          type="text"
          id="name"
          placeholder="Full Name"
          ref={nameRef}
          onChange={(e) => {
            handleChange('name', e.target.value);
          }}
        />
        <InputField
          type="email"
          id="email"
          placeholder="Email"
          onChange={(e) => {
            handleChange('email', e.target.value);
          }}
        />
        <InputField
          type="password"
          id="password"
          placeholder="Password"
          onChange={(e) => {
            handleChange('password', e.target.value);
          }}
        />
        <InputField
          className="last-input"
          type="password"
          id="password_confirmatioin"
          placeholder="Password Confirmation"
          onChange={(e) => {
            handleChange('password_confirmation', e.target.value);
          }}
        />
        <FormButton type="submit" disabled={isLoading}>Sign Up</FormButton>
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
