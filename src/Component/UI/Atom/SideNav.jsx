import { useState, useEffect } from 'react';
import Icon, { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const SideNav = (props) => {
    const navigate = useNavigate();
    const [menuState, setMenuState] = useState();

    // const items = [];

    const items = props.loading == false ? 
        props.data.map(item => (
            {
                key: item.url,
                label: item.navigation,
                icon: <Icon component={item.icon} />,
                ...(item.children && item.children.length > 0 && { children: item.children.map(child => ({
                    key: child.url,
                    label: child.navigation,
                })) }),
            }
        ))
        :
        [];

    // const items = props.data.map(item => (
    //     {
    //         key: item.id,
    //         label: item.navigation,
    //     }
    // ))

    const onClick = ({ key }) => {
        navigate(key);
    }

    return(
        <>
            <Menu
                onClick={onClick}
                style={{ width: "100%", height: "100vh" }}
                // defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            />
        </>
    );
}

export default SideNav;