import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

import '../App.css';

function Logout(props) {
    const navigate = useNavigate();
    try {
        useEffect(() => {
            const cookies = new Cookies();
            cookies.remove("session_id", {path: "/", domain: ".laffo.com"})
            navigate('/');
        });
    } catch (error) {
        console.log(error);
    }
}
export default Logout;
