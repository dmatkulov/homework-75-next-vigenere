import express from 'express';
import cors from 'cors';
import {MessageType} from "./types";
const Caesar = require('caesar-salad').Caesar;

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  const { password, message } = req.body;
  
  const encodedText = Caesar.Cipher(password).crypt(message);
  const newMessage: MessageType = {
    password,
    message: encodedText
  }
  res.json(newMessage);
});

app.post('/', (req, res) => {
  const { password, message } = req.body;
  
  const encodedText = Caesar.Cipher(password).crypt(message);
  const newMessage: MessageType = {
    password,
    message: encodedText
  }
  res.json(newMessage);
});

app.listen(port, () => {
  console.log(`Server started on ${port} port`);
});
