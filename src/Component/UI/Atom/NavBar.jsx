import { Button, Col, Flex, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, Dropdown } from 'antd';
import { UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from 'react';
import { post } from "../../Configuration/Services/API/apiHelper";

const NavBar = (props) => {
    const [loginState, setLoginState] = useState(null);
    const login = localStorage.getItem("LoginStatus");
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    // console.log("login", login);

    useEffect(() => {
        setLoginState(login);
    }, [login]);

    console.log("loginState", loginState);

    const handleLogout = async() => {
        const response = await post({}, '/logout');

        if(response.data.success == true) {
            localStorage.clear();
            navigate('/');
        }
    }

    const items = [
        {
            key: '1',
            label: (
                // <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                <Link to={`/user/transaction/all/${userId}`}>
                    Transaction
                </Link>
                // </a>
            ),
        },
        {
            key: '2',
            label: (
                // <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    <Link to="/profile">
                        Profile
                    </Link>
                // </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    Change Password
                </a>
            ),
        },
        {
            key: '4',
            label: (
                <a onClick={() => handleLogout()}>
                    Log Out
                </a>
            ),
        },
    ];

    return(
        <>
            <Row justify="center">
                <Col span={24} style={{ minHeight: "75px", backgroundColor: "white" }} className="border pr-2 pl-2">
                    <Flex justify="space-between" align="center" style={{ height: "100%"}}>
                        <div>
                            <Link to="/">
                                <img src="/image/logo.png" style={{ width: "150px" }} />
                            </Link>
                        </div>
                        {/* <div>
                            <Link to="/">
                                Home
                            </Link>
                            <Link to="/case">
                                Case
                            </Link>
                            <Link to=""
                        </div> */}
                        <div>
                            {loginState == "false" || !login ? (
                                <>
                                    <Link to="/login">
                                        <Button type="primary" className="mr-1">Login</Button>
                                    </Link>
                                    <Button type="primary">Sign Up</Button>
                                </>
                            ) : (
                                <>
                                    <Dropdown menu={{items}}>
                                        <Flex align="center">
                                            {props.profile.avatar != null ? (
                                                <></>
                                            ) : (
                                                <>
                                                    <Avatar className="mr-1" size={30} icon={<UserOutlined />} />
                                                </>
                                            )}
                                            <p style={{ fontWeight: 600}}>{props.name}</p>
                                        </Flex>
                                    </Dropdown>
                                </>
                                
                        )}
                        </div>
                    </Flex>
                </Col>
            </Row>
        </>
    )
}

export default NavBar;