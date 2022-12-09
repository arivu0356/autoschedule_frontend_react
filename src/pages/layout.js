import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import EmpLogo from '../assets/img/emp-logo.png';
import DashboarIcn from '../assets/img/dashboard-icn.png';
import PositionIcn from '../assets/img/position-icn.png';
import EmployeeIcn from '../assets/img/employee-icn.png';

const Layout = ({ children }) => {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={EmpLogo} alt="emp-logo" width="40" className="me-3" />
                        Employee Automation
                    </a>
                </div>
            </nav>
            <div className="contianer-fluid">
                <div className="row">
                    <div className="col-md-2 left-wrap">
                        <div>
                            <Link to="/dashboard">
                                <img src={DashboarIcn} alt="emp-logo" width="30" className="me-3" />
                                Dashboard
                            </Link>
                        </div>
                        <div>
                            <Link to="/Position">
                                <img src={PositionIcn} alt="emp-logo" width="30" className="me-3" />
                                Position
                            </Link>
                        </div>
                        <div>
                            <Link to="/employee">
                                <img src={EmployeeIcn} alt="emp-logo" width="30" className="me-3" />
                                Employee
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-10 content-wrap">{children}</div>
                </div>
            </div>
        </>
    );
};
export default Layout;
