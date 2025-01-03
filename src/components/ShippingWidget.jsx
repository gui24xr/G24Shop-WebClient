import React from 'react';
import styles from './styles/ShippingWidget.module.css'
import { HomeOutlined } from '@ant-design/icons';

const ShippingWidget = () => {
    return (
        <div className={styles.container}>
            <div className={styles.iconContainer}>
                <HomeOutlined/>
            </div>
            <div className={styles.addressContainer}>
                <span>Enviar a</span>
                <span>Bolivia 553</span>
            </div>
        </div>
    );
}

export default ShippingWidget;
