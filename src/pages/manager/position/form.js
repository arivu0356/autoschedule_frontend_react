import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AmlHashForm from 'aml-hash-form';

import NetWorkManager from '../../../utils/network';
import { common } from '../../../utils/utility';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import API from '../../../constant/api';

function Position() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const formFields = {
        name: { validate: ['req#please provide position name'] }
    };

    const { fields, errors, handleChange, handleSubmit, setMultiValue } = AmlHashForm(formFields);

    useEffect(() => {
        if (id) {
            getPositionInfo(id);
        }
    }, []);

    const onSubmit = () => {
        let isValid = handleSubmit();
        if (isValid) {
            if (id) {
                UpdatePostion();
            } else {
                CreatePosition();
            }
        }
    };

    //api
    const getPositionInfo = async (pid) => {
        let response = await NetWorkManager.get(`${API.POSITION}/${pid}`, false);
        console.log(response?.data);
        if (response?.status === 200) {
            setMultiValue({
                name: response?.data?.name
            });
        } else {
            common.notify('E', response?.response?.data?.error);
        }
    };
    const CreatePosition = async () => {
        setLoading(true);
        let response = await NetWorkManager.post(API.POSITION, fields, true);
        if (response?.status === 200) {
            navigate('/manager/Position');
            common.notify('S', 'added successful');
            setLoading(false);
        } else {
            common.notify('E', response?.response?.data?.error);
            setLoading(false);
        }
    };

    const UpdatePostion = async () => {
        setLoading(true);
        let response = await NetWorkManager.put(`${API.POSITION}/${id}`, fields, true);
        if (response?.status === 200) {
            navigate('/manager/Position');
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
                    <h2>Add Position</h2>
                </div>
                <div className="col-6 mx-auto">
                    <div class="mt-5 mb-3">
                        <label htmlHor="name" className="form-label">
                            Position Name
                        </label>
                        <input type="text" name="name" value={fields?.name} onChange={handleChange} class="form-control" id="name" />
                        <p style={{ color: 'red' }}>{errors?.name}</p>
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
export default Position;
