export interface MessageType {
  password: string;
  message: string;
}

export interface MessageMutation {
  password: string;
  encode: string;
  decode: string;
}

export interface EncodedData {
  encoded: string
}

export interface DecodedData {
  decoded: string
}