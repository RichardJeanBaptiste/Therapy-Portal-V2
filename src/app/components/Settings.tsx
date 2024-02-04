import React, {useState, useEffect} from 'react';
import { Box, TextField, Typography, Button } from '@mui/material';
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
  const [oldPassword, SetOldPassword] = useState("");
  const [passHash, SetPassHash] = useState("");
  /*********************************************************/
  const [orgFirstName, SetOrgFirstName] = useState("");
  const [orgLastName, SetOrgLastName] = useState("");
  const [orgAge, SetOrgAge] = useState("");
  const [orgSpeciality, SetOrgSpeciality] = useState("");
  const [orgBio, SetOrgBio] = useState("");
  const [orgEducation, SetOrgEducation] = useState("");
  const [orgYearsWorking, SetOrgYearsWorking] = useState("");

  useEffect(() => {
    
    axios.post('/api/getFullUserInfo', {
      username: username
    }).then(function(response){

        SetFirstName(response.data.Info[0].Firstname);
        SetOrgFirstName(response.data.Info[0].Firstname);
        SetLastName(response.data.Info[0].Lastname);
        SetOrgLastName(response.data.Info[0].Lastname)
        //SetAge(response.data.Info.Age);
        SetPassHash(response.data.Password);
        SetBio(response.data.Info[0].Bio);
        SetOrgBio(response.data.Info[0].Bio)
        SetSpecialty(response.data.Info[0].Speciality);
        SetOrgSpeciality(response.data.Info[0].Speciality);
        SetEducation(response.data.Info[0].Education);
        SetOrgEducation(response.data.Info[0].Education);
        SetYearsWorking(response.data.Info[0].YearsWorking);
        SetOrgYearsWorking(response.data.Info[0].YearsWorking);
      }).catch((error) => {
        console.log(error);
      })
  },[]);

  const handleReset = () => {
      SetFirstName(orgFirstName);
      SetLastName(orgLastName);
      //SetAge(orgAge);
      SetBio(orgBio);
      SetSpecialty(orgSpeciality);
      SetEducation(orgEducation);
      SetYearsWorking(orgYearsWorking);
  }

  const handleFirstName = (e:any) => {
    SetFirstName(e.target.value);
  }

  const handleLastName = (e:any) => {
    SetLastName(e.target.value);
  }

  const handleSpeciality = (e:any) => {
    SetSpecialty(e.target.value);
  }

  const handleBio = (e:any) => {
    SetBio(e.target.value);
  }

  const handleEducation = (e:any) => {
    SetEducation(e.target.value);
  }

  const handleYearsWorking = (e:any) => {
    SetYearsWorking(e.target.value);
  }


  return (
    <Box sx={styles.root}>
        <Typography variant='h3' component='h3' align='center'>Settings</Typography>
        <Box sx={styles.root2}>
            <Box sx={styles.input_col1}>
                <TextField sx={styles.text_style} type='text' label="First Name" value={firstName} onChange={handleFirstName}/>
                <TextField sx={styles.text_style} type='text' label="Last Name" value={lastName} onChange={handleLastName}/>
                <TextField sx={styles.text_style} type='text' label="Age" value={age.toString()}/>
                <TextField sx={styles.text_style} type='text' label="Specialty" value={speciality} onChange={handleSpeciality}/>
                <TextField sx={styles.text_style} type='text' label="Bio" multiline value={bio} onChange={handleBio}/>
                <TextField sx={styles.text_style} type='text' label='Education' value={education} onChange={handleEducation}/>
                <TextField sx={styles.text_style} type='text' label='Years Working' value={yearsWorking} onChange={handleYearsWorking}/>
            </Box>

            <Box sx={styles.input_col2}>
                <TextField sx={styles.text_style} type='password' label='Old Password'/>
                <TextField sx={styles.text_style} type='text' label='New Password'/>
                <TextField sx={styles.text_style} type='text' label='Re-enter'/>
            </Box>
        </Box>
        <Box sx={{ dispaly: 'flex', flexDirection: 'row'}}>
            <Button variant='outlined' color='error' onClick={handleReset}>Reset</Button>
            <Button variant='outlined' color='success'>Save</Button>
        </Box>
    </Box>
  )
}

export default Settings
