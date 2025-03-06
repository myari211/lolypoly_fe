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

    console.log(login, userId);

    useEffect(() => {
        // if(login == true) {
            const checkLogin = () => {
                dispatch(fetchUserInformation(userId));
            }

            checkLogin();
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