import { useEffect, useState } from "react";
import LoadingImage from "../../Molecules/Loading";
import { get, post } from "../../../Configuration/Services/API/apiHelper";
import TableAtom from "../../Atom/TableAtom";
import { truncateText } from "../../../Configuration/Services/Text/TextHelper";
import { ModalPopUp, showErrorToasts } from "../../../Configuration/Services/Alert/alertHelper";

const Store = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
    const [modal, setModal] = useState(false);
    const [modalStatus, setModalStatus] = useState("create");
    const [buttonLoading, setButtonLoading] = useState(false);

    useEffect(() => {
        getStore();
    }, []);

      const getStore = async() => {
        setLoading(true);
        const response = await get({}, "/admin/store/list");

        console.log("store", response);

        if(response.data.status == true) {
            setData(response.data.data);
        }

        setLoading(false);
    }

    const columns = [
        {
            title: "Store Name",
            key: "store_name",
            dataIndex: "store_name",
        },
        {
            title: "Address",
            key: "address",
            render: (_, item) => {
                return truncateText(item.address);
            }
        },
        {
            title: "PIC",
            key: "pic",
            dataIndex: "pic",
        },
        {
            title: "phone",
            render: (_, item) => {
                return "0" + item.phone;
            }
        },
    ];

    const form = [
        {
            title: "Store Name",
            name: "store_name",
            type: "input",
            col: 24,
            value: formData?.store_name,
        },
        {
            title: "Phone",
            name: "phone",
            type: "number",
            col: 12,
            value: formData?.phone,
        },
        {
            title: "PIC",
            name: "pic",
            type: "input",
            col: 12,
            value: formData?.pic,
        },
        {
            title: "Store Address",
            name: "address",
            type: 'textarea',
            col: 24,
            value: formData?.address,
        }
    ];

    const handleModalOpen = () => {
        setModalStatus("create");
        setModal(true);
    }

    const handleModalClose = () => {
        setModalStatus("create");
        setModal(false);
    }

    const handleSubmit = async() => {
        setButtonLoading(true);

        try {
            const createStore = await post(formData, "/admin/store/create");

            if(createStore.data.status == true) {
                handleModalClose();
                setFormData({});
                ModalPopUp("Data Created", "success");
                getStore();
            }
            else {
                showErrorToasts(createStore.data.message);
            }
        }
        catch(error) {
            showErrorToasts(error);
        }

        setButtonLoading(false);
    }

    const handleEdit = (id) => {
        const selectedData = data?.find(item => item.id == id);

        setFormData({
            store_id: id,
            store_name: selectedData.store_name,
            phone: selectedData.phone,
            address: selectedData.address,
            pic: selectedData.pic,
        });

        setModalStatus("update");
        setModal(true);
    }

    const handleUpdate = async () => {
        setButtonLoading(true);
        try {
            const editStore = await post(formData, "/admin/store/edit");

            if(editStore.data.status == true) {
                handleModalClose();
                setFormData({});
                getStore();
                ModalPopUp("Data Updated", "success");
            }
            else {
                showErrorToasts(editStore.data.message);
            }
        }
        catch (error) {
            showErrorToasts(error);
        }
        setButtonLoading(false);
    }

    const handleDelete = async (id) => {
        try {
            const deleteStore = await post({}, "/admin/store/delete/" + id);
        
            if(deleteStore.data.status == true) {
                ModalPopUp("Data Deleted", "success");
                getStore();
            }
            else {
                showErrorToasts(deleteStore.data.message);
            }
        }
        catch(error) {
            showErrorToasts(error);
        }
    }

    return(
        <>
            {!loading ? (
                <>
                    <TableAtom
                        form={form}
                        columns={columns}
                        data={data}
                        isModal={modal}
                        closeModal={handleModalClose}
                        openModal={handleModalOpen}
                        modalStatus={modalStatus}
                        title="Store"
                        formData={formData}
                        setFormData={setFormData}
                        loadingButton={buttonLoading}
                        onSubmit={handleSubmit}
                        handleEdit={handleEdit}
                        handleUpdate={handleUpdate}
                        handleDelete={handleDelete}
                    />
                </>
            ) : (
                <LoadingImage />
            )}
        </>
    )
}

export default Store;