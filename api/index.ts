import express from 'express';
import cors from 'cors';
import {DecodedData, EncodedData} from "./types";
const Caesar = require('caesar-salad').Caesar;

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

app.post('/encode', (req, res) => {
  const { password, message } = req.body;
  let messageEncoded = Caesar.Cipher(password).crypt(message)
  const encodedData: EncodedData = {
    encoded: messageEncoded,
  }
  res.json(encodedData);
});

app.post('/decode', (req, res) => {
  const { password, message } = req.body;
  let messageDecoded = Caesar.Decipher(password).crypt(message);
  const decodedData: DecodedData = {
    decoded: messageDecoded,
  }
  res.json(decodedData);
});

app.listen(port, () => {
  console.log(`Server started on ${port} port`);
});
