import React, { useEffect } from 'react';
import useProductsStore from '../stores/useStoreProducts';

import styles from './styles/CategoriesBar.module.css'

const CategoriesBar = () => {
   const {setCategory, fetchCategoriesData,categoriesData,fetchDataProducts} = useProductsStore()

   
   useEffect(()=>{
    fetchCategoriesData()
   },[])

   const onHandleClick = (category) => {   
       fetchDataProducts(category)
    }
    return (
   
                <ul className={styles.container}>
                    <li className={styles.itemsList}>
                        <button  onClick={() => onHandleClick()}>Todas</button>
                    </li>
                    {
                        categoriesData?.map( item => (
                            <li className={styles.itemsList}>
                                <button
                                    key={item}
                                    onClick={() => onHandleClick(item)}
                                >{item}</button>
                            </li>
                        ))
                    }
                </ul>
      
    );
}

export default CategoriesBar;


