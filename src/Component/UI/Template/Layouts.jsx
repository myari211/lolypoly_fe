import { useState, useEffect } from 'react';
import { Col, Flex, Row } from "antd";
import { Outlet, useNavigate } from "react-router-dom"
import NavBar from "../Atom/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserInformation } from '../../Configuration/Redux/Action/userLoginAction';
import SideNav from '../Atom/SideNav';
import { post } from '../../Configuration/Services/API/apiHelper';

const Layouts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profile = useSelector(state => state.profile)
    const login = localStorage.getItem('LoginStatus');
    const name = localStorage.getItem('first_name') +" "+ localStorage.getItem('last_name');
    const userId = localStorage.getItem('userId');
    const role = atob(localStorage.getItem("role"));
    const [navigation, setNavigation] = useState({});
    const [loadingMenu, setLoadingMenu] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(login == true) {
            const checkLogin = () => {
                dispatch(fetchUserInformation(userId));
            }

            checkLogin();
        }
        // else {
        //     const deleteUserStatus = () => {
        //         localStorage.removeItem("LoginStatus");
        //         localStorage.removeItem("PosID");
        //         localStorage.removeItem("firstName");
        //         localStorage.removeItem("first_name");
        //         localStorage.removeItem("last_name");
        //         localStorage.removeItem("token");
        //         localStorage.removeItem("userId");
        //         localStorage.removeItem("email");
        //     }

        //     deleteUserStatus();
        // }
    }, [login]);

    useEffect(() => {
        const getNavigation = async() => {
            const data = {
                "role": role,
            }

            const response = await post(data, '/ecommerce/navigation/list');
            setLoadingMenu(true);

            if(response.data.status == true) {
                setNavigation(response.data.data);
            }

            setLoadingMenu(false);
            // console.log(response, "Ini Menu");
        }

        getNavigation();
    }, [role]);

     const handleLogout = async() => {
        setLoading(true);
        const response = await post({}, '/logout');

        if(response.data.status == true) {
            localStorage.clear();
            navigate('/');
        }

        setLoading(false);
    }

    // console.log(navigation);

    return(
        <>
            {role == 'admin' || role == 'Admin-Stock' ? (
                <>
                    <Row>
                        <Col span={24}>
                            <NavBar 
                                login={login}
                                name={name}
                                profile={profile}
                                handleLogout={handleLogout}
                                loading={loading}
                            />
                        </Col>
                    </Row>
                    <Row className="mt-2" gutter={16}>
                        <Col span={4}>
                            {/* <SideNav
                                data={navigation}
                            /> */}
                            {navigation && navigation.length > 0 && (
                                <SideNav 
                                    data={navigation} 
                                    loading={loadingMenu}
                                />
                            )}
                        </Col>
                        <Col span={18}>
                            <Outlet />
                        </Col>    
                    </Row>
                </>
            ) : (
                <>
                    <Row>
                        <Col span={24}>
                            <NavBar
                                login={login}
                                name={name}
                                profile={profile}
                            />
                        </Col>
                    </Row>
                    <Outlet />
                </>
            )}
        </>
    )
}

export default Layouts