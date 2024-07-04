import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation,useHistory, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import Context from '../context';

const Success = () => {
  const user = useSelector(state => state?.user?.user);
  

  const context = useContext(Context)
  const userID = user?._id;
  const location = useLocation();
  const navigate = useNavigate();

  const [sessionId, setSessionId] = useState(null);
  const [productId, setProductId] = useState([]);


  

  const fetchData = async () => {
    try {
      const response = await fetch(SummaryApi.addToCartProductView.url, {
        method: SummaryApi.addToCartProductView.method,
        credentials: 'include',
        headers: {
          "content-type": 'application/json'
        },
      });

      const responseData = await response.json();
      if (responseData.success) {
        const ids = responseData.data.map(item => item.productId._id);
        setProductId(ids);
      } else {
        // Handle unsuccessful response
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error('Error fetching cart products:', error);
      toast.error('Failed to fetch cart products');
    }
  };




  const handledelete = async () => {
    try {
      let productIds = Array.isArray(productId) ? productId : [productId];
  
      if (productIds.length === 0) {
        console.error('No products to delete from cart');
        return;
      }
  
      const response = await fetch(SummaryApi.ClearAddToCartProducts.url, {
        method: SummaryApi.ClearAddToCartProducts.method,
        credentials: 'include',
        headers: {
          "content-type": 'application/json'
        },
        body: JSON.stringify({ productIds: productIds }), // Wrap productIds in an object
      });
  
      const responseData = await response.json();
  
      if (responseData.success) {
        fetchData();
        context.fetchUserAddToCart();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error('Error deleting cart products:', error);
      toast.error('Failed to delete cart products');
    }
  };



  
  const conformOrders = async (sessionId) => {
    try {
      const response = await fetch(SummaryApi.verifyPayment.url, {
        method: SummaryApi.verifyPayment.method,
        credentials: 'include',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ sessionId: sessionId, userId: userID }),
      });

      if (!response.ok) {
        throw new Error(`Failed to conform orders: HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData.message);
        localStorage.setItem(`orderConfirmed-${sessionId}`, 'true');
        addToSessionHistory(sessionId);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error('Error front conforming orders:', error);
      toast.error('Failed to conform orders');
    }
  };

  const addToSessionHistory = (sessionId) => {
    const sessionHistory = JSON.parse(localStorage.getItem('sessionHistory')) || [];
    if (!sessionHistory.includes(sessionId)) {
      sessionHistory.push(sessionId);
      localStorage.setItem('sessionHistory', JSON.stringify(sessionHistory));
    }
  };

  const clearSessionHistory = () => {
    const sessionHistory = JSON.parse(localStorage.getItem('sessionHistory')) || [];
    sessionHistory.forEach(sessionId => {
      localStorage.removeItem(`orderConfirmed-${sessionId}`);
    });
    localStorage.removeItem('sessionHistory');
  };

  useEffect(() => {
    fetchData();
    if (userID) {
      const queryParams = new URLSearchParams(location.search);
      const sessionId = queryParams.get('session_id');

      if (sessionId && sessionId !== localStorage.getItem('currentSessionId')) {
        localStorage.setItem('currentSessionId', sessionId);
        const orderConfirmed = localStorage.getItem(`orderConfirmed-${sessionId}`);

        if (!orderConfirmed) {
          setSessionId(sessionId);
        }
      }
    }

    return () => {
      clearSessionHistory();
    };
  }, [userID]);


  useEffect(() => {
    if (sessionId) {
      conformOrders(sessionId);
    }
  }, [sessionId]);


  useEffect(() => {
      handledelete();
  }, [navigate]);
  

  return (
    <div className="h-[100vh] w-[100vw] fixed z-40 top-0 left-0">
      <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-white">
        <div className="h-96 w-[90vw] border rounded bg-slate-200 flex flex-col items-center justify-center">
          <div className='text-4xl text-black font-bold'>Order Successful</div>
          <div className='text-2xl text-black font-semibold'>Your order has been placed successfully.</div>
          <Link to='/' className='p-4 cursor-pointer hover:text-red-600' onClick={handledelete}>go to Home &rarr;</Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
