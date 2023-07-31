import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faBan } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Footer = (props) => {



    return (
        <div className='col-md-2'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-12 sidebarItem shadow-sm p-2 mb-2 bg-white rounded'>
                        <form action="/search/" method="get"><input type="text" name="term" placeholder="Search" size="15" /> <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass}  /></button></form>
                    </div>
                    <div className='col-md-12 sidebarItem shadow-sm p-2 mb-2 bg-white rounded'>
                        <h5>Updates</h5>
                        <a href="https://trello.com/b/Snxn8H1E/laffo" target="_blank" rel="noreferrer" >Known issues, todo list</a><br/><br/>

                        <small><strong>2023-07-22</strong><br/>Subscriptions, misc cleanup</small><br/>
                        <small><strong>2023-07-15</strong><br/>Endless scrolling. Search Function. New Topics. User system</small><br/>
                        <small><strong>2023-07-08</strong><br/>Basic APIs and feed parsing.</small><br/>
                        <small><strong>2023-06-26</strong><br/>&quot;Good enough&quot; UI achieved</small><br/>
                        <small><strong>2023-06-23</strong><br/>Work on the site has started</small><br/>
                    </div>
                    <div className='col-md-12 sidebarItem shadow-sm p-2 mb-2 bg-white rounded'>
                        <h5>Sponsor</h5>
                    </div>
                    <div className='col-md-12 sidebarItem shadow-sm p-2 mb-2 bg-white rounded'>
                        <h5>Guide</h5>
                        <FontAwesomeIcon icon={faCaretUp} className='voteUp' /> I recommend this link to others<br/>
                        <FontAwesomeIcon icon={faCaretDown} className='voteUp' /> I do not recommend to this link to others<br/>
                        <FontAwesomeIcon icon={faBan} className='voteUp' /> Hide without affecting the rating<br/><br/>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Footer;
