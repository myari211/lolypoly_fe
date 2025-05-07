import { useState, useEffect } from 'react';
import { get } from '../../../Configuration/Services/API/apiHelper';
import TableAtom from '../../Atom/TableAtom';
import { Tag } from 'antd';
import { handleInputChange } from '../../../Configuration/Services/Form/formHelper';


const User = () => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({});
    const [formOpen, setFormOpen] = useState(false);
    const [formData, setFormData] = useState({});
    const [roleOption, setRoleOption] = useState({});

    // useEffect(() => {
    //     const getUser = async() => {
    //         try {
    //             setLoading(true);
    //             const response = await get([], "/admin/user/user_list");

    //             if(response.data.status == true) {
    //                 setUserData(response.data.data);
    //             }

    //             setLoading(false);
    //         }
    //         catch(error) {
    //             setLoading(false);
    //             console.log(error);
    //         }
    //     }

    //     getUser();
    // }, []);

    // useEffect(() => {
    //     const getRoleOption = async() => {
    //         const response = await get([], '/admin/role/list');

    //         if(response.data.status == true) {
    //             const options = response.data.data.map((item) => ({
    //                 value: item.id,
    //                 label: item.name,
    //             }));

    //             setRoleOption(options);
    //         }
    //     }

    //     getRoleOption();
    // }, []);

    const data = !loading ? userData.map(item => {
        return {
            key: item.id,
            first_name: item.first_name,
            last_name: item.last_name,
            role_name: item.role_name,
            // navigation: item.navigation.map(child => child.navigation).join(', ')
        }
    })
    : 
    [];

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
            title: "Role",
            dataIndex: "role_name",
            key: "role_name",
            render: (_, { role_name }) => {
                let color;
            
                if (role_name == "admin") {
                  color = "volcano";
                } else if (role_name == "Super-Admin") {
                  color = "geekblue";
                } else {
                  color = "green"; 
                }
            
                return (
                  <Tag key={role_name} color={color}>
                    {role_name}
                  </Tag>
                );
              },
        },
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
            value: "role",
            col: 24,
            type: "select",
            list: roleOption
        },
    ];

    const openModal = () => {
        setFormOpen(true);
    }

    const closeModal = () => {
        setFormOpen(false);
    }

    console.log(formData);
    
    return(
        <>
            <TableAtom
                columns={columns}
                data={data}
                loading={loading}
                isModal={formOpen}
                openModal={openModal}
                closeModal={closeModal}
                title="User"
                form={form}
                formData={formData}
                setFormData={setFormData}
            />
        </>
    )
}

export default User;