import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import {Link} from "react-router-dom";
import Footer from './Footer';
import Header from './Header';
import Cookies from 'universal-cookie';
import DOMPurify from "dompurify";
import {NotificationContainer, NotificationManager} from 'react-notifications';

function ListList() {
    const [lists, setLists] = useState([]);
    const [selectedLists, setSelectedLists] = useState([]);
    const [user, setUser] = useState({});
    const cookies = new Cookies();
    const session_id = cookies.get('session_id');


    useEffect(() => {
        const fetchData = async () => {
            const userData = await axios
                .get(`${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/api/user/`, { withCredentials: true });

            const listData = await axios
                .get(`${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/api/lists`, { withCredentials: true });

            listData.data.sort((a, b) => (!a.name || a.name > b.name) ? 1 : -1)
            setUser(userData.data);
            setLists(listData.data);
            setSelectedLists(userData.data.lists?.map(l => l.id));
        };
        void fetchData();
    }, []);

    const isChecked = ( (id) => {
       return  selectedLists.includes(id);
    });

    const onChange = ( (event) => {

        if(event.currentTarget.checked) {
            axios.put(`${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/api/subscription`, {list: event.currentTarget.value},{ withCredentials: true })
                .then(() => { NotificationManager.success('Subscription Added', 'Success'); })
                .catch(() => NotificationManager.error('Error adding subscription, please try again', 'Error'))

            if(!selectedLists.includes(event.currentTarget.value)) {
                selectedLists.push(event.currentTarget.value);
            }
        } else {
            axios.delete(`${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/api/subscription/${event.currentTarget.value}` , { withCredentials: true })
                .then(() => { NotificationManager.success('Subscription Removed', 'Success'); })
                .catch(() => NotificationManager.error('Error removing subscription, please try again', 'Error'))
            const index = selectedLists.indexOf(event.currentTarget.value);
            if(index !== -1) {
                selectedLists.splice(index, 1);
            }
        }
    });

    function List(props) {
        if(session_id) {
            return <div className="col-md-6"><input value={props.id} type="checkbox" onChange={onChange} defaultChecked={isChecked(props.id)} name="lists" />&nbsp;<Link to={`/list/${props.id}/`+ encodeURI(DOMPurify.sanitize(props.name.replaceAll(" ", "_")))}>{DOMPurify.sanitize(props.name)} </Link></div>;
        } else {
            return <div className="col-md-6 p1"><Link to={`/list/${props.id}/`+ encodeURI(DOMPurify.sanitize(props.name.replaceAll(" ", "_")))}>{DOMPurify.sanitize(props.name)} </Link></div>;
        }
    }

    const listList =
        lists.length === 0
            ? 'sit tight!'
            : lists.map((list, k) => <List id={list._id} name={list.name} userLists={user.lists} key={k} />);

    return (
        <div className='container-fluid'>
            <div className='row'>
                <Header />
                <div className='col-md-10'>
                    <div className='container-fluid'>
                        <div className='row  '>
                            <div className='col-md-12'>
                                <NotificationContainer/>
                                <h5>Topics</h5>
                                Topics are collections of RSS feeds. Here are the available topics:
                                <div className="row newsItem shadow-sm p-0 mb-2 bg-white rounded"> {listList}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default ListList;
