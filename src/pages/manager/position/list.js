import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AmlHashForm from 'aml-hash-form';

import NetWorkManager from '../../../utils/network';
import { common } from '../../../utils/utility';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import API from '../../../constant/api';

function Position() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [result, setResult] = useState([]);
    useEffect(() => {
        getPosition();
    }, []);

    //api
    const getPosition = async () => {
        setLoading(true);
        let response = await NetWorkManager.get(API.POSITION, false);
        console.log(response?.data);
        if (response?.status === 200) {
            setResult(response?.data);
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
                <div className="col-6">
                    <h2>Position List</h2>
                </div>
                <div className="col-6">
                    <Link to={`/manager/Position/add`} className="btn btn-info">
                        Add New
                    </Link>
                </div>
                <div className="col-6 mx-auto">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Position</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.length ? (
                                result.map((item, index) => (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item?.name}</td>
                                        <td>
                                            <Link to={`/manager/Position/edit/${item?._id}`}>Edit</Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <h4>Record Not Found</h4>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default Position;
