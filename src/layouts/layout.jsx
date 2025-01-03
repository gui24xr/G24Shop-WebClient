import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/Navbar';
import styles from './Outlet.module.css'
const Layout = () => {
    return (
        <div>
        <header>
            <NavBar/>
        </header>
        <main className={styles.layout}>
          <Outlet />
        </main>
      </div>
    );
    
}

export default Layout;
