export interface MessageType {
  password: string;
  text: string;
}

export type MessageData = Omit<MessageType, 'password'>