import React from 'react';
import useProductsStore from '../stores/useStoreProducts';
import { Input , message} from 'antd';

import styles from './styles/SearchForm.module.css'
import { SearchOutlined } from '@ant-design/icons';


const SearchForm = () => {
    const {findProducts} = useProductsStore()
   //si no estamos en la pantalla donde estan los productos vamos a ella
  

    const onClickForm = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const formValues = Object.fromEntries(formData.entries())
        message.info(`Buscar articulos con la palabra ${formValues.query}`)
        findProducts(formValues.query)
    }

    return (
        <div className={styles.container}>
            <form className={styles.formElements} type='submit' onSubmit={onClickForm }>
                <Input type="search" name="query" />
                <button type="submit">
                    <SearchOutlined />
                </button>
            </form>
            </div>
       
    );
}

export default SearchForm;
