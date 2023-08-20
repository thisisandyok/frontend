import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

import '../App.css';

function Logout(props) {
    const navigate = useNavigate();
    try {
        useEffect(() => {
            const cookies = new Cookies();
            cookies.remove("session_id", {path: "/", domain: process.env.REACT_APP_COOKIE_DOMAIN})
            navigate('/');
        });
    } catch (error) {
        console.log(error);
    }
}
export default Logout;
