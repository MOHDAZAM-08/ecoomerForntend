

const SummaryApi = {
    signUP : {
        url : `/api/signup`,
        method : "post"
    },
    signIn : {
        url : `/api/signin`,
        method : "post"
    },
    current_user : {
        url : `/api/user-details`,
        method : "get"
    },
    logout_user : {
        url : `/api/userLogout`,
        method : 'get'
    },
    allUser : {
        url : `/api/all-user`,
        method : 'get'
    },
    updateUser : {
        url : `/api/update-user`,
        method : "post"
    },
    uploadProduct : {
        url : `/api/upload-product`,
        method : 'post'
    },
    allProduct : {
        url : `/api/get-product`,
        method : 'get'
    },
    updateProduct : {
        url : `/api/update-product`,
        method  : 'post'
    },
    categoryProduct : {
        url : `/api/get-categoryProduct`,
        method : 'get'
    },
    categoryWiseProduct : {
        url : `/api/category-product`,
        method : 'post'
    },
    productDetails : {
        url : `/api/product-details`,
        method : 'post'
    },
    addToCartProduct : {
        url : `/api/addtocart`,
        method : 'post'
    },
    addToCartProductCount : {
        url : `/api/countAddToCartProduct`,
        method : 'get'
    },
    addToCartProductView : {
        url : `/api/view-card-product`,
        method : 'get'
    },
    updateCartProduct : {
        url : `/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `/api/delete-cart-product`,
        method : 'post'
    },
    ClearAddToCartProducts : {
        url : `/api/clear-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `/api/filter-product`,
        method : 'post'
    },
    checkOut:{
        url : `/api/checkout-payment`,
        method : 'post'
    },
    allOrders : {
        url : `/api/All-orders`,
        method : 'get'
    },
    Order: {
        url: `/api/orders`,
        method: 'get'
    },    
    AdminAllOrders : {
        url : `/api/Admin-All-orders`,
        method : 'get'
    },    
    allAdminDeliveredOrders : {
        url : `/api/allAdminDeliveredOrders`,
        method : 'get'
    },
    updateOrderStatus : {
        url : `/api/update-Order-status`,
        method : 'post'
    },
    updatePaymentStatus : {
        url : `/api/update-payment-status`,
        method : 'post'
    }
    ,
    conformOrder : {
        url : `/api/conform-order`,
        method : 'post'
    },
    verifyPayment : {
        url : `/api/verify-payment`,
        method : 'post'
    }
}


export default SummaryApi