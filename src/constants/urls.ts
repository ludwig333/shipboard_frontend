const baseUrl = process.env.REACT_APP_API_URL;

const urls = {
  login: `${baseUrl}/login`,
  register: `${baseUrl}/register`,
  forgotPassword: `${baseUrl}/forgot-password`,
  resetPassword: `${baseUrl}/reset-password`,
  authUser: `${baseUrl}/user`,
  
  bots: `${baseUrl}/bots`,
  configureBots: `${baseUrl}/configure`
};

export default urls;
