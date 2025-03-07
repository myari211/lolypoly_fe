import { Card, Row, Col, Avatar, Input } from 'antd';
import { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserInformation } from '../../Configuration/Redux/Action/userLoginAction';
import { UserOutlined } from '@ant-design/icons';

const Profile = () => {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile);
    const userID = localStorage.getItem('userId');

    useState(() => {
        if(!profile || profile == null) {
            dispatch(fetchUserInformation(userID));
        }
    })

    return(
        <>
            <Row justify="center" className="mt-2">
                <Col span={20}>
                    <Card>
                        <Row justify="center">
                            <Col>
                                {profile.data.avatar == null ? (
                                    <Avatar className="mr-1" size={250} icon={<UserOutlined />} />
                                ) : (
                                    <>

                                    </>
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Input type="text" name="first_name" value={profile.data.first_name} />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Profile;