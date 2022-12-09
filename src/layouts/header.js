import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import EmpLogo from '../assets/img/emp-logo.png';

import MgSideBar from './mgSideBar';
import EySideBar from './eySideBar';
import DashboarIcn from '../assets/img/dashboard-icn.png';
import PositionIcn from '../assets/img/position-icn.png';
import EmployeeIcn from '../assets/img/employee-icn.png';

const Layout = (props) => {

    const user = JSON.parse(localStorage.getItem('AuthUser'))
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={EmpLogo} alt="emp-logo" width="40" className="me-3" />
                        {props?.role === 'manager' ? 'Manager' : 'Employee'}
                    </a>
                </div>
            </nav>
            {/* {props?.role === 'manager' ? <MgSideBar Outlet={<Outlet {...props} />} /> : <EySideBar Outlet={<Outlet {...props} />} />} */}
            {/* <Outlet {...props} /> */}
            <div className="contianer-fluid">
                <div className="row">
                    <div className="col-md-2 left-wrap">

                        {user.role === "manager" ?  <>
                        <div>
                            <Link to="/manager/dashboard">
                                <img src={DashboarIcn} alt="emp-logo" width="30" className="me-3" />
                                Dashboard
                            </Link>
                        </div>
                        <div>
                            <Link to="/manager/Position">
                                <img src={PositionIcn} alt="emp-logo" width="30" className="me-3" />
                                Position
                            </Link>
                        </div>
                        <div>
                            <Link to="/manager/employee">
                                <img src={EmployeeIcn} alt="emp-logo" width="30" className="me-3" />
                                Employee
                            </Link>
                        </div>
                        <div>
                            <Link to="/manager/calendar">
                                <img src={EmployeeIcn} alt="emp-logo" width="30" className="me-3" />
                                Calendar
                            </Link>
                            </div>
                            <div>
                            <Link to="/manager/calendar-list">
                                <img src={EmployeeIcn} alt="emp-logo" width="30" className="me-3" />
                                Schedule List
                            </Link>

                            
                        </div>
                        </> :  
                        <div>
                            <Link to="/employee/dashboard">
                                <img src={DashboarIcn} alt="emp-logo" width="30" className="me-3" />
                                Dashboard
                            </Link>
                           

                            <Link to="/employee/calendar-list">
                                <img src={EmployeeIcn} alt="emp-logo" width="30" className="me-3" />
                                Schedule List
                            </Link>

                             <Link to="/employee/availability">
                                <img src={EmployeeIcn} alt="emp-logo" width="30" className="me-3" />
                                Availability
                            </Link>
                        </div>}
                       
                    </div>
                    <div className="col-md-10 content-wrap">
                        <Outlet {...props} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;
