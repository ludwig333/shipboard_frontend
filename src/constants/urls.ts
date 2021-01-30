const baseUrl = process.env.REACT_APP_API_URL;

const urls = {
  login: `${baseUrl}/login`,
  register: `${baseUrl}/register`,
  forgotPassword: `${baseUrl}/forgot-password`,
  resetPassword: `${baseUrl}/reset-password`,
  authUser: `${baseUrl}/user`,
  logOut: `${baseUrl}/logout`,
  
  bots: `${baseUrl}/bots`,
  configureBots: `${baseUrl}/configure`,

  flows: `${baseUrl}/flows`,
  
  messages: `${baseUrl}/messages`,

  texts: `${baseUrl}/texts`,

  images: `${baseUrl}/images`,
  image: `${baseUrl}/image`
};

export default urls;
