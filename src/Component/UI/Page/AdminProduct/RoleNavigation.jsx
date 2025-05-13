import { useState, useEffect } from 'react';
import TableAtom from '../../Atom/TableAtom';
import { get, post } from '../../../Configuration/Services/API/apiHelper';
import { Button, Card, Col, Row } from 'antd';
import LoadingImage from '../../Molecules/Loading';
import { ModalPopUp, showErrorToasts } from '../../../Configuration/Services/Alert/alertHelper';

const RoleNavigation = () => {
    const [dataInit, setDataInit] = useState({});
    const [loading, setLoading] = useState(true);
    const [formOpen, setFormOpen] = useState(false);
    const [modalStatus, setModalStatus] = useState("create");
    const [formData, setFormData] = useState({});
    const [role, setRole] = useState({});
    const [navigation, setNavigation] = useState({});
    const [loadingButton, setLoadingButton] = useState(false);

    useEffect(() => {
        getDataRoleNavigation();
        getRole();
        getNavigation();
    }, []);

    const getRole = async() => {
        const response = await get({}, "/admin/role/list");

        if(response.data.status == true) {
            setRole(response.data.data);
        }
    }

    const getDataRoleNavigation = async() => {
        setLoading(true);
        const response = await get({}, "/admin/role_has_navigations/list");
        

        if(response.data.status == true) {
            setDataInit(response.data.data);
        }

        setLoading(false);
    }

    const getNavigation = async() => {
        const response = await get({}, "/admin/navigation/list");

        if(response.data.status == true) {
            setNavigation(response.data.data);
        }
    }

    const columns = [
        {
            title: "Role",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Navigation",
            render: (_, item) => {
                return item.navigation?.map(data => data.navigation).join(", ");
            }
        },
    ];

    const form = [
        {
            title: "Role",
            name: "role",
            value: formData?.role,
            col: 24,
            type: "select",
            list: Array.isArray(role)
            ? role.map(item => ({
                value: item.id,
                label: item.name,
            }))
            : [],
        },
        {
            title: "Navigation",
            name: "navigation_id",
            value: formData?.navigation_id,
            type: "multiselect",
            col: 24,
            list: Array.isArray(navigation)
            ? navigation.map(item => ({
                value: item.id,
                label: item.navigation,
            }))
            : [],
        }
    ];

     const handleEdit = (id) => {
        setModalStatus("update");
        setFormOpen(true);
        const selectedItems = dataInit.find(item => item.id == id);
        const navigation_id = Array.isArray(selectedItems.navigation)
            ? selectedItems.navigation.map(item => item.id)
            : [];

        setFormData({
            role: selectedItems.id,
            navigation_id: navigation_id,
        });

        setFormOpen(true);
    }

    console.log("formData", formData);

    const handleModalClose = () => {
        setModalStatus("create");
        setFormOpen(false);
    }

    const handleUpdate = async() => {
        setLoadingButton(true);
        try {
            const updateRoleNavigation = await post(formData, "/admin/role_has_navigations/create");

            if(updateRoleNavigation.data.status == true) {
                ModalPopUp("Data Updated", "success");
                setFormData({});
                handleModalClose();
                getDataRoleNavigation();
            }
            else {
                showErrorToasts(updateRoleNavigation.data.message);
            }
        }
        catch(error) {
            showErrorToasts(error);
        }

        setLoadingButton(false);
    }

    const handleDelete = () => {
        ModalPopUp("This data cannot be deleted", "info");
    }

    return(
        <>
        {!loading ? (
            <Row>
                <Col span={24}>
                    <Card>
                        <TableAtom
                            columns={columns}
                            data={dataInit}
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
                            handleDelete={handleDelete}
                        />
                    </Card>
                </Col>
            </Row>
           ) : (
            <LoadingImage />
           )}
        </>
    )
}

export default RoleNavigation;