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

// FLOW TYPES
export type FlowDataType = {
  name: string
  bot: string
}

// FLOW BUILDER

export type FlowBuilderChildrenTextType = {
  id: string,
  type: string,
  value: string
}

export type FlowBuilderChildrenImageType = {
  id: string,
  type: string,
  selectedImage: any,
  imagePreviewUrl: string
}

export type FlowBuilderChildrenCardType = {
  id: string,
  type: string,
}

export type FlowStateType = {
  id: string,
  name: string, 
  position: {
    x: number,
    y: number
  },
  height: number,
  children: Array<FlowBuilderChildrenCardType | FlowBuilderChildrenImageType | FlowBuilderChildrenTextType | null>
}