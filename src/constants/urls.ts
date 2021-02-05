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
  message: `${baseUrl}/message`,

  texts: `${baseUrl}/texts`,

  images: `${baseUrl}/images`,
  image: `${baseUrl}/image`,

  cardGroups: `${baseUrl}/card-groups`,
  card: `${baseUrl}/card`
};

export default urls;
