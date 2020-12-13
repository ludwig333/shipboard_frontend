import jwt from 'jsonwebtoken';

export default (token: any) => {
  if (token) {
    const data: any = jwt.decode(token);

    const expDate: Date = new Date(data.exp * 1000);
    const currentDate: Date = new Date();
    return expDate.valueOf() - currentDate.valueOf() > 0;
  }
  return false;
};
