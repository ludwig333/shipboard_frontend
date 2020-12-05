import React from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/front/layout/AuthLayout';
import { FormHeader, FormSubHeader } from '../../components/common/typography';
import { InputField, FormLink } from '../../components/common/form';
import { FormButton } from '../../components/common/buttons';
import { IoArrowBack } from 'react-icons/io5';

const ForgotPassworPage = () => {
  return (
    <AuthLayout>
      <FormHeader>Forgot password?</FormHeader>
      <FormSubHeader>
        No worries! We’ll send you secure email to reset your password.
      </FormSubHeader>
      <InputField
        className="last-input"
        type="email"
        id="email"
        placeholder="Type your password"
      />
      <FormButton>Email me</FormButton>
      <Link to="/login" className="go-back">
        <IoArrowBack />
        <h5>Go Back</h5>
      </Link>
    </AuthLayout>
  );
};

export default ForgotPassworPage;
