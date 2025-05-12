import { useState, useEffect } from 'react';
import { Button, Space, Table, Tag, Row, Col, Modal } from 'antd';
import Form from './Form';
import ImageUploadWall from './ImageUploadWall';

const TableAtom = (props) => {
    const loading = props.loading;
    const [columns, setColumns] = useState(props.columns);
    const [ excelModal, setExcelModal] = useState(false);

    useEffect(() => {
      if(props.end != false) {
        setColumns([
          ...props.columns,
          {
            title: "Action",
            dataIndex: "id",
            render: (_, {id}) => (
                <>
                    <Button type="primary" warning onClick={() => props.handleEdit(id)}>Update</Button>
                    <Button type="primary" className="ml-1" danger onClick={() => props.handleDelete(id) }>Delete</Button>
                </>
            )
          }
        ])  
      }
    }, []);

    const handleExcel = () => {
      setExcelModal(true);
    }

    const handleExcelClose = () => {
      setExcelModal(false);
    }

    // console.log(columns);

    // const columns = [
    //     {
    //       title: 'Name',
    //       dataIndex: 'name',
    //       key: 'name',
    //       render: text => <a>{text}</a>,
    //     },
    //     {
    //       title: 'Age',
    //       dataIndex: 'age',
    //       key: 'age',
    //     },
    //     {
    //       title: 'Address',
    //       dataIndex: 'address',
    //       key: 'address',
    //     },
    //     {
    //       title: 'Tags',
    //       key: 'tags',
    //       dataIndex: 'tags',
    //       render: (_, { tags }) => (
    //         <>
    //           {tags.map(tag => {
    //             let color = tag.length > 5 ? 'geekblue' : 'green';
    //             if (tag === 'loser') {
    //               color = 'volcano';
    //             }
    //             return (
    //               <Tag color={color} key={tag}>
    //                 {tag.toUpperCase()}
    //               </Tag>
    //             );
    //           })}
    //         </>
    //       ),
    //     },
    //     {
    //       title: 'Action',
    //       key: 'action',
    //       render: (_, record) => (
    //         <Space size="middle">
    //           <a>Invite {record.name}</a>
    //           <a>Delete</a>
    //         </Space>
    //       ),
    //     },
    // ];
    // const data = [
    //     {
    //       key: '1',
    //       name: 'John Brown',
    //       age: 32,
    //       address: 'New York No. 1 Lake Park',
    //       tags: ['nice', 'developer'],
    //     },
    //     {
    //       key: '2',
    //       name: 'Jim Green',
    //       age: 42,
    //       address: 'London No. 1 Lake Park',
    //       tags: ['loser'],
    //     },
    //     {
    //       key: '3',
    //       name: 'Joe Black',
    //       age: 32,
    //       address: 'Sydney No. 1 Lake Park',
    //       tags: ['cool', 'teacher'],
    //     },
    // ];

    console.log("excel", excelModal);

    return(
        <>
          {(props.form != false && props.addButton != false) && (
            <Row justify="flex-end">
              {/* <Col> */}
                <Button type="primary" onClick={props.openModal}>Add {props.title}</Button>
                {props.excel == true && (
                  <Button color="green" type="primary" onClick={props.excelModal} className="ml-1">Upload Excel</Button>
                )}
              {/* </Col> */}
            </Row>
            )}
          <Row className="mt-1">
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={props.data}
                loading={props.loading}
                scroll={{ x: 1500 }}
              />
            </Col>
          </Row>
          {props.form != false && (
            <Form
              open={props.isModal}
              close={props.closeModal}
              title={props.title}
              form={props.form}
              formData={props.formData}
              setFormData={props.setFormData}
              onSubmit={props.onSubmit}
              loadingButton={props.loadingButton}
              modalStatus={props.modalStatus}
              handleUpdate={props.handleUpdate}
            />
          )}

              <Modal
                title={ "Upload Excel" + props.title}
                footer={
                // <Button type="primary" onClick={showLoading}>
                //     Reload
                // </Button>
                    <>
                    </>
                }
                // loading={loading}
                open={excelModal}
                onCancel={handleExcelClose}
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                    xl: '50%',
                    xxl: '40%',
                  }}
              >
                {/* <ImageUploadWall /> */}
              </Modal>
        </>
    )
}

export default TableAtom;