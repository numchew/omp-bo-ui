import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../Libs/Contexts/index';
import { Loading } from '../Common';
import { UserRole } from '../../Libs/Models/IProfile.model';

export default function Redirect() {
    const navigate = useNavigate();
    const isLogin = useContext(AuthContext);

    useEffect(() => {
        if (isLogin) {
            const roles = localStorage.getItem("roles");
            if (roles === UserRole.B) {
                navigate("/Avatar");
            } else {
                navigate("/order");
            }

        } else {
            navigate("/login");
        }
        /* navigate("/error"); */
    }, [isLogin, navigate]);

    return (
        <Loading open={true}></Loading>
    )
}
