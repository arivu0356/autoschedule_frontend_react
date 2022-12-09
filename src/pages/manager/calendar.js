import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import AmlHashForm from 'aml-hash-form';

import NetWorkManager from '../../utils/network';
import { common } from '../../utils/utility';
import moment from 'moment';
import API from '../../constant/api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick
// import timeGridPlugin from "@fullcalendar/timegrid";

import '@fullcalendar/daygrid/main.css';

function Calendar() {
    const [position, setPosition] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [events,setEvents] = useState([])

    let firstDaty = 1;
    const getDate = (dayString) => {
        const today = new Date();
        const year = today.getFullYear().toString();
        let month = (today.getMonth() + 1).toString();

        if (month.length === 1) {
            month = '0' + month;
        }

        let firstDaty = 1;

        return dayString.replace('YEAR', year).replace('MONTH', month);
    };

    

    const formFields = {
        date: { validate: ['req#please select the date'] },
        startTime: { validate: ['req#please select the Start time'] },
        endTime: { validate: ['req#please select the End time'] },
        position: { validate: ['req#please select the position'] },
        shift: { validate: ['req#please select the shift'] }
    };

    const { fields, errors,setValue, handleChange, handleSubmit } = AmlHashForm(formFields);

    const optionConverter = (arrArg) => {
        let option = [];
        arrArg.map((item) => option.push({ label: item.name, value: item._id }));
        setPosition(option);
    };


  

    const onSubmit = async() => {
        let isValid = handleSubmit();
        if (isValid) {
            setLoading(true);
            let payload = {
                Date:moment(fields?.date).add(7, 'hours').format(),
                StartTime:moment(`${fields?.date} ${fields?.startTime}`,'YYYY-MM-DD HH:mm').format() ,
                EndTime:moment(`${fields?.date} ${fields?.endTime}`,'YYYY-MM-DD HH:mm').format(),
                position:fields?.position.map(item => item.value),
                shift:fields?.shift
            }

            let response = await NetWorkManager.post(API.SCHEDULE, payload, true);
            if(response?.status === 200){
                 common.notify('S', "added successful");
                getCalendar();
            }
            else{
                 common.notify('E', response?.response?.data?.error);
            }
            setOpen(false);
            setLoading(false);

            
        }
    };
     
     //
     const onAuto = async() => {
         let response = await NetWorkManager.post(API.AUTO,{} ,true);   
          if(response?.status === 200){
                 common.notify('S', "added successful");
                 setLoading(false);
               
            }
            else{
                 common.notify('E', response?.response?.data?.error);
                 setLoading(false);
            }  
     };

     //
      const onPublished = async() => {
         let response = await NetWorkManager.post(API.PUBLISHED, {} ,true);   
          if(response?.status === 200){
                 common.notify('S', "Published successful");
                 setLoading(false);
               
            }
            else{
                 common.notify('E', response?.response?.data?.error);
                 setLoading(false);
            }  
     };
     

    useEffect(() => {
        getPosition();
        getCalendar();
    }, []);

    console.log(JSON.parse(localStorage.getItem('AuthUser')).role);
    //api
    const getPosition = async () => {
        setLoading(true);
        let response = await NetWorkManager.get(API.POSITION, true);
        console.log(response?.data);
        if (response?.status === 200) {
            optionConverter(response?.data);
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

    const getCalendar = async () => {
        let response = await NetWorkManager.get(API.SCHEDULE, true);
        if (response?.status === 200) {
        let formSet = [];
           console.log(response?.data)
           response?.data?.map((items,index) => formSet.push({
            title: `slot ${index+1}  ${jsonToArray(items?.position,'name')}`,
            start:new Date(items?.StartTime),
            end:new Date(items?.EndTime),
            textColor: 'black',
            backgroundColor: items?.isPublished ? "#69BA71" : "#FEC934",
           }))
           console.log({formSet})
        //    {
        //     title: 'AMARILLO -5',
        //     start: getDate('YEAR-MONTH-09'),
        //     backgroundColor: 'yellow',
        //     textColor: 'black'
        // },
         setEvents(response?.data?.length ? formSet : []);
        } else {
            common.notify('E', response?.response?.data?.error);
            setLoading(false);
        }

    }

    return (
        <div className="container">

         <div>
        <ToastContainer />
      </div>
      
            <div className="row">
                <div className="col-md-6">
                    <button className="btn btn-warning" onClick={onAuto}>Auto</button>
                </div>
                <div className="col-md-6">
                    <button className="btn btn-success" onClick={onPublished}>Published</button>
                    <button className="btn btn-info mx-2" onClick={() => setOpen(true)}>
                        Add Shift
                    </button>
                </div>
            </div>
            <FullCalendar
                defaultView="dayGridMonth"
                firstDay={firstDaty}
                locale="en"
                headerToolbar={{
                    center: 'dayGridMonth,timeGridWeek,timeGridDay',
                    right: 'today prev,next'
                }}
                themeSystem="Simplex"
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                events={events}
            />

            {/* modal */}
            <div>
                <Modal show={open} size={'lg'} centered>
                    <Modal.Header closeButton onClick={() => setOpen(false)}>
                        <Modal.Title>Add Shift</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-12">
                                    <label htmlHor="date" className="form-label">
                                        Date
                                    </label>
                                    <input type="date" value={fields?.date} onChange={handleChange} name="date" class="form-control" id="date" />
                                    <p style={{ color: 'red' }}>{errors?.date}</p>
                                </div>
                                <div className="col-md-6">
                                    <label htmlHor="startTime" className="form-label">
                                        Start Time
                                    </label>
                                    <input type="time" value={fields?.startTime} onChange={handleChange} name="startTime" class="form-control" id="startTime" />
                                    <p style={{ color: 'red' }}>{errors?.startTime}</p>
                                </div>
                                <div className="col-md-6">
                                    <label htmlHor="endTime" className="form-label">
                                        End Time
                                    </label>
                                    <input type="time" value={fields?.endTime} onChange={handleChange} name="endTime" class="form-control" id="endTime" />
                                    <p style={{ color: 'red' }}>{errors?.endTime}</p>
                                </div>

                                <div className="col-md-12">
                                    <label htmlHor="position" className="form-label">
                                        Position
                                    </label>
                                    <Select className="form-control" value={fields?.position} name={'position'} onChange={(data) => setValue("position",data)} isMulti options={position} />

                                    <p style={{ color: 'red' }}>{errors?.position}</p>
                                </div>

                                 <div className="col-md-12">
                                    <label htmlHor="shift" className="form-label">
                                        Position
                                    </label>
                                    <select className="form-control" value={fields?.shift} name={'shift'} onChange={handleChange} >
                                     <option value={''}>select shift</option>
                                     <option value="Morning">Morning</option>
                                <option value="Afternoon">Afternoon</option>
                                <option value="Night">Night</option>
                                </select>

                                    <p style={{ color: 'red' }}>{errors?.shift}</p>
                                </div>

                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={onSubmit}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
export default Calendar;
