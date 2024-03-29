"use client"

import React, {useState, useEffect} from 'react';
import { useTheme }  from '@mui/material/styles';
import { Box, Drawer, List, ListItemIcon, Tooltip, IconButton } from '@mui/material';
import CottageRoundedIcon from '@mui/icons-material/CottageRounded';
import TodayRoundedIcon from '@mui/icons-material/TodayRounded';
import HistoryRoundedIcon from '@mui/icons-material/HistoryRounded';
import PsychologyRoundedIcon from '@mui/icons-material/PsychologyRounded';
import TipsAndUpdatesRoundedIcon from '@mui/icons-material/TipsAndUpdatesRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import FaceRoundedIcon from '@mui/icons-material/FaceRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/navigation';


const useStyles = (theme: any) => ({
    root: {
        display: 'flex'
    },
    desktopDrawer: {
        width: '4em',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: '4em',
            boxSizing: 'border-box',

        },
        overflowX: 'hidden'
    },
    mobileDrawer: {
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: '4em',
            boxSizing: 'border-box',

        },
        overflowX: 'hidden'
    }, 
    listStyle: {
        marginTop: '35%',
        marginLeft: '17%',
        //width: '100%',
        height: '100%',
        overflowX: 'hidden'
    },
    listIcons: {
        paddingBottom: '3em',
    },
    listIcons2: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },   
})


const Navbar = (props: any) => {
    const theme = useTheme();
    const styles = useStyles(theme);
    const router = useRouter();

    const [screenWidth, SetScreenWidth] = useState<number>();

    const handleResize = () => {
        SetScreenWidth(window.innerWidth);
    }

    useEffect(() => {

        SetScreenWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    },[]);

    const handleLogout = () => {
        router.push('/', {scroll: false});
    }

    const UsersIcon = () => {
        if(props.role === "therapist"){
            return (
                <Tooltip title="Clients" placement='right' arrow>
                    <IconButton onClick={props.showClient}>
                        <FaceRoundedIcon/>
                    </IconButton>
                </Tooltip>
            )
        } else {
            return (
                <Tooltip title="Therapists" placement='right' arrow>
                    <IconButton onClick={props.showTherapists}>
                        <PsychologyRoundedIcon/>
                    </IconButton>
                </Tooltip>
            )
        }
    }

    const LargeNav = () => {
        return (
            <Drawer
                sx={styles.desktopDrawer}
                variant="permanent"
                anchor="left"
            >
                <List sx={styles.listStyle}>

                    <ListItemIcon sx={styles.listIcons}>
                        <Tooltip title="Home" placement='right' arrow>
                            <IconButton onClick={props.showHome}>
                                <CottageRoundedIcon/>
                            </IconButton>
                        </Tooltip>
                    </ListItemIcon>

                    <ListItemIcon sx={styles.listIcons}>
                        <Tooltip title="Calender" placement='right' arrow>
                            <IconButton onClick={props.showCalender}>
                                <TodayRoundedIcon/>
                            </IconButton>
                        </Tooltip>
                    </ListItemIcon>

                    <ListItemIcon sx={styles.listIcons}>
                        <Tooltip title="History" placement='right' arrow>
                            <IconButton onClick={props.showHistory}>
                                <HistoryRoundedIcon/>
                            </IconButton>
                        </Tooltip>
                    </ListItemIcon>

                    <ListItemIcon sx={styles.listIcons}>
                        <UsersIcon/>  
                    </ListItemIcon>

                    <ListItemIcon sx={styles.listIcons}> 
                        <Tooltip title="Tips" placement='right' arrow>
                            <IconButton onClick={props.showUpdates}>
                                <TipsAndUpdatesRoundedIcon/>
                            </IconButton>
                        </Tooltip>
                    </ListItemIcon>

                    <ListItemIcon sx={styles.listIcons}> 
                        <Tooltip title="Settings" placement='right' arrow>
                            <IconButton onClick={props.showSettings}>
                                <SettingsRoundedIcon/>
                            </IconButton>
                        </Tooltip>
                    </ListItemIcon>

                    <ListItemIcon sx={styles.listIcons2}>
                        <Tooltip title="Logout" placement='right' arrow>
                            <IconButton onClick={handleLogout}>
                                <LogoutIcon/>
                            </IconButton>
                        </Tooltip>
                    </ListItemIcon>
                </List>
            </Drawer>
        )
    }

    const MobileNav = () => {

        const [show, SetShow] = useState(false);

        return (
            <>
                <IconButton onClick={() => SetShow(true)}>
                    <MenuRoundedIcon/>
                </IconButton>

                <Drawer
                    anchor="left"
                    open={show}
                    onClose={() => SetShow(false)}
                    sx={styles.mobileDrawer}
                >
                    <List sx={styles.listStyle}>

                        <ListItemIcon sx={styles.listIcons}>
                            <Tooltip title="Home" placement='right' arrow>
                                <IconButton onClick={props.showHome}>
                                    <CottageRoundedIcon/>
                                </IconButton>
                            </Tooltip>
                        </ListItemIcon>

                        <ListItemIcon sx={styles.listIcons}>
                            <Tooltip title="Calender" placement='right' arrow>
                                <IconButton onClick={props.showCalender}>
                                    <TodayRoundedIcon/>
                                </IconButton>
                            </Tooltip>
                        </ListItemIcon>

                        <ListItemIcon sx={styles.listIcons}>
                            <Tooltip title="History" placement='right' arrow>
                                <IconButton onClick={props.showHistory}>
                                    <HistoryRoundedIcon/>
                                </IconButton>
                            </Tooltip>
                        </ListItemIcon>

                        <ListItemIcon sx={styles.listIcons}>
                            <UsersIcon/>
                        </ListItemIcon>

                        <ListItemIcon sx={styles.listIcons}> 
                            <Tooltip title="Tips" placement='right' arrow>
                                <IconButton onClick={props.showUpdates}>
                                    <TipsAndUpdatesRoundedIcon/>
                                </IconButton>
                            </Tooltip>
                        </ListItemIcon>

                        <ListItemIcon sx={styles.listIcons}>
                            <Tooltip title="Settings" placement='right' arrow>
                                <IconButton onClick={props.showSettings}>
                                    <SettingsRoundedIcon/>
                                </IconButton>
                            </Tooltip>
                        </ListItemIcon>

                        <ListItemIcon sx={styles.listIcons2}>
                            <Tooltip title="Logout" placement='right' arrow>
                                <IconButton onClick={handleLogout}>
                                    <LogoutIcon/>
                                </IconButton>
                            </Tooltip>
                        </ListItemIcon>
                       
                    </List>
                </Drawer>
            </>
        )
    }

    const Nav = () => {
        if(screenWidth === undefined){
            return(<></>)
        } else if(screenWidth < 768){
            return (<MobileNav/>)
        } else {
            return (<LargeNav/>)
        }
    }

    

    return (
        <Box sx={styles.root}>
            <Nav/>
        </Box>
    )
}

export default Navbar