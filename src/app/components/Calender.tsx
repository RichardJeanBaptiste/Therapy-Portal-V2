"use client"

import React,{useState, useEffect, useContext} from 'react';
import { CalenderProvider, CalenderContext } from './CalenderContext';
import dayjs , { Dayjs, ManipulateType } from 'dayjs';
import { useTheme }  from '@mui/material/styles';

type DatesState = Dayjs[][];
//type DatesState = Dayjs[];

const useStyles = (theme: any) => ({
    root:{
        
    }  
})


const LargeCalender = () => {

    const theme = useTheme();
    const styles = useStyles(theme);

    const {date, setDate} = useContext(CalenderContext);
    const [activeDate, SetActiveDate] = useState(dayjs());
    const [dates, SetDates] = useState<DatesState>([]);

    useEffect(() => {
        // let temp = [];
        
        // const year = dayjs().year();
        // const month = date.month();
        // const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();

        // let index = 0 - firstDayOfMonth;

        // for(let i = index; i <= date.daysInMonth(); i++){
        //     temp.push(dayjs(new Date(date.year(), date.month(), i)))
        // }

        // SetDates(temp);

        const year = dayjs().year();
        const month = date.month();
        const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();
        let currentMonthCount = 0 - firstDayOfMonth;

        const daysMatrix = new Array(5).fill([]).map(() => {
            return new Array(7).fill(null).map(() => {
                currentMonthCount++;
                
                // Create a Day.js object for each day in the matrix
                return dayjs(new Date(year, month, currentMonthCount));
            });
        });

        SetDates(daysMatrix);
    },[date]);

    const add = (x:ManipulateType) => {
        setDate(() => (date.add(1, x)));
    }

    const remove = (x: ManipulateType) => {
        setDate(() => (date.add(-1, x)));    
    }

    const getDates = () => {
        console.log(dates);
    }

    return (
        <>
            <p>{date.toISOString()}</p>
            <p onClick={() => add("month")}>Next</p>
            <p onClick={getDates}>Dates</p>
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
