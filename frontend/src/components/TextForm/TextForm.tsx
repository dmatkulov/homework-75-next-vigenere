import React, {useState} from 'react';
import {Grid, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {DecodedData, EncodedData, MessageMutation, MessageType} from '@/src/types';
import {useMutation} from '@tanstack/react-query';
import axiosApi from '@/src/axiosApi';
import {LoadingButton} from '@mui/lab';

const TextForm = () => {
  const [state, setState] = useState<MessageMutation>({
    password: '',
    encode: '',
    decode: ''
  });
  
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const encodeMutation = useMutation<EncodedData, Error, MessageType>({
    mutationFn: async (message: MessageType) => {
      const response = await axiosApi.post('/encode', message);
      return response.data;
    }
  });
  
  const decodeMutation = useMutation<DecodedData, Error, MessageType>({
    mutationFn: async (message: MessageType) => {
      const response = await axiosApi.post('/decode', message);
      return response.data;
    }
  });
  
  const handleEncode = async (e: React.FormEvent) => {
    e.preventDefault();
    const newMessage: MessageType = {
      password: state.password,
      message: state.encode,
    };
    
    if (state.password.length > 0) {
      const encodedData = await encodeMutation.mutateAsync(newMessage);
      setState(prevState => ({
        ...prevState,
        decode: encodedData.encoded,
      }));
    }
  };
  
  const handleDecode = async (e: React.FormEvent) => {
    e.preventDefault();
    const newMessage: MessageType = {
      password: state.password,
      message: state.decode,
    };
    
    if (state.password.length > 0) {
      const decodedData = await decodeMutation.mutateAsync(newMessage);
      setState(prevState => ({
        ...prevState,
        encode: decodedData.decoded
      }));
    }
  };
  
  return (
    <Grid container direction="column" spacing={2} sx={{mt: 2}}>
      <form>
        <Grid item xs sx={{mb: 2}}>
          <TextField
            id="encode"
            type="encode"
            label="Encode"
            name="encode"
            value={state.encode}
            onChange={onInputChange}
          />
        </Grid>
        <Grid container direction="row" alignItems="center" justifyContent="space-between" sx={{mb: 2}}>
          <Grid item xs sx={{mr: 3}}>
            <TextField
              required
              id="password"
              type="password"
              label="Password"
              name="password"
              value={state.password}
              onChange={onInputChange}
            />
          </Grid>
          <LoadingButton
            type="submit"
            variant="contained"
            loadingPosition="start"
            startIcon={<SendIcon/>}
            sx={{mr: 3}}
            loading={encodeMutation.isPending}
            disabled={state.password.length < 1 || encodeMutation.isPending}
            onClick={handleEncode}
          >
            Encode
          </LoadingButton>
          <LoadingButton
            type="submit"
            variant="outlined"
            loadingPosition="start"
            startIcon={<SendIcon/>}
            loading={decodeMutation.isPending}
            disabled={state.password.length < 1 || decodeMutation.isPending}
            onClick={handleDecode}
          >
            Decode
          </LoadingButton>
        </Grid>
        <Grid item xs sx={{mb: 2}}>
          <TextField
            id="decode"
            type="decode"
            label="Decode"
            name="decode"
            value={state.decode}
            onChange={onInputChange}
          />
        </Grid>
      </form>
    </Grid>
  );
};

export default TextForm;