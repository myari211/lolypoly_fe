import { Card, Col, Row, Input, Button } from "antd";
import { handleInputChange } from "../../Configuration/Services/Form/formHelper";
import { useState } from "react";
import { post } from "../../Configuration/Services/API/apiHelper";
import { ModalPopUp, showErrorToasts } from "../../Configuration/Services/Alert/alertHelper";

const ChangePassword = () => {
    const [formData, setFormData] = useState({});
    const [loadingButton, setLoadingButton] = useState(false);

    const handleChangePassword = async () => {
        setLoadingButton(true);
        try {
            const userId = localStorage.getItem("userId");
            const change = await post(formData, "/admin/user/change_password/" + userId);

            if(change.data.status == true) {
                ModalPopUp("Password has been changed", "success");
            }
            else {
                showErrorToasts(change.data.message);
            }
        }
        catch(error) {
            showErrorToasts(error);
        }

        setLoadingButton(false);
    }

    return(
        <>
            <Row justify="center">
                <Col span={18}>
                    <Card>
                        <Row>
                            <Col span={24}>
                                <label>Current Password</label>
                                <Input type="password" name="current_password" onChange={ handleInputChange(setFormData, formData) } />
                            </Col>
                        </Row>
                         <Row className="mt-1">
                            <Col span={24}>
                                <label>New Password</label>
                                <Input type="password" name="password" onChange={ handleInputChange(setFormData, formData) } />
                            </Col>
                        </Row>
                         <Row className="mt-1">
                            <Col span={24}>
                                <label>Password Confirmation</label>
                                <Input type="password" name="password_confirmation" onChange={ handleInputChange(setFormData, formData) } />
                            </Col>
                        </Row>
                        <Row className="mt-2" justify="flex-end">
                            <Col>
                                <Button type="primary" loading={loadingButton} onClick={() => handleChangePassword() }>Change Password</Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ChangePassword;