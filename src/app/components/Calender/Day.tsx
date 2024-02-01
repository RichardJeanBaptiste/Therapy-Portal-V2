"use client"

import React, {useState, useEffect} from 'react';
import { Box, Typography, Modal, Divider, Button, FormControl, TextField } from "@mui/material";
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useTheme }  from '@mui/material/styles';
import axios from 'axios';
import dayjs from 'dayjs';


const Day = ({day, rowIdx, currentDate, setActive, dayheader, username}: any) => {

    const [showMainModel, SetShowMainModel] = useState("flex");
    const [showAddClient, SetShowAddClient] = useState("none");
    const [clientFirst, SetClientFirst] = useState("");
    const [clientLast, SetClientLast] = useState("");
    const [appTime, SetAppTime] = useState("");
    const [duration, SetDuration] = useState("30");
    const [datesScheduled, SetDatesScheduled]= useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const useStyles = (theme: any) => ({
        header: {
            display:'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            cursor: 'grab',
            '&:hover': {
                
            }
        },
        modalStyle: {
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 450,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        },
        selectedDay: {
            fontSize: '0.875rem', 
            padding: '0.25rem',  
            marginTop: '0.25rem', 
            marginBottom: '0.25rem', 
            backgroundColor: '#3b82f6', 
            color: '#ffffff',  
            borderRadius: '9999px',  
            width: '1.75rem', 
            height: '1.75rem'
        },
        unSelectedDay: {
            fontSize: '0.875rem', 
            padding: '0.25rem',  
            marginTop: '0.25rem', 
            marginBottom: '0.25rem'
        },
        innerModalBox: {
            display: showMainModel,
            flexDirection: 'row',
            width:'100%',
            height: '98%'
        },
        innerModal1: {
            width: '50%'
        },
        innerModal2: {
            width: '32%',
            marginLeft: '17%'
        },
        add_client: {
            display: showAddClient,
        },
        textField1: {
            paddingBottom: '2%',
        }
    })

    const theme = useTheme();
    const styles = useStyles(theme);
    
    useEffect(() => {
        axios.post('/api/get_dates_scheduled/', {
            Username: username,
        }).then(function(response){
            //console.log(response.data);
            SetDatesScheduled(response.data);
        }).catch(function(error){
            console.log(error);
            alert("Something went wrong :(");
        });
    },[]);

    const getCurrentDay = () => {
        if(day.format("DD-MM-YY") === currentDate.format("DD-MM-YY")){
            return styles.selectedDay
        } else {
            return styles.unSelectedDay
        }
    }

    const changeActive = () => {
        setActive(day);
        handleOpen();
    }


    const makeAvailableMutation = useMutation({
        mutationFn: async () => {
            axios.post('/api/make_date_available/', {
                Username: username,
                newDate: currentDate
            }).then(function(response){
                alert(response.data.msg);
            }).catch(function (error) {
            console.log(error);
            alert("Something went wrong :(");
            });
        }
    })

    
    const addClientMutation = useMutation({
        mutationFn: async () => {
            axios.post('/api/add_client/', {
                Username: username,
                Firstname: clientFirst,
                Lastname: clientLast, 
                newDate: currentDate,
                appointmentTime: appTime,
                duration: duration
            }).then(function(response){
                alert(response.data.msg);
            }).catch(function(error){
                console.log(error);
                alert("Something went wrong :(");
            });
        }
    })


    const changeClientDisplay = () => {

        if(showAddClient === "none"){
            SetShowAddClient("block");
            SetShowMainModel("none");
        } else {
            SetShowAddClient("none");
            SetShowMainModel("flex");
        }    
    }

    const handleClientFirst = (e: any) => {
        SetClientFirst(e.target.value);
    }

    const handleClientLast = (e: any) => {
        SetClientLast(e.target.value);
    }

    
    
    const ShowDatesScheduled = () => {
        return (
            <ul style={{marginLeft: '-5%'}}>
                {Array.isArray(datesScheduled) ? (
                    datesScheduled.map((x, i) => (
                        <li key={i}>{dayjs(x).format('MM/DD/YYYY')}</li>
                    ))
                ) : (
                    <></>
                )}
            </ul>
        )
    }

    const deleteReservation = () => {

    }

    const cancel = () => {
        handleClose();
    }

    return (
        <Box sx={{
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
            }} 
        >
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styles.modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" align='center' sx={{ paddingBottom: '2%'}}>
                        {currentDate.format("MM-DD-YY")}
                    </Typography>

                    <Box sx={styles.innerModalBox}>
                        <Box sx={styles.innerModal1}>
                            <Button variant="text" onClick={() => makeAvailableMutation.mutate()}>Make Available</Button>
                            <Button variant="text" onClick={changeClientDisplay}>Add Client</Button>
                            <Button variant="text" onClick={deleteReservation}>Delete Reservation</Button>
                            <Button variant="text" onClick={cancel}>Cancel</Button>
                        </Box>

                        <Divider orientation='vertical' variant="middle" flexItem sx={{height: '200px'}}/>

                        <Box sx={styles.innerModal2}>
                            <Typography variant="h6" component="p" align='center'>Appointments Scheduled</Typography>
                            <ShowDatesScheduled/>
                        </Box>  
                    </Box>

                    <Box sx={styles.add_client}>

                        <FormControl sx={{ width: '100%' }}>
                            <TextField sx={styles.textField1} type='text' variant='outlined' label='First Name' fullWidth onChange={handleClientFirst}/>
                            <TextField sx={styles.textField1} type='text' variant='outlined' label='Last Name' fullWidth onChange={handleClientLast}/>

                            <Box sx={{ paddingBottom: '2%'}}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker label="Time" onChange={(value: any) => SetAppTime(dayjs(value).format('hh:mm:ss A'))}/>
                                </LocalizationProvider>
                            </Box>

                            <Box sx={{ paddingBottom: '2%'}}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <TimePicker label='duration' views={['minutes', 'seconds']} format="mm:ss" onChange={(value: any) => SetDuration(dayjs(value).format('mm:ss')) }/>
                                </LocalizationProvider>
                            </Box>  
                        </FormControl>

                        <Box sx={{ display: 'flex', flexDirection: 'row'}}>
                            <Button color='error' variant='text' onClick={changeClientDisplay}>Cancel</Button>
                            <Button color='success' variant='text' onClick={() => addClientMutation.mutate()}>Add</Button>
                        </Box>
                        
                    </Box>
                </Box>   
            </Modal>

            <header style={{ }}>
                {rowIdx === 0 && (
                    <Typography component='p' sx={dayheader} align='center'>{day.format('ddd').toUpperCase()}</Typography>
                )}
                
                <Typography component='p' sx={getCurrentDay} onClick={changeActive} align='center'>
                    {day.format('DD')}
                </Typography>
            </header>
            
        </Box>
    )
}

export default Day;
