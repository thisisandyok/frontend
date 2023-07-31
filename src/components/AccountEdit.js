import React from 'react';
import '../App.css';
import Footer from './Footer';
import Header from './Header';
import AccountMenu from "./AccountMenu";

function AccountEdit() {

    return (
        <div className='container-fluid'>
            <div className='row'>
                <Header />
                <div className='col-md-10'>
                    <div className='container-fluid'>
                        <div className='row  newsItem shadow-sm p-0 mb-2 bg-white rounded'>
                            <div className='col-md-12'>
                                <AccountMenu />
                                <h5>Edit your Details</h5>
                                not yet lol
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default AccountEdit;
