import React, {useCallback, useState} from 'react';
import {Button, Grid, TextField} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {MessageMutation, MessageType} from "@/src/types";
import {useMutation} from "@tanstack/react-query";
import axiosApi from "@/src/axiosApi";

const TextForm = () => {
  const [state, setState] = useState<MessageMutation>({
    password: '',
    encode: '',
    decode: ''
  })
  
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  };
  
  const onSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
  }
  
  const mutation = useMutation({
    mutationFn: async (message: MessageType) => {
      await axiosApi.post('/encode', {
        ...message,
      });
    },
  });
  
  const fetchDecodedMessage = useCallback(async () => {
    const response = await axiosApi.get<MessageType>('/');
    const message = response.data;
    
    return setState(prevState => ({
      ...prevState,
      decode: message.message
    }))
  }, []);
  
  const fetchEncodedMessage = useCallback(async () => {
    const response = await axiosApi.get<MessageType>('/');
    const message = response.data;
    
    return setState(prevState => ({
      ...prevState,
      encode: message.message
    }))
  }, [])
  
  
  const handleEncode = async () => {
    const newMessage: MessageType = {
      password: state.password,
      message: state.encode,
    }
    await mutation.mutateAsync(newMessage);
    await fetchDecodedMessage();
    console.log('encoded')
  };
  
  const handleDecode = async () => {
    const newMessage: MessageType = {
      password: state.password,
      message: state.decode,
    }
    await mutation.mutateAsync(newMessage);
    await fetchEncodedMessage()
    console.log('decoded')
    
  };
  
  return (
    <Grid container direction="column" spacing={2} sx={{mt: 2}}>
      <form onSubmit={onSubmitForm}>
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
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon/>}
            sx={{mr: 3}}
            disabled={mutation.isPending}
            onSubmit={handleEncode}
          >
            Encode
          </Button>
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon/>}
            disabled={mutation.isPending}
            onSubmit={handleDecode}
          >
            Decode
          </Button>
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