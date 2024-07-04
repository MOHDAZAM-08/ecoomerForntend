import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { useSelector } from 'react-redux';

const UserOrders = () => {
  
  const user = useSelector(state => state?.user?.user);
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${SummaryApi.allOrders.url}/${user?._id}`, {
        method: SummaryApi.allOrders.method,
        credentials: 'include',
        headers: {
          "Content-Type": 'application/json'
        }
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
      setOrders(data);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const productsWithStatus = Array.isArray(orders) ? orders.flatMap(order =>
    order.products.map(product => ({ ...product, paymentStatus: order.paymentStatus,orderStatus: order.orderStatus }))
  ) : [];


  console.log("productsWithStatus", orders);

  useEffect(() => {
    fetchData();
  }, [user]);


  if (!orders.length) {
    return(
      <>
      <div className='h-[80vh] w-full flex items-center justify-center' >
        <div className='flex items-center justify-center h-96 w-[80vw] bg-gray-200 rounded-lg border text-xl text-black font-semibold'>No data</div>
      </div>
      </>
    );
  }


  // const totalPrice = productsWithStatus?.reduce((acc, product) => acc + product.price * product.quantity, 0);

  return (
    <>
      <div className=' flex  items-center justify-center h-full w-full '>
        <div className=' mt-2 h-[calc(100vh-142px)] rounded mb-3  w-[calc(100vw-200px)] gap-10    p-5 items-start justify-between  flex-col' style={{ boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px" }}>
          <div className='p-1'>Your order history :</div>

          <div className=' h-[calc(100vh-200px)]  w-full overflow-y-auto flex-col '>
            {productsWithStatus?.map((item, index) => (
              <div key={index} className=' flex my-3'>

                <div className='w-full bg-white h-26 border border-slate-300 rounded flex '>
                  <div className='w-26 h-20 rounded bg-slate-200 p-5 '>
                    <img src={item.images} alt={item.name} className='object-contain w-14 h-14  mix-blend-multiply' />
                  </div>

                  <div className='flex items-center justify-evenly w-full'>
                    <div className='p-3 flex gap-3 w-64 items-center justify-between'>
                      <h2 className=' text-md lg:text-lg text-ellipsis line-clamp-1'>{item.name}</h2>
                      <p className='text-red-600 font-medium text-xs'>Quantity: {item.quantity}</p>
                    </div>
                    <div className='p-3 flex gap-3  items-center  justify-between'>
                      <p className='w-30 text-slate-600 font-normal text-xs p-0 m-0 whitespace-nowrap'>Total Price:  </p>
                      <p className='text-red-500 text-xl whitespace-nowrap p-0 m-0'>₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                  <div className='p-2 flex gap-5 justify-start'>
                  <div className='flex whitespace-nowrap items-center gap-3 justify-between'>
                    Payment status:
                    <span className={`bg-${item.paymentStatus === 'paid' ? 'green' : 'red'}-500  text-white pl-4 pr-4 pt-1 pb-2 rounded-lg`}>
                      {item?.paymentStatus}
                    </span>
                  </div>
                  <div className='flex whitespace-nowrap items-center gap-3 justify-between'>
                    Order status:
                    <span className={`bg-${item?.orderStatus === 'Shipped' ? 'green' : 'red'}-500  text-white pl-4 pr-4 pt-1 pb-2 rounded-lg`}>
                      {item?.orderStatus}
                    </span>
                  </div>

                  </div>
                 
                </div>
              </div>
            ))}

          </div>
          {/* <div className='mt-4 rounded  bg-red-500 text-white p-4 w-48 text-lg'>
                      Total price: ₹ {totalPrice}
                    </div> */}




        </div>

      </div>
    </>
  );
};

export default UserOrders;
