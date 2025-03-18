import { Card, Row, Col, Avatar, Input, Select } from 'antd';
import { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserInformation } from '../../Configuration/Redux/Action/userLoginAction';
import { UserOutlined } from '@ant-design/icons';
import { get, post } from '../../Configuration/Services/API/apiHelper';

const Profile = () => {
    const dispatch = useDispatch();
    const profile = useSelector(state => state.profile);
    const userID = localStorage.getItem('userId');
    const [provinceList, setProvinceList] = useState({});
    const [province, setProvince] = useState();
    const [cityList, setCityList] = useState({});
    const [city, setCity] = useState();
    const [districtList, setDistrictList] = useState({});
    const [district, setDistrict] = useState();
    const [villageList, setVillageList] = useState({});
    const [village, setVillage] = useState();


    useEffect(() => {
        if(!profile || profile == null) {
            dispatch(fetchUserInformation(userID));
        }
    });

    useEffect(() => {
        const getAllProvince = async () => {
            const url = "/global/province";
            const response = await get({}, url);

            setProvinceList(response.data.data);

            console.log(response);
        }

        getAllProvince();
    }, []);

    useEffect(() => {
        if(province) {
            const getCity = async() => {
                const data = {
                    province_id: province,
                }
            
                const url = "/global/city";
                const response = await post(data, url);

                setCityList(response.data.data);
            }

            getCity();
        }
    }, [province]);

    console.log(province);

    const handleSelect = (value, name) => {
        const selectName = name
        const selectedValue = value;

        console.log("name", name);

        if(selectName == "province") {
            setProvince(selectedValue);
        }
    }

    return(
        <>
            <Row justify="center" className="mt-2">
                <Col span={12}>
                    <Card>
                        <Row justify="center">
                            <Col>
                                {profile.data.avatar == null ? (
                                    <Avatar className="mr-1" size={175} icon={<UserOutlined />} />
                                ) : (
                                    <>

                                    </>
                                )}
                            </Col>
                        </Row>
                        <Row className="mt-2" gutter={16}>
                            <Col span={12}>
                                <small>First Name</small>
                                <Input type="text" name="first_name" value={profile.data.first_name} />
                            </Col>
                            <Col span={12}>
                                <small>Last Name</small>
                                <Input type="text" name="first_name" value={profile.data.last_name} />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col span={12}>
                                <small>Province</small>
                                <Select
                                    showSearch
                                    name="province"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={provinceList.length > 0 && provinceList.map(item => ({
                                        value: item.id,
                                        label: item.name,
                                    }))}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    onChange={(value) => handleSelect(value, "province")}
                                    block
                                    // style={{ width: "100%" }}
                                />
                            </Col>
                            <Col span={12}>
                                <small>City</small>
                                <Select
                                    showSearch
                                    name="city"
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={cityList.length > 0 && cityList.map(item => ({
                                        value: item.id,
                                        label: item.name,
                                    }))}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    onChange={(value) => handleSelect(value, "city")}
                                    // style={{ width: "100%" }}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col span={12}>
                                <small>District</small>
                                <Select name="district" />
                            </Col>
                            <Col span={12}>
                                <small>Village</small>
                                <Select name="village" />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Profile;