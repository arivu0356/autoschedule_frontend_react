import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AmlHashForm from 'aml-hash-form';
import moment from 'moment';
import NetWorkManager from '../../utils/network';
import { common } from '../../utils/utility';
import API from '../../constant/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CalendarList() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [result, setResult] = useState([]);
    useEffect(() => {
        getCalendar();
    }, []);

    //api
    const getCalendar = async () => {
        setLoading(true);
        let response = await NetWorkManager.get(API.SCHEDULE, true);
        console.log(response?.data);
        if (response?.status === 200) {
            setResult(response?.data);
            setLoading(false);
        } else {
            common.notify('E', response?.response?.data?.error);
            setLoading(false);
        }
    };


    const jsonToArray = (arrArg,key,value) => {
        let rp = [];
        arrArg.map(item => rp.push(item[key]))
        return rp
    }

    return (
        <div className="container">

         <div>
        <ToastContainer />
      </div>

            <div className="row">
                <div className="col-6">
                    <h2>Schedule List</h2>
                </div>
                <div className="col-6">
                    
                </div>
                <div className="col-6 mx-auto">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Date</th>
                                <th scope="col">Start IN</th>
                                <th scope="col">Start OUT</th>
                                 <th scope="col">Position</th>
                                 <th scope="col">Employee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.length ? (
                                result.map((items, index) => (
                                    <tr>
                                        <td scope="row">{index + 1}</td>
                                        <td>{moment(new Date(moment(items .Date).format())).format("YYYY-MM-DD")}</td>
                                        <td>{moment(items.StartTime).format('HH:mm')}</td>
                                        <td>{moment(items.EndTime).format('HH:mm')}</td>
                                        <td>{jsonToArray(items?.position,'name').toString()}</td>
                                        <td>{jsonToArray(items?.employee,'email').toString()}</td>
                                       
                                       
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
export default CalendarList;
