import React from 'react';
import AuthLayout from '../../components/front/layout/AuthLayout';
import { FormHeader } from '../../components/common/typography';
import { InputField, FormLink } from '../../components/common/form';
import { FormButton } from '../../components/common/buttons';

const ResetPasswordPage = () => {
  return (
    <AuthLayout>
      <FormHeader>Sign in to your account</FormHeader>
      <InputField
        className="last-input"
        type="email"
        id="email"
        placeholder="Type your password"
      />
      <FormButton>Email me</FormButton>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
