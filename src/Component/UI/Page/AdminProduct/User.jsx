import { useState, useEffect } from 'react';
import { get, post } from '../../../Configuration/Services/API/apiHelper';
import TableAtom from '../../Atom/TableAtom';
import { Tag } from 'antd';
import { handleInputChange } from '../../../Configuration/Services/Form/formHelper';
import { ModalPopUp, showErrorToasts } from '../../../Configuration/Services/Alert/alertHelper';


const User = () => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState([]);
    const [formOpen, setFormOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [roleOption, setRoleOption] = useState({});
    const [loadingButton, setLoadingButton] = useState(false);
    const [modalStatus, setModalStatus] = useState("create");

    useEffect(() => {
        getUser();
    }, []);

    useEffect(() => {
        const getRoleOption = async() => {
            const response = await get([], '/admin/role/list');

            if(response.data.status == true) {
                const options = response.data.data.map((item) => ({
                    value: item.id,
                    label: item.name,
                }));

                setRoleOption(options);
            }
        }

        getRoleOption();
    }, []);

    const columns = [
        {
            title: "First Name",
            dataIndex: "first_name",
            key: "first_name",
        },
        {
            title: "Last Name",
            dataIndex: "last_name",
            key: "last_name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            render: (_, item) => {
                return item.roles?.map(child => {
                    let color;

                    switch (child.name) {
                        case "admin":
                            color = "volcano";
                            break;
                        case "Super-Admin":
                            color = "geekblue";
                            break;
                        default:
                            color = "green";
                    }

                    return (
                        <Tag key={child.name} color={color}>
                            {child.name}
                        </Tag>
                    );
                });
            }
        },
        {
            title: "Status",
            render: (_, item) => {
                let color;
                let text;

                switch(item.status) {
                    case 0:
                        color = "volcano";
                        text = "Deactivated";
                        break;
                    case 1:
                        color = "green";
                        text = "Active";
                        break
                    default:
                        color = "primary";
                        text = "unknown";
                }

                return (
                    <Tag key={item.id} color={color}>
                        {text}
                    </Tag>
                )
            }
        }
    ];

    const form = [
        {
            title: "First Name",
            name: "first_name",
            value: formData?.first_name,
            col: 12,
            type: "input"
        },
        {
            title: "Last Name",
            name: "last_name",
            value: formData?.last_name,
            col: 12,
            type: "input",
        },
        {
            title: "Email",
            name: "email",
            value: formData?.email,
            col: 24,
            type: "email",
        },
        {
            title: "Role",
            name: "role",
            value: formData?.role,
            col: 24,
            type: "select",
            list: roleOption
        },
        {
            title: "Status",
            name: "status",
            value: formData?.status,
            col:24,
            type: "select",
            list: [
                {
                    value: 1,
                    label: "Active",
                },
                {
                    value: 0,
                    label: "Deactive",
                }
            ]
        }
    ];

    const getUser = async() => {
        try {
            setLoading(true);
            const response = await get([], "/admin/user/user_list");

            if(response.data.status == true) {
                setUserData(response.data.data);
            }

            setLoading(false);
        }
        catch(error) {
            setLoading(false);
            console.log(error);
        }
    }


    const openModal = () => {
        setModalStatus("create");
        setFormOpen(true);
    }

    const closeModal = () => {
        setModalStatus("create");
        setFormOpen(false);
    }

    const handleCreate = async() => {
        setLoadingButton(true);

        try {
            const createUser = await post(formData, "/admin/user/create");

            if(createUser.data.status == true) {
                setFormData({});
                closeModal();
                getUser();
                ModalPopUp("Data Created", "success");
            }
            else {
                showErrorToasts(createUser.data.message);
            }
        }
        catch(error) {
            showErrorToasts(error);
        }
        setLoadingButton(false);
    }

    const handleUpdateButton = (id) => {
        setModalStatus("update");
        const selectedItems = userData.find(item => item.id == id);

        setFormData({
            id: selectedItems.id,
            first_name: selectedItems.first_name,
            last_name: selectedItems.last_name,
            email: selectedItems.email,
            role: selectedItems.roles.map(child => child.id),
            status: selectedItems.status,
        });

        setFormOpen(true);
    }

    const handleUpdate = async() => {
        setLoadingButton(true);

        try {
            const updateUser = await post(formData, "/admin/user/edit/" + formData.id);

            if(updateUser.data.status == true) {
                setFormData({});
                getUser();
                closeModal();
                ModalPopUp("Data Updated", "success");
            }
            else {
                showErrorToasts(updateUser.data.message);
            }
        }
        catch(error) {
            showErrorToasts(error);
        }

        setLoadingButton(false);
    }

    const handleDelete = async (id) => {
        try {
            const deleteUser = await post({}, '/admin/user/delete/' + id);

            if(deleteUser.data.status == true) {
                getUser();
                ModalPopUp("Data Deleted", "success");
            }
            else {
                showErrorToasts(deleteUser.data.message);
            }
        }
        catch(error) {
            showErrorToasts(error);
        }
    } 
    
    return(
        <>
            <TableAtom
                columns={columns}
                data={userData}
                loading={loading}
                isModal={formOpen}
                openModal={openModal}
                closeModal={closeModal}
                title="User"
                form={form}
                formData={formData}
                setFormData={setFormData}
                modalStatus={modalStatus}
                handleEdit={handleUpdateButton}
                loadingButton={loadingButton}
                onSubmit={handleCreate}
                handleUpdate={handleUpdate}
                handleDelete={handleDelete}
            />
        </>
    )
}

export default User;