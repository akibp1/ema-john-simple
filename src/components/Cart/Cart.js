import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    //console.log(auth.user);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = (total + product.price * product.quantity);

    }
    let shipping = 0;
    if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 35) {
        shipping = 0;
    }
    else if (total > 0) {
        shipping = 12.99
    }
    const tax = (total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>
            <h4>Order Summary</h4>
            <h5 className="text-danger">Items ordered: {cart.length}</h5>
            <p>Product Price: {formatNumber(total)}</p>
            <p>Shipping Cost:{shipping}</p>
            <p><small>Tax + Vat:{tax}</small></p>
            <p>Total Price:{grandTotal}</p>
            <br />
            {
                props.children
            }

        </div>
    );
};

export default Cart;