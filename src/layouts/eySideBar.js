import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import EmpLogo from '../assets/img/emp-logo.png';
import DashboarIcn from '../assets/img/dashboard-icn.png';
import PositionIcn from '../assets/img/position-icn.png';
import EmployeeIcn from '../assets/img/employee-icn.png';

const MgSideBar = ({ children }) => {
    return (
        <div className="contianer-fluid">
            <div className="row">
                <div className="col-md-2 left-wrap">
                    <div>
                        <Link to="/employee/dashboard">
                            <img src={DashboarIcn} alt="emp-logo" width="30" className="me-3" />
                            Dashboard
                        </Link>
                    </div>
                    <div>
                        <Link to="/employee/Position">
                            <img src={PositionIcn} alt="emp-logo" width="30" className="me-3" />
                            UnAssign
                        </Link>
                    </div>
                </div>
                <div className="col-md-10 content-wrap">{children}</div>
            </div>
        </div>
    );
};

export default MgSideBar;
