export interface MessageType {
  password: string;
  text: string;
}

export interface MessageMutation {
  password: string;
  encode: string;
  decode: string;
}

export type MessageData = Omit<MessageType, 'password'>