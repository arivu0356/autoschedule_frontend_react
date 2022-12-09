import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AmlHashForm from 'aml-hash-form';

import NetWorkManager from '../../utils/network';
import { common } from '../../utils/utility';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import moment from 'moment';
import API from '../../constant/api';


function Availability() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [position, setPosition] = useState([]);

const [value, setValue] = useState();
    const formFields = {
       
        
    };

    const { fields, errors, handleChange, handleSubmit, setMultiValue } = AmlHashForm(formFields);

    useEffect(() => {
      getProfileInfo();
    }, []);

    const onSubmit = () => {
        let isValid = handleSubmit();
        if (isValid) {
           UpdateProfile();

        }
    };

     const getProfileInfo = async () => {
        let response = await NetWorkManager.get(`${API.PROFILE}`, true);
        console.log(response?.data);
        if (response?.status === 200) {
               setMultiValue({
                constraints:response?.data?.constraints[0],

               })
               setValue(response?.data?.unAvailability)
        
        } else {
            common.notify('E', response?.response?.data?.error);
        }
    };

  
   const UpdateProfile = async () => {
        setLoading(true);
        

        let payload = {
    constraints:[fields.constraints],
    unAvailability:value.map(item => moment(new Date(item)).format())
}




        let response = await NetWorkManager.put(API.PROFILE, payload, true);
        if (response?.status === 200) {
            // navigate('/employee/availability');
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
                    <h2>Add Availability</h2>
                </div>
                <div className="col-6 mx-auto">
                    


                    <div class="mt-5 mb-3">
                        <label htmlHor="password" className="form-label">
                            Constrain
                        </label>
                        <select className="form-control" value={fields?.constraints} name="constraints" onChange={handleChange}>
                            <option value={''}>select constrain</option>
                           
                                <option value="Morning">Morning</option>
                                <option value="Afternoon">Afternoon</option>
                                <option value="Night">Night</option>
                         
                        </select>
                       
                    </div>

                    <div class="mt-5 mb-3">
                        <label htmlHor="email" className="form-label">
                            Availability
                        </label>
                        <div >

                       <DatePicker style={{width:'520px'}} multiple value={value} onChange={setValue} name="unAvailability" plugins={[<DatePanel />]}  />
                       </div>
                      
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
export default Availability;
