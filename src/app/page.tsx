"use client"

import React, {useState} from 'react';
import { Box, Typography, TextField, Button, FormControl, FormLabel, FormControlLabel, Radio, Modal, RadioGroup } from '@mui/material';
import { useTheme }  from '@mui/material/styles';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { QueryClient, QueryClientProvider, useMutation, useQuery } from '@tanstack/react-query';
import { RegistrationForm } from './components/RegistrationForm';


const useStyles = (theme: any) => ({
  root:{
    width: '98vw',
    height: '98vh',
  },

  /*********************** Login Styles *******************/
  loginForm: {
    display: 'flex',
    flexDirection: 'column',    
    position:'absolute',
    top: '30%',
    right: '3.5%',
    width: '22%',

    [theme.breakpoints.down('xl')]: {
      top: '33%',
      right: '4.5%',
      width: '27%',
    },

    [theme.breakpoints.down('lg')]: {
      top: '26%',
      right: '4.5%',
      width: '35%'
    },
    
    [theme.breakpoints.down('sm')]: {
      top:'50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '70%',
    }
  },
  loginTitle: {

    paddingBottom: '9em',
    
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5em',
      paddingBottom: '7em'
    }
  },
  loginTextField: {
    paddingBottom: '6%',
  },
  loginBtns: {
    [theme.breakpoints.down('lg')]: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%'
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column'
    }
  }
})

const queryClient = new QueryClient();


const Homepage = () => {

  const theme = useTheme();
  const styles = useStyles(theme);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loginUsername, SetLoginUsername] = useState("");
  const [loginPassword, SetLoginPassword] = useState("");
  const [disbaleButton, SetDisableButton] = useState(false);
  

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleLogin = (e: any) => {
    SetLoginUsername(e.target.value);
  }

  const handlePassword = (e:any) => {
    SetLoginPassword(e.target.value);
  }

  const mutation = useMutation({
    mutationFn: async () => {
      return axios.post('/api/login', {
        username: loginUsername,
        password: loginPassword
      })
      .then(function (response) {
  
        if(response.status === 200){

          SetDisableButton(false);
        
          if(response.data[2] === "therapist"){
            router.push(`/home/therapist/${response.data[1]}-${response.data[0]}`, {scroll: false});
          } else {
            router.push(`/home/client/${response.data[1]}-${response.data[0]}`, {scroll: false});
          }
        } else if(response.status === 404){
          console.log(response.data.msg);
        }
      })
      .catch(function (error) {
  
        if(error.response.status === 404){
          alert("Username or Password not found");
          SetDisableButton(false);
        } else {
          console.log(error);
          alert("Something Went Wrong");
          SetDisableButton(false);
        }
      });
    },
  })

  const handleSubmit = (e:any) => {
    e.preventDefault();
    SetDisableButton(true);
    mutation.mutate();
  }

  return (
    <Box sx={styles.root}>

      <RegistrationForm open={open} handleClose={handleClose}/>
      <form onSubmit={handleSubmit}>
        <FormControl sx={styles.loginForm}>
            <Typography align='center'sx={styles.loginTitle}>Login to Therapy Portal</Typography>
            <TextField sx={styles.loginTextField} label='Username' placeholder='Username' type='text' required onChange={handleLogin}/>
            <TextField sx={styles.loginTextField} label='Password' placeholder='Password' type='password' required onChange={handlePassword}/>
            <Box sx={styles.loginBtns}>
              <Button onClick={handleOpen}>Register</Button>
              <Button type='submit' disabled={disbaleButton}>Login</Button>
            </Box>
        </FormControl>
      </form>
      
    </Box>
  )
}



export default function Home() {

  return (
    <QueryClientProvider client={queryClient}>
      <Homepage/>
    </QueryClientProvider>
  )
  
}
