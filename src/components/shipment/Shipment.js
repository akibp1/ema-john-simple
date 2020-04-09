import React from 'react';
import { useForm, } from 'react-hook-form';
import './Shipment.css'
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    const { register, handleSubmit, errors } = useForm();
    const auth = useAuth();

    const onSubmit = data => {
        //TODo:Alamin move this after payment
       const savedCart =  getDatabaseCart();
       const orderDetails = {email: auth.user.email, cart:savedCart}
       fetch('http://localhost:4200/placeOrder',{ 
        method: 'POST',
        headers: {
        'Content-type':'application/json'
    },
        body:JSON.stringify(orderDetails)
    })
    .then(res => res.json())
    .then(data => {
        alert('Successfully place your order with order Id: '+data._id )
        processOrder();
    })
};


    return (
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

            <input name="ZipCode" ref={register({ required: true })} placeholder="Zip Code" />
            {errors.ZipCode && <span>Zip Code is required</span>}

            <input type="submit" />
        </form>
    )
}


export default Shipment;