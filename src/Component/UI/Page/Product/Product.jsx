import { useEffect, useState } from "react";
import { get, getImg, post } from "../../../Configuration/Services/API/apiHelper";
import { Card, Col, Row, Tag } from "antd";
import TableAtom from "../../Atom/TableAtom";
import { ModalPopUp, showErrorToasts } from "../../../Configuration/Services/Alert/alertHelper";
import Form from "../../Atom/Form";

const Product = () => {
    const [data, setData] = useState({});
    const [dataInit, setDataInit] = useState({});
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({});
    const [categoryOption, setCategoryOption] = useState({});
    const [loadingButton, setLoadingButton] = useState(false);
    const [modalStatus, setModalStatus] = useState();
    const [modalExcel, setModalExcel] = useState(false);
    const [dataExcel, setDataExcel] = useState({});
    const [excelLoading, setExcelLoading] = useState(false);

    useEffect(() => {
        getProduct();
        getCategory();
      }, []);

    const getProduct = async () => {
        setLoading(true);
        const response = await get([], '/admin/product/list');
    
        if (response.data.status === true) {
            setDataInit(response.data.data);
            const product = response.data.data.map((item) => ({
            id: item.id,
            name: item.name,
            stock: item.stock,
            price:
              item.discount_price != null && item.discount_price !== 0
                ? item.discount_price
                : item.price,
            discount_percentage:
              item.discount_percentage === 0
                ? '-'
                : item.discount_percentage + '%',
            category: item.category.map((child) => child.name),
          }));
    
          setData(product);
        }
        setLoading(false);
      };

    const getCategory = async() => {
    const response = await get([], '/admin/category_product/list');

    if (response.data.status === true) {
        const option = response.data.data.map((item) => ({
        value: item.id,
        label: item.name,
        }));

        setCategoryOption(option);
    }
    };

    const columns = [
        {
            title: "Product Name",
            dataIndex: "name",
            key: 'name',
        },
        {
            title: "Stock",
            dataIndex: "stock",
            key: "stock",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Discount",
            dataIndex: "discount_percentage",
            key: "discount",
            render: (_, { discount_percentage }) => (
                <Tag color="volcano">
                    {discount_percentage}
                </Tag>
            ),
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
        }
    ];

    const form = [
        {
            title: "Product Name",
            name: "name",
            type: "input",
            col: "18",
            value: formData?.name,
        },
        {
            title: "Stock",
            name: "stock",
            type: "input",
            col: "6",
            value: formData?.stock,
        },
        {
            title: "Price",
            name: "price",
            type: "input",
            col: "24",
            value: formData?.price
        },
        {
            title: "Discount Price",
            name: "discount_price",
            type: "input",
            col: "12",
            value: formData?.discount_price
        },
        {
            title: "Discount Percentage",
            name: "discount_percentage",
            type: "input",
            col: "12",
            value: formData?.discount_percentage
        },
        {
            title: "Dealpos ID",
            name: "deal_pos_id",
            type: "input",
            col: 12,
            value: formData?.deal_pos_id,
        },
        {
            title: "Category",
            name: "category",
            type: "multiselect",
            col: 12,
            list: categoryOption,
            value: formData?.category,
        },
        {
            title: "Description",
            name: "description",
            col: 24,
            type: "textarea",
            value: formData?.description,
        },
        {
            title: "Hot Product",
            name: "hot",
            col: 8,
            type: "checkbox",
            value: formData?.hot
        },
        {
            title: "Newest Product",
            name: "newest",
            col: 8,
            type: "checkbox",
            value: formData?.newest
        },
        {
            title: "Store",
            name: "store",
            col: 8,
            type: "checkbox",
            value: formData?.store
        },
        {
            title: "Image",
            name: "image",
            col: 24,
            type: "image",
            value: formData?.image,
        }
    ];

    const handleOpenModal = () => {
        setFormData({});
        setModalStatus("create");
        setOpenModal(true);
    }

    const closeModal = () => {
        setOpenModal(false);
    }

    const handleSubmit = async() => {
        setLoadingButton(true);
        const addProduct = await post(formData, '/admin/product/create', true);

        if(addProduct.data.status == true) {
            getProduct();
            setFormData({});
            ModalPopUp("Data Created", "success");
        }
        else {
            showErrorToasts(addProduct.data.message);
        }

        setLoadingButton(false);
    }

    const handleModalExcel = () => {
        setModalExcel(true);
    }

    const handleCloseExcel = () => {
        setModalExcel(false);
    }

    const handleEdit = (id) => {
        setModalStatus("update");
        const selectedItems = dataInit.find(item => item.id == id);
        console.log(selectedItems);
        setFormData({
            id: selectedItems.id,
            name: selectedItems.name,
            stock: selectedItems.stock,
            price: selectedItems.price,
            discount_price: selectedItems.discount_price,
            discount_percentage: selectedItems.discount_percentage,
            deal_pos_id: selectedItems.deal_pos_id,
            description: selectedItems.description,
            hot: selectedItems.hot_deal,
            newest: selectedItems.newest,
            store: selectedItems.store,
            category: selectedItems.category.map(item => {
                return item.id;
            }),
            image: selectedItems.images.map(item => ({
                id: item.id,
                url: getImg(item.image_path),
                show: item.banner,
            }))
        })
        setOpenModal(true);
        // ModalPopUp(id, "info");
        // console.log(id);
    }

    const handleUpdate = async() => {
        setLoadingButton(true);
        const url = "/admin/product/edit/" + formData.id;
        const response = await post(formData, url, true);

        if(response.data.status == true) {
            ModalPopUp(response.data.message, "success");
            closeModal();
            setFormData({});
        }
        else {
            showErrorToasts(response.data.message);
        }

        setLoadingButton(false);
    }

    const onSubmit = async() => {
        // console.log(dataExcel);
        setExcelLoading(true)
        const response = await post(dataExcel, '/admin/product/upload', true);

        if(response.data.status == true) {
            ModalPopUp(response.data.message, "success");
            handleCloseExcel();
            getProduct();
        }
        else {
            showErrorToasts(response.data.message);
        }

        setExcelLoading(false);
    }

    const formExcel = [
        {
            type: "file",
            name: "excel",
            col: 24,
        },
    ]

    return(
        <>
            <Row>
                <Col span={24}>
                    <Card>
                        {!loading && (
                            <>
                            <TableAtom 
                                data={data}
                                // form={false}
                                loading={loading}
                                columns={columns}
                                title="Product"
                                form={form}
                                isModal={openModal}
                                openModal={handleOpenModal}
                                closeModal={closeModal}
                                formData={formData}
                                setFormData={setFormData}
                                onSubmit={handleSubmit}
                                handleEdit={handleEdit}
                                loadingButton={loadingButton}
                                modalStatus={modalStatus}
                                handleUpdate={handleUpdate}
                                excel={true}
                                excelModal={handleModalExcel}
                            />

                            <Form
                                open={modalExcel}
                                close={handleCloseExcel}
                                title="Product"
                                form={formExcel}
                                formData={dataExcel}
                                setFormData={setDataExcel}
                                onSubmit={onSubmit}
                                // loadingButton={props.loadingButton}
                                modalStatus="create"
                            />
                          </>
                        )}
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Product;