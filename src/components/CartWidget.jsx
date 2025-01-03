import React from 'react';
import useCartsStore from '../stores/useStoreCarts';
import {  ShoppingCartOutlined, DownOutlined, DollarOutlined } from '@ant-design/icons';
import { Button, Dropdown, Badge, Tag,message } from 'antd';
import styles from './styles/CartWidget.module.css'
import { useNavigate } from 'react-router-dom';

const CartWidget = () => {
   const {clearCart, cartData} = useCartsStore()
   const navigate = useNavigate()

   const items = [
   {
    label: "Ir a mi carrito",
    key:'1',
    icon: <ShoppingCartOutlined/>
    },
{
    label: "Vaciar mi carrito",
    key:'2',
    icon: <ShoppingCartOutlined/>
}
   ]

   
  const handleMenuClick = (e) => {
    message.info(`Elegiste ${e.key ? e.key : 'Todas las categorias'}`);
    console.log('click', e.key);

    if (e.key === '1') navigate('/cart')
    if (e.key === '2') clearCart()
  };

   const menuProps = {
    items,
    onClick: handleMenuClick,
  };

    return (
        <Dropdown menu={menuProps} className={styles.container}>
            <Button >
                Mi Carrito
                <ShoppingCartOutlined/>
                <Badge  count={cartData?.productsQuantity}/>
                <Tag icon={<DollarOutlined/>} color="#3b5999">
                    {cartData?.amount || 0}
                </Tag>
                <DownOutlined />
            </Button>
        </Dropdown>
    );
}

export default CartWidget;
