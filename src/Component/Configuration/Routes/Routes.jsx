import Homepage from "../../UI/Page/Homepage"
import Login from "../../UI/Page/Login"
import Profile from "../../UI/Page/Profile"
import Layouts from "../../UI/Template/Layouts";
import ProductDetails from '../../UI/Page/ProductDetails';
import AdminDashboard from "../../UI/Page/AdminProduct/Dashboard";
import ProductList from "../../UI/Page/AdminProduct/ProductList";
import RoleNavigation from "../../UI/Page/AdminProduct/RoleNavigation";
import User from "../../UI/Page/AdminProduct/User";
import AdminProductDashboard from "../../UI/Page/Product/AdminProductDashboard";
import Product from "../../UI/Page/Product/Product";
import TransactionDetails from "../../UI/Page/Customer/TransactionDetails";
import TransactionList from "../../UI/Page/Customer/TransactionList";
import Customer from "../../UI/Page/AdminProduct/Customer";
import Transaction from "../../UI/Page/AdminProduct/Transaction";
import CustomerDetails from "../../UI/Page/AdminProduct/CustomerDetails";


export const routesConfig = [
    // {
    //     path: '/restriction/:messages',
    //     element: <Restriction />
    // },{
    {
        element: <Layouts />,
        children :[
            {
                path: "/",
                element: <Homepage />
            },
            {
                path: "/product/details/:id",
                element: <ProductDetails />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/profile",
                element: <Profile />
            },
            {
                path: "/user/transaction/:id",
                element: <TransactionDetails />
            },
            {
                path: "/user/transaction/all/:id",
                element: <TransactionList />
            },



            //admin
            {
                path: "/admin/dashboard",
                element: <AdminDashboard />
            },
            {
                path: "/admin/product",
                element: <ProductList />
            },
            {
                path: "/admin/role/navigation",
                element: <RoleNavigation />
            },
            {
                path: "/admin/user",
                element: <User />
            },
            {
                path: "/admin/customer",
                element: <Customer />
            },
            {
                path: "/admin/transaction",
                element: <Transaction />
            },
            {
                path: "/admin/customer/details/:id",
                element: <CustomerDetails />
            },

            //admin product
            {
                path: "/admin_product/dashboard",
                element: <AdminProductDashboard />
            },
            {
                path: "/admin_product/product",
                element: <Product />
            }
        ]
    }
]