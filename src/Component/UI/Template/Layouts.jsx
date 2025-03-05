import { useState, useEffect } from 'react';
import { Col, Flex, Row } from "antd";
import { Outlet } from "react-router-dom"
import NavBar from "../Atom/NavBar";
import { useSelector, useDispatch } from "react-redux";


export const AcmeLogo = () => {
    return (
        <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
            <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};


const Layouts = () => {
    const login = localStorage.getItem('LoginStatus');
    const name = localStorage.getItem('first_name') + localStorage.getItem('last_name');

    return(
        <>
            <Row>
                <Col span={24}>
                    <NavBar
                        login={login}
                        name={name}
                    />
                </Col>
            </Row>
            <Outlet />
        </>
    )
}

export default Layouts