import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProduct, fetchProductDetails } from '../../Configuration/Redux/Action/productDetailsAction';
import { Row, Col, Card, Carousel, Tabs, Button, Flex, Tag, Typography } from 'antd';
import { get } from '../../Configuration/Services/API/apiHelper';
import { formatRupiah } from '../../Configuration/Services/Number/numberHelper';
import { MessageOutlined, ShareAltOutlined, FireFilled, StarFilled, ShoppingFilled } from '@ant-design/icons';
import { ModalPopUp } from '../../Configuration/Services/Alert/alertHelper';
import { updateQuantity } from '../../Configuration/Redux/Action/productSlice';

const { TabPane } = Tabs;
const { Text } = Typography;

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const productState = useSelector(state => state.productDetails);
    const product = useSelector((state) => state.products[id]);
    const data = productState.data;
    const loading = productState.loading;
    const login = localStorage.getItem('LoginStatus');

    useEffect(() => {
        const getProductDetails = () => {
            dispatch(fetchProduct(id));
        }

        getProductDetails();
    }, []);

    // const [data, setData] = useState({});
    // const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [counter, setCounter] = useState(1);
    const [subTotal, setSubTotal] = useState(0);
    const [cartTrigger, setCartTrigger] = useState(0);
    const [cart, setCart] = useState(0);
    const url = "http://localhost:8000";
    const userId = localStorage.getItem('userId');

    // useEffect(() => {
    //     const fetchProductDetails = async() => {
    //         setLoading(true);
    //         const address = `${url}/api/ecommerce/product/details/${id}`;
    
    //         const response = await get(address);
    
    //         setData(response.data);
    //         setSelectedImage(`${url}/${response.data.images[0].image_path}`);
    //         setSubTotal(response.data.price);
    //         setLoading(false);
    //     }
    
    //     fetchProductDetails();
    // }, [id]);

    useEffect(() => {
        const handleSubTotal = () => {
          setSubTotal(data.price * counter);
        }

    handleSubTotal();
    }, [counter]);
    
        // useEffect(() => {
        // const fetchCart = async() => {
        //     const address = `${url}/api/ecommerce/cart/list/${userId}`
    
        //     const response = await get(address);
        //     setCart(response.data);
        // }
    
        // fetchCart();
        // }, [cartTrigger]);
    
        const handleImageClick = (imagePath) => {
            setSelectedImage(imagePath);
        }
    
        const handleAddCounter = () => {
            if(product.quantity > data.stock) {
                ModalPopUp("Stock is not available", 'warning');
            }

            dispatch(updateQuantity(id, product.quantity + 1));
        }
        
        const handleMinusCounter = () => {
            if(product.quantity < 1) {
                ModalPopUp("Minimum Order 1", 'warning');
            }
        
            // setCounter(counter - 1);
            dispatch(updateQuantity(id, product.quantity - 1));
        }

        const checkLogin = () => {
            if(!login) {
                ModalPopUp("You have login first!", "info");
            }
        }
        
        const handleCheckout = () => {
            checkLogin();
        }

        console.log(product);

        return (
        <>
            {!loading ? (
            // <Layout>
                <Row className="mt-4" gutter={16}>
                    <Col span={6}>
                        <Card>
                            <Row justify="center">
                                <Col span={12}>
                                    <Flex justify="center">
                                        <div style={{ marginBottom: '20px' }}>
                                            <img 
                                            src={selectedImage} 
                                            alt="Main Product Image" 
                                            className="rounded"
                                            style={{ width: '250px', height: 'auto', height: '250px', objectFit: 'contain' }} 
                                            />
                                        </div>
                                    </Flex>
                                </Col>
                            </Row>
                            <Row justify="center" className="mt-1">
                                <Col span={16}>
                                    <Row gutter={8} justify="center">
                                        {data?.images?.map(image => (
                                            <Col className="mb-2">
                                                <img src={url + "/" + image.image_path}
                                                    onClick={() => handleImageClick(`${url}/${image.image_path}`)}
                                                    style={{ width: "50px", height: "50px", objectFit: 'cover', cursor: 'pointer', border: '1px solid #abe'}}
                                                    className="bordered rounded"
                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col span={10}>
                        <Card>
                            <Row>
                                <Col span={24}>
                                    <h2>{data.name}</h2>
                                    {data.discount_price != 0 && (
                                        <Tag color="#f50" icon={<FireFilled />} style={{ borderRadius: "20px"}}>Hot Deal</Tag>
                                    )}
                                    {data.newest != 0 && (
                                        <Tag color="#108ee9" icon={<StarFilled />} style={{ borderRadius: "20px" }}>Newest</Tag>
                                    )}
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {
                                        data.discount_price != 0 ? (
                                            <Flex align="center">
                                                <h2>{formatRupiah(data.discount_price)}</h2>
                                                <Text delete className="ml-1">{formatRupiah(data.price)}</Text>
                                            </Flex>
                                        ) : (
                                            <h2>{formatRupiah(data.price)}</h2>
                                        )
                                    }
                                </Col>
                            </Row>
                            <Tabs defaultActiveKey='1'>
                                <TabPane tab="Description" key="1">
                                    <Row>
                                        <Col>
                                            <div dangerouslySetInnerHTML={{ __html: data.description }} />
                                        </Col>
                                    </Row>
                                </TabPane>
                                <TabPane tab="Spesification" key="2">
                                    <Row>
                                        <Col span={24}>
                                            <h5 className="font-color">Category</h5>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            {data?.category?.map(category => (
                                                <h4>{category.name}</h4>
                                            ))}
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col span={24}>
                                            <h5 className="font-color">Merk</h5>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <h4>Samsung, Apple, Android, Universal</h4>
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col span={24}>
                                            <h5 className="font-color">Store</h5>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>
                                            <h4>Available</h4>
                                        </Col>
                                    </Row>
                                </TabPane>
                            </Tabs>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Row justify="center">
                            <Col span={20}>
                                <Card>
                                    <Row>
                                        <Col span={24}>
                                            <Flex justify="space-between" align="center">
                                                <div>
                                                    <Button onClick={() => handleMinusCounter()}>-</Button>
                                                    <span className="ml-2 mr-2">{counter}</span>
                                                    <Button onClick={() => handleAddCounter() }>+</Button>
                                                </div>
                                                <span>Stock: {data.stock} </span>
                                            </Flex>
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col span={24}>
                                            <Flex justify="space-between" align="center">
                                                <h4 style={{ fontWeight: "bold"}}>Sub total</h4>
                                                <h3 style={{ fontWeight: "bold" }}>Rp{subTotal}</h3>
                                            </Flex>
                                        </Col>
                                    </Row>
                                    <Row className="mt-4">
                                        <Col span={24}>
                                            <Button type="primary" size="lg" block className="button" icon={<ShoppingFilled style={{ color: "white" }} />} onClick={handleCheckout}>
                                                Checkout
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row className="mt-1">
                                        <Col span={24}>
                                            <Button type="primary" size="lg" block ghost className="button">Add To Cart</Button>
                                        </Col>
                                    </Row>
                                    <Row className="mt-5" gutter={16}>
                                        <Col span={12}>
                                            <Flex justify='center'>
                                                <Button size="large" icon={<MessageOutlined />} block style={{ border: "none"}} />
                                            </Flex>
                                        </Col>
                                        <Col span={12}>
                                            <Flex justify="center">
                                                <Button size="large" icon={<ShareAltOutlined />} block style={{ border: "none" }} />
                                            </Flex>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            // </Layout>
            ) : (
                "Loading"
            )}
        </>
        );
    }

export default ProductDetails;