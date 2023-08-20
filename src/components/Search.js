import React, {useState, useEffect} from 'react';
import '../App.css';
import axios from 'axios';
import Footer from './Footer';
import Header from './Header';
import PlainPostCard from "./PlainPostCard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import DOMPurify from "dompurify";

function Search(props) {
    const [posts, setPosts] = useState([]);
    const queryParameters = new URLSearchParams(window.location.search)
    const term = queryParameters.get("term");

    useEffect(() => {

        axios
            .get(`{process.env.REACT_APP_API_DOMAIN}:{process.env.REACT_APP_API_PORT}/api/search/`, {
                params: { // query params
                    term
                },
                withCredentials: true
            }).then((res) => {
            setPosts(res.data);
        })
            .catch((err) => {
                console.log('Error from Search');
            });
    }, [term]);

    const postList =
        posts.length === 0
            ? 'sit tight!'
            : posts.map((post, k) => <PlainPostCard post={post} key={k}/>);

    return (
        <div className='container-fluid'>
            <div className='row'>
                <Header/>
                <div className='col-md-10'>
                    <div className="row">
                        <div className="col-md-12">
                            <h5>Search results: (Limit: 200)</h5>
                            <form action="/search/" method="get">
                                <input type="text" name="term"
                                       placeholder="Search"
                                       defaultValue={DOMPurify.sanitize(term)}
                                       size="15"/>
                                <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
                            </form>
                        </div>
                    </div>
                    <ul>
                        {postList}
                    </ul>
                </div>
                <Footer/>
            </div>
        </div>
    );
}

export default Search;
