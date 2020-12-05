import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import GlobalStyle from './styles/global';
import RegisterPage from './pages/auth/RegisterPage';
import LoginPage from './pages/auth/LoginPage';
import ForgotPassworPage from './pages/auth/ForgotPasswordPage';
import { ProtectedRoute } from './routes/ProtectedRoute';
import Dashboard from './pages/main/Dashboard/index';
import NotFound from './pages/error/404';
import { useAuthContext } from './providers/Auth/AuthServiceProvider';

const App: React.FC = () => {
  const authContext = useAuthContext();
  return (
    <BrowserRouter>
      <GlobalStyle />
      <>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/forgot-password" component={ForgotPassworPage} />
          <ProtectedRoute exact path="/app" component={Dashboard} />
          <Route path="*" component={NotFound} />
        </Switch>
      </>
    </BrowserRouter>
  );
};

export default App;
