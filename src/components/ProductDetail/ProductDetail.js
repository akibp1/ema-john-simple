import React from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { useState } from 'react';
import { useEffect } from 'react';

const ProductDetail = () => {
    const {productKey} = useParams ()
    const [product, setProduct] = useState(null);
    useEffect(() => {
        fetch('https://cryptic-beyond-63081.herokuapp.com/product/'+productKey)
        .then(res =>res.json())
        .then(data => {
            setProduct(data);
        })
    }, [productKey])
    return (
        <div>
            <h3>Your Product Detail</h3>
            {
              product &&  <Product showAddToCart = {false} product = {product}></Product>
            }
        </div>
    );
};

export default ProductDetail; 