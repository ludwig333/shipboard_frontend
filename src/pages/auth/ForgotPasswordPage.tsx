import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/front/layout/AuthLayout';
import { FormHeader, FormSubHeader } from '../../components/common/typography';
import { InputField, FormLink } from '../../components/common/form';
import { FormButton } from '../../components/common/buttons';
import { IoArrowBack } from 'react-icons/io5';
import { forgotPassword } from '../../apis/auth';

const ForgotPassworPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailed, setIsEmailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState({ email: '' });

  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current && emailRef.current.focus();
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);

    forgotPassword(email)
      .then((response) => {
        setIsEmailed(true);
      })
      .catch((err) => {
        setErrorMessage({
          email: err.response.data.errors.email
            ? err.response.data.errors.email[0]
            : '',
        });
        setIsLoading(false);
      });
  };

  return (
    <AuthLayout>
      {!isEmailed && (
        <form onSubmit={handleSubmit}>
          <FormHeader>Forgot password?</FormHeader>
          <FormSubHeader>
            No worries! We’ll send you secure email to reset your password.
          </FormSubHeader>
          <InputField
            isError={!!errorMessage.email}
            className="last-input"
            id="email"
            placeholder="Type your password"
            type="email"
            ref={emailRef}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {errorMessage.email && (
            <span className="form-error">{errorMessage.email}</span>
          )}
          <FormButton type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Email me'}
        </FormButton>
        </form>
      )}
      {isEmailed && (
        <div>
          <FormHeader>Email is on the way!</FormHeader>
          <FormSubHeader>
            We will send you email with the reset password link if (
            <strong>{email}</strong>) exists in Shipboard.
          </FormSubHeader>
        </div>
      )}
      <Link to="/login" className="go-back">
        <IoArrowBack />
        <h5>Go Back</h5>
      </Link>
    </AuthLayout>
  );
};

export default ForgotPassworPage;
