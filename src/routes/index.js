import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassowrd from '../pages/ForgotPassowrd'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import CheckoutPage from '../pages/CheckoutPage'
import Success from '../pages/Success'
import Failed from '../pages/Failed'
import UserOrders from '../pages/UserOrders'
import YourOrder from '../pages/YourOrder'
import AdminAllOrders from '../pages/AdminAllOrders'
import AdminCompleteOrders from '../pages/AdminCompleteOrders'

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassowrd/>
            },
            {
                path : "sign-up",
                element : <SignUp/>
            },
            {
                path : "product-category",
                element : <CategoryProduct/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : 'cart',
                element : <Cart/>
            },
            {
                path : "checkoutPage",
                element : <CheckoutPage/>
            },
            {
                path : "search",
                element : <SearchProduct/>
            }, 
            {
                path : "success",
                element : <Success/>
            },
             {
                path : "*",
                element : <Failed/>
            },
             {
                path : "Order-History",
                element : <UserOrders/>
            },{
                path : "order",
                element : <YourOrder/>
            },
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path : "all-products",
                        element : <AllProducts/>
                    }, {
                        path : "all-Orders",
                        element : <AdminAllOrders/>
                    }, {
                        path : "Complete-Orders",
                        element : <AdminCompleteOrders/>
                    }
                ]
            },
        ]
    }
])


export default router