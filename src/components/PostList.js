import React, { useState, useRef, useCallback } from 'react';
import '../App.css';
import PostCard from './PostCard';
import Footer from './Footer';
import Header from './Header';
import Cookies from 'universal-cookie';

import usePagination from '../hooks/usePagination';


function PostList() {
    const [page, setPage] = useState(10000000000);

    const cookies = new Cookies();
    const session_id = cookies.get('session_id');

    const { data, more, loading } = usePagination(page);
    const observer = useRef(); // ref to store observer

    const lastElementRef = useCallback((element) => {
        //element is the react element being referenced

        // disconnect observer set on previous last element
        if (observer.current) observer.current.disconnect();

        // if there's no more data to be fetched, don't set new observer
        if (!more) return;

        // set new observer
        observer.current = new IntersectionObserver((entries) => {
            // increase page number when element enters (is intersecting with) viewport.
            // This triggers the pagination hook to fetch more items in the new page
            if (entries[0].isIntersecting && more) setPage((prev) => entries[0].target.attributes['heat'].nodeValue);
        });

        // observe/monitor last element
        if (element) observer.current.observe(element);
    }, [more]);


    return (
        <div className='container-fluid'>
            <div className='row'>
                <Header />
                <div className='col-md-10'>

                    { data.map((post, k) => <PostCard post={post} key={k} session_id={session_id} innerRef={k === data.length - 1 ? lastElementRef : undefined} />)}
                    {/** if data-fetching is in progress, the indicator below is rendered */}
                    {loading && (
                        <div id="loader">Loading...</div>
                    )}
                    {/** if there's no more data to be fetched, render an indicator to inform the user  */}
                    {!more && <div id="end">You've the reached the end</div>}
                </div>

                <Footer />
            </div>
        </div>
    );
}

export default PostList;
