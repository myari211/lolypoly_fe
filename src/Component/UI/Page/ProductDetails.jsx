import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProduct, fetchProductDetails } from '../../Configuration/Redux/Action/productDetailsAction';
import { Row, Col, Card, Carousel, Tabs, Button, Flex } from 'antd';
import { get } from '../../Configuration/Services/API/apiHelper';
import { formatRupiah } from '../../Configuration/Services/Number/numberHelper';

const { TabPane } = Tabs;

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const productState = useSelector(state => state.productDetails);
    const data = productState.data;
    const loading = productState.loading;
    console.log(productState);

    useEffect(() => {
        const getProductDetails = () => {
            dispatch(fetchProduct(id));

            // if(response.data.status == true) {
            //     setData(response.data.data);
            // }
            // else {
            //     setData({});
            // }
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
        if(counter > data?.stock) {
            return alert('Stock not available');
        }
    
        setCounter(counter + 1);
        }
    
        const handleMinusCounter = () => {
        if(counter < 1) {
            return alert('Minimum order 1');
        }
    
        setCounter(counter - 1);
        }
    
        return (
        <>
            {!loading ? (
            // <Layout>
                <Row className="mt-4" gutter={24}>
                    <Col span={8}>
                        <Row justify="center">
                            <Col span={16}>
                                <div style={{ marginBottom: '20px' }}>
                                    <img 
                                    src={selectedImage} 
                                    alt="Main Product Image" 
                                    className="rounded"
                                    style={{ width: '400px', height: 'auto', height: '400px', objectFit: 'contain' }} 
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row justify="center">
                            <Col span={16}>
                                <Row justify="center" gutter={8}>
                                    {data?.images?.map(image => (
                                        <Col span={6} className="mb-2">
                                            <img src={url + "/" + image.image_path}
                                                onClick={() => handleImageClick(`${url}/${image.image_path}`)}
                                                style={{ width: "100px", height: "100px", objectFit: 'cover', cursor: 'pointer', }}
                                                className="bordered rounded"
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <Col>
                                <h3>{data.name}</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h2>{formatRupiah(data.price)}</h2>
                                {/* <h2>{data.price}</h2> */}
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
                                        <h5>Category</h5>
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
                                        <h5>Merk</h5>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <h4>Samsung, Apple, Android, Universal</h4>
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col span={24}>
                                        <h5>Store</h5>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <h4>Available</h4>
                                    </Col>
                                </Row>
                            </TabPane>
                        </Tabs>
                    </Col>
                    <Col span={8}>
                        <Row justify="center">
                            <Col span={18}>
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
                                            <Button type="primary" size="lg" block className="button">Add to cart</Button>
                                        </Col>
                                    </Row>
                                    <Row className="mt-1">
                                        <Col span={24}>
                                            <Button type="primary" size="lg" block ghost className="button">Checkout</Button>
                                        </Col>
                                    </Row>
                                    <Row className="mt-5">
                                        <Col span={12}>
                                            <Flex justify='center'>
                                                <Button size="sm">Chat</Button>
                                            </Flex>
                                        </Col>
                                        <Col span={12}>
                                            <Flex justify="center">
                                                <Button size="sm">Share</Button>
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