import React from 'react';
import { CategoriesDropdown, BrandsDropdown} from './components.index.js'
import styles from './styles/SubNavBar.module.css'
const SubNavBar = () => {
    
    

    return (
        <ul className={styles.container}>
          <li>
            <CategoriesDropdown/>
          </li>
          <li>
            <BrandsDropdown/>
          </li>
          <li>
            <span>Cupones</span>
          </li>
          <li>
          <span>Vender</span>
          </li>
          <li>
          <span>Ayuda</span>
          </li>
         
        </ul>
    );
}

export default SubNavBar;

