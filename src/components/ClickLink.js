import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../App.css';

function ClickLink(props) {
    const {id} = useParams();

    useEffect(() => {
        axios.put('https://api.laffo.com/api/clicks/', {
            post: id,
        }, { withCredentials: true });
        axios
            .get(`https://api.laffo.com/api/posts/${id}`, { withCredentials: true })
            .then((res) => {
                window.location.href = res.data.url;
            });
        }, [id]);
}
export default ClickLink;
