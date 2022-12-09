import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import AmlHashForm from 'aml-hash-form';
import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';

import NetWorkManager from '../../utils/network';
import { common } from '../../utils/utility';
import moment from 'moment';
import API from '../../constant/api';

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
    const optionConverter = (arrArg) => {
        let option = [];
        arrArg.map((item) => option.push({ label: item.name, value: item._id }));
        setPosition(option);
    };


    useEffect(() => {

        getCalendar();
    }, []);

    
    const getCalendar = async () => {
        let response = await NetWorkManager.get(API.SCHEDULE, true);
        if (response?.status === 200) {
        let formSet = [];
           console.log(response?.data)
           response?.data?.map((items,index) => formSet.push({
            title: `slot ${index+1}`,
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

           
        </div>
    );
}
export default Calendar;
