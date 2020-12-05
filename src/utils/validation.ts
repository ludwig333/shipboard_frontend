const strongRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
export const isRequired: ((value: any) => string|undefined) = (value) =>
  value ? undefined : "The field is required.";
export const isPassword:((value: string) => string|undefined) = (value) =>
  value && !strongRegex.test(value)
    ? "Password must contain atleast one Capital letter, one small letter, a special character (@, #, $) , one numeric value and must be 8 digit long"
    : undefined;
export const isPasswordConfirmed = (password: string) => (passwordConfirmation: string) =>
  password !== passwordConfirmation
    ? "Password and password confirmation should match."
    : undefined;
export const composeValidators = (...validators: any) => (value: any) =>
  validators.reduce((error: any, validator: any) => error || validator(value), undefined);
