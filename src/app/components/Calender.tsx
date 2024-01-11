"use client"

import React,{useState, useEffect, useContext} from 'react';
import { CalenderProvider, CalenderContext } from './CalenderContext';
import dayjs , { Dayjs, ManipulateType } from 'dayjs';
import { useTheme }  from '@mui/material/styles';
import { Box, Typography, IconButton, Tooltip } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

type DatesState = Dayjs[][];

const useStyles = (theme: any) => ({
    root:{
        display: 'grid',
        flex: 1,
        gridTemplateColumns: 'repeat(7, 1fr)',
        gridTemplateRows: 'repeat(5, 1fr)',
        backgroundColor: 'white',
        border: '.2px solid black',
        width: '94vw',
        height: '86vh',
        marginTop: '8%',
        marginLeft: '2%', 

        [theme.breakpoints.down('xl')]: {
            width: '92vw'
        },
    },
    header: {
        position: 'absolute',
        top: '4%',
        left: '2%',
        width: '94vw',

        [theme.breakpoints.down('xl')]: {
            marginTop: '-1%',
        },
    },
    headerTitle: {
        textDecoration: 'underline',
        marginLeft: '.5%',
        fontSize: '1.5em',

        [theme.breakpoints.down('xl')]: {
            fontSize: '1.1em'
        },

    },
    calenderIcons: {
        display: 'flex',
        flexDirection: 'row',
        height: '2%',
        marginTop: '.8%',

        [theme.breakpoints.down('xl')]: {
           marginTop: '.7%' 
        },

    },
    calenderIcons2: {
        paddingRight: '2.5%',
    },
    calenderIcons3: {
        fontSize: '1.3em',

        [theme.breakpoints.down('xl')]: {
            fontSize: '1em',
        },

    }
})


const LargeCalender = () => {

    const theme = useTheme();
    const styles = useStyles(theme);

    const {date, setDate} = useContext(CalenderContext);
    const [activeDate, SetActiveDate] = useState(dayjs());
    const [dates, SetDates] = useState<DatesState>([]);

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


    const add = (x:ManipulateType) => {
        SetActiveDate(() => (activeDate.add(1, x)));
    }

    const remove = (x: ManipulateType) => {
        SetActiveDate(() => (activeDate.add(-1, x)));    
    }

    const today = () => {
        SetActiveDate(dayjs());
    }

    const MonthName = () => {
        let monthidx = activeDate.month();
        let month = "";

        switch (monthidx) {
            case 0:
                month = "January"
                break;
            case 1:
                month = "February"
                break;
            case 2:
                month = "March"
                break;
            case 3:
                month = "April"
                break;
            case 4:
                month = "May"
                break;
            case 5:
                month = "June"
                break;
            case 6:
                month = "July"
                break;
            case 7:
                month = "August"
                break;
            case 8:
                month = "September"
                break;
            case 9:
                month = "October"
                break;
            case 10:
                month = "November"
                break;
            case 11:
                month = "December"
                break;
            default:
                month = ""
                break;
        }

        return (
            <Typography sx={styles.headerTitle}>{month}</Typography>
        )
    }

    const Day = ({day, rowIdx}: any) => {

        const getCurrentDay = () => {
            if(day.format("DD-MM-YY") === activeDate.format("DD-MM-YY")){
                return {fontSize: '0.875rem', padding: '0.25rem',  
                        marginTop: '0.25rem', marginBottom: '0.25rem', 
                        backgroundColor: '#3b82f6', color: '#ffffff',  borderRadius: '9999px',  width: '1.75rem', height: '1.75rem'}
            } else {
                return {fontSize: '0.875rem', padding: '0.25rem',  marginTop: '0.25rem', marginBottom: '0.25rem'}
            }
        }

        return (
            <Box sx={{
                border: '1px solid #e2e8f0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                '&:hover': {
                    backgroundColor: 'lightblue',
                    cursor: 'pointer'
                },
            }}>
                <header style={{ display:'flex', flexDirection: 'column', alignItems: 'center'}}>
                    {rowIdx === 0 && (
                        <Typography component='p' sx={{fontSize: '0.875rem' , padding: '0.25rem', marginTop: '0.25rem'}} align='center'>{day.format('ddd').toUpperCase()}</Typography>
                    )}
                    
                    <Typography component='p' sx={getCurrentDay} align='center'>
                        {day.format('DD')}
                    </Typography>
                </header>
                
            </Box>
        )
    }

    return (
        <> 
            <Box sx={styles.header}>
                
                <MonthName/>
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
                                        <Day day={day} key={idx} rowIdx={i}/>
                                    </Box>
                                ))}
                            </React.Fragment>
                        )
                )}
            </Box>  
        </>
    )
}


const Calender = () => {
  return (
    <CalenderProvider>
        <LargeCalender/>
    </CalenderProvider>
  )
}

export default Calender;

/**
 * <p>{date.toISOString()}</p>
    <p onClick={() => add("month")}>Next</p>
    <p onClick={getDates}>Dates</p>

    // let temp = [];
        
        // const year = dayjs().year();
        // const month = date.month();
        // const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();

        // let index = 0 - firstDayOfMonth;

        // for(let i = index; i <= date.daysInMonth(); i++){
        //     temp.push(dayjs(new Date(date.year(), date.month(), i)))
        // }

        // SetDates(temp);
 */
