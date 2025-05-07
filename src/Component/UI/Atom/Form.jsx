import { useState, useEffect } from 'react';
import { Modal, Button, Row, Input, Select, Col, Checkbox, Card, Flex } from "antd";
import { handleInputChange, handleMultiSelectChange, handleCheckboxChange } from '../../Configuration/Services/Form/formHelper';
import TextArea from 'antd/es/input/TextArea';
import ImageUploadWall from './ImageUploadWall';
import FileUploadWall from './FileUploadWall';

const Form = (props) => {
    const {TextArea} = Input;
    const [loading, setLoading] = useState(true);
    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, [props.open]);

    const inputChangeHandler = (e) => handleInputChange(props.setFormData, props.formData)(e);

    return(
        <>
            <Modal
                title={props.modalStatus + " " + props.title}
                footer={
                // <Button type="primary" onClick={showLoading}>
                //     Reload
                // </Button>
                    <>
                    </>
                }
                loading={loading}
                open={props.open}
                onCancel={props.close}
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                    xl: '50%',
                    xxl: '40%',
                  }}
            >
                <Row gutter={16}>
                {props.form.map((item, index) => {
                    if (item.type === "input") {
                        return (
                        <>
                            <Col span={item.col} className="mt-1">
                                <span className="font-small">{item.title}</span>
                                <Input type="text" name={item.name} value={item.value} onChange={inputChangeHandler} />
                            </Col>
                        </>
                        );
                    } 
                    else if(item.type == "select") {
                        return (
                            <>
                                <Col span={item.col} className="mt-1">
                                    <span className="font-small">{item.title}</span>
                                    <Select
                                        name={item.name}
                                        style={{width: "100%"}}
                                        options={item.list}
                                        // onChange={handleMultiSelectChange("", "", props.setFormData, props.formData)}
                                        onChange={(value) => handleMultiSelectChange(props.setFormData, props.formData)(value, item.name)}
                                        defaultValue={item.value}
                                    />
                                </Col>
                            </>
                        );
                    }
                    else if(item.type == "email") {
                        return (
                            <>
                                <Col span={item.col} className="mt-1">
                                    <span className="font-small">{item.title}</span>
                                    <Input type="email" name={item.name} value={item.value} onChange={inputChangeHandler} />
                                </Col>
                            </>
                        );
                    }
                    else if(item.type == "multiselect") {
                        return (
                            <>
                                <Col span={item.col} className="mt-1">
                                    <span className="font-small">{item.title}</span>
                                    <Select
                                        name={item.name}
                                        mode="multiple"
                                        style={{width: "100%"}}
                                        options={item.list}
                                        onChange={(value) => handleMultiSelectChange(props.setFormData, props.formData)(value, item.name)}
                                        filterOption={(input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                        }
                                        defaultValue={item.value}
                                    />
                                </Col>
                            </>
                        );
                    }
                    else if(item.type == "textarea") {
                        return (
                            <>
                                <Col span={item.col} className="mt-1">
                                    <span className="font-small">{item.title}</span>
                                    <TextArea
                                        name={item.name}
                                        rows={6}
                                        onChange={inputChangeHandler}
                                        value={item.value}
                                    />
                                </Col>
                            </>
                        );
                    }
                    else if(item.type == "checkbox") {
                        return (
                            <>
                                <Col span={item.col} className="mt-1">
                                    {/* <span className="font-small">{item.title}</span> */}
                                    <Checkbox name={item.name} onChange={(e) => handleCheckboxChange(props.setFormData, props.formData)(e)} checked={item.value == 1 ? true : false}>{item.title}</Checkbox>
                                </Col>
                            </>
                        );
                    }
                    else if(item.type == "image") {
                        return (
                            <>
                                <Col span={item.col} className="mt-1">
                                    <Card>
                                        <ImageUploadWall fileList={imageList} setFileList={setImageList} formData={props.formData} setFormData={props.setFormData} defaultValue={item.value} />
                                    </Card>
                                </Col>
                            </>
                        );
                    }
                    else if(item.type == "file") {
                        return (
                            <>
                                <Col span={item.col} className="mt-1">
                                    <Card>
                                        <FileUploadWall fileList={imageList} setFileList={setImageList} formData={props.formData} setFormData={props.setFormData} defaultValue={item.value} />
                                    </Card>
                                </Col>
                            </>
                        );
                    }
                })}
                {/* <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p> */}
                </Row>
                <Row className="mt-4">
                    <Col span={24}>
                        <Flex justify="flex-end">
                            <Button className="mr-1" danger onClick={props.close}>Cancel</Button>
                            {props.modalStatus == "create" && (
                                <Button type="primary" onClick={props.onSubmit} loading={props.loadingButton} >Submit</Button>
                            )}
                            {props.modalStatus == "update" && (
                                 <Button type="primary" onClick={props.handleUpdate} loading={props.loadingButton} >Update</Button>
                            )}
                        </Flex>
                    </Col>
                </Row>
            </Modal>
        </>
    )
}

export default Form;