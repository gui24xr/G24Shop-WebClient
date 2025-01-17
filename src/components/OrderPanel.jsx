import React, { useEffect, useState } from 'react';
import { useOrdersStore } from '../stores/useStoreOrders';
import { Space, Table, Tag } from 'antd';
import { Card, Col, Row } from 'antd';


const OrderPanel = () => {


    const { paymentsMethodsList, shippingMethodsList, setPaymenthMethod, paymentMethod,  fetchOrdersOptions} = useOrdersStore()


    useEffect(()=>{
     fetchOrdersOptions()
    },[])


    const OnSelectPaymentMethod = (paymentMethod) =>{
        console.log('Metodo de pago seleccionado: ', paymentMethod)
        setPaymenthMethod({paymentMethod:paymentMethod})
      
    }
    return (
        <div>
            <div>


            </div>
          
            <div>
                <p>Forma de pago.</p>
                <Row gutter={16}>
                    {paymentsMethodsList?.map(item => (
                    <Col span={8} key={item.id}>
                        <Card title={item.name}  style={paymentMethod?.id == item.id &&{ border: '1px solid cyan' }}  bordered={false} onClick={()=>OnSelectPaymentMethod(item)}>
                            {item.description}
                        </Card>
                    </Col>
                    ))}
                </Row>
            </div>
            <div>
                <p>Forma de Envio.</p>
                <Row gutter={16}>
                    {shippingMethodsList?.map(item => (
                    <Col span={8} key={item.id}>
                        <Card title={item.name}  style={paymentMethod?.id == item.id &&{ border: '1px solid cyan' }}  bordered={false} onClick={()=>OnSelectPaymentMethod(item)}>
                            {item.description}
                        </Card>
                    </Col>
                    ))}
                </Row>
            </div>

        </div>
      
    );
}

export default OrderPanel;
