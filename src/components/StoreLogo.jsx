import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles/StoreLogo.module.css'

const StoreLogo = () => {
    return (
        <NavLink className={styles.container} to={'/'}>
            <span>MY SHOP 24</span>
        </NavLink>
    );
}

export default StoreLogo;
