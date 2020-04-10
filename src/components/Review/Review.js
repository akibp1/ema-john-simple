import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import ReviewItems from '../ReviewItem/ReviewItems';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';

const Review = () => {


    const [cart, setCart] = useState([]);
    const auth = useAuth();


    const removeProduct = (ProductKey) => {
        const newCart = cart.filter(pd => pd.key !== ProductKey);
        setCart(newCart);
        removeFromDatabaseCart(ProductKey);
    }



    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('https://cryptic-beyond-63081.herokuapp.com/getProductByKey',{ 
            method: 'POST',
            headers: {
            'Content-type':'application/json'
        },
            body:JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data =>{
            const cartProducts = productKeys.map(key => {
                const product = data.find(pd => pd.key === key);
                product.quantity = savedCart[key];
                return product;
            });
            setCart(cartProducts);
        })
        


    }, [])

    
    return (
        <div className="twin-container">

            <div className="product-container">        {
                cart.map(pd => <ReviewItems
                    key={pd.key}
                    removeProduct={removeProduct}
                    product={pd}

                ></ReviewItems>)
            }
                
                {
                    !cart.length && <h1>Your cart is empty. <a href="/shop">Keep Shopping</a></h1>
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="Shipment">
                        {
                            auth.user ?
                                <button className='main-btn'>Proceed checkout</button>
                                :
                                <button className='main-btn'> Login to Proceed</button>

                        }

                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Review;