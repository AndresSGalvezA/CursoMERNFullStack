import React, { useState } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from "antd";
import useAuth from '../hooks/useAuth';
import MenuTop from "../components/admin/MenuTop";
import MenuSider from "../components/admin/MenuSider";
import AdminSignIn from '../pages/Admin/SignIn';
import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
    const { routes } = props;
    const { Header, Content, Footer } = Layout;
    const [menuCollapse, setMenuCollapse] = useState(false);
    const { user, isLoading } = useAuth();

    if(!user && !isLoading) {
        return (
            <>
                <Route path="/admin/login" component={AdminSignIn} />
                <Redirect to="/admin/login" />
            </>
        );
    }

    if(user && !isLoading) {
        return (
            <Layout>
                <MenuSider menuCollapsed={menuCollapse}/>
                <Layout className="layout-admin" style={{marginLeft: menuCollapse ? "80px" : "200px"}}>
                    <Header className="layout-admin__header">
                        <MenuTop menuCollapse={menuCollapse} setMenuCollapse={setMenuCollapse}/>
                    </Header>
                    <Content className="layout-admin__content">
                        <LoadRoutes routes={routes} />
                    </Content>
                    <Footer className="layout-admin__footer">Andres Gálvez - 2021</Footer>
                </Layout>
            </Layout>
        );
    }

    return null;    
}

function LoadRoutes({routes}) {
    return (
        <Switch>
            {
                routes.map((route, index) => (
                    <Route key={index} path={route.path} exact={route.exact} component={route.component}/>
                ))
            }
        </Switch>
    );
}