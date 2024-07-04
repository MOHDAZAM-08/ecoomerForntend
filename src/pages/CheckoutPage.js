import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import displayINRCurrency from '../helpers/displayCurrency';
import SummaryApi from '../common';
import paymentImg from '../assest/payment.png'
import paymentImg2 from '../assest/pay2.png'
// import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useSelector } from 'react-redux';

export default function CheckoutPage() {

    // const user = useSelector(state => state?.user?.user)


    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])    // const navigate = useNavigate();

    const [formData, setFormData] = useState({
        address: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };



    const formattedProducts = data.map(product => ({
        name: product.productId.productName,
        productId: product.productId._id,
        // imgdata: product.productId.productImage[0],
        price: product.productId.sellingPrice,
        quantity: product.quantity,
    }));

    console.log("formdata", formattedProducts);

    console.log("form",formData);







    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent form from refreshing the page

        const stripe = await loadStripe("pk_test_51Ov3waSFw5INplZv3LJNuOWyX1VnbnbBC2Z9FCVdhcJTmtjdtlv75AG1xLNO6GCkG83brtBHHtvwnXMIHiLwSRhm00nF3VYL2O");

        const body = JSON.stringify({
            products: formattedProducts,
            ...formData
        });

        try {
            const dataResponse = await fetch(SummaryApi.checkOut.url, {
                method: SummaryApi.checkOut.method,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: body
            });

            if (!dataResponse.ok) {
                throw new Error(`Failed to initiate checkout: HTTP error! status: ${dataResponse.status}`);
            }

            const session = await dataResponse.json();

            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });


            if (result.error) {
                throw new Error(`Redirect to checkout failed: ${result.error.message}`);
            }

        } catch (error) {
            console.error("Error during checkout:", error);
            toast.error("Failed to initiate checkout");
        }
    };



    const fetchData = async () => {

        const response = await fetch(SummaryApi.addToCartProductView.url, {
            method: SummaryApi.addToCartProductView.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
        })


        const responseData = await response.json()

        if (responseData.success) {
            setData(responseData.data)
        }


    }

    const handleLoading = async () => {
        await fetchData()
    }

    // console.log("data", data)

    useEffect(() => {
        setLoading(true)
        handleLoading()
        setLoading(false)
    }, [])


    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0)

    return (
        <div className="flex  justify-evenly  md:flex-col-revers lg:flex-row flex-col-reverse">

            <div className="min-w-[50vw] p-4 flex-col justify-start h-full">
                <form className="border rounded  p-6 w-full max-w-full bg-white" onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Checkout</h2>


                    <div className="mb-4">
                        <label className="block text-black">Address:</label>
                        <div className="bg-gray-100 p-2 rounded">
                            <input
                                type="text"
                                placeholder="Enter your address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                required
                                className="w-full h-full outline-none bg-transparent"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-black">City:</label>
                        <div className="bg-gray-100 p-2 rounded">
                            <input
                                type="text"
                                placeholder="Enter your City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                className="w-full h-full outline-none bg-transparent"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-black">State:</label>
                        <div className="bg-gray-100 p-2 rounded">
                            <input
                                type="text"
                                placeholder="Enter your State"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                required
                                className="w-full h-full outline-none bg-transparent"
                            />
                        </div>
                    </div>

                    <div className="flex space-x-4 mb-4">
                        <div className="flex-1">
                            <label className="block text-black">Pin Code:</label>
                            <div className="bg-gray-100 p-2 rounded">
                                <input
                                    type="text"
                                    placeholder="Enter your pin code"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-full outline-none bg-transparent"
                                />
                            </div>
                        </div>
                        <div className="flex-1">
                            <label className="block text-black">Phone No:</label>
                            <div className="bg-gray-100 p-2 rounded">
                                <input
                                    type="text"
                                    placeholder="Enter phone number"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    maxLength={10}
                                    className="w-full h-full outline-none bg-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    <button className="bg-gray-800 hover:bg-blue-700 text-white px-6 py-2 w-full rounded-lg transition-all mt-6">
                        Proceed to Payment
                    </button>
                </form>
                <p className='p-2'>Payment methods : </p>

                <div className="flex flex-col gap-2 lg:flex-row xl:flex-row p-2 w-full lg:h-[20vh] h-full  justify-center">
                    <img className="w-full h-full object-contain mix-blend-multiply" src={paymentImg} alt="Payment" />
                    <img className="w-full h-full object-contain mix-blend-multiply" src={paymentImg2} alt="Payment" />
                </div>


            </div>

            <div className=" p-5 mt-5 lg:mt-0 w-full max-w-sm">
                {loading ? (
                    <div className="h-[500px] bg-slate-200 border border-slate-300 animate-pulse">
                        <div className="h-auto bg-white gap-3 flex flex-col p-2">
                            <p className="bg-gray-200 h-10 rounded-full mb-4"></p>
                            <div className="bg-gray-200 h-10 rounded-full flex justify-between ">
                                <div className="bg-gray-200 animate-pulse h-8 w-full rounded-full"></div>
                                <div className="bg-gray-200 animate-pulse h-8 w-full rounded-full"></div>
                                <div className="bg-gray-200 animate-pulse h-8 w-full rounded-full"></div>
                                <div className="bg-gray-200 animate-pulse h-8 w-full rounded-full"></div>
                            </div>
                            <div className="flex flex-col gap-4">
                                {data?.map((product) => (
                                    <div key={product._id} className="flex flex-col ">
                                        <div className="flex items-center gap-4 justify-between p-2">
                                            <div className="flex flex-col w-16 h-16 md:w-20 md:h-20 overflow-hidden p-1 items-center justify-center">
                                                <div className="bg-gray-200 h-full w-full rounded-lg animate-pulse"></div>
                                                {/* <p className='text-center text-xs md:text-xs capitalize'>{product?.productId?.productName}</p> */}
                                            </div>
                                            <div className="flex justify-between w-full">
                                                <p className="text-center h-12 bg-gray-200 animate-pulse w-full "></p>
                                                <p className="text-center h-12 bg-gray-200 animate-pulse w-full "></p>
                                                <p className="text-center h-12 bg-gray-200 animate-pulse w-full "></p>
                                            </div>
                                        </div>
                                        <hr className="h-0.5 w-full bg-slate-300" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600 animate-pulse mt-4">
                                <div className="bg-gray-200 h-12 w-full rounded-full"></div>
                                <div className="bg-gray-200 h-12 w-full rounded-full"></div>
                            </div>
                            <hr className="" />
                            <div className="flex items-center justify-between p-0 gap-2 font-medium text-xl text-slate-600 animate-pulse">
                                <div className="bg-gray-200 h-12 w-full rounded-full"></div>
                                <div className="bg-gray-200 h-12 w-full rounded-full"></div>
                            </div>
                        </div>
                    </div>

                ) : (
                    <div className="h-auto border rounded">
                        <h2 className="text-gray text-lg p-2">Order Summary:</h2>
                        <p className="text-black border-b  px-4 py-1 flex justify-between">
                            <p>item</p>
                            <p>Price</p>
                            <p>Qnt</p>
                            <p>Total</p>
                        </p>
                        <div className='flex-col'>
                            {data?.map((product) => (
                                <div>
                                    <div className='pr-2 cursor-pointer flex items-center gap-2 justify-between' key={product._id}>
                                        <div className='mr-6 flex-col w-14 h-16  md:w-20 md:h-20  overflow-hidden p-1  flex items-center justify-center'>
                                            <img
                                                src={product?.productId?.productImage[0]}
                                                className='h-full object-scale-down mix-blend-multiply'
                                                alt='product img'
                                            />
                                            {/* <p className='text-center text-xs md:text-xs capitalize'>{product?.productId?.productName}</p> */}
                                        </div>
                                        <div className='flex justify-between w-full'>
                                            <p className='text-center text-sm md:text-base capitalize'>{product?.productId?.sellingPrice}</p>
                                            <p className='text-center text-sm md:text-base capitalize'>{product?.quantity}</p>
                                            <p className='text-center text-sm md:text-base capitalize'>
                                                {product?.quantity && product?.productId?.sellingPrice
                                                    ? product.quantity * product.productId.sellingPrice
                                                    : 0}
                                            </p>
                                        </div>

                                    </div>
                                    <hr className='h-0.5 w-full'></hr>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between p-2 gap-2  text-lg text-slate-600">
                            <p>Quantity</p>
                            <p>{totalQty}</p>
                        </div>
                        <hr />
                        <div className="flex items-center justify-between p-4 gap-2  text-xl text-slate-600">
                            <p>Total Price</p>
                            <p className='text-2xl text-black'>{displayINRCurrency(totalPrice)}</p>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
