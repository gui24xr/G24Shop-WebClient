import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import useProfileStore from '../stores/useStoreProfile';
import { UserOutlined, DownOutlined, NotificationOutlined, SettingOutlined, LogoutOutlined, HeartOutlined, } from '@ant-design/icons';
import { Button, Dropdown, Badge, Avatar,  } from 'antd';
import styles from './styles/ProfileBar.module.css'
import axios from 'axios'


const ProfileBar = () => {
    const { currentUser, logoutProfile } = useProfileStore()
    const { loginWithRedirect, logout } = useAuth0()
    console.log('En session Bar: ', currentUser)

    
 
   
    
    const notLoggedItems = [
        {
            label: "Iniciar Sesion",
            key:'1',
            icon:  <UserOutlined/>
            },
            {
               label: "Registrarse",
               key:'2',
               icon:  <HeartOutlined/>
               },
    ]

    const loggedItems =
    [
        {
         label: "Mi perfil",
         key:'3',
         icon:  <UserOutlined/>
         },
         {
            label: "Mis favoritos",
            key:'4',
            icon:  <HeartOutlined/>
            },
     {
         label: "Configuracion",
         key:'5',
         icon:  <SettingOutlined/>
     },
     {
        label: "Cerrar sesion",
        key:'6',
        icon:  <LogoutOutlined/>
    }
        ]
     
        const items = !currentUser ? notLoggedItems : loggedItems
        const handleMenuClick = (e) => {
        console.log('click', e.key);
    if (e.key == '1') loginWithRedirect()
    if (e.key == '6') logout()
    
  }


   const menuProps = {
    items,
    onClick: handleMenuClick,
  };
    return (
        <div className={styles.container}>

            <Dropdown menu={menuProps} className={styles.container}>
                <Button className={styles.button} >
                    <UserOutlined/>
                    {currentUser ? currentUser.userName : 'Ingresar'}
                    <DownOutlined />
                </Button>
            </Dropdown>
            <Badge dot={1}>
                <Avatar shape="square" size="small" style={{background: 'transparent', color: 'black'}} >
               <NotificationOutlined/>
            </Avatar>
                
            </Badge>
            
        </div>
)
}

export default ProfileBar;


/*
 <div className={styles.container}>
            <UserOutlined className={styles.icons}/> 
            {
                currentUser ? (
                    <>
                        <span>{currentUser.userName}</span>
                        <button onClick={logout} >
                            <LogoutOutlined className={styles.icons}/>
                        </button>
                    </>
                )
                :
                (
                    <>
                        <button onClick={loginWithRedirect} >
                            Crea tu cuenta
                        </button>
                       
                        <button onClick={loginWithRedirect} >
                            Ingresa
                        </button>
                        
                    </>
                )
            }
        </div>

*/ 