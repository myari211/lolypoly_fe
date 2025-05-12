import { useState, useEffect } from 'react';
import TableAtom from '../../Atom/TableAtom';
import { get } from '../../../Configuration/Services/API/apiHelper';
import { Button, Card, Col, Row } from 'antd';

const RoleNavigation = () => {
    const [dataInit, setDataInit] = useState({});
    const [loading, setLoading] = useState(true);
    const [formOpen, setFormOpen] = useState(false);
    const [modalStatus, setModalStatus] = useState("Create");
    const [formData, setFormData] = useState({});

    useEffect(() => {
        const getDataRoleNavigation = async() => {
            const response = await get({}, "/admin/role_has_navigations/list");
            setLoading(true);

            if(response.data.status == true) {
                setDataInit(response.data.data);
            }

            setLoading(false);
        }

        getDataRoleNavigation();
    }, []);

    const columns = [
        {
            title: "Role",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Navigation",
            dataIndex: "navigation",
            key: "navigation",
        },
    ]

    const data = !loading ? dataInit.map(item => {
        return {
            key: item.id,
            name: item.name,
            navigation: item.navigation.map(child => child.navigation).join(', ')
        }
    })
    : 
    [];

    const form = [
        {
            title: "First Name",
            name: "first_name",
            // value: formData?.first_name,
            col: 12,
            type: "input"
        },
    ];

     const handleEdit = (id) => {
        setModalStatus("Update");
        // const selectedItems = dataInit.find(item => item.id == id);
        // console.log(selectedItems);
        // setFormData({
        //     id: selectedItems.id,
        //     name: selectedItems.name,
        //     stock: selectedItems.stock,
        //     price: selectedItems.price,
        //     discount_price: selectedItems.discount_price,
        //     discount_percentage: selectedItems.discount_percentage,
        //     deal_pos_id: selectedItems.deal_pos_id,
        //     description: selectedItems.description,
        //     hot: selectedItems.hot_deal,
        //     newest: selectedItems.newest,
        //     store: selectedItems.store,
        //     category: selectedItems.category.map(item => {
        //         return item.id;
        //     }),
        //     image: selectedItems.images.map(item => ({
        //         id: item.id,
        //         url: getImg(item.image_path),
        //         show: item.banner,
        //     }))
        // })
        setFormOpen(true);
        // ModalPopUp(id, "info");
        // console.log(id);
    }

    const handleModalClose = () => {
        setModalStatus("create");
        setFormOpen(false);
    }

    const handleUpdate = () => {

    }

    return(
        <>
            <Row>
                <Col span={24}>
                    <Card>
                        <TableAtom
                            columns={columns}
                            data={data}
                            loading={loading}
                            form={form}
                            add={false}
                            addButton={false}
                            isModal={formOpen}
                            handleEdit={handleEdit}
                            closeModal={handleModalClose}
                            formData={formData}
                            setFormData={setFormData}
                            modalStatus={modalStatus}
                            handleUpdate={handleUpdate}
                            title="Role Navigation"
                        />
                    </Card>
                </Col>
            </Row>
           
        </>
    )
}

export default RoleNavigation;