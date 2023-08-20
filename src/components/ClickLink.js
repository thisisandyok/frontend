import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../App.css';

function ClickLink(props) {
    const {id} = useParams();

    useEffect(() => {
        axios.put(`{process.env.REACT_APP_API_DOMAIN}:{process.env.REACT_APP_API_PORT}/api/clicks/`, {
            post: id,
        }, { withCredentials: true });
        axios
            .get(`{process.env.REACT_APP_API_DOMAIN}:{process.env.REACT_APP_API_PORT}/api/posts/${id}`, { withCredentials: true })
            .then((res) => {
                window.location.href = res.data.url;
            });
        }, [id]);
}
export default ClickLink;
