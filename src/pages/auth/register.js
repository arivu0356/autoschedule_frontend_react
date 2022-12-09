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
function Register() {

     //init
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const formFields = {
        firstName :{ validate: ['req#please fill Name'] },
        email: { validate: ['req#please fill Email'] },
        password: { validate: ['req#please fill password', 'min:5', 'max:10'] },
        industry:{ validate: ['req#please select industry'] },
    };

    const { fields, errors, handleChange, handleSubmit } = AmlHashForm(formFields);


    const onSubmit = () => {
        let isValid = handleSubmit();
        if (isValid) {
           
            Createaccount();
            
        }
    };
    // 

    const Createaccount = async () => {
        setLoading(true);
        let response = await NetWorkManager.post(API.REGISTER, fields, false);
        if (response?.status === 200) {
            navigate('/');
            common.notify('S', 'added successful');
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
                                <h3>Create a new account</h3>
                                <div class="mb-3">
                                    <label htmlHor="name" className="form-label">
                                        Name
                                    </label>
                                    <input type="text" name="firstName" value={fields?.firstName} onChange={handleChange} class="form-control" id="name" />
                                    <p style={{ color: 'red' }}>{errors?.firstName}</p>
                                </div>
                                <div class="mb-3">
                                    <label htmlHor="email" className="form-label">
                                        Email
                                    </label>
                                    <input type="email" name="email" class="form-control"  value={fields?.email} onChange={handleChange} id="email" />
                                     <p style={{ color: 'red' }}>{errors?.email}</p>
                                </div>
                                <div class="mb-3">
                                    <label htmlHor="password" className="form-label">
                                        Password
                                    </label>
                                    <input type="password" name="password" value={fields?.password} onChange={handleChange} class="form-control" id="password" />
                                    <p style={{ color: 'red' }}>{errors?.password}</p>
                                </div>
                                <div class="mb-3">
                                    <label htmlHor="industry" className="form-label">
                                        Industry
                                    </label>
                                    <select class="form-select" name={"industry"} onChange={handleChange} aria-label="Default select example">
                                        <option selected>Select Industry</option>
                                        <option value="Food">Food</option>
                                        <option value="Electric">Electric</option>
                                        <option value="IT">IT</option>
                                    </select>
                                </div>
                                <p style={{ color: 'red' }}>{errors?.industry}</p>
                                <div class="mb-3">
                                   
                                    <button type="button" disabled={loading} onClick={onSubmit} class="btn btn-primary w-100">
                            {loading ? 'Proecssing...' : 'Register'}
                        </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
