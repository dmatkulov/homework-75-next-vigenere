import React, {useState} from 'react';
import {Button, Grid, TextField} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import {MessageType} from "@/src/types";

const TextForm = () => {
  const [state, setState] = useState<MessageType>({
    password: '',
    message: ''
  })
  
  return (
    <Grid container direction="column" spacing={2} sx={{mt: 2}}>
      <form>
        <Grid item xs sx={{mb: 2}}>
          <TextField
            required
            id="encode"
            type="encode"
            label="Encode"
            name="encode"
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
            />
          </Grid>
          <Button variant="contained" endIcon={<SendIcon/>} sx={{mr: 3}}>
            Encode
          </Button>
          <Button variant="contained" endIcon={<SendIcon/>}>
            Decode
          </Button>
        </Grid>
        <Grid item xs sx={{mb: 2}}>
          <TextField
            required
            id="decode"
            type="decode"
            label="Decode"
            name="decode"
          />
        </Grid>
      </form>
    </Grid>
  );
};

export default TextForm;