import { useState } from 'react';
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Button, Card, Col, Input, Row, Flex } from "antd";
import { handleInputChange } from "../../Configuration/Services/Form/formHelper";
import { useSelector, useDispatch } from 'react-redux';
import { fetchLogin } from '../../Configuration/Redux/Action/authAction';

const Login = () => {
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);
    const [formData, setFormData] = useState({});

    // console.log(formData);

    const handleLogin = () => {
        dispatch(fetchLogin(formData));
    }

    return(
        <>
            <Row className="mt-3">
                <Col span={24}>
                    <Flex justify="center">
                        <img src="/image/logo.png" style={{ width: "150px" }} />
                    </Flex>
                </Col>
            </Row>
            <Row justify="center" className="mt-2">
                <Col span={8}>
                    <Card style={{ minHeight: "60vh" }}>
                        <Row>
                            <Col span={24}>
                                <Flex justify="space-between" align="center">
                                    <p className="sub-title" style={{ fontWeight: 700 }}>Masuk ke Lolypoly</p>
                                    <p className="font-color" style={{ fontWeight: "500"}}>Daftar</p>
                                </Flex>
                            </Col>
                        </Row>
                        <Row justify="center" className="mt-3">
                            <Col span={24}>
                                <Input size="large" placeholder="Email" prefix={<UserOutlined />} type="email" name="email" onChange={handleInputChange(setFormData, formData)} />
                            </Col>
                        </Row>
                        <Row justify="center" className="mt-1">
                            <Col span={24}>
                                <Input size="large" placeholder="Password" prefix={<LockOutlined />} type="password" name="password" onChange={handleInputChange(setFormData, formData)} />
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col span={24}>
                                <Button type="primary" size="large" block onClick={handleLogin} loading={authState.loading}>Login</Button>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col span={8}>
                                <br />
                            </Col>
                            <Col span={8}>
                                <Flex justify="center">
                                    Atau
                                </Flex>
                            </Col>
                            <Col span={8}>
                                <br />
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col span={24}>
                                <Button type="primary" size="large" danger block>Google</Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Login;