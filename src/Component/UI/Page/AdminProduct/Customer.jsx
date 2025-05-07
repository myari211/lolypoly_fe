import { useEffect, useState } from "react";
import { get } from "../../../Configuration/Services/API/apiHelper";
import LoadingImage from "../../Molecules/Loading";
import TableAtom from "../../Atom/TableAtom";
import { Button } from 'antd';

const Customer = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getCustomer = async() => {
            setLoading(true);

            const response = await get({}, '/admin/customer/list');

            if(response.data.status == true) {
                setData(response.data.data);
            }

            setLoading(false);
        }

        getCustomer();
    }, []);

    const handleDetails = (id) => {
        window.open("/admin/customer/details/" + id);
    }

    const columns = [
        {
            title: "First Name",
            dataIndex: "first_name",
            key: 'last_name',
        },
        {
            title: "Last Name",
            dataIndex: "last_name",
            key: 'last_name',
        },
        {
            title: "Email",
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: "Phone Number",
            dataIndex: "phone",
            key: "phone",
        },
        {
            title: "Details",
            render: (_, record) => (
                <Button onClick={() => handleDetails(record.user_id)}>Details</Button>
            ),
            key: "id",
        }
    ];

    return(
        <>
            {!loading ? (
                <>
                    <TableAtom 
                        data={data}
                        // form={false}
                        loading={loading}
                        columns={columns}
                        title="Customer"
                        form={false}
                        end={false}
                    />
                </>   
            ) : (
                <LoadingImage />
            )}
        </>
    )
}

export default Customer;