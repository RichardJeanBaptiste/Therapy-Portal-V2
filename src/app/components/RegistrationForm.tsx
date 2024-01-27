"use client"

import React, {useState} from 'react';
import { Box, Typography, TextField, Button, FormControl, FormLabel, FormControlLabel, Radio, Modal, RadioGroup } from '@mui/material';
import { QueryClient, QueryClientProvider, useMutation, useQuery } from '@tanstack/react-query';
import { useTheme }  from '@mui/material/styles';
import axios from 'axios';

const useStyles = (theme: any) => ({

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

const queryClient = new QueryClient();

export const RegistrationForm = ({open, handleClose}: any) => {

    const theme = useTheme();
    const styles = useStyles(theme);
    
    const [regUsername, SetRegUsername] = useState("");
    const [regPassword, SetRegPassword] = useState("");
    const [regRole, SetRegRole] = useState("");
    const [regFirstName, SetRegFirstName] = useState("");
    const [regLastName, SetRegLastName] = useState("");
    const [regAge, SetRegAge] = useState("");
    const [regBio, SetRegBio] = useState("");
    const [regSpecialty, SetRegSpecialty] = useState("");
    const [regEducation, SetRegEducation] = useState("");
    const [regYearsWorking, SetRegYearsWorking] = useState("");
    const [disbaleButton, SetDisableButton] = useState(false);

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

    const handleRegFirstname = (e: any) => {
        SetRegFirstName(e.target.value);
    }

    const handleRegLastname = (e: any) => {
        SetRegLastName(e.target.value);
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


    const mutation = useMutation({
        mutationFn: async () => {
            let data = {
                username: regUsername,
                password: regPassword,
                role: regRole,
                firstname: regFirstName,
                lastname: regLastName,
                age: regAge,
                bio: regBio,
                specialty: regSpecialty,
                education: regEducation,
                yearsWorking: regYearsWorking
            }
            return axios.post('/api/register', data)
                    .then(function (response) {
                        alert(response.data.msg);
                        SetRegUsername("");
                        SetRegPassword("");
                        SetRegFirstName("");
                        SetRegLastName("");
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
            },
      })
    
    const handleRegSubmit = (e:any) => {
        e.preventDefault();
        SetDisableButton(true);
        mutation.mutate();
    }

    return (
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
                <TextField sx={styles.modalTextField} label='Firstname' placeholder='Firstname' type='text' onChange={handleRegFirstname} required/>
                <TextField sx={styles.modalTextField} label='Lastname' placeholder='Lastname' type='text' onChange={handleRegLastname} required/>
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
                    <Button type='submit' disabled={disbaleButton}>Register</Button>
                </Box>
          </form>
        </Box>
      </Modal>
    )
}
