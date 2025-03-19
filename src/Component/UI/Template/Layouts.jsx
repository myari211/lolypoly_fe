import { useState, useEffect } from 'react';
import { Col, Flex, Row } from "antd";
import { Outlet } from "react-router-dom"
import NavBar from "../Atom/NavBar";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserInformation } from '../../Configuration/Redux/Action/userLoginAction';

const Layouts = () => {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile)
    const login = localStorage.getItem('LoginStatus');
    const name = localStorage.getItem('first_name') + localStorage.getItem('last_name');
    const userId = localStorage.getItem('userId');


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

    return(
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
    )
}

export default Layouts