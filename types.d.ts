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
export type Credential = {
  email: string,
  password: string
}

export type registerType = {
  name: string,
  email: string,
  password: string,
  confirmation_password: string
}