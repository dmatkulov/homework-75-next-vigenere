import express from 'express';
import cors from 'cors';
import {MessageData} from "./types";
const Caesar = require('caesar-salad').Caesar;

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

let encodedData: MessageData = {
  text: ''
};

let decodedData: MessageData = {
  text: ''
};

app.get('/encode', (req, res) => {
  res.send(encodedData);
})

app.get('/encode', (req, res) => {
  res.send(decodedData);
})

app.post('/encode', (req, res) => {
  const { password, message: text } = req.body;
  encodedData.text = Caesar.Cipher(password).crypt(text);
  console.log('posted encode')
  res.json(encodedData);
});

app.post('/decode', (req, res) => {
  const { password, message: text } = req.body;
  
  decodedData.text = Caesar.Decipher(password).crypt(text);
  console.log('posted decode')
  res.json(decodedData);
});

app.listen(port, () => {
  console.log(`Server started on ${port} port`);
});
