import React, { useEffect, useState } from 'react';
import avs from "../assest/sampleImage.jpg"; // Update this import if the image path is different
import { useSelector } from 'react-redux';
import SummaryApi from '../common';
import displayINRCurrency from '../helpers/displayCurrency';


const YourOrder = () => {
    const user = useSelector(state => state?.user?.user);

    console.log("user",user._id);

    const [status, setStatus] = useState('Payment');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getStatusClass = (currentStatus) => {
        return status === currentStatus ? 'bg-green-500 text-white' : 'bg-gray-200';
    };

    const getOrder = async () => {
        try {
            const response = await fetch(`${SummaryApi.Order.url}/${user?._id}`, {
                method: SummaryApi.Order.method,
                credentials: 'include',
                headers: {
                    "Content-Type": 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Sort the orders by their creation date in descending order
            data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Error fetching data. Please try again later.");
        } 
    }

    useEffect(() => {
        if (user) {
            getOrder();
        }
    }, [user]);


    const totalPrice = data.reduce((acc, order) => {
        return acc + order.products.reduce((acc, product) => acc + product.price * product.quantity, 0);
    }, 0);
    const discountPercentage = 10;
    const shippingCharges = 100;

    const discountAmount = (totalPrice * discountPercentage) / 100;
    const total = totalPrice - discountAmount + shippingCharges;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data.length) {
        return (
            <>
                <div className='h-[80vh] w-full flex items-center justify-center' >
                    <div className='flex items-center justify-center h-96 w-[80vw] bg-gray-200 rounded-lg border text-xl text-black font-semibold'>No data</div>
                </div>
            </>
        );
    }

    return (
        <div className='flex items-start justify-evenly p-10'>



            <div>
                {/* Map through each order */}
                {data.map((order, index) => {
                   const orderDate = new Date(order.createdAt);

                   const date = orderDate.toLocaleDateString('en-IN', {
                       day: '2-digit',
                       month: '2-digit',
                       year: 'numeric',
                   });
                   
                   const time = orderDate.toLocaleTimeString('en-IN', {
                       hour: '2-digit',
                       minute: '2-digit',
                       hour12: true, 
                   });
                                      

                    return (
                        <div key={order._id} className="mb-10">
                            <div className='w-full  '>
                                <div className="">
                                    <div className="flex justify-center mb-4">
                                        <div className={`bg-${order.paymentStatus === 'paid' ? 'green' : 'gray'}-500  text-${order.paymentStatus === 'paid' ? 'white' : 'black'} pl-4 pr-4 pt-1 pb-2 rounded-lg border-2`}>
                                            Payment
                                        </div>
                                        <div className={`bg-${order.orderStatus === 'Processing' ? 'green' : 'gray'}-500 text-${order.orderStatus === 'Processing' ? 'white' : 'black'} pl-4 pr-4 pt-1 pb-2 rounded-lg border-2`}>
                                            Processing
                                        </div>
                                        <div className={`bg-${order.orderStatus === 'Dispatched' ? 'green' : 'gray'}-500 text-${order.orderStatus === 'Dispatched' ? 'white' : 'black'} pl-4 pr-4 pt-1 pb-2 rounded-lg border-2`}>
                                            Dispatched
                                        </div>
                                        <div className={`bg-${order.orderStatus === 'Delivered' ? 'green' : 'gray'}-500 text-${order.orderStatus === 'Delivered' ? 'white' : 'black'} pl-4 pr-4 pt-1 pb-2 rounded-lg border-2`}>
                                            Out for Delivery
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='pl-5'>
                                <div className='flex items-center gap-2'>
                                    <h1 className='text-lg font-semibold'>Order ID: {order._id}</h1>
                                    <div className='bg-red-200 rounded-lg text-red-500 font-semibold p-2 text-xs'>
                                        <p>{order.orderStatus}</p>
                                    </div>
                                </div>
                                <div className='flex gap-5'>
                                    <p>{date}</p> <p>{time}</p>
                                </div>
                            </div>

                            <div className='flex justify-between items-start'>
                                <div className='mt-3 w-auto flex items-center justify-center'>
                                    <div className='max-h-auto w-auto rounded mb-3 border p-5 flex gap-2 justify-between'>
                                        {/* Map products */}
                                        <div className='flex flex-col gap-5'>
                                            <div className='text-2xl pb-3'>Order Items:</div>
                                            <div>
                                                {order.products.map((product, index) => (
                                                    <div className="flex mb-4" key={index}>
                                                        <div className="w-md bg-white h-26 border border-slate-300 rounded flex">
                                                            <div className="w-26 h-20 rounded bg-slate-200 p-5">
                                                                <img
                                                                    src={product.images[0]}
                                                                    alt={product.name}
                                                                    className="object-contain w-14 h-14 mix-blend-multiply"
                                                                />
                                                            </div>
                                                            <div className="flex items-center justify-evenly w-full">
                                                                <div className="p-3 flex-col gap-3 w-64 items-center justify-between">
                                                                    <h2 className="text-md lg:text-lg text-ellipsis line-clamp-1">
                                                                        {product.name}
                                                                    </h2>
                                                                    <p className="text-red-600 font-medium text-xs">
                                                                        Quantity: {product.quantity}
                                                                    </p>
                                                                </div>
                                                                <div className="p-3 flex gap-3 items-center justify-between">
                                                                    <p className="w-30 text-slate-600 font-normal text-xs p-0 m-0 whitespace-nowrap">
                                                                        Total Price:
                                                                    </p>
                                                                    <p className="text-red-500 text-xl whitespace-nowrap p-0 m-0">
                                                                        {displayINRCurrency(product.price * product.quantity)}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Order summary */}

                            </div>
                        </div>
                    );
                })}
            </div>
            <div className='border p-3 rounded-lg w-[400px] flex-col items-center justify-center'>
                <div className='text-2xl pb-3'>Order Summary:</div>
                <div className='p-2 flex w-full justify-between items-center'>
                    <div>Subtotal:</div>
                    <div className='text-lg font-semibold'>{displayINRCurrency(totalPrice)}</div>
                </div>
                <div className='p-2 flex w-full justify-between items-center'>
                    <div>Discount:</div>
                    <div className='text-lg font-semibold'>-{displayINRCurrency(discountAmount)}</div>
                </div>
                <div className='p-2 flex w-full justify-between items-center'>
                    <div>Shipping Charges:</div>
                    <div className='text-lg font-semibold'>+ {displayINRCurrency(shippingCharges)}</div>
                </div>
                <hr />
                <div className='bg-green-500 rounded-lg p-2 flex w-full justify-between items-center'>
                    <div className='text-white font-semibold text-md'>Total:</div>
                    <div className='text-2xl text-white'>₹ {total}</div>
                </div>
                <hr />
                <div className='mt-2 bg-violet-400 rounded-lg p-2 flex w-full justify-between items-center'>
                    <div className='text-white text-md font-semibold'>Amount to be Paid by Customer:</div>
                    <div className='text-2xl text-white'>{displayINRCurrency(total)}</div>
                </div>
            </div>
        </div>
    );
};

export default YourOrder;
