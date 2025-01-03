import React,{useEffect} from 'react';
import {  ShoppingOutlined, DownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Dropdown, message, Space , Button} from 'antd';
import useProductsStore from '../stores/useStoreProducts';
import styles from './styles/CategoriesDropdown.module.css'


const CategoriesDropdown = () => {
    
    const {setCategory, fetchCategoriesData,categoriesData,fetchDataProducts} = useProductsStore()

    useEffect(()=>{
     fetchCategoriesData()
    },[])


  const handleMenuClick = (e) => {
    message.info(`Elegiste ${e.key ? e.key : 'Todas las categorias'}`);
    console.log('click', e.key);
    fetchDataProducts({category:e.key})
  };

  
  const items = categoriesData?.map( item => ({
    label: item.name,
    key: item.id,
    icon:<ShoppingOutlined/>,
  }))
  
items?.unshift({
    label: "Todas las categorias",
    key:'',
    icon:<ShoppingOutlined/>,
})

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };


    return (
            <Dropdown menu={menuProps}>
                <Button className={styles.container}>
                        Categorias
                        <DownOutlined />
                        <ShoppingCartOutlined/>

                </Button>
            </Dropdown>
    );
}

export default CategoriesDropdown;
