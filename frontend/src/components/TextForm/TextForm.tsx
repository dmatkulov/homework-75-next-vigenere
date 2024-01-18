import React, {useState} from 'react';
import {Button, Grid, TextField} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {MessageMutation, MessageType} from "@/src/types";
import {useMutation, useQuery} from "@tanstack/react-query";
import axiosApi from "@/src/axiosApi";

const TextForm = () => {
  const [state, setState] = useState<MessageMutation>({
    password: '',
    encode: '',
    decode: ''
  })
  
  const {data: messageResponse, isLoading} = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      const productsResponse = await axiosApi.get<MessageType>('/');
      return productsResponse.data;
    },
  });
  
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }))
  };
  
  const mutation = useMutation({
    mutationFn: async (message: MessageType) => {
      await axiosApi.post('/', {
        ...message,
      });
    },
  });
  
  const handleEncode = async (e: React.FormEvent) => {
    e.preventDefault();
    const newMessage: MessageType = {
      password: state.password,
      message: state.encode,
    }
    await mutation.mutateAsync(newMessage);
    
    if (!isLoading && messageResponse) {
      setState(prevState => ({
        ...prevState,
        decode: messageResponse.message
      }))
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
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon/>}
            sx={{mr: 3}}
            disabled={mutation.isPending}
            onClick={handleEncode}
          >
            Encode
          </Button>
          {/*<Button*/}
          {/*  type="submit"*/}
          {/*  variant="contained"*/}
          {/*  endIcon={<SendIcon/>}*/}
          {/*  disabled={mutation.isPending}*/}
          {/*  onClick={handleDecode}*/}
          {/*>*/}
          {/*  Decode*/}
          {/*</Button>*/}
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