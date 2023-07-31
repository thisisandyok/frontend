import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import Footer from './Footer';
import Header from './Header';
import Cookies from 'universal-cookie';


function Login() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email: user.email,
            password: user.password
        };

        await axios
            .post('https://api.laffo.com/api/login/', data)
            .then((res) => {
                const cookies = new Cookies();
                cookies.set('session_id', res.data.session, { path: '/', domain: '.laffo.com' });
                navigate('/account/');
            })
            .catch((err) => {

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

export default Login;

