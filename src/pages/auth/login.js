import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AmlHashForm from 'aml-hash-form';
import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
//includes
import Laptop from '../../assets/img/laptop.jpg';

import NetWorkManager from '../../utils/network';
import { common } from '../../utils/utility';
import API from '../../constant/api';

function Login() {
    //init
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const formFields = {
        email: { validate: ['req#please fill Email', 'email'] },
        password: { validate: ['req#please fill password', 'min:5', 'max:10'] }
    };

    const { fields, errors, handleChange, handleSubmit } = AmlHashForm(formFields);

    //handler
    const onSubmit = () => {
        let isValid = handleSubmit();
        if (isValid) {
            SignIn();
        }
    };

    //Api
    const SignIn = async () => {
        setLoading(true);
        let response = await NetWorkManager.post(API.SIGN_IN, fields, false);

        if (response?.status === 200) {
            if (response?.data?.role === 'manager') {
               
                localStorage.setItem('AuthUser', JSON.stringify(response?.data));
                navigate('/manager/dashboard');
            } else {
                localStorage.setItem('AuthUser', JSON.stringify(response?.data));
                navigate('/employee/dashboard');
            }
            setLoading(false);
        } else {
            common.notify('E', response?.response?.data?.error);
            setLoading(false);
        }
    };

    return (
        <>
         <div>
        <ToastContainer />
      </div>
            <div className="container-fluid">
                <div className="container pt-5">
                    <div className="row pt-5">
                        <div className="col-md-6">
                            <img src={Laptop} alt="laptop" className="w-100" />
                        </div>
                        <div className="col-md-6 ms-auto pt-5">
                            <div>
                                <h3>Sign In</h3>
                                <div className="mb-3">
                                    <label htmlHor="email" className="form-label">
                                        Email
                                    </label>
                                    <input type="email" name="email" value={fields?.email} onChange={handleChange} className="form-control" id="email" />
                                    <p className="mt-2 px-4 text-danger">{errors?.email}</p>
                                </div>
                                <div className="mb-3">
                                    <label htmlHor="password" value={fields?.password} className="form-label">
                                        Password
                                    </label>
                                    <input type="password" name="password" className="form-control" onChange={handleChange} id="password" />
                                    <p className="mt-2 px-4 text-danger">{errors?.password}</p>
                                </div>
                                <div className="mb-3">
                                    <button type="button" disabled={loading} onClick={onSubmit} className="btn btn-primary w-100 mt-3">
                                        {loading ? 'processing...' : 'Sign In'}
                                    </button>
                                </div>
                                <div className="mb-3">
                                    <Link to="/register">Register Manager</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Login;
