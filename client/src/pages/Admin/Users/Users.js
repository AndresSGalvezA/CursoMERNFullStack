import React, { useState, useEffect } from "react";
import { getAccessTokenApi } from '../../../api/auth';
import { getUsersActiveApi } from '../../../api/user';
import ListUsers from "../../../components/admin/Users/ListUsers";
import "./Users.scss";

export default function Users() {
    const [usersActive, setUsersActive] = useState([]);
    const [usersInactive, setUsersInactive] = useState([]);
    const token = getAccessTokenApi();

    useEffect(() => {
        getUsersActiveApi(token, true).then(response => {
            setUsersActive(response.users);
        });
        getUsersActiveApi(token, false).then(response => {
            setUsersInactive(response.users);
        });
    }, [token]);

    return (
        <div className="users">
            <ListUsers usersActive={usersActive} usersInactive={usersInactive} />
        </div>
    );
}