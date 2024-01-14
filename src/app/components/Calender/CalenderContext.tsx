"use client"

import React, {useState, createContext, SetStateAction, Dispatch, ReactNode} from 'react';
import dayjs, { Dayjs, ManipulateType} from 'dayjs';


type DatesState = Dayjs[][];

export interface CalenderContextInterface {
    date: Dayjs,
    setDate: Dispatch<SetStateAction<Dayjs>>,
    activeDate: Dayjs,
    SetActiveDate: Dispatch<SetStateAction<Dayjs>>,
    dates: DatesState,
    SetDates: Dispatch<SetStateAction<DatesState>>,
    add: (x:ManipulateType) => void,
    remove: (x: ManipulateType) => void,
    today: () => void
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
    const [activeDate, SetActiveDate] = useState(dayjs());
    const [dates, SetDates] = useState<DatesState>([]);

    const monthMatrix = (x: string) => {

        const year = dayjs().year();
        let month: number;

        if(x === 'add'){
            month = activeDate.month() + 1;
        } else if(x === 'remove') {
            month = activeDate.month() - 1;
        } else {
            month = dayjs().month();
        }

        const firstDayOfMonth = dayjs(new Date(year, month, 1)).day();
        let currentMonthCount = 0 - firstDayOfMonth;

        const daysMatrix = new Array(5).fill([]).map(() => {
            return new Array(7).fill(null).map(() => {
                currentMonthCount++;
                return dayjs(new Date(year, month, currentMonthCount));
            });
        });

        SetDates(daysMatrix);
    }

    const add = (x: ManipulateType) => {
        if(x === "month"){
            SetActiveDate(() => (activeDate.add(1, x)));
            monthMatrix("add");
        } else {
            SetActiveDate(() => (activeDate.add(1, x)));
        }
    }

    const remove = (x: ManipulateType) => {
        if(x === "month"){
            SetActiveDate(() => (activeDate.add(-1, x)));
            monthMatrix("remove");  
        } else {
            SetActiveDate(() => (activeDate.add(-1, x)));
        }
    }

    const today = () => {
        SetActiveDate(dayjs());
        monthMatrix("");
    }

    return (
        <CalenderContext.Provider value={{ date, setDate, activeDate, SetActiveDate, dates, SetDates, add, remove, today}}>
            {children}
        </CalenderContext.Provider>
    )
}