"use client"

import React,{useState, useEffect} from 'react';
import { CalenderProvider} from './CalenderContext';
import DesktopCalender from './DesktopCalender';
import MobileCalender from './MobileCalender';




const Calender = () => {

    const [screenWidth, SetScreenWidth] = useState(426);

    const handleResize = () => {
        SetScreenWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[])


    if(screenWidth < 500){
        return (
            <CalenderProvider>
                <MobileCalender/>
            </CalenderProvider>
        )
    } else {
        return (
            <CalenderProvider>
                <DesktopCalender/>
            </CalenderProvider>
        )
    }
}

export default Calender;

