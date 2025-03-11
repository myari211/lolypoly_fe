import { useState, useEffect } from 'react';
import { get } from '../../Configuration/Services/API/apiHelper';
import { Card, Col, Row, Flex } from 'antd';
import ProductBadge from '../Molecules/ProductBadge';
import { ModalPopUp } from '../../Configuration/Services/Alert/alertHelper';
import Banner from '../Atom/Banner';
import ImageWithFallback, { RoudedImage } from '../Atom/Image';

const Homepage = () => {
    const [productLoading, setProductLoading] = useState(false);
    const [productList, setProductList] = useState({});
    const [bannerList, setBannerList] = useState({});
    const [categoryList, setCategoryList] = useState({});
    const [productHot, setProductHot] = useState({});
    const urlImage = process.env.REACT_APP_BASE_IMAGE;

    useEffect(() => {
        const fetchBanner = async() => {
            const url = "/ecommerce/banner/all";

            const banner = await get({}, url);
            if(banner.data.status == true) {
                setBannerList(banner.data.data);
            }
            else {
                ModalPopUp(banner.data.messages, "error");
            }
        }

        fetchBanner();
    }, []);

    useEffect(() => {
        const fetchCategory = async() => {
            const url = "/ecommerce/category/all";

            const category = await get({}, url);

            if(category.data.status == true) {
                console.log("category", category);
                setCategoryList(category.data.data);
            }
            else {
                ModalPopUp(category.data.messages, "error");
            }
            
        }
        fetchCategory();     
    }, []);

    useEffect(() => {
        const fetchHotProduct = async() => {
            const url = "/ecommerce/product/hot";
            const hotProduct = await get({}, url);

            if(hotProduct.data.status == true) {
                setProductHot(hotProduct.data.data);
            }
            else {
                ModalPopUp(hotProduct.data.messages, "error");
            }
        }

        fetchHotProduct();
    }, []);

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
                ModalPopUp(product.data.messages, "error");
            }
        }   

        fetchProduct();
    }, []);

    return(
        <>
            {bannerList.length < 1 ? (
                <p>Loading ...</p>
            ) : (
                <Row justify="center">
                    <Col span={24}>
                        <Banner
                            props={bannerList}
                        />
                    </Col>
                </Row>
            )}

            {categoryList.length < 1 ? (
                <p>Loading ...</p>
            ) : (
                <Row justify="center" gutter={16} className="mt-2">
                    <Col span={10}>
                        <Card>
                            <Row>
                                <Col span={24}>
                                    <p className="sub-title font-color">Kategori</p>
                                </Col>
                            </Row>
                            <Row gutter={16} className="mt-2" style={{ maxHeight: "250px", overflowX: "scroll", overflowY: "hidden"}}>
                                <Flex align="center">
                                    {categoryList.length > 0 && (categoryList.map(item => (
                                        <Col span={5} className="mb-2" hoverable>
                                            <Row>
                                                <Col span={24}>
                                                    <RoudedImage
                                                        src={urlImage + "/" + item.image_path}
                                                        alt={item.name}
                                                    />
                                                    {/* <ImageWithFallback
                                                        src={urlImage + "/" + item.image_path}
                                                        alt={item.name}
                                                        style={{ borderRadius: "200px" }}
                                                    /> */}
                                                </Col>
                                            </Row>
                                            <Row justify="center">
                                                <Col>
                                                    <p>{item.name}</p>
                                                </Col>
                                            </Row>
                                        </Col>
                                    )))}
                                </Flex>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={10}>
                        <Card>
                            <Row>
                                <Col span={24}>
                                <p className="sub-title font-color">Terbaru</p>
                                </Col>
                            </Row>
                            <Row className="mt-2" gutter={24}>
                                {productHot.length > 0 && (productHot.map(item => (
                                    <Col span={12}>
                                        <ProductBadge props={item} />
                                    </Col>
                                )))}
                            </Row>
                        </Card>
                    </Col>
                </Row>
            )}

            {productList.length > 0 ? (
                productLoading ? (
                    <>
                        <span>Loading</span>
                    </>
                ) : (
                    <>
                        <Row justify="center" className="mt-2">
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