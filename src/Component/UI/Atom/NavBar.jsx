import { Button, Col, Flex, Row } from "antd";
import { Link } from "react-router-dom";

const NavBar = (props) => {
    const login = props.login;

    return(
        <>
           
                <Row justify="center">
                    <Col span={24} style={{ minHeight: "75px", backgroundColor: "white" }} className="border pr-2 pl-2">
                        <Flex justify="space-between" align="center" style={{ height: "100%"}}>
                            <div>
                                <img src="/image/logo.png" style={{ width: "150px" }} />
                            </div>
                            <div>
                            {login == false ? (
                                <>
                                <Link to="/login">
                                    <Button type="primary" className="mr-1">Login</Button>
                                </Link>
                                <Button type="primary">Sign Up</Button>
                                </>
                            )
                            : (
                                <>
                                    <p>{props.name}</p>
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