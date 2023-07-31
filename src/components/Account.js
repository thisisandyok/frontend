import React, { useState, useEffect } from 'react';
import '../App.css';
import Footer from './Footer';
import Header from './Header';
import axios from "axios";
import AccountMenu from "./AccountMenu";

function Account() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const userData = await axios
                .get('https://api.laffo.com/api/user/', { withCredentials: true });
            setUser(userData.data);
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

                                <h5>Your info</h5>
                                Email: {user.email}<br/>
                                Email Verified: {user.email_verified ? 'Yes' : 'No'}<br/>
                                Created Date: {user.created_date}<br/>


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
