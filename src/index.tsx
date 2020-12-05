import React from 'react';
import ReactDOM from 'react-dom';
import GlobalStyle from './styles/global';
import { ThemeProvider } from 'styled-components';
import * as theme from './styles/theme';
import App from './App';
import AuthProvider from './providers/Auth/AuthServiceProvider';

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <App />
        <GlobalStyle />
      </ThemeProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
