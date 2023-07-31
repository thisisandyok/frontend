import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const Header = (props) => {
    const cookies = new Cookies();
    const session_id = cookies.get('session_id');

    return (
        <div className='col-md-12 header'>
            <div className='row  align-items-end'>
                <div className='col-md-2 logo'>
                    <a href="/"><img src="/img/img.png" alt="Logo"/></a>
                </div>
                <div className='col-md-10'>
                    <div className='row navMenu'>
                        <div className="col">
                        {(() => {
                            if(session_id) {
                                return <Link className="navLink"  to={`/list/`}>Subscriptions</Link>;
                            } else {
                                return <Link className="navLink"  to={`/list/`}>Browse Topics</Link>;
                            }
                        })()}
                        </div>
                        <div className="col">
                            <Link className="navLink"  to={`/faq/`}>FAQ</Link>
                        </div>
                        <div className="col">
                            <a className="navLink" href="https://discord.gg/ejnRNZ2hph" target="_blank" rel="noreferrer" >Discord</a>
                        </div>
                        <div className="col-sm-7 text-right">
                            {(() => {
                                if(session_id) {
                                    return <span><Link className="navLink"  to={`/account/`}>Account</Link> <Link className="navLink"  to={`/logout/`}>Log out</Link></span>
                                } else {
                                    return (<span><Link className="navLink"  to={`/register/`}>Register to Customize</Link> <Link className="navLink"  to={`/login/`}>Sign In</Link></span>);
                                }
                            })()}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

}
export default Header;
