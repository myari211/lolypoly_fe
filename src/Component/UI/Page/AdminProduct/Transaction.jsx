import { useEffect, useState } from "react";
import { get } from "../../../Configuration/Services/API/apiHelper";
import TableAtom from "../../Atom/TableAtom";
import LoadingImage from "../../Molecules/Loading";
import { formatDate } from "../../../Configuration/Services/Number/numberHelper";
import { Button, Tag } from "antd";

const Transaction = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTransaction();
    }, []);

    const getTransaction = async () => {
        setLoading(true);

        const response = await get({}, '/admin/transaction/list');

        if(response.data.status == true) {
            setData(response.data.data);
        }

        setLoading(false);
    }

    const handleDetails = (id) => {
        window.open('/user/transaction/' + id, '_blank');
    }

    const columns = [
        {
            title: "Transaction Number",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Product",
            render: (_, record) => record.products?.name || "-",
            key: 'product',
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Total",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Customer",
            render: (_, record) => record.users?.first_name + " " + record.users?.last_name || "_",
            key: "users",
        },
        {
            title: "Date",
            render: (_, record) => formatDate(record.created_at),
            key: 'created_at',
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
            title: "Details",
            render: (_, record) => (
                <Button onClick={() => handleDetails(record.id)}>Details</Button>
            )
        },
    ];

    return(
        
        <>
            {!loading ? (
                <TableAtom 
                    data={data}
                    // form={false}
                    loading={loading}
                    columns={columns}
                    title="Customer"
                    form={false}
                    end={false}
                />
            ) : (
                <>
                    <LoadingImage />
                </>
            )}
        </>
       
    )
}

export default Transaction;