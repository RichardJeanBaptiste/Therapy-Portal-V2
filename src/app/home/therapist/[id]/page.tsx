"use client"

import React, {useEffect, useState, useContext} from 'react';
import { UserContext, UserProvider } from '../../../components/UserContext';
import { Box } from '@mui/material';
import { useTheme }  from '@mui/material/styles';
import axios from 'axios';
import Navbar from '@/app/components/Navbar';
import Calender from '@/app/components/Calender';
import History from '@/app/components/History';
import Clients from '@/app/components/Clients';
import Therapists from '@/app/components/Therapists';
import Updates from '@/app/components/Updates';
import Settings from '@/app/components/Settings';

const useStyles = (theme: any) => ({
    root:{
        position: 'absolute',
        height: '100%',
        
        [theme.breakpoints.down('xl')]: {
            top: '0',
            left: '7%',
            width: '93vw'
        },

        [theme.breakpoints.down('lg')]: {
            top: '0',
            left: '7%',
            width: '93vw'
        },

        [theme.breakpoints.down('md')]: {
            top: '0',
            left: '9%',
            width: '90.9vw'
        },

        [theme.breakpoints.down('sm')]: {
            top: '0',
            left: '12%',
            width: '88vw'
        },

        [theme.breakpoints.down('xs')]: {
            top: '0',
            left: '13%',
            width: '86vw'
        },       
    }     
})



const Homepage = (props: any) => {

    const theme = useTheme();
    const styles = useStyles(theme);

    const {user, setUser} = useContext(UserContext);
    const [renderComponent, SetRenderComponent] = useState("Home");


    const showComp = (x: string) => {
        SetRenderComponent(x);
    }

    const HandleRender = (props: any) => {
        let CurrentComp;
        switch (props.comp) {
            case "Home":
                CurrentComp = (
                    <>
                        <p>Therapist page</p>
                        <p>{user.Username}</p>
                        <p>{user.id}</p>
                    </>
                )
                break;
            case "Calender":
                CurrentComp = <Calender/>
                break;
            case "History":
                CurrentComp = <History/>
                break;
            case "Clients":
                CurrentComp = <Clients/>
                break;
            case "Therapist":
                CurrentComp = <Therapists/>
                break;
            case "Updates":
                CurrentComp = <Updates/>
                break;
            case "Settings":
                CurrentComp = <Settings/>
                break;
            default:
                CurrentComp = (
                    <>
                        <p>Therapist page</p>
                        <p>{user.Username}</p>
                        <p>{user.id}</p>
                    </>
                )
                break;
        }

        return CurrentComp;
    }

    useEffect(() => {
        axios.post('/api/getUser', {
            username: props.username,
        }).then(function (response){
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
        <>
            <Navbar role={user.Role} 
                showHome={() => showComp("Home")} 
                showCalender={() => showComp("Calender")} 
                showClient={() => showComp("Clients")}
                showTherapists = {() => showComp("Therapists")}
                showHistory={() => showComp("History")}
                showUpdates={() => showComp("Updates")}
                showSettings={() => showComp("Settings")}
            />
            <Box sx={styles.root}>
                <HandleRender comp={renderComponent}/>
            </Box> 
        </>
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