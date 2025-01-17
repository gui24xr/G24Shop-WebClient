import React from 'react';
import useCartsStore from '../stores/useStoreCarts';
import './styles/CartContainer.css'
import useProductsStore from '../stores/useStoreProducts';
import {ClearCartButton, CreateOrderButton} from './components.index.js'

const CartContainer = () => {
     const {cartData,deleteProductToCart,updateProductQuantityInCart} = useCartsStore()

     console.log(cartData)
 
     const onHandleDeleteButton = (productId) => {
        console.log('Se eliminara product Id: ', productId)
        deleteProductToCart({productId:productId})
     }

     const onHandleChangeQuantitySubmit = (event) =>{
        event.preventDefault()
        const formData = new FormData(event.target)
        console.log(Object.fromEntries(formData.entries()))
        const {productId,quantity} = Object.fromEntries(formData.entries())
        updateProductQuantityInCart({productId:productId, newQuantity : quantity})

     }
     

    return (

        <div className='cartcontainer'>
            <p>Productos en el carrito</p>
            <table className="cartcontainer-table">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Title</th>
                        <th>Brand</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Stock actual</th>
                        <th>Subtotal</th>

                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {cartData?.products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.brand}</td>
                            <td>${product.currentPrice}</td>
                            <td>
                                <form onSubmit={onHandleChangeQuantitySubmit}>
                                    <input name='quantity' placeholder={product.quantity} required/>
                                    <input name='productId' value={product.id} type="hidden"/>
                                    <button type="submit">Modificar</button>
                                </form>
                            </td>
                            <td>{product.stock.quantity}</td>
                            <td>{product.subTotalAmount}</td>
                            <td><button type="button" onClick={()=>onHandleDeleteButton(product.id)}>Eliminar</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='.cartcontainer-buttonswrapper'>
                    <ClearCartButton/>
                    <CreateOrderButton/>
                 
            </div>
        </div>
    );
}

export default CartContainer;
