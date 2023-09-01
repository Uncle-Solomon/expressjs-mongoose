export interface UserType {
  username: string;
  password: string;
  // other parts of the schema, you decide.
}

export interface JWTPayload {
  user: {
    username: string;
  };
  refreshToken?: string;
}

export interface messagesType {
  topic: string;
  message: string;
}
