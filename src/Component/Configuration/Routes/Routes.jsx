import Homepage from "../../UI/Page/Homepage"
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
            }
        ]
    }
]