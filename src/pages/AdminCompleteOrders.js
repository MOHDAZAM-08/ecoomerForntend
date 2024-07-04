import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { useSelector } from 'react-redux';

const AdminCompleteOrders = () => {
    const user = useSelector(state => state?.user?.user);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(SummaryApi.allAdminDeliveredOrders.url, {
                    method: SummaryApi.allAdminDeliveredOrders.method,
                    credentials: 'include',
                    headers: {
                        "Content-Type": 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setOrders(data);
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    if (!orders.length) {
        return (
            <div className='h-[80vh] w-full flex items-center justify-center'>
                <div className='flex items-center justify-center h-96 w-[80vw] bg-gray-200 rounded-lg border text-xl text-black font-semibold'>No orders found</div>
            </div>
        );
    }

    return (
        <div className='p-3 flex justify-center '>
        <div className='flex justify-center flex-col w-full'>
        <h1 className='sticky top-10 left-10 text-3xl px-2 py-1 font-serif '>Total orders: {orders.length}</h1>
            <div className='h-[79vh] overflow-auto flex flex-col gap-3'>
            {orders.map((order, index) => (
                <OrderDetails key={order._id.$oid} order={order} index={index} />
            ))}
            </div>
        </div>
    </div>
    
    );
};

const OrderDetails = ({ order, index }) => {
    // Calculate total items
    const totalItems = order.products.reduce((acc, product) => acc + product.quantity, 0);

    // Calculate total amount
    const totalAmount = order.products.reduce((acc, product) => acc + product.price * product.quantity, 0);

    return (
        <div className='border rounded-lg shadow-md p-4  w-full '>
            <div className=''>
                <h2 className='text-xl  mb-2'>Order No {index + 1}</h2>
                <div className='grid grid-cols-2 gap-x-4'>
                    <div>
                        <p className='text-gray-700 text-md'>Order ID: <span className='text-lg text-black'>{order._id}</span> </p>
                        <p className='text-gray-700 text-md'>User Name: <span className='text-lg text-black'>{order.user.name}</span></p>
                        <p className='text-gray-700 text-md'>User Email: <span className='text-lg text-black'>{order.user.email}</span></p>
                    </div>
                    <div className='flex flex-col gap-3'> 
                    <p className='text-gray-700 text-md'>OrderStatus: <span className='text-lg px-6 text-white rounded bg-green-500 p-1'> {order.orderStatus}</span> </p>

                    <p className='text-gray-700 text-md'>PaymentStatus: <span className='text-lg px-9 text-white rounded bg-green-500 p-1'> {order.paymentStatus}</span> </p>

                    <p className='text-gray-700 text-md'>CreatedAt: <span className='text-lg text-black'> {new Date(order.createdAt).toLocaleString()}</span> </p>

                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <h3 className='text-xl '>Order Summary:</h3>
                <div className='grid grid-cols-2 gap-x-4'>
                    <p className='text-lg'>Total Items: {totalItems}</p>
                    <p className='text-xl whitespace-pre'>Total Amount: <span className='text-red-600 text-2xl'>₹{totalAmount}</span></p>
                </div>
            </div>
        </div>
    );
};

export default AdminCompleteOrders;
