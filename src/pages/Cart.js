import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import { Link } from 'react-router-dom'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { CgCloseR } from "react-icons/cg";

const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(4).fill(null)


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

    useEffect(() => {
        setLoading(true)
        handleLoading()
        setLoading(false)
    }, [])


    const increaseQty = async (id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(
                {
                    _id: id,
                    quantity: qty + 1
                }
            )
        })

        const responseData = await response.json()


        if (responseData.success) {
            fetchData()
        }
    }


    const decraseQty = async (id, qty) => {
        if (qty >= 2) {
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type": 'application/json'
                },
                body: JSON.stringify(
                    {
                        _id: id,
                        quantity: qty - 1
                    }
                )
            })

            const responseData = await response.json()


            if (responseData.success) {
                fetchData()
            }
        }
    }

    const deleteCartProduct = async (id) => {
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
            body: JSON.stringify(
                {
                    _id: id,
                }
            )
        })

        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
            context.fetchUserAddToCart()
        }
    }


    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0)

    if (data.length === 0 && !loading) {
        return (
            <>
                <div className='h-[89vh] w-full flex items-center justify-center'>
                    <div className='w-[80vw] h-96 flex items-center justify-center rounded-xl bg-gray-200  border '>
                        <div className='text-3xl text-black'>
                            No Data
                        </div>
                    </div>
                </div>

            </>
        );
    }





    return (
        <>

            <div className='container p-7' >
                <div className='flex flex-col lg:flex-row gap-5 lg:justify-center items-start '>
                    {/***view product */}
                    <div className='w-full max-w-3xl flex flex-col gap-4'>
                        {loading ? (
                            loadingCart?.map((el, index) => (
                                <div key={el + "Add To Cart Loading" + index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                </div>
                            ))
                        ) : (
                            data.map((product, index) => (
                                <div key={product?._id + "Add To Cart Loading"} className='w-full bg-white h-full border border-slate-200  rounded grid grid-cols-[128px,1fr]'>
                                    <div className='flex items-center justify-center w-20 h-full bg-slate-200 '>
                                        <img src={product?.productId?.productImage[0]} className=' sm:h-10 sm:w-10 w-20 h-20  object-scale-down mix-blend-multiply' alt={product?.productId?.productName} />
                                    </div>
                                    <div className='p-2 flex-col items-center justify-between gap-10'>
                                        {/* Delete product */}
                                        <div className='text-red-800 rounded-full float-right hover:bg-red-600 hover:text-white cursor-pointer' onClick={() => deleteCartProduct(product?._id)}>
                                            <RxCross2 />
                                        </div>

                                        <div className='flex items-center justify-between w-full sm:w-[60%]'>
                                            <div>
                                                <h2 className='text-sm sm:text-md lg:text-md xl:text-lg text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                                <p className='capitalize text-xs sm:text-sm lg:text-md xl:text-md text-slate-500'>{product?.productId.category}</p>
                                            </div>

                                            <div className='flex items-center gap-3 mt-3 py-2'>
                                                <button
                                                    className={`border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ${product?.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    onClick={() => decraseQty(product?._id, product?.quantity)}
                                                    disabled={product?.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span>{product?.quantity}</span>
                                                <button
                                                    className={`border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ${product?.quantity >= product?.productId?.Stock ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    onClick={() => increaseQty(product?._id, product?.quantity)}
                                                    disabled={product?.quantity >= product?.productId?.Stock}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <div className='flex items-center justify-between py-1'>
                                            <p className='text-red-600  text-xl'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                            <p className='text-slate-600  text-xl'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>


                    <div className='flex flex-col lg:flex-row lg:justify-center  w-full lg:w-[20%]'>

                        <div className='w-full'>
                            {
                                loading ? (
                                    <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>

                                    </div>
                                ) : (
                                    <div className='h-full  flex  flex-col gap-3 '>
                                        <h2 className='p-3  text-2xl font-semibold'>Summary</h2>
                                        <div className=''>
                                            <div className='flex items-center border-b justify-between p-2 gap-2  text-sm text-slate-600'>
                                                <p>Quantity</p>
                                                <p>{totalQty}</p>
                                            </div>
                                            <div className='flex items-center border-b justify-between p-3 gap-2  text-md text-slate-600'>
                                                <p>sub-total</p>
                                                <p>{displayINRCurrency(totalPrice)}</p>
                                            </div>

                                            <div className='flex items-center justify-between p-3 gap-2  text-md text-slate-600'>
                                                <p>Total Price</p>
                                                <p className='font-semibold text-lg text-black'>{displayINRCurrency(totalPrice)}</p>
                                            </div>
                                        </div>

                                        <Link to={'/checkoutPage'}>
                                            <button className=' bg-gray-800 hover:bg-blue-600 rounded-lg p-2 w-full text-white px-10 mt-2'>Checkout</button>
                                        </Link>

                                    </div>
                                )
                            }
                        </div>
                    </div>




                </div>

                {/***summary  */}


            </div>

        </>

    )
}

export default Cart