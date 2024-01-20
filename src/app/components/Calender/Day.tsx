"use client"

import React, {useState} from 'react';
import { Box, Typography, Modal, Divider, Button } from "@mui/material";
import { useTheme }  from '@mui/material/styles';
import axios from 'axios';

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
        display: 'flex',
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
    }
})


const Day = ({day, rowIdx, currentDate, setActive, dayheader, username}: any) => {

    const theme = useTheme();
    const styles = useStyles(theme);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    
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

    const makeAvailable = () => {
        
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

    const addClient = () => {

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
                            <Button variant="text" onClick={makeAvailable}>Make Available</Button>
                            <Button variant="text" onClick={addClient}>Add Client</Button>
                            <Button variant="text" onClick={deleteReservation}>Delete Reservation</Button>
                            <Button variant="text" onClick={cancel}>Cancel</Button>
                        </Box>

                        <Divider orientation='vertical' variant="middle" flexItem sx={{height: '200px'}}/>

                        <Box sx={styles.innerModal2}>
                            <Typography variant="h6" component="p" align='center'>Appointments Scheduled</Typography>
                            <ul>
                                <li>A</li>
                                <li>B</li>
                                <li>C</li>
                                <li>D</li>
                            </ul>
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