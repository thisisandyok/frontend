import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import DOMPurify from 'dompurify';
import Moment from 'moment';
import '../App.css';
import 'font-awesome/css/font-awesome.min.css';

const PlainPostCard = (props) => {

    const post = props.post;

    return (
        <div className='container-fluid' id={"outer-" + post._id} ref={props.innerRef} heat={post.heat}>
            <div className='row  newsItem shadow-sm p-0 mb-2 bg-white rounded'>
                <div className='col-md-12'>
                    <div className='row h-100'>
                        <div className='col-md-11'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    {(() => {
                                        if (post.favicon){
                                            return <span><img src={`data:image/jpeg;base64,${post.favicon}`} alt="Site Icon" />&nbsp;</span>
                                        }
                                    })()}

                                    <Link to={`/link/${post._id}`} target="_blank">
                                        {(() => {
                                            if (post.site_title){
                                                return (
                                                    "[" + DOMPurify.sanitize(post.site_title) + "]"
                                                )
                                            }
                                        })()}
                                        {(() => {
                                            if (post.author && post.author !== post.site_title){
                                                return (
                                                    "[" + DOMPurify.sanitize(post.author) + "]"
                                                )
                                            }
                                        })()}
                                        &nbsp;{DOMPurify.sanitize(post.title)}</Link>
                                </div>
                                <div className='col-md-12'>
                                    <small className='secondary'>
                                        {(() => {
                                            if (post.url && post.url.includes('youtube.com')){
                                                return (
                                                    <FontAwesomeIcon icon={faVideo} className="videoIcon" />
                                                )
                                            }
                                        })()}
                                        {post.url}

                                    </small>
                                </div>
                                <div className='col-md-12'>
                                    <div className='row'>
                                        <div className='col'>
                                            <Link to={`/post/${post._id}/` + encodeURI(DOMPurify.sanitize(post.title.replaceAll(" ", "_")))}><FontAwesomeIcon icon={faCircleInfo} className="videoIcon" /></Link> <small>Pub: {Moment(post.published_date).fromNow()}</small>
                                        </div>
                                        <div className='col'>
                                            <small>Found: {Moment(post.found_date).fromNow()}</small>
                                        </div>
                                        <div className='col'>
                                            {(() => {
                                                if(post.clicks) {
                                                    return <small>Clicks: {post.clicks}</small>
                                                }
                                            })()}
                                        </div>
                                        <div className='col-6'>
                                            {(() => {
                                                if(post.list && post.list._id) {
                                                    return <small>Found in: <Link to={`/list/${post.list._id}/`+ encodeURI(DOMPurify.sanitize(post.list.name.replaceAll(" ", "_")))}>{DOMPurify.sanitize(post.list.name)} </Link></small>
                                                }
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlainPostCard;
