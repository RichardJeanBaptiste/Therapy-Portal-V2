"use client"

import React, {useState, useContext, createContext, SetStateAction, Dispatch, ReactNode} from 'react';

export type User = {
    id: string,
    Username: string,
    Role: string,
    DatesAvailable: Array<string>,
    DatesScheduled: Array<string>,
    Info: Array<string>,
}


export interface UserContextInterface {
    user: User,
    setUser: Dispatch<SetStateAction<User>>
}


const defaultState = {
    user: {
        Username: "",
    },
    setUser: (user:User) => {}
} as UserContextInterface

export const UserContext = createContext<UserContextInterface>(defaultState);

type UserProvideProps = {
    children: ReactNode
}

export const UserProvider = ({children}: UserProvideProps) => {

    const [user, setUser] = useState<User>({
        id: "",
        Username: "",
        Role: "",
        DatesAvailable: [],
        DatesScheduled: [],
        Info:[], 
    });
    
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export const useStateValue = (): UserContextInterface=> {
    const contextValue = useContext(UserContext);
    if (contextValue === undefined) {
      throw new Error("useStateValue must be used within a UserProvider");
    }
    return contextValue;
};