import { Card, Row, Col, Flex, Typography, Tag, Badge } from "antd";
import { formatRupiah } from "../../Configuration/Services/Number/numberHelper";

const { Text, Link } = Typography;

const Product = ({ props }) => {
    const baseImage = process.env.REACT_APP_BASE_IMAGE;

    return (
        <>
            <Card style={{ height: "100%"}}>
                <Row>
                    <Col span={24}>
                        {props.images.map(item => (
                            <img src={baseImage + "/" + item.image_path} style={{ width: "100%" }} />
                        ))}
                    </Col>
                </Row>
                <Row className="mt-1">
                    <Col span={24}>
                        <span>{props.name}</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Flex align="center">
                            {
                                props.discount_percentage != 0 && (
                                    <Tag color="#f50">
                                        {props.discount_percentage}% 
                                    </Tag>
                                )
                            }
                            <p className="mr-1" style={{ fontWeight: "600", color: "#4395d1", fontSize: "16px"}}>{props.discount_price != 0 ? formatRupiah(props.discount_price) : formatRupiah(props.price)}</p> 
                            {props.discount_price != 0 && (<Text delete style={{ fontSize: "12px"}}>{formatRupiah(props.price)}</Text>)}
                        </Flex>
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default Product;