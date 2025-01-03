import React, { useEffect } from 'react';
import useProductsStore from '../stores/useStoreProducts';
import ProductCard from './ProductCard';
import styles from './styles/ProductContainer.module.css'
import { v4 as uuidv4 } from 'uuid';

const ProductsContainer = () => {
    const {fetchDataProducts,loading,data} = useProductsStore()
    useEffect(()=>{
        fetchDataProducts({})
    },[])

    
    return (
        <div className={styles.container}>
            {loading && <p>Cargando...</p>}
            {data?.map(item => (
               
                <ProductCard 
                key={uuidv4()}
                    {...item}
                    
                    />))}
        </div>
    );
}

export default ProductsContainer;
