import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../Libs/Contexts/index';
import { Loading } from '../Common';

export default function Redirect() {
    const navigate = useNavigate();
    const isLogin = useContext(AuthContext);

    useEffect(() => {
        if (isLogin) {
            navigate("/order");
        } else {
            navigate("/login");
        }
        /* navigate("/error"); */
    }, [isLogin]);

    return (
        <Loading open={true}></Loading>
    )
}
