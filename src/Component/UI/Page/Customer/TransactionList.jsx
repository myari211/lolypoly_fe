import { Row, Col, Card, Tag, Flex, Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { get, getImg } from "../../../Configuration/Services/API/apiHelper";
import LoadingImage from "../../Molecules/Loading";
import ProductHorizontal from "../../Atom/ProductHorizontal";
import { formatDate, formatRupiah } from "../../../Configuration/Services/Number/numberHelper";

const TransactionList = () => {
    const navigate = useNavigate();

    const {id} = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTransaction = async () => {
            setLoading(true);

            const response = await get({}, `/user/transaction/list/${id}`);
            if(response.data.status == true) {
                setData(response.data.data);
            }

            setLoading(false);
        }

        getTransaction();
    }, []);
    
    const handleTransactionDetails = (id) => {
        const url = '/user/transaction/' + id;
        navigate(url);
    }

    const handleBuyMore = (id) => {
        const url = "/product/details/" + id;
        navigate(url);
    }

    return(
        <>
            {!loading ? (
                <>
                    {data.map(item => (
                        <Row justify="center" className="mt-2">
                            <Col span={16}>
                                <Card>
                                    <Row gutter={16}>
                                        <Col span={24}>
                                            <span className="mr-1" style={{ fontSize: "12px"}}>{formatDate(item.created_at) }</span>
                                            {/* <span className="mr-1">{item.created_at}</span> */}
                                            <Tag color="geekblue">{item.status}</Tag>
                                            <span className="mr-1" style={{ fontSize: "12px"}}>{item.id}</span>
                                        </Col>
                                    </Row>
                                    <Row className="mt-1" gutter={16}>
                                        <Col span={2}>
                                            <img 
                                                src={
                                                    (() => {
                                                    const bannerImage = item.products.images.find(image => image.banner == 1);
                                                    return getImg(bannerImage.image_path);
                                                    })()}
                                                style={{width: "100%"}}
                                            />
                                        </Col>
                                        <Col span={16}>
                                            <Row gutter={16}>
                                                <Col span={24}>
                                                    <span style={{ fontSize: "18px", fontWeight: 700}}>{item.products.name}</span>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={24}>
                                                    <span>{item.quantity} pcs x {formatRupiah(item.products.discount_percentage != 0 ? item.products.discount_price : item.products.price) }</span>
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col span={4}>
                                            <Row>
                                                <Col span={24}>
                                                    <span>Total</span>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={24}>
                                                    <span style={{ fontSize: "18px", fontWeight: 700 }}>{formatRupiah(item.price)}</span>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <Flex justify="flex-end">
                                                <Button className="mr-1" onClick={() => handleTransactionDetails(item.id)}>Details</Button>
                                                <Button type="primary" onClick={() => handleBuyMore(item.products.id)}>Buy More</Button>
                                            </Flex>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    ))}
                </>
            ) : (
                <LoadingImage />
            )}
        </>
    )

}

export default TransactionList