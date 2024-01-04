"use client"

import React, {useEffect, useState, useContext} from 'react';
import { UserContext, UserProvider } from '../../../components/UserContext';
import axios from 'axios';


const Homepage = (props: any) => {
    const {user, setUser} = useContext(UserContext);

    useEffect(() => {

        console.log(props.username);

        axios.post('/api/getUser', {
            username: props.username,
        }).then(function (response){
    
            console.log(response.data)
            setUser((prevUser) => ({ 
                ...prevUser, 
                id: response.data["id"],
                Username: response.data["Username"],
                Role: response.data["Role"],
                DatesAvailable: response.data["DatesAvailable"],
                DatesScheduled: response.data["DatesSchdeuled"],
                Info: response.data["Info"]
            }));
        }).catch((error) => {
            console.log(error);
        })
    },[props.username,setUser])

    return (
        <div>
            <p>Therapist page</p>
            <p>{user.Username}</p>
            <p>{user.id}</p>
        </div>
    )
}

export default function Home({params}: any) {

    const info = params.id.split("-");

    return (
        <UserProvider>
            <Homepage username={info[0]}/>
        </UserProvider>
    )
}