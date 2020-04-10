import React from 'react';
import { useForm, } from 'react-hook-form';
import './Shipment.css'
import { useAuth } from '../Login/useAuth';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import { getDatabaseCart, clearLocalSoppingCart } from '../../utilities/databaseManager';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { useState } from 'react';


const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const [shipInfo, setShipInfo] = useState(null);
    const [orderId, setOrderId] = useState(null)

    const auth = useAuth();

    const stripePromise = loadStripe('pk_test_TfOmi1caqntfnnPpcPMGBkk600VofjhKDc')


    const onSubmit = data => {
        setShipInfo(data);
       
        
    }

    const handlePlaceOrder = (payment) =>{
        //TODo:Alamin move this after payment
        const savedCart = getDatabaseCart();
        const orderDetails = {
            email: auth.user.email,
            cart: savedCart,
            Shipment: shipInfo,
            payment: payment
        };
        fetch('https://cryptic-beyond-63081.herokuapp.com/placeOrder', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(orderDetails)
        })
            .then(res => res.json())
            .then(order => {
                setOrderId(order._id);
                clearLocalSoppingCart();
                
            })
    }


    return (
        <div className="container">
            <div className="row">
                <div style={{display:shipInfo && 'none'}} className="col-md-6">
                    <h3>Shipment Information</h3>
                    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

                        <input name="name" defaultValue={auth.user.name} ref={register({ required: true })} placeholder="Your Name" />
                        {errors.name && <span>Name is required</span>}

                        <input name="email" defaultValue={auth.user.email} ref={register({ required: true })} placeholder="Your Email" />
                        {errors.email && <span>Email is required</span>}

                        <input name="addressLine1" ref={register({ required: true })} placeholder="Address Line1" />
                        {errors.addressLine1 && <span>Address is required</span>}

                        <input name="addressLine2" ref={register} placeholder="Address Line 2" />

                        <input name="city" ref={register({ required: true })} placeholder="City" />
                        {errors.city && <span>City is required</span>}

                        <input name="country" ref={register({ required: true })} placeholder="Country" />
                        {errors.country && <span>Country is required</span>}

                        <input name="Number" ref={register({ required: true })} placeholder="Phone No." />
                        {errors.Number && <span>Number is required</span>}

                        <input name="ZipCode" ref={register({ required: true })} placeholder="Zip Code" />
                        {errors.ZipCode && <span>Zip Code is required</span>}

                        <input type="submit" />
                    </form>
                </div>
                <div style={{margin:'200px 0px',  display:shipInfo? 'block' :'none' }} 
                    className="col-md-6">
                    <h3>payment Information</h3>

                    <Elements stripe={stripePromise}>

                    <CheckoutForm handlePlaceOrder={handlePlaceOrder}> </CheckoutForm>
                    </Elements>
                    <br/>
                    {
                        orderId && <div className="div">
                            <h3>Thank For Shopping With Us</h3>
                        <p>Your order id is: {orderId}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}


export default Shipment;