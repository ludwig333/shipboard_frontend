import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/front/layout/AuthLayout';
import { FormHeader } from '../../components/common/typography';
import { InputField, FormLink } from '../../components/common/form';
import { FormButton } from '../../components/common/buttons';

const RegisterPage = () => {
  return (
    <AuthLayout>
      <FormHeader>Create new account</FormHeader>
      <InputField type="text" id="name" placeholder="Full Name" />
      <InputField type="email" id="email" placeholder="Email" />
      <InputField type="password" id="password" placeholder="Password" />
      <InputField
        className="last-input"
        type="password"
        id="password_confirmatioin"
        placeholder="Password Confirmation"
      />
      <FormButton>Sign Up</FormButton>
      <div className="link">
        <Link to="/login">
          <FormLink>Already have account? Sign In</FormLink>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
