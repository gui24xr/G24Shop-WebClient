import React,{useEffect} from 'react';
import {  ShoppingOutlined, DownOutlined } from '@ant-design/icons';
import { Dropdown, message, Button, Space } from 'antd';
import useProductsStore from '../stores/useStoreProducts';
import styles from './styles/BrandsDropdown.module.css'

const BrandsDropdown = () => {
    
    const {setCategory, fetchBrandsData,brandsData, fetchDataProducts} = useProductsStore()

    

    useEffect(()=>{
     fetchBrandsData()
     
    },[])


const handleButtonClick = (e) => {
    message.info('Ver Categoria');
    console.log('click left button', e);
    fetchDataProducts({brand:e.key})
    
  };
  const handleMenuClick = (e) => {
    message.info(`Elegiste ${e.key ? e.key : 'Todas las marcas'}`);
    console.log('click', e.key);
    fetchDataProducts({brand:e.key})
  };

  
  const items = brandsData?.map( item => ({
    label: item.name,
    key: item.id,
    icon:<ShoppingOutlined/>,
  }))
  
items?.unshift({
    label: "Todas las marcas",
    key:'',
    icon:<ShoppingOutlined/>,
})

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };


    return (
        <div>
             <Dropdown menu={menuProps}>
                           <Button className={styles.container}>
                                   Marcas
                                   <DownOutlined />
                           </Button>
                       </Dropdown>
        </div>
    );
}

export default BrandsDropdown;

