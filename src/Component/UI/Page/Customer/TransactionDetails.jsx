import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getImg, post } from "../../../Configuration/Services/API/apiHelper";
import { Card, Col, Divider, Flex, Row } from "antd";
import LoadingImage from "../../Molecules/Loading";
import Product from "../../Atom/Product";
import ProductHorizontal from "../../Atom/ProductHorizontal";



const TransactionDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);

            const response = await post({}, "/user/transaction/details/" + id);

            if(response.data.status == true) {
                setData(response.data.data);
            }
            
            setLoading(false);
        }

        getData();
    }, [id]);

    console.log("data", data);

    return(
        <>
            {!loading ? (
                <>
                    <Row justify="center" className="mt-2">
                        <Col span={16}>
                            <Card>
                                <Row>
                                    <Col>
                                        <span style={{fontSize: "14px"}}>Transaction ID</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <span style={{fontWeight: 600}}>{data.id}</span>
                                    </Col>
                                </Row>
                                <Row className="mt-2">
                                    <Col>
                                        <span tyle={{fontSize: "14px"}}>Created</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <span style={{fontWeight: 600}}>{data.created_at}</span>
                                    </Col>
                                </Row>
                                <Divider className="mt-3" />
                                <Row className="mt-3">
                                    <Col span={24}>
                                        <Card>
                                            <Row>
                                                <Col span={8}>
                                                    <ProductHorizontal
                                                        props={data.products}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="mt-2">
                                                <Col span={24}>
                                                    <Flex justify="space-between">
                                                        <span>Quantity</span>
                                                        <span>{data.quantity} Pcs</span>
                                                    </Flex>
                                                </Col>
                                            </Row>
                                            <Row className="mt-2">
                                                <Col span={24}>
                                                    <Flex justify="space-between">
                                                        <span>Price</span>
                                                        <span>{data.products.discount_percentage != 0 ? data.products.discount_price : data.products.price}</span>
                                                    </Flex>
                                                </Col>
                                            </Row>
                                            <Row className="mt-2">
                                                <Col span={24}>
                                                    <Flex justify="space-between">
                                                        <span>Total</span>
                                                        <span>{data.price}</span>
                                                    </Flex>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                </>
            ) : (
                <LoadingImage />
            )}
        </>
    )
}

export default TransactionDetails;