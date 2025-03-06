import Homepage from "../../UI/Page/Homepage"
import Login from "../../UI/Page/Login"
import Profile from "../../UI/Page/Profile"
import Layouts from "../../UI/Template/Layouts"


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
                path: "/login",
                element: <Login />
            },
            {
                path: "/profile",
                element: <Profile />
            }
        ]
    }
]