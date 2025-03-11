import { useState, useEffect } from 'react';
import { get } from '../../Configuration/Services/API/apiHelper';
import { Card, Col, Row } from 'antd';
import ProductBadge from '../Molecules/ProductBadge';

const Homepage = () => {
    const [productLoading, setProductLoading] = useState(false);
    const [productList, setProductList] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            setProductLoading(true);

            const url = "/ecommerce/product/all";

            const product = await get({}, url);

            if(product.data.status == true) {
                setProductLoading(false);
                setProductList(product.data.data);
            }
            else {
                setProductLoading(false);
                alert(product.data.messages);
            }
        }   

        fetchProduct();
    }, []);

    return(
       <>
            {productList.length > 0 ? (
                productLoading ? (
                    <>
                        <span>Loading</span>
                    </>
                ) : (
                    <>
                        <Row justify="center">
                            <Col span={20}>
                                <Row gutter={16}>
                                    {productList.map(item => (
                                        <Col span={4} className="mb-2">
                                            <ProductBadge props={item} />
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                        {/* {productList.map(item => (
                            <li>{item.id}</li>
                        ))} */}
                    </>
                )
            ) : (
                <>

                </>
            )}
       </>
    )
}

export default Homepage;