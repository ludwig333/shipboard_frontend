import React from 'react';
import AppLayout from '../../../components/layout/AppLayout';
import Table from '../../../components/common/Table/index';
import { PrimaryButton } from '../../../components/common/buttons';

const Bots = (props: any) => {
  return (
    <AppLayout>
      <div className="page-header">
        <h1 className="heading">Bots</h1>
        <PrimaryButton className="button">Add Bot</PrimaryButton>
      </div>
      <Table />
    </AppLayout>
  );
};

export default Bots;
