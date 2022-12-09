import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import EmpLogo from '../assets/img/emp-logo.png';
import DashboarIcn from '../assets/img/dashboard-icn.png';
import PositionIcn from '../assets/img/position-icn.png';
import EmployeeIcn from '../assets/img/employee-icn.png';

const MgSideBar = (props, { Outlet }) => {
    return (
        <div className="contianer-fluid">
            <div className="row">
                <div className="col-md-2 left-wrap">
                    <div>
                        <Link to="/manager/dashboard">
                            <img src={DashboarIcn} alt="emp-logo" width="30" className="me-3" />
                            Dashboard111
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
                </div>
                <div className="col-md-10 content-wrap">
                    <Outlet {...props} />
                </div>
            </div>
        </div>
    );
};

export default MgSideBar;
