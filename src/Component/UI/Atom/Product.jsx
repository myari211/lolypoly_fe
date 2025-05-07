import { Card, Row, Col, Flex, Typography, Tag, Badge } from "antd";
import { formatRupiah } from "../../Configuration/Services/Number/numberHelper";
import { SquareImage } from "./Image";
import { useNavigate, Link } from "react-router-dom";

const { Text } = Typography;

const Product = ({ props }) => {
    const baseImage = process.env.REACT_APP_BASE_IMAGE;
    const navigate = useNavigate();

    return (
        <>
        <Link to={`/product/details/${props.id}`}>
            <Card 
                style={{ height: "100%", padding: 0 }} 
                hoverable 
                cover={
                    (() => {
                      const bannerImage = props.images.find(item => item.banner == 1);
                      return bannerImage ? (
                        <SquareImage
                          src={baseImage + "/" + bannerImage.image_path}
                          alt={props.name}
                        />
                      ) : null;
                    })()
                }
            >
                    <Row className="mt-1">
                        <Col span={24}>
                            <span>{props.name}</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}> 
                            <Flex align="center" justify="space-between">    
                                <p className="mr-1" style={{ fontWeight: "600", color: "#4395d1", fontSize: "16px"}}>{props.discount_price != 0 ? formatRupiah(props.discount_price) : formatRupiah(props.price)}</p>
                                {props.discount_price != 0 && (<Text delete style={{ fontSize: "10px"}}>{formatRupiah(props.price)}</Text>)}
                            </Flex>
                            {
                                    props.discount_percentage != 0 && (
                                        <Tag color="#108ee9">
                                            Disc {props.discount_percentage}% 
                                        </Tag>
                                    )
                                }
                        </Col>
                    </Row>
            </Card>
        </Link>
        </>
    )
}

export default Product;