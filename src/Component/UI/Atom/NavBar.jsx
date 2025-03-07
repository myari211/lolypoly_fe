import { Button, Col, Flex, Row } from "antd";
import { Link } from "react-router-dom";
import { Avatar, Dropdown } from 'antd';
import { UserOutlined } from "@ant-design/icons";

const NavBar = (props) => {
    const login = props.login;

    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Transaction
                </a>
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
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
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
                            <img src="/image/logo.png" style={{ width: "150px" }} />
                        </div>
                        <div>
                            {login == false || !login ? (
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