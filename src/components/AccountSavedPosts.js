import React, { useState, useEffect } from 'react';
import '../App.css';
import Footer from './Footer';
import Header from './Header';
import axios from "axios";
import PlainPostCard from "./PlainPostCard";
import AccountMenu from "./AccountMenu";

function Account() {
    const [saves, setSaves] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const saveData = await axios
                .get(`{process.env.REACT_APP_API_DOMAIN}:{process.env.REACT_APP_API_PORT}/api/saves/`, { withCredentials: true });

            setSaves(saveData.data);
        };
        void fetchData();
    }, []);


    return (
        <div className='container-fluid'>
            <div className='row'>
                <Header />
                <div className='col-md-10'>
                    <div className='container-fluid'>
                        <div className='row  newsItem shadow-sm p-0 mb-2 bg-white rounded'>
                            <div className='col-md-12'>

                                <AccountMenu />

                                <h5>Saved Posts</h5>
                                {saves?.map((save, k) => <PlainPostCard post={save.posts[0]} key={k}/>)}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Account;
