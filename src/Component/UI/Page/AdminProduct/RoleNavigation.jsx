import { useState, useEffect } from 'react';
import TableAtom from '../../Atom/TableAtom';
import { get } from '../../../Configuration/Services/API/apiHelper';
import { Button, Card, Col, Row } from 'antd';

const RoleNavigation = () => {
    const [dataInit, setDataInit] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDataRoleNavigation = async() => {
            const response = await get({}, "/admin/role_has_navigations/list");
            setLoading(true);

            if(response.data.status == true) {
                setDataInit(response.data.data);
            }

            setLoading(false);
        }

        getDataRoleNavigation();
    }, []);

    const columns = [
        {
            title: "Role",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Navigation",
            dataIndex: "navigation",
            key: "navigation",
        },
    ]

    const data = !loading ? dataInit.map(item => {
        return {
            key: item.id,
            name: item.name,
            navigation: item.navigation.map(child => child.navigation).join(', ')
        }
    })
    : 
    [];
    

    return(
        <>
            <Row>
                <Col span={24}>
                    <Card>
                        <TableAtom
                            columns={columns}
                            data={data}
                            loading={loading}
                            form={false}
                        />
                    </Card>
                </Col>
            </Row>
           
        </>
    )
}

export default RoleNavigation;