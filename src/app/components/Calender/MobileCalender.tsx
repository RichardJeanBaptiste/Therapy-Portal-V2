"use client"

import React,{useEffect, useContext} from 'react';
import { CalenderContext } from './CalenderContext';
import dayjs from 'dayjs';
import { useTheme }  from '@mui/material/styles';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MonthName from './MonthName';
import Day from './Day';


const useStyles = (theme: any) => ({
    root: {
        display: 'grid',
        flex: 1,
        gridTemplateColumns: 'repeat(7, 1fr)',
        gridTemplateRows: 'repeat(5, 1fr)',
        backgroundColor: 'white',
        width: '80vw',
        height: '38vh',
        marginTop: '29vh',
        marginLeft: '1%',
    },
    header:{
        position: 'absolute',
        top: '17%',
        left: '2%',
        width: '94vw',
    },
    calenderIcons: {
        display: 'flex',
        flexDirection: 'row',
        height: '2%',
        marginTop: '.8%',
        marginLeft: '-3%'
    },
    calenderIcons2: {
        paddingRight: '2.5%',
    },
    calenderIcons3: {
        fontSize: '20px',
    },
    dayheader: {
        fontSize: "0.8em",
        padding: '0.25rem',
        marginTop: '0.25rem',
        color: 'red'
    },
})


const MobileCalender = () => {

    const theme = useTheme();
    const styles = useStyles(theme);

    const {date, setDate, activeDate, SetActiveDate, dates, SetDates, add, remove, today} = useContext(CalenderContext);
    
    useEffect(() => {
        const year = dayjs().year();
        const month = date.month();
        const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();
        let currentMonthCount = 0 - firstDayOfMonth;

        const daysMatrix = new Array(5).fill([]).map(() => {
            return new Array(7).fill(null).map(() => {
                currentMonthCount++;
                return dayjs(new Date(year, month, currentMonthCount));
            });
        });

        
        SetDates(daysMatrix);
    },[date]);


    const PrevMonth = () => {

    }

    const NextMonth = () => {

    }

    return (
        <>
            <Box sx={styles.header}>
                <MonthName headertitle={styles.header} monthidx={activeDate.month()}/>
                <Box sx={styles.calenderIcons}>
                    <Tooltip title="Previous Month" placement='bottom' arrow>
                        <IconButton sx={styles.calenderIcons2} onClick={() => remove('month')}>
                            <KeyboardDoubleArrowLeftIcon sx={styles.calenderIcons3}/>
                        </IconButton>
                    </Tooltip>
                        
                    <Tooltip title="Previous Day" placement='bottom'>
                        <IconButton sx={styles.calenderIcons2} onClick={() => remove('day')}>
                            <KeyboardArrowLeftIcon sx={styles.calenderIcons3} />
                        </IconButton>
                    </Tooltip>
                        
                    <Tooltip title="Today" placement='bottom' arrow>
                        <IconButton sx={styles.calenderIcons2} onClick={today}>
                            <EventIcon sx={styles.calenderIcons3}/>
                        </IconButton>
                    </Tooltip>
                        
                    <Tooltip title="Next Day" placement='bottom' arrow>
                        <IconButton sx={styles.calenderIcons2} onClick={() => add('day')}>
                            <KeyboardArrowRightIcon sx={styles.calenderIcons3}/>
                        </IconButton>
                    </Tooltip>
                        
                    <Tooltip title="Next Month" placement='bottom' arrow>
                        <IconButton sx={styles.calenderIcons2} onClick={() => add('month')}>
                            <KeyboardDoubleArrowRightIcon sx={styles.calenderIcons3}/>
                        </IconButton>
                    </Tooltip>
                        
                </Box>
            </Box>

            <Box sx={styles.root}> 
                {dates.map((row, i) => (
                            <React.Fragment key={i}>
                                {row.map((day, idx) => (
                                    <Box key={idx}>
                                        <Day day={day} key={idx} rowIdx={i} currentDate={activeDate} setActive={SetActiveDate} dayheader={styles.dayheader}/>
                                    </Box>
                                ))}      
                            </React.Fragment>
                        )
                )}
            </Box>
        </>
    )
}

export default MobileCalender;