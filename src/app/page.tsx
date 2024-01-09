"use client"

import React, {useState, useContext} from 'react';
import { Box, Typography, TextField, Button, FormControl, FormLabel, FormControlLabel, Radio, Modal, RadioGroup } from '@mui/material';
import { useTheme }  from '@mui/material/styles';
import axios from 'axios';
import { useRouter } from 'next/navigation';



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
  },
  /****************** Modal Styles *****************/
  modalStyle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

    width: 400,

    [theme.breakpoints.down('lg')]: {
      width: 400,
    },

    [theme.breakpoints.down('sm')]: {
      width: 200,
    },
  },
  modalForm: {
    width:'100%',
    height: '35em',
    overflowY: 'scroll',
  },
  modalTextField: {
    paddingBottom: '4%',
  }
})

export default function Home() {

  const theme = useTheme();
  const styles = useStyles(theme);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  /******************** Registration States ****************/
  const [regUsername, SetRegUsername] = useState("");
  const [regPassword, SetRegPassword] = useState("");
  const [regRole, SetRegRole] = useState("");
  const [regName, SetRegName] = useState("");
  const [regAge, SetRegAge] = useState("");
  const [regBio, SetRegBio] = useState("");
  const [regSpecialty, SetRegSpecialty] = useState("");
  const [regEducation, SetRegEducation] = useState("");
  const [regYearsWorking, SetRegYearsWorking] = useState("");

  /******************** Login States ***********************/
  const [loginUsername, SetLoginUsername] = useState("");
  const [loginPassword, SetLoginPassword] = useState("");


  /***************** Login Handlers ***********************/
  const handleLogin = (e: any) => {
    SetLoginUsername(e.target.value);
  }

  const handlePassword = (e:any) => {
    SetLoginPassword(e.target.value);
  }

  const handleSubmit = (e:any) => {
    e.preventDefault();

    axios.post('/api/login', {
      username: loginUsername,
      password: loginPassword
    })
    .then(function (response) {

      if(response.status === 200){
      
        if(response.data[2] === "therapist"){
          router.push(`/home/therapist/${response.data[1]}-${response.data[0]}`, {scroll: false});
        } else {
          router.push(`/home/client/${response.data[1]}-${response.data[0]}`, {scroll: false});
        }
        //router.push(`/home/${response.data[1]}-${response.data[0]}`, {scroll: false});
      } else if(response.status === 404){
        console.log(response.data.msg);
      }
    })
    .catch(function (error) {

      if(error.response.status === 404){
        alert("Username or Password not found");
      } else {
        console.log(error);
        alert("Something Went Wrong");
      }
      
    });
  }

  /************* Registration Functions ***************/

  const handleOpen = () => {
      setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleRegRole = (e: any) => {
    SetRegRole(e.target.value);
  }

  const handleDisplay = (): string => {
    if(regRole === 'therapist'){
      return 'block'
    } else {
      return 'none'
    }
  }

  const handleRegUsername = (e: any) => {
    SetRegUsername(e.target.value);
  }

  const handleRegPassword = (e: any) => {
    SetRegPassword(e.target.value);
  }

  const handleRegName = (e: any) => {
    SetRegName(e.target.value);
  }

  const handleRegAge = (e: any) => {
    SetRegAge(e.target.value);
  }

  const handleRegBio = (e: any) => {
    SetRegBio(e.target.value);
  }

  const handleRegSpecialty = (e: any) => {
    SetRegSpecialty(e.target.value);
  }

  const handleRegEducation = (e: any) => {
    SetRegEducation(e.target.value);
  }

  const handleRegYearsWorking = (e: any) => {
    SetRegYearsWorking(e.target.value);
  }

  const handleRegSubmit = (e:any) => {
    e.preventDefault();

    let data = {
      username: regUsername,
      password: regPassword,
      role: regRole,
      name: regName,
      age: regAge,
      bio: regBio,
      specialty: regSpecialty,
      education: regEducation,
      yearsWorking: regYearsWorking
    }

    axios.post('/api/register', data)
    .then(function (response) {

      alert(response.data.msg);
      SetRegUsername("");
      SetRegPassword("");
      SetRegName("");
      SetRegAge("");
      SetRegRole("");
      SetRegBio("");
      SetRegSpecialty("");
      SetRegEducation("");
      SetRegYearsWorking("");
      handleClose();
    })
    .catch(function (error) {
      console.log(error);
      alert("Something Went Wrong");
    });

    
  }

  return (
    <Box sx={styles.root}>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="Registration form"
        aria-describedby="enter your information to register a new account"
      >
        <Box sx={styles.modalStyle}>
          <form onSubmit={handleRegSubmit}>
            <Typography component='h3' variant='h4' align='center' sx={{ paddingBottom: '5%'}}>Register</Typography>
            <FormControl sx={styles.modalForm}>
                
                <FormControl sx={{ paddingBottom: '2%'}} required>
                  <FormLabel>Role</FormLabel>
                  <RadioGroup
                    row
                  >
                    <FormControlLabel value="client" control={<Radio />} label="Client" onClick={handleRegRole}/>
                    <FormControlLabel value="therapist" control={<Radio />} label="Therapist" onClick={handleRegRole}/>
                  </RadioGroup>
                </FormControl>

                <TextField sx={styles.modalTextField} label='Username' placeholder="Username" type="text" onChange={handleRegUsername} required/>
                <TextField sx={styles.modalTextField} label='Password' placeholder='Password' type="password" onChange={handleRegPassword} required/>
                <TextField sx={styles.modalTextField} label='Name' placeholder='Name' type='text' onChange={handleRegName} required/>
                <TextField sx={styles.modalTextField} label='Age' placeholder='Age' type='text' onChange={handleRegAge} />
                <TextField sx={styles.modalTextField} label="Bio" variant="outlined"  multiline maxRows={4} fullWidth onChange={handleRegBio}/>
                <Box sx={{ display:handleDisplay }}>
                    <TextField id="specialty"  label="Specialty" variant="outlined"   fullWidth sx={{ paddingBottom: '2.5%'}} onChange={handleRegSpecialty}/>
                    <TextField id="education"  label="Education" variant="outlined"   fullWidth sx={{ paddingBottom: '2.5%'}} onChange={handleRegEducation}/>
                    <TextField id="years_working"  label="Years Working" variant="outlined"   fullWidth sx={{ paddingBottom: '2.5%'}} onChange={handleRegYearsWorking}/>
                </Box>
            </FormControl>
                <Box sx={{ display: 'flex', flexDirection:'row'}}>
                    <Button variant='text' color='error' onClick={handleClose}>Cancel</Button>
                    <Button type='submit'>Register</Button>
                </Box>
          </form>
        </Box>
      </Modal>

      <form onSubmit={handleSubmit}>
        <FormControl sx={styles.loginForm}>
            <Typography align='center'sx={styles.loginTitle}>Login to Therapy Portal</Typography>
            <TextField sx={styles.loginTextField} label='Username' placeholder='Username' type='text' required onChange={handleLogin}/>
            <TextField sx={styles.loginTextField} label='Password' placeholder='Password' type='password' required onChange={handlePassword}/>
            <Box sx={styles.loginBtns}>
              <Button onClick={handleOpen}>Register</Button>
              <Button type='submit'>Login</Button>
            </Box>
        </FormControl>
      </form>
      
    </Box>
  )
}
