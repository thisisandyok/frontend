import React from 'react';
import {Link} from "react-router-dom";


const AccountMenu = (props) => {

    return (
        <span>
            <h5>Account Menu</h5>
            <Link to={`/account/`}>Account home</Link><br />
            <Link to={`/list/`}>Change your subscriptions</Link><br />
            <Link to={`/account/edit`}>Change your information</Link><br />
            <Link to={`/account/saved`}>View your saved posts</Link><br />
            <Link to={`/account/owned`}>View topics you own</Link><br />
        </span>
    )

}


export default AccountMenu;
