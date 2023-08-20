import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import DOMPurify from 'dompurify';
import Moment from 'moment';
import '../App.css';
import 'font-awesome/css/font-awesome.min.css';
import axios from "axios";

const PostCard = (props) => {

    const promote = (id) => {
        //TODO: I think you can do this in a more React friendly way by using states, learn those and change this
        const promote = document.getElementById("promote-" + id);
        const demote = document.getElementById("demote-" + id);
        promote.setAttribute('class', 'svg-inline--fa fa-caret-down promoted fa-xl');
        demote.setAttribute('class', 'svg-inline--fa fa-caret-down voteDown fa-xl');

        axios.put(`{process.env.REACT_APP_API_DOMAIN}:{process.env.REACT_APP_API_PORT}/api/promotes/`, {
            post: id,
        }, { withCredentials: true });

    }

    const demote = (id) => {
        //TODO: I think you can do this in a more React friendly way by using states, learn those and change this
        const promote = document.getElementById("promote-" + id);
        const demote = document.getElementById("demote-" + id);
        promote.setAttribute('class', 'svg-inline--fa fa-caret-down voteUp fa-xl');
        demote.setAttribute('class', 'svg-inline--fa fa-caret-down demoted fa-xl');

        axios.put(`{process.env.REACT_APP_API_DOMAIN}:{process.env.REACT_APP_API_PORT}/api/demotes/`, {
            post: id,
        }, { withCredentials: true });
    }

    const hide = (id) => {
        //TODO: I think you can do this in a more React friendly way by using states, learn those and change this
        const hidden = document.getElementById("outer-" + id);
        hidden.remove();

        axios.put(`{process.env.REACT_APP_API_DOMAIN}:{process.env.REACT_APP_API_PORT}/api/hides/`, {
            post: id,
        }, { withCredentials: true });
    }

    const save = (id) => {
        //TODO: I think you can do this in a more React friendly way by using states, learn those and change this
        const save = document.getElementById("save-" + id);
        save.setAttribute('class', 'svg-inline--fa fa-square-check saved');

        axios.put(`{process.env.REACT_APP_API_DOMAIN}:{process.env.REACT_APP_API_PORT}/api/saves/`, {
            post: id,
        }, { withCredentials: true });
    }

    const post = props.post;

    return post.hide ? '' : (

        <div className='container-fluid' id={"outer-" + post._id} ref={props.innerRef} heat={post.heat}>
            <div className='row  newsItem shadow-sm p-0 mb-2 bg-white rounded'>
                <div className='col-md-12'>
                    <div className='row h-100'>
                        <div className='col'>
                            <div className='row h-25'>
                                <div className='col-md-12  d-flex justify-content-center h-100 align-items-end'>
                                    <Tooltip id="icon-tooltip" />
                                    {(() => {
                                        if(!props.session_id) {

                                        } else if(post.promoted) {
                                            return <FontAwesomeIcon  id={"promote-" + post._id} icon={faCaretUp}
                                                    className='promoted fa-xl' data-tooltip-id="icon-tooltip" data-tooltip-content="Quality Content"
                                                    data-tooltip-place="top" onClick={() => promote(post._id)} />
                                        } else {
                                            return <FontAwesomeIcon  id={"promote-" + post._id} icon={faCaretUp} className='voteUp fa-xl'
                                                    data-tooltip-id="icon-tooltip" data-tooltip-content="Quality Content"
                                                    data-tooltip-place="top" onClick={() => promote(post._id)} />
                                        }
                                    })()}
                                </div>
                            </div>
                            <div className='row h-25'>
                                <div className='col-md-12  d-flex justify-content-center h-100  align-items-end'>
                                    {(() => {
                                        if(!props.session_id) {

                                        } else if(post.savedpost) {
                                            return <FontAwesomeIcon id={"save-" + post._id} icon={faSquareCheck} className='saved'
                                                                    data-tooltip-id="icon-tooltip" data-tooltip-content="Save this post"
                                                                    data-tooltip-place="top"  onClick={() => save(post._id)}/>
                                        } else {
                                            return <FontAwesomeIcon id={"save-" + post._id} icon={faSquareCheck} className='save'
                                                                    data-tooltip-id="icon-tooltip" data-tooltip-content="Save this post"
                                                                    data-tooltip-place="top"  onClick={() => save(post._id)}/>
                                        }
                                    })()}
                                </div>
                            </div>
                            <div className='row h-25'>
                                <div className='col-md-12  d-flex justify-content-center h-100  align-items-end'>
                                    {(() => {
                                        if(props.session_id) {
                                            return <FontAwesomeIcon icon={faEyeSlash} className='hide'
                                                             data-tooltip-id="icon-tooltip"
                                                             data-tooltip-content="Hide this post"
                                                             data-tooltip-place="bottom"
                                                             onClick={() => hide(post._id)}/>
                                        }
                                    })()}
                                </div>
                            </div>
                            <div className='row h-25'>
                                <div className='col-md-12  d-flex justify-content-center h-100  align-items-end'>
                                    {(() => {
                                        if(!props.session_id) {

                                        } else if(post.demoted) {
                                            return <FontAwesomeIcon  id={"demote-" + post._id} icon={faCaretDown} className='demoted fa-xl'
                                                         data-tooltip-id="icon-tooltip" data-tooltip-content="Low Quality Content"
                                                         data-tooltip-place="bottom"  onClick={() => demote(post._id)} />
                                        } else {
                                            return <FontAwesomeIcon  id={"demote-" + post._id} icon={faCaretDown} className='voteDown fa-xl'
                                                         data-tooltip-id="icon-tooltip" data-tooltip-content="Low Quality Content"
                                                         data-tooltip-place="bottom"  onClick={() => demote(post._id)} />
                                        }
                                    })()}
                                </div>
                            </div>
                        </div>
                        <div className='col-md-11'>
                            <div className='row'>
                                <div className='col-md-12'>
                                    {(() => {
                                        if (post.favicon){
                                            return <span><img src={`data:image/jpeg;base64,${post.favicon}`} alt="Site Icon" />&nbsp;</span>
                                        }
                                    })()}
                                    {(() => {
                                        if (post.clicked){
                                            return (
                                                <FontAwesomeIcon icon={faEye} />
                                            )
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
                                            if (post.url.includes('youtube.com')){
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
                                            <small>Clicks: {post.clicks}</small>
                                        </div>
                                        <div className='col-6'>
                                            <small>Found in: <Link to={`/list/${post.list._id}/`+ encodeURI(DOMPurify.sanitize(post.list.name.replaceAll(" ", "_")))}>{DOMPurify.sanitize(post.list.name)} </Link></small>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-md-12'>
                                    <div className='row'>
                                        <div className='col'>
                                            <img src="/img/emoji/smile.png" className="emoji" alt="Post makes me happy" /> (12)
                                            <img src="/img/emoji/neutral.png" className="emoji" alt="Post makes me feel nothing" /> (0)
                                            <img src="/img/emoji/ohno.png" className="emoji" alt="Oh no" /> (0)
                                            <img src="/img/emoji/surprise.png" className="emoji" alt="I am Surprised by this" /> (0)
                                            <img src="/img/emoji/party.png" className="emoji" alt="Party!"/> (0)
                                            <img src="/img/emoji/rofl.png" className="emoji" alt="R O F L" /> (0)
                                            <img src="/img/emoji/poo.png" className="emoji" alt="Poo" /> (1)
                                            <img src="/img/emoji/clown.png" className="emoji" alt="What a clown" /> (1000)
                                            <img src="/img/emoji/heart.png" className="emoji" alt="I love this" /> (157)
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

export default PostCard;
