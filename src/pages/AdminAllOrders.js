import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { MdModeEdit } from "react-icons/md";
import ChangeOrderStatus from '../components/ChangeOrderStatus';
import displayINRCurrency from '../helpers/displayCurrency';


const AdminAllOrders = () => {
    const [data, setData] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const getOrder = async () => {
        try {
            const response = await fetch(SummaryApi.AdminAllOrders.url, {
                method: SummaryApi.AdminAllOrders.method,
                credentials: 'include',
                headers: {
                    "Content-Type": 'application/json'
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const currentDate = new Date();

            // Sorting the array based on the proximity to the current date
            data.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);

                const diffA = Math.abs(currentDate - dateA);
                const diffB = Math.abs(currentDate - dateB);

                return diffA - diffB;
            });
            setData(data);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getOrder();
    }, []);

    const handleEditClick = (order) => {
        setSelectedOrder(order);
    };

    console.log("admin data", data);


    if (!data.length) {
        return <h1 className='flex h-full w-full items-center justify-center'>No Data available</h1>;
    }

    return (
        <>
            <h1 className='sticky top-10 left-10 text-3xl px-2 py-1 font-serif '>Total orders: {data.length}</h1>
            <div className='  flex-col items-start justify-evenly p-2 overflow-y-auto h-[74vh] w-full'>
                {data.map((order, index) => {

                    const totalAmount = order.products.reduce((acc, product) => {
                        return acc + product.price * product.quantity;
                    }, 0);


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
                        <div key={order._id} className=" relative mb-10 border rounded-lg p-3 bg-gray-50">
                            <div className='text-md py-2'> Order No. {index + 1}</div>
                            <div className='pl-5 flex gap-6 items-start'>
                                <div className='border rounded-lg p-9'>
                                    <div className='flex-col items-center gap-2'>
                                        <div className='text-lg font-semibold'>Order ID: {order._id}</div>
                                        <div className='flex gap-5'>
                                            <p>{date}</p> <p>{time}</p>
                                        </div>
                                        <div className='flex justify-between gap-3 pt-3 pb-3 w-30'>
                                            <div className='font-semibold'>
                                                Order Status:
                                            </div>
                                            <div className={`rounded-lg font-semibold p-2 text-xs w-40 text-center ${order.orderStatus === 'Delivered' ? 'bg-green-200 text-green-500' : 'bg-red-200 text-red-500'}`}>
                                                <p>{order.orderStatus}</p>
                                            </div>
                                        </div>

                                    </div>


                                    <div className='flex justify-between sgap-3 pt-3'>
                                        <div className='font-semibold'>Payment Status:</div>
                                        <div className={`flex items-center justify-center rounded-lg w-40 font-semibold p-2 text-xs ${order.paymentStatus === 'paid' ? 'bg-green-200 text-green-500' : 'bg-red-200 text-red-500'}`}>
                                            <p>{order.paymentStatus}</p>
                                        </div></div>

                                </div>

                                <div className="flex flex-col gap-4 border p-5 rounded-lg h-52 shadow-inner bg-white">
                                    <h1 className="text-xl font-bold text-gray-800 border-b pb-2 mb-3">Customer's Details</h1>
                                    <div className="space-y-2">
                                        <h2 className="text-gray-700 text-lg">Name: <span className="font-medium">{order.user.name}</span></h2>
                                        <p className="text-gray-700">Address: <span className="font-medium">{order.user.address}</span></p>
                                        <p className="text-gray-700">Contact: <span className="font-medium">{order.user.phone}</span></p>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        className='absolute top-5 right-5 bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                                        onClick={() => handleEditClick(order)}
                                    >
                                        <MdModeEdit />
                                    </button>
                                </div>
                            </div>

                            <div className='flex justify-between items-start'>
                                <div className='mt-3 w-auto gap-2 flex items-start justify-center'>
                                    <div className='max-h-auto w-auto rounded-lg mb-3 border p-5 flex gap-2 justify-between'>
                                        <div className='flex flex-col gap-5'>
                                            <div className='text-2xl pb-3'>Order Items:</div>
                                            <div>
                                                {order.products.map((product) => (
                                                    <div className="flex mb-4" key={product._id.$oid}>
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
                                                                    {displayINRCurrency  (product.price * product.quantity)}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    </div>

                                    <div className='max-h-auto w-auto rounded-lg mb-3 border p-5 flex gap-2 justify-between items-center'>
                                        <div className='text-lg text-gray-600'>Total Amount:</div>
                                        <div className='text-black text-2xl'>
                                        {displayINRCurrency(totalAmount)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {selectedOrder && selectedOrder._id === order._id && (
                                <ChangeOrderStatus
                                    onClose={() => setSelectedOrder(null)}
                                    orderId={order._id}
                                    currentStatus={order.orderStatus}
                                    callFunc={getOrder}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default AdminAllOrders;
