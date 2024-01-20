"use client"

import React, {useState} from 'react';
import { Box, Typography, Modal } from "@mui/material";
import { useTheme }  from '@mui/material/styles';

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
        width: 400,
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
    }
})


const Day = ({day, rowIdx, currentDate, setActive, dayheader}: any) => {

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
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {currentDate.format("MM-DD-YY")}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} onClick={handleClose}>
                        Close
                    </Typography>
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