import React from "react";
import AGLogo from '../../../assets/img/png/logo.png';
import { Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, PoweroffOutlined } from '@ant-design/icons';
import { logout } from '../../../api/auth';
import './MenuTop.scss';

export default function MenuTop(props) {
    const { menuCollapse, setMenuCollapse } = props;

    const logoutUser = () => {
        logout();
        window.location.reload();
    } 

    return (
        <div className="menu-top">
            <div className="menu-top__left">
                <img className="menu-top__left-logo" src={AGLogo} alt="Andres Gálvez" />
                <Button type="link" onClick={() => setMenuCollapse(!menuCollapse)} >
                    {menuCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </Button>
            </div>
            <div className="menu-top__right">
                <Button type="link" onClick={() => logoutUser()}>
                    <PoweroffOutlined />
                </Button>
            </div>
        </div>
    );
}