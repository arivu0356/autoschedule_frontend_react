import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

//includes
import './App.css';

import NetWorkManager from './utils/network';

//Auth
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Layout from './layouts/header';
import Calendar from './poc/calendar';
import Dashboard from './pages/manager/dashboard';
//Position
import PositionList from './pages/manager/position/list';
import PositionForm from './pages/manager/position/form';

//Employee
import EmployeeList from './pages/manager/employee/list';
import EmployeeForm from './pages/manager/employee/form';

import MCalendar from './pages/manager/calendar';
import MCalendarList from './pages/manager/calendarList'

//Emp
import ECalendar from './pages/employee/calendar';
import ECalendarList from './pages/employee/calendarList';
import Eavailability from './pages/employee/availability';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/manager" element={<Layout role="manager" />}>
                    <Route path="dashboard" element={<Dashboard />} />

                    <Route path="position/add" element={<PositionForm />} />
                    <Route path="position/edit/:id" element={<PositionForm />} />
                    <Route path="position" element={<PositionList />} />

                    <Route path="employee/add" element={<EmployeeForm />} />
                    <Route path="employee/edit/:id" element={<EmployeeForm />} />
                    <Route path="employee" element={<EmployeeList />} />

                    <Route path="calendar" element={<MCalendar />} />
                    <Route path="calendar-list" element={<MCalendarList />} />
                    <Route path="poc/calendar" element={<Calendar />} />
                </Route>
                <Route path="/employee" element={<Layout role="employee" />}>
                    <Route path="dashboard" element={<ECalendar />} />
                    <Route path="calendar-list" element={<ECalendarList />} />
                    <Route path="availability" element={<Eavailability />} />
                    
                </Route>
                
            </Routes>
        </Router>
    );
}

export default App;
