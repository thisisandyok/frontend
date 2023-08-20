import React, { useState, useEffect } from 'react';
import '../App.css';
import Footer from './Footer';
import Header from './Header';
import axios from "axios";
import {Link} from "react-router-dom";
import AccountMenu from "./AccountMenu";
import DOMPurify from "dompurify";

function AccountOwnedLists() {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const listData = await axios
                .get(`{process.env.REACT_APP_API_DOMAIN}:{process.env.REACT_APP_API_PORT}/api/userlists/`, { withCredentials: true });

            setLists(listData.data);
        };
        void fetchData();
    }, []);

    const topicList =
        lists.length === 0
            ? 'sit tight!'
            : lists.map((list, k) => <List id={list._id} name={list.name} key={k} />);

    function List(props) {
            return <div className="col-md-6 p1"><Link to={`/list/${props.id}/`+ encodeURI(DOMPurify.sanitize(props.name.replaceAll(" ", "_")))}>{DOMPurify.sanitize(props.name)} </Link></div>;
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <Header />
                <div className='col-md-10'>
                    <div className='container-fluid'>
                        <div className='row  newsItem shadow-sm p-0 mb-2 bg-white rounded'>
                            <div className='col-md-12'>
                                <AccountMenu />

                                <h5>Owned Lists</h5>
                                {topicList}

                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default AccountOwnedLists;
