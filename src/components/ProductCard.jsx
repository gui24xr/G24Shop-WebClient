import React,{useState} from 'react';
import styles from './styles/ProductCard.module.css'
import useCartsStore from '../stores/useStoreCarts';


const ProductCard = (props) => {
  const {id,gallery,title,brand,categories,description,price,rating,stock} = props
  const {addProductToCart} = useCartsStore()
 const [selectedQuantity, setSelectedQuantity] = useState(1)

const onChangeRange = (event)=>{
  setSelectedQuantity(event.target.value)
}
  const onHandleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const {quantity} = Object.fromEntries(formData.entries())
    const pressedButton = event.nativeEvent.submitter.name
    
    //Aca depende que boton hizo el evento hago la accion de agregar o comprar
    if (pressedButton == "buyButton"){
      alert('Ir a comprar')
    }
    else{
      addProductToCart({productId: id, quantity: quantity})
    }
  }
  
return (
  <div className={styles.container}>
    <div className={styles.containerTop}>
      <img src="/images/defaultpic.jpg" alt={title} className={styles.containerTopImg} />
    </div>
    <div className={styles.containerBottom}>
       
       <span className={styles.productCategory}>{brand.name}</span>
      
        <div className={styles.productTitleContainer}>
          <span className={styles.productBrand}>{brand.name}</span>
          <span className={styles.productTitle}>{title}</span>
        </div>

       <span className={styles.productRating}>Rating: {'⭐'.repeat(Math.floor(Number(rating)))}</span>
      
       <div className={styles.productPriceContainer}>
        <span className={styles.originalProductPrice}>${price.originalPrice}</span>
        <div className={styles.finalPriceContainer}>
          <span className={styles.finalProductPrice}>${price.currentPrice}</span>
          <span className={styles.discountPercentage}>{price.discountPercentage}%</span>
        </div>
        
       
        
          
          <form className={styles.buyForm} type="submit" onSubmit={onHandleSubmit}>
          
          <div className={styles.quantityContainer}>
            <span>{stock.quantity} disponibles</span>
            <input type="range" name="quantity" min={1} max={stock.quantity} defaultValue={1} onChange={onChangeRange}/>
             <span>Cantidad: {selectedQuantity}</span>
          </div>
     

          <div>
          <button type="submit" name="buyButton" >Comprar Ahora</button>
          <button type="submit" name="cartButton">Agrega al carrito</button>
          </div>
        

      </form>
    
      </div>
 
 
    </div>
    
    
 
  

</div>
);

    
    
}

export default ProductCard;
