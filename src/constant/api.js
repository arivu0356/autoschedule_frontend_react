const BASE_URL = 'http://localhost:3003/api';

const API = {
    SIGN_IN: BASE_URL + '/app/auth/login',
    REGISTER: BASE_URL + '/app/auth/register',

    POSITION: BASE_URL + '/app/position',
    Employee: BASE_URL + '/app/employee',
    SCHEDULE:BASE_URL + '/app/schedule',
    PROFILE:BASE_URL + '/app/profile',
    AUTO:BASE_URL + '/app/auto',
    PUBLISHED:BASE_URL + '/app/published',
};

export default API;
