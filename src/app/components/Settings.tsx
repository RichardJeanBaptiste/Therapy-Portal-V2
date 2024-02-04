import React, {useState, useEffect} from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';

const Settings = ({username}: any) => {

  const useStyles = (theme: any) => ({
    root: {
      width: '92.5vw',
      height: '99vh'
    },
    root2: {
      display: 'flex',
      flexDirection: 'row'
    },
    input_col1: {
      display:'flex',
      flexDirection: 'column',
      height: '85vh'
    },
    input_col2: {
      display: 'flex',
      flexDirection: 'column'
    },
    text_style: {
      paddingBottom: '2%',
    }
  })

  const theme = useTheme();
  const styles = useStyles(theme);
  const [firstName, SetFirstName] = useState("");
  const [lastName, SetLastName] = useState("");
  const [age, SetAge] = useState(0);
  const [speciality, SetSpecialty] = useState("");
  const [bio, SetBio] = useState("");
  const [education, SetEducation] = useState("");
  const [yearsWorking, SetYearsWorking] = useState("");

  useEffect(() => {
    
    axios.post('/api/getUser', {
      username: username
    }).then(function(response){
      SetFirstName(response.data.Info[0].Firstname);
      SetLastName(response.data.Info[0].Lastname);
      //SetAge(response.data.Info.Age);
      SetBio(response.data.Info[0].Bio);
      SetSpecialty(response.data.Info[0].Speciality);
      SetEducation(response.data.Info[0].Education);
      SetYearsWorking(response.data.Info[0].YearsWorking);
    }).catch((error) => {
      console.log(error);
    })
  },[]);

  return (
    <Box sx={styles.root}>
        <Typography variant='h3' component='h3' align='center'>Settings</Typography>
        <Box sx={styles.root2}>
            <Box sx={styles.input_col1}>
                <TextField sx={styles.text_style} type='text' label="First Name" placeholder={firstName}/>
                <TextField sx={styles.text_style} type='text' label="Last Name" placeholder={lastName}/>
                <TextField sx={styles.text_style} type='text' label="Age" placeholder={age.toString()}/>
                <TextField sx={styles.text_style} type='text' label="Specialty" placeholder={speciality}/>
                <TextField sx={styles.text_style} type='text' label="Bio" multiline placeholder={bio}/>
                <TextField sx={styles.text_style} type='text' label='Education' placeholder={education}/>
                <TextField sx={styles.text_style} type='text' label='Years Working' placeholder={yearsWorking}/>
            </Box>

            <Box sx={styles.input_col2}>
                <TextField sx={styles.text_style} type='password' label='Old Password'/>
                <TextField sx={styles.text_style} type='text' label='New Password'/>
                <TextField sx={styles.text_style} type='text' label='Re-enter'/>
            </Box>
        </Box>
    </Box>
  )
}

export default Settings
