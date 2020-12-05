export type DataFetchType = {
  data: object,
  error: string,
  isLoading: boolean
}

export type ReducerType = {
  state: object,
  action: () => object 
}

// AUTHENTICATION TYPES
export type CredentialData = {
  email: string,
  password: string
}

export type RegistrationData = {
  name: string,
  email: string,
  password: string,
  password_confirmation: string
}