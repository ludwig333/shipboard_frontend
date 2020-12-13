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

// BOT TYPES
export type BotDataType = {
  name: string
}