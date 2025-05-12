import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../../Configuration/Services/API/apiHelper";
import LoadingImage from "../../Molecules/Loading";
import { Button, Card, Col, Row, Tabs, Tag } from "antd";
import TableAtom from '../../Atom/TableAtom';
import { formatDate, formatRupiah } from "../../../Configuration/Services/Number/numberHelper";

const CustomerDetails = () => {
    const { TabPane } = Tabs;
    const {id} = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const getData = async() => {
            setLoading(true)
            const url = "/admin/customer/details/" + id;

            const response = await get({}, url);
            if(response.data.status == true) {
                setData(response.data.data);
            }

            setLoading(false);
            // console.log(response);
        }

        getData();
    }, []);

    const columns = [
        {
            title: "Transaction Number",
            dataIndex: "id",
            key: 'id',
        },
        {
            title: "Transaction Date",
            render: (_, created_at) => {
                return formatDate(created_at.created_at);
            }
        },
        {
            title: "Product Name",
            dataIndex: ['products', 'name'],
            key: 'product_name',
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity"
        },
        {
            title: "Total",
            render: (_, data) => {
                return formatRupiah(data.price);
            }
            // dataIndex: "price",
            // key: "price",
        },
        {
            title: "Status",
            render: (_, record) => {
                let color = "geekblue";
                if(record.status == "success") {
                    color = "green";
                }
                else if(record.status == "failed") {
                    color = "volcano";
                }

                return(
                    <Tag color={color} key={record.status}>{record.status}</Tag>
                )
            }
        },
        {
            title: "Action",
            render: (_, data) => {
                return(
                    <>
                        <Button type="primary" className="mr-1" onClick={() => handleProduct(data.products.id)}>Product</Button>
                        <Button onClick={() => handleTransaction(data.id)}>Transaction</Button>
                    </>
                )
            }
        }
    ];

    const handleProduct = (id) => {
        window.open('/product/details/' + id);
    }

    const handleTransaction = (id) => {
        window.open('/user/transaction/' + id);
    }

    return(
        <>
            {!loading ? (
                <>
                    {data.map(item => (
                        <>
                            <Row>
                                <Col span={24}>
                                    <Card>
                                        <Row>
                                            <Col span={12}>
                                                <span>First Name</span>
                                                <p>{item.first_name}</p>
                                            </Col>
                                            <Col span={12}>
                                                <span>Last Name</span>
                                                <p>{item.last_name}</p>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={12}>
                                                <span>Email</span>
                                                <p>{item.email}</p>
                                            </Col>
                                            <Col span={12}>
                                                <span>Phone</span>
                                                <p>{item.phone}</p>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            </Row>
                            <Row className="mt-2">
                                <Col span={24}>
                                    <Card>
                                        <Tabs defaultActiveKey='1'>
                                            <TabPane tab="Personal Information" key="1">
                                                <Row>
                                                    <Col span={12}>
                                                        <p>Province</p>
                                                        <p>{!item.profile ? "No Data" : item.profile.province}</p>
                                                    </Col>
                                                    <Col span={12}>
                                                        <p>City</p>
                                                        <p>{!item.profile ? "No Data" : item.profile.city}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col span={12}>
                                                        <p>District</p>
                                                        <p>{!item.profile ? "No Data" : item.profile.district}</p>
                                                    </Col>
                                                    <Col span={12}>
                                                        <p>Village</p>
                                                        <p>{!item.profile ? "No Data" : item.profile.village}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col span={12}>
                                                        <p>Address</p>
                                                        <p>{!item.profile ? "No Data" : item.profile.address}</p>
                                                    </Col>
                                                    <Col span={12}>
                                                        <p>ZIP Code</p>
                                                        <p>{!item.profile ? "No Data" : item.profile.zip_code}</p>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane tab="Transaction" key="2">
                                                <Row>
                                                    <Col span={24}>
                                                        {Array.isArray(item.transaction) && item.transaction.length > 0 ? (
                                                            <TableAtom
                                                                columns={columns}
                                                                data={item.transaction}
                                                                loading={loading}
                                                                form={false}
                                                                end={false}
                                                            />
                                                        ) : (
                                                            "No Data Transaction"
                                                        )}
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                        </Tabs>
                                    </Card>
                                </Col>
                            </Row>
                        </>
                    ))}
                </>
            ) :
            (
                <LoadingImage />
            )}
        </>
    )
}

export default CustomerDetails;