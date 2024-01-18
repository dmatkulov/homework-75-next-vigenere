export interface MessageType {
  password: string;
  message: string;
}

export interface MessageMutation {
  password: string;
  encode: string;
  decode: string;
}