import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import Footer from './Footer';
import Header from './Header';
import PlainPostCard from "./PlainPostCard";


function ShowListDetails(props) {
    const [list, setList] = useState({});
    const [posts, setPosts] = useState([]);
    const { id } = useParams();

    function Url(props) {
        return <li>{props.path}</li>;
    }

    useEffect(() => {
        axios
            .get(`{process.env.REACT_APP_API_DOMAIN}:{process.env.REACT_APP_API_PORT}/api/lists/${id}`, { withCredentials: true })
            .then((res) => {
                res.data.posts.sort((a, b) => (!a.published_date || a.published_date < b.published_date) ? 1 : -1)
                setList(res.data);
                setPosts(res.data.posts)

            })
            .catch((err) => {
                console.log('Error from API');
            });
    }, [id]);

    const postList =
        posts.length === 0
            ? 'sit tight!'
            : posts.map((post, k) => <PlainPostCard post={post} key={k}/>);


    return (
        <div><div className='container-fluid'>
            <div className='row'>
                <Header />
                <div className='col-md-10'>
                    <div className='container-fluid'>
                        <div className='row  newsItem shadow-sm p-0 mb-2 bg-white rounded'>
                            <div className='col-md-12'>
                                <h5>Topic Details</h5>
                                <strong>Name:</strong> {list.name}<br/>

                                <h5>Checks the following RSS URLs</h5>
                                <ul>
                                    {list.urls?.map((url, k) => <Url path={url} key={k} />)}
                                </ul>

                                <h5>Selected posts:</h5>
                                <ul>
                                    {postList}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div></div>
    );
}

export default ShowListDetails;
