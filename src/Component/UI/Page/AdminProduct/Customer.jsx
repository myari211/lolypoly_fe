import { useEffect, useState } from "react";
import { get, post } from "../../../Configuration/Services/API/apiHelper";
import LoadingImage from "../../Molecules/Loading";
import TableAtom from "../../Atom/TableAtom";
import { Button } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { fetchProvince, fetchCity, fetchVillage, fetchDistrict } from "../../../Configuration/Redux/Action/areaAction";
import { ModalPopUp, showErrorToasts } from "../../../Configuration/Services/Alert/alertHelper";

const Customer = () => {
    const dispatch = useDispatch();
    const province = useSelector(state => state.province.data);
    const city = useSelector(state => state.city.data);
    const village = useSelector(state => state.village.data);
    const district = useSelector(state => state.district.data);
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [modal, setModal] = useState(false);
    const [formData, setFormData] = useState({});
    const [modalStatus, setModalStatus] = useState("Create");
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    useEffect(() => {
       getCustomer();
    }, []);

    useEffect(() => {
        const getProvince = () => {
            dispatch(fetchProvince());
        }

        getProvince();
    }, []);

    useEffect(() => {
        if(formData?.province_id != null) {
            const getCity = () => {
                dispatch(fetchCity(formData.province_id));
            }

            getCity();
        }
    }, [formData.province_id]);

    useEffect(() => {
        if(formData?.city_id != null) {
            const getDistrict = () => {
                dispatch(fetchDistrict(formData.city_id));
            }

            getDistrict();
        }
    }, [formData.city_id]);

    useEffect(() => {
        if(formData?.district_id != null) {
            const getVillage = () => {
                dispatch(fetchVillage(formData.district_id));
            }

            getVillage();
        }
    }, [formData.district_id]);

    const handleDetails = (id) => {
        window.open("/admin/customer/details/" + id);
    }

    const getCustomer = async() => {
        setLoading(true);

        const response = await get({}, '/admin/customer/list');

        if(response.data.status == true) {
            setData(response.data.data);
        }

        setLoading(false);
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
                <Button onClick={() => handleDetails(record.id)}>Details</Button>
            ),
            key: "id",
        }
    ];

    const form = [
        {
            type: "input",
            name: "first_name",
            col: 12,
            title: "First Name",
        },
        {
            type: "input",
            name: "last_name",
            col: 12,
            title: "Last Name",
        },
        {
            type: "email",
            name: "email",
            col: 15,
            title: "Email",
        },
        {
            type: "number",
            name: "phone",
            col: 9,
            title: "Phone Number",
        },
        {
            type: "select",
            name: "province_id",
            col: 12,
            title: "Province",
            list: province?.map((item => ({
                value: item.id,
                label: item.name,
            })))
        },
        {
            type: "select",
            name: "city_id",
            col: 12,
            title: "City",
            list: city?.map((item => ({
                value: item.id,
                label: item.name,
            })))
        },
        {
            type: "select",
            name: "district_id",
            col: 10,
            title: "District",
            list: district?.map((item => ({
                value: item.id,
                label: item.name,
            })))
        },
        {
            type: "select",
            name: "village_id",
            col: 10,
            title: "Village",
            list: village?.map((item => ({
                value: item.id,
                label: item.name,
            })))
        },
        {
            type: "number",
            name: 'zip_code',
            col: 4,
            title: "ZIP Code",
        },
        {
            type: 'textarea',
            name: 'address',
            col: 24,
            title: "Address",
        }
    ]

    const handleModal = () => {
        setModalStatus("create");
        setModal(true);
    }

    const closeModal = () => {
        setModalStatus("create");
        setModal(false);
    }

    const handleSubmit = async() => {
        setLoadingSubmit(true);
        const url = "/admin/customer/create";

        const response = await post(formData, url);
        if(response.data.status == true) {
            setFormData({});
            setModalStatus("Create");
            setModal(false);
            ModalPopUp("Customer Created", "success");
            getCustomer();
        }
        else {
            showErrorToasts(response.data.message);
        }

        setLoadingSubmit(false);
    }

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
                        form={form}
                        end={false}
                        openModal={handleModal}
                        modalStatus={modalStatus}
                        closeModal={closeModal}
                        isModal={modal}
                        formData={formData}
                        setFormData={setFormData}
                        onSubmit={handleSubmit}
                        loadingButton={loadingSubmit}
                    />
                </>   
            ) : (
                <LoadingImage />
            )}
        </>
    )
}

export default Customer;