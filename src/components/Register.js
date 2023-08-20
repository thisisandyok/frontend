import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import Footer from './Footer';
import Header from './Header';
import Cookies from 'universal-cookie';


function Register() {
    const [user, setUser] = useState({
        email: '',
        password: '',
        confirmpassword: '',
    });
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: user.email,
            password: user.password,
            confirmpassword: user.confirmpassword,
        };

        axios
            .post(`${process.env.REACT_APP_API_DOMAIN}:${process.env.REACT_APP_API_PORT}/api/user/`, data)
            .then((res) => {
                const cookies = new Cookies();
                cookies.set('session_id', res.data.session, { path: '/', domain: process.env.REACT_APP_COOKIE_DOMAIN });
                navigate('/account/');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <div className='container-fluid'>
            <div className='row'>
                <Header />
                <div className='col-md-10'>
                    <div className='container-fluid'>
                        <div className='row  newsItem shadow-sm p-0 mb-2 bg-white rounded'>
                            <div className='col-md-12'>
                                <h5>Register for an Account</h5>
                                Registering for an account is free and allows you to:
                                <ul>
                                    <li>Customize your feed</li>
                                    <li>Promote and demote links</li>
                                    <li>React to links</li>
                                    <li>Save links</li>
                                </ul>
                            </div>
                            <div className='col-md-12'>
                                <div className="row">
                                    <div className='col-md-6'>
                                        <form  noValidate onSubmit={onSubmit}>
                                            <div className="form-group">
                                                <label htmlFor="email">Email address</label>
                                                <input type="email" className="form-control" id="email" name="email"
                                                       aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="pass">Password</label>
                                                <input type="password" className="form-control" id="password" name="password"
                                                       placeholder="Password" onChange={onChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="pass">Confirm Password</label>
                                                <input type="password" className="form-control" id="confirmpassword" name="confirmpassword"
                                                       placeholder="Password" onChange={onChange} />
                                            </div>
                                            <button type="submit" className="btn btn-primary">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default Register;

