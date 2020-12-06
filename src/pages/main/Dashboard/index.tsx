import React from 'react';
import AppLayout from '../../../components/layout/AppLayout';

const Dashboard = (props:any) => {
  return (
    <AppLayout>
  <div>
        <h1>This is dashboard page</h1>
        <button
          onClick={() => {
            console.log('hello');
            // auth.logout(() => {
            //   props.history.push('/');
            // });
          }}>
          Logout
        </button>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
