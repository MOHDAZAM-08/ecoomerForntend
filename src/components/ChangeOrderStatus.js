import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeOrderStatus = ({ orderId, currentStatus, onClose, callFunc }) => {
    const [orderStatus, setOrderStatus] = useState(currentStatus);

    const handleOnChangeSelect = (e) => {
        setOrderStatus(e.target.value);
        console.log("Selected status:", e.target.value); // Log selected status for debugging
    };

    const updateOrderStatus = async () => {
        try {
            console.log("Sending orderId:", orderId); // Log orderId for debugging

            const fetchResponse = await fetch(SummaryApi.updateOrderStatus.url, {
                method: SummaryApi.updateOrderStatus.method,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    orderId: orderId,
                    status: orderStatus
                })
            });

            const responseData = await fetchResponse.json();

            if (responseData.success) {
                toast.success(responseData.message);
                onClose();
                callFunc();
            } else {
                toast.error(responseData.message);
            }

            console.log("Order status updated", responseData);
        } catch (error) {
            console.error("Error updating order status:", error);
            toast.error("Failed to update order status");
        }
    };

    console.log("orderId in ChangeOrderStatus:", orderId); // Log orderId for debugging

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-gray-800 bg-opacity-50 rounded-lg'>
            <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
                <button className='block ml-auto' onClick={onClose}>
                    <IoMdClose />
                </button>

                <h1 className='pb-4 text-lg font-medium'>Change Order Status</h1>

                <div className='flex items-center justify-between my-4'>
                    <p>Status:</p>
                    <select className='border px-4 py-1' value={orderStatus} onChange={handleOnChangeSelect}>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>

                <button className='w-fit mx-auto block py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={updateOrderStatus}>Update Status</button>
            </div>
        </div>
    );
};

export default ChangeOrderStatus;
