"use client"

import React, {useState, useEffect, useContext} from 'react'
import { UserProvider, useStateValue, UserContext } from '../components/UserContext';


const Example =()=> {

    const {user, setUser} = useContext(UserContext);


    const handleUpdateUser = () => {
        // Use the spread operator to update the 'name' property of the 'user' state
        setUser((prevUser) => ({ ...prevUser, age: 40}));
      };

    return (
        <>
        
            <p>Name: {user?.name}</p>
            <p>Age: {user?.age}</p>
            <p>Bio: {user?.bio}</p>
            <p onClick={handleUpdateUser}>Test</p>
        </>
    )
}
const Test = () => {
   

  return (
    <UserProvider>
        <Example/>
    </UserProvider>
    
  )
}

export default Test