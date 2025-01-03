import React from 'react';

import {SearchForm, CategoriesBar, ProfileBar, CartWidget, StoreLogo, ShippingWidget, SubNavBar} from './components.index.js'
import styles from './styles/NavBar.module.css'


const NavBar = () => {
    return (
        <div className={styles.container}>
                
                <div className={styles.item1}>
                    <StoreLogo/>
                </div>
                <div className={styles.item2}>
                    <SearchForm/>
                </div>
                <div className={styles.item3}>
                    <ProfileBar/>
                </div>
                <div className={styles.item4}>
                  <ShippingWidget/>
                </div>
                <div className={styles.item5}>
                    <SubNavBar/>
                </div>
                <div className={styles.item6}>
                    <CartWidget/>
                </div>
        </div>
    );
}

export default NavBar;

/*
     <div className={styles.container}>
                <StoreLogo/>
                <SearchForm/>
                <ProfileBar/>
                <CartWidget/>
        </div>

             
                <StoreLogo className={styles.item1}/>
                <SearchForm className={styles.item2}/>
                <ProfileBar className={styles.item3}/>
                <div className={styles.item3}>3</div>
                <div className={styles.item4}>4</div>
                <div className={styles.item5}>5</div>
                <div className={styles.item6}>6</div>
*/