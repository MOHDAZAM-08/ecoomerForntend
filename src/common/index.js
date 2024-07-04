const baseURL = "https://ecoomerbackend.onrender.com/"

const SummaryApi = {
    signUP : {
        url : `${baseURL}/api/signup`,
        method : "post"
    },
    signIn : {
        url : `${baseURL}/api/signin`,
        method : "post"
    },
    current_user : {
        url : `${baseURL}/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `${baseURL}/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `${baseURL}/api/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `${baseURL}/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `${baseURL}/api/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `${baseURL}/api/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `${baseURL}/api/update-product`,
        method  : 'post'
    },
    categoryProduct : {
        url : `${baseURL}/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `${baseURL}/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `${baseURL}/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `${baseURL}/api/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `${baseURL}/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `${baseURL}/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `${baseURL}/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `${baseURL}/api/delete-cart-product`,
        method : 'post'
    },
    ClearAddToCartProducts : {
        url : `${baseURL}/api/clear-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `${baseURL}/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `${baseURL}/api/filter-product`,
        method : 'post'
    },
    checkOut:{
        url : `${baseURL}/api/checkout-payment`,
        method : 'post'
    },
    allOrders : {
        url : `${baseURL}/api/All-orders`,
        method : 'get'
    },
    Order: {
        url: `${baseURL}/api/orders`,
        method: 'get'
    },    
    AdminAllOrders : {
        url : `${baseURL}/api/Admin-All-orders`,
        method : 'get'
    },    
    allAdminDeliveredOrders : {
        url : `${baseURL}/api/allAdminDeliveredOrders`,
        method : 'get'
    },
    updateOrderStatus : {
        url : `${baseURL}/api/update-Order-status`,
        method : 'post'
    },
    updatePaymentStatus : {
        url : `${baseURL}/api/update-payment-status`,
        method : 'post'
    }
    ,
    conformOrder : {
        url : `${baseURL}/api/conform-order`,
        method : 'post'
    },
    verifyPayment : {
        url : `${baseURL}/api/verify-payment`,
        method : 'post'
    }
}


export default SummaryApi