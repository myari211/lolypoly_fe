import { Card, Row, Col, Avatar, Input, Select, Space, Button, Upload } from 'antd';
import { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserInformation } from '../../Configuration/Redux/Action/userLoginAction';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { get, post } from '../../Configuration/Services/API/apiHelper';
import { handleInputChange } from '../../Configuration/Services/Form/formHelper';
import { ModalPopUp } from '../../Configuration/Services/Alert/alertHelper';
const { TextArea } = Input;

const Profile = () => {
    const dispatch = useDispatch();
    // const profile = useSelector(state => state.profile);
    const [profile, setProfile] = useState({});
    const userID = localStorage.getItem('userId');
    const [provinceList, setProvinceList] = useState({});
    const [province, setProvince] = useState();
    const [cityList, setCityList] = useState({});
    const [city, setCity] = useState();
    const [districtList, setDistrictList] = useState({});
    const [district, setDistrict] = useState();
    const [villageList, setVillageList] = useState({});
    const [formData, setFormData] = useState({});
    const [avatarUrl, setAvatarUrl] = useState();
    const [loadingProfileButton, setLoadingProfileButton] = useState(false);


    useEffect(() => {
        // Pastikan profile.data tidak null atau undefined sebelum memeriksa panjangnya
        if (!profile?.data || profile.data.length === 0) {
            const getProfile = async() => {
                const url = "/user/profile/personal_information/" + userID;
                const response = await get({}, url);

                if(response.data.status == true) {
                    setProfile(response.data.data);
                    setFormData({
                        ...formData,
                        "first_name" : response.data.data.first_name,
                        "last_name" : response.data.data.last_name,
                        "email" : response.data.data.email,
                        "phone" : response.data.data.phone,
                        "address": response.data.data.address,
                        "zip_code" : response.data.data.zip_code,
                        "province" : response.data.data.province_id,
                        "city" : response.data.data.city_id,
                        "district_id" : response.data.data.district_id,
                        "village" : response.data.data.village,
                    });
                }
                else {
                    console.error(response);
                }
            }

            getProfile();
        }
    }, [userID]);

    console.log("Profile", profile);

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

    useEffect(() => {
        if(city) {
            const getDistrict = async() => {
                const data = {
                    city_id: city,
                }

                const url = "/global/district";
                const response = await post(data, url);

                setDistrictList(response.data.data);
            }

            getDistrict();
        }
    }, [city]);

    useEffect(() => {
        if(district) {
            const getVillage = async() => {
                const data = {
                    district_id: district,
                }

                const url = "/global/village";
                const response = await post(data, url);

                setVillageList(response.data.data);
            }

            getVillage();
        }
    }, [district]);

    const handleSelect = (value, name) => {
        const selectName = name
        const selectedValue = value;

        console.log("name", name);

        if(selectName == "province") {
            setProvince(selectedValue);
        }

        if(selectName == "city") {
            setCity(selectedValue);
        }

        if(selectName == "district") {
            setDistrict(selectedValue);
        }


        setFormData({
            ...formData,
            [selectName]: selectedValue,
        });
    }

    const handleAvatar = (file) => {
        const isImage = file.type.startsWith('image/');
        if(!isImage) {
            ModalPopUp(
                "You can only upload image files!",
                "info",
            );
            return false;
        }

        const reader = new FileReader();
        reader.onload = () => {
            setAvatarUrl(reader.result);
        }
        reader.readAsDataURL(file);

        return false;
    }

    const handleUpdateProfile = async () => {
        try {
            setLoadingProfileButton(true);

            const url = "/user/profile/personal_information/update/" + userID;
            const response = await post(formData, url);

            if(response.data.status == true) {
                setLoadingProfileButton(false);
                ModalPopUp("Profile Updated", "success");
            }
            else {
                setLoadingProfileButton(false);
                ModalPopUp(response.data.message, "info");
            }
        }
        catch(error) {
            setLoadingProfileButton(false);
            console.error(error);
        }
    }

    console.log("formData", formData);

    return(
        <>
            <Row justify="center" className="mt-2">
                <Col span={12}>
                    <Card>
                        <Row justify="center">
                            <Col>
                                {profile.length == 0 || profile.avatar == null ? (
                                    <Avatar className="mr-1" size={175} icon={<UserOutlined />} />
                                ) : (
                                    <>
                                        <img src={avatarUrl} size={175} />
                                    </>
                                )}
{/* 
                                <Upload
                                    beforeUpload={handleAvatar}
                                    showUploadList={false}
                                >
                                    <div>
                                        <UploadOutlined />
                                        <span>Click to upload avatar</span>
                                    </div>
                                </Upload> */}
                            </Col>
                        </Row>
                        <Row className="mt-2" gutter={16}>
                            <Col span={12}>
                                <small>First Name</small>
                                <Input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange(setFormData, formData)} />
                            </Col>
                            <Col span={12}>
                                <small>Last Name</small>
                                <Input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange(setFormData, formData)} />
                            </Col>
                        </Row>
                        <Row className="mt-2" gutter={16}>
                            <Col span={12}>
                                <small>Email</small>
                                <Input type="text" name="email" value={formData.email} onChange={handleInputChange(setFormData, formData) } disabled />
                            </Col>
                            <Col span={12}>
                                <small>Phone</small>
                                <Input type="text" name="phone" value={formData.phone} addonBefore="+62" onChange={handleInputChange(setFormData, formData) } />
                            </Col>
                        </Row>
                        <Row className="mt-2" gutter={16}>
                            <Col span={12}>
                                <small>Province</small>
                                <Select
                                    showSearch
                                    defaultValue={formData?.province_id}
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
                                    style={{ width: "100%" }}
                                />
                            </Col>
                            <Col span={12}>
                                <small style={{ marginLeft: "8px" }}>City</small>
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
                                    style={{ width: "100%" }}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-2" gutter={16}>
                            <Col span={12}>
                                <small>District</small>
                                <Select name="district" 
                                    showSearch
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={districtList.length > 0 && districtList.map(item => ({
                                        value: item.id,
                                        label: item.name,
                                    }))}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    onChange={(value) => handleSelect(value, "district")}
                                    style={{ width: '100%'}}
                                />
                            </Col>
                            <Col span={12}>
                                <small style={{ marginLeft: "8px" }}>Village</small>
                                <Select name="village"
                                    showSearch
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    options={villageList.length > 0 && villageList.map(item => ({
                                        value: item.id,
                                        label: item.name,
                                    }))}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    onChange={(value) => handleSelect(value, "village")}
                                    style={{ width: "100%" }}
                                />
                            </Col>
                        </Row>
                        <Row className="mt-2" gutter={16}>
                            <Col span={18}>
                                <small>Address</small>
                                <TextArea rows={2} name="address" onChange={handleInputChange(formData, setFormData)} value={formData?.address} />
                            </Col>
                            <Col span={6}>
                                <small>ZIP Code</small>
                                <Input type="number" name="zip_code" onChange={handleInputChange(formData, setFormData)} value={formData?.zip_code} />
                            </Col>
                        </Row>
                        <Row className="mt-5" justify="center">
                            <Col>
                                <Button type="primary" icon={<UserOutlined />} className="rounded" onClick={handleUpdateProfile} loading={loadingProfileButton}>Update Profile</Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default Profile;