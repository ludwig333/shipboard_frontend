const baseUrl = process.env.REACT_APP_API_URL;

const urls = {
  login: `${baseUrl}/login`,
  register: `${baseUrl}/register`,
  forgotPassword: `${baseUrl}/forgot-password`,
  resetPassword: `${baseUrl}/reset-password`,
  authUser: `${baseUrl}/user`,
  logOut: `${baseUrl}/logout`,
  
  bots: `${baseUrl}/bots`,
  botConfiguration: `${baseUrl}/configure-bot`,

  flows: `${baseUrl}/flows`,
  flow: `${baseUrl}/flow`,
  
  messages: `${baseUrl}/messages`,
  message: `${baseUrl}/message`,

  texts: `${baseUrl}/texts`,

  images: `${baseUrl}/images`,
  image: `${baseUrl}/image`,

  cardGroups: `${baseUrl}/card-groups`,
  card: `${baseUrl}/card`,

  button: `${baseUrl}/button`,
};

export default urls;
