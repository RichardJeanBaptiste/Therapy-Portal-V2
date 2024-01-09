"use client"

import React, {useState, createContext, SetStateAction, Dispatch, ReactNode} from 'react';
import dayjs, { Dayjs} from 'dayjs';



export interface CalenderContextInterface {
    date: Dayjs,
    setDate: Dispatch<SetStateAction<Dayjs>>
}

const defaultState = {
    date: dayjs(),
    setDate: (date: Dayjs) => {}
} as CalenderContextInterface;


export const CalenderContext = createContext<CalenderContextInterface>(defaultState);

type CalenderProviderProps = {
    children: ReactNode
}

export const CalenderProvider = ({children}: CalenderProviderProps) => {

    const [date, setDate] = useState(dayjs());

    return (
        <CalenderContext.Provider value={{ date, setDate }}>
            {children}
        </CalenderContext.Provider>
    )
}