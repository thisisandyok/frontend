import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../App.css';
import axios from 'axios';
import { stripHtml } from "string-strip-html";
import Footer from './Footer';
import Header from './Header';
import DOMPurify from "dompurify";


function ShowPostDetails(props) {
    const [post, setPost] = useState({});

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/api/posts/${id}`, { withCredentials: true })
            .then((res) => {
                setPost(res.data);
            })
            .catch((err) => {
                console.log('Error getting post list');
            });
    }, [id]);


    return (
        <div><div className='container-fluid'>
            <div className='row'>
                <Header />
                <div className='col-md-10'>

                    <div className='container-fluid' id={"outer-" + post._id}>
                        <div className='row  newsItem shadow-sm p-0 mb-2 bg-white rounded'>
                            <div className='col-md-12'>
                                <h5>Link Details</h5>
                                <strong>Site Title:</strong> {DOMPurify.sanitize(post.site_title)}<br />
                                <strong>Title:</strong> {DOMPurify.sanitize(post.title)}<br/>
                                <strong>Url:</strong> <Link to={`/link/${post._id}`} target="_blank">{post.url}</Link><br/>
                                <strong>Author:</strong> {DOMPurify.sanitize(post.author)}<br/>
                                <strong>Date Published:</strong> {DOMPurify.sanitize(post.published_date)}<br/>
                                <strong>Date Found:</strong> {post.found_date}<br/>
                                <strong>Topic:</strong> <Link to={`/list/${post.list?._id}/`+ encodeURI(DOMPurify.sanitize(post.list?.name.replaceAll(" ", "_")))}>{DOMPurify.sanitize(post.list?.name)} </Link> <br />
                                <strong>Details:&nbsp;</strong>
                                {(() => {
                                    if(post.description) {
                                        return stripHtml(post.description).result;
                                    }
                                })()}
                            </div>
                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        </div></div>
    );
}

export default ShowPostDetails;
