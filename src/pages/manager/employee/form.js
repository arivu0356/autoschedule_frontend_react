import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AmlHashForm from 'aml-hash-form';

import NetWorkManager from '../../../utils/network';
import { common } from '../../../utils/utility';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import API from '../../../constant/api';

function Employee() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [position, setPosition] = useState([]);


    const formFields = {
        firstName: { validate: ['req#please provide Employee name'] },
        email: { validate: ['req#please provide Email '] },
        password: { validate: ['req#please provide password '] },
        position: { validate: ['req#please provide position '] }
    };

     useEffect(() => {
        getPosition();
        if (id) {
            getEmployeeInfo(id);
        }
    }, []);

    const { fields, errors, handleChange, handleSubmit, setMultiValue } = AmlHashForm(formFields);

   

    const onSubmit = () => {
        let isValid = handleSubmit();
        if (isValid) {
            if (id) {
                UpdatePostion();
            } else {
                CreateEmployee();
            }
        }
    };

    //api
    const getEmployeeInfo = async (eid) => {
        let response = await NetWorkManager.get(`${API.Employee}/${eid}`, false);
        console.log(response?.data);
        if (response?.status === 200) {
            setMultiValue({
                firstName: response?.data?.firstName,
                email: response?.data?.email,
                position: response?.data?.position
            });
        } else {
            common.notify('E', response?.response?.data?.error);
        }
    };

    const getPosition = async () => {
        setLoading(true);
        let response = await NetWorkManager.get(API.POSITION, false);
        console.log(response?.data);
        if (response?.status === 200) {
            setPosition(response?.data);
            setLoading(false);
        } else {
            common.notify('E', response?.response?.data?.error);
            setLoading(false);
        }
    };

    //api
    const CreateEmployee = async () => {
        setLoading(true);
        let response = await NetWorkManager.post(API.Employee, fields, true);
        if (response?.status === 200) {
            navigate('/manager/Employee');
            common.notify('S', 'added successful');
            setLoading(false);
        } else {
            common.notify('E', response?.response?.data?.error);
            setLoading(false);
        }
    };

    const UpdatePostion = async () => {
        setLoading(true);
        let response = await NetWorkManager.put(`${API.Employee}/${id}`, fields, true);
        if (response?.status === 200) {
            navigate('/manager/Employee');
            common.notify('S', 'added successful');
            setLoading(false);
        } else {
            common.notify('E', response?.response?.data?.error);
            setLoading(false);
        }
    };

    return (
        
        <div className="container">

        <div>
        <ToastContainer />
      </div>
            <div className="row">
                <div className="col-12">
                    <h2>Add Employee</h2>
                </div>
                <div className="col-6 mx-auto">
                    <div class="mt-5 mb-3">
                        <label htmlHor="firstName" className="form-label">
                            Employee Name
                        </label>
                        <input type="text" name="firstName" value={fields?.firstName} onChange={handleChange} class="form-control" id="firstName" />
                        <p style={{ color: 'red' }}>{errors?.name}</p>
                    </div>

                    <div class="mt-5 mb-3">
                        <label htmlHor="email" className="form-label">
                            Employee Email
                        </label>
                        <input type="text" name="email" value={fields?.email} onChange={handleChange} class="form-control" id="email" />
                        <p style={{ color: 'red' }}>{errors?.email}</p>
                    </div>

                    <div class="mt-5 mb-3">
                        <label htmlHor="password" className="form-label">
                            Employee password
                        </label>
                        <input type="text" name="password" value={fields?.password} onChange={handleChange} class="form-control" id="password" />
                        <p style={{ color: 'red' }}>{errors?.password}</p>
                    </div>

                    <div class="mt-5 mb-3">
                        <label htmlHor="password" className="form-label">
                            Employee Position
                        </label>
                        <select className="form-control" value={fields?.position} name="position" onChange={handleChange}>
                            <option value={''}>select position</option>
                            {position.map((item) => (
                                <option value={item._id}>{item.name}</option>
                            ))}
                        </select>
                        <p style={{ color: 'red' }}>{errors?.position}</p>
                    </div>

                    <div class="mt-4 mb-3">
                        <button type="button" disabled={loading} onClick={onSubmit} class="btn btn-primary w-100">
                            {loading ? 'Proecssing...' : id ? 'update' : 'Add'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Employee;
