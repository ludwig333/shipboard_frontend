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
import { useAuthContext } from './services/Auth/AuthProvider';
import Bots from './pages/main/Bots/index';
import Flows from './pages/main/Flows/index';
import Templates from './pages/main/Templates/index';
import Settings from './pages/main/Settings/index';
import { ModalProvider } from './services/Modal/ModalProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App: React.FC = () => {
  const authContext = useAuthContext();
  return (
    <ModalProvider>
      <BrowserRouter>
        <GlobalStyle />
        <>
        <ToastContainer />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route
              exact
              path="/forgot-password"
              component={ForgotPassworPage}
            />
            <ProtectedRoute exact path="/app" component={Dashboard} />
            <ProtectedRoute exact path="/bots" component={Bots} />
            <ProtectedRoute exact path="/flows" component={Flows} />
            <ProtectedRoute exact path="/templates" component={Templates} />
            <ProtectedRoute exact path="/settings" component={Settings} />
            <Route path="*" component={NotFound} />
          </Switch>
        </>
      </BrowserRouter>
    </ModalProvider>
  );
};

export default App;
