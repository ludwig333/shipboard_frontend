import React from 'react';

const Dashboard = (props:any) => {
  return (
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
  );
};

export default Dashboard;
