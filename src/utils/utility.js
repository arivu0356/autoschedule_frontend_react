import { AES, enc } from 'crypto-js';
import moment from 'moment';
import { toast } from 'react-toastify';
// includes

const config = {
    elements: {
        toast: {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        }
    }
};

export const common = {
    loadImg(img) {
        let result = require('../assets/img/' + img);
        return result; //.default;
    },

    fileName(file) {
        let ext = file.substring(file.lastIndexOf('.'));
        let fileName = file.split('_').slice(0, -1).join('_') + ext;
        return fileName.substring(fileName.indexOf('/') + 1);
    },

    notify(type, msg) {
        toast.dismiss();
        switch (type) {
            case 'S':
                toast.success(msg, config.elements.toast);
                break;
            case 'W':
                toast.warning(msg, config.elements.toast);
                break;
            case 'E':
            case 'E':
                toast.error(msg, config.elements.toast);
                break;
            case 'I':
                toast.info(msg, config.elements.toast);
                break;
            case 'M':
                toast(msg, config.elements.toast);
                break;
        }
    },

    // local storage
    localSet(key, value) {
        if (typeof value === 'object') {
            localStorage.setItem(key, JSON.stringify(value));
        } else {
            localStorage.setItem(key, value);
        }
    },
    localGet(key, json = false) {
        let value = localStorage.getItem(key);
        if (json) {
            value = JSON.parse(value);
        }
        return value;
    },
    localRemove(key) {
        localStorage.removeItem(key);
    },

    // local data
    localDataSet(value) {
        this.localSet('localData', value);
    },

    localDataGet() {
        let res = this.localGet('localData', true);
        this.localDataRemove();
        return res;
    },

    localDataRemove() {
        return this.localRemove('localData');
    },

    // tempdata
    tempDataSet(value) {
        this.localSet('tempData', common.crypt(value, true));
    },

    tempDataGet() {
        let data = this.localGet('tempData');
        if (data) {
            return this.deCrypt(data, true);
        }
        return null;
    },

    tempDataRemove() {
        return this.localRemove('tempData');
    },

    // auth
    checkAuth() {
        let authData = this.localGet('authData');
        if (authData == '' || authData == null) {
            return false;
        } else {
            return this.getAuth() ? true : false;
        }
    },

    getAuth() {
        let data = this.localGet('authData');
        return this.deCrypt(data, true);
    },

    // encode decode
    crypt(str, json = false) {
        if (json) {
            str = JSON.stringify(str);
        }
        return AES.encrypt(str, '#cErLyPpKt#').toString();
    },

    deCrypt(str, json = false) {
        try {
            let bytes = AES.decrypt(str, '#cErLyPpKt#');
            let data = bytes.toString(enc.Utf8);
            if (data == '') {
                localStorage.clear();
                this.redirect('login');
            } else {
                if (json) {
                    return JSON.parse(data);
                } else {
                    return data;
                }
            }
        } catch (err) {
            localStorage.clear();
            this.redirect('login');
        }
    },

    // validation
    isEmail(mail) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
            return true;
        } else {
            return false;
        }
    },

    getMonthList() {
        return [
            { label: 'Jan', value: '1' },
            { label: 'Feb', value: '2' },
            { label: 'Mar', value: '3' },
            { label: 'Apr', value: '4' },
            { label: 'May', value: '5' },
            { label: 'June', value: '6' },
            { label: 'July', value: '7' },
            { label: 'Aug', value: '8' },
            { label: 'Sep', value: '9' },
            { label: 'Oct', value: '10' },
            { label: 'Nov', value: '11' },
            { label: 'Dec', value: '12' }
        ];
    },

    SetMultiSelect(data, label, value, string = false) {
        let optionsData = [];
        if (data && data.length) {
            data.map((obj) => {
                let options = {
                    label: obj[label],
                    value: string ? obj[value].toString() : obj[value]
                };
                optionsData.push(options);
            });
        }
        return optionsData;
    },

    SetSelect(val) {
        return { label: val, value: val };
    },

    FindSelect(data, val) {
        let result = data.find((obj) => obj.value === val);
        return result ?? null;
    },

    FindMultiSelect(data, val) {
        let result = data.find((obj) => val.includes(obj.value));
        return result ?? null;
    },

    getFullYear(val) {
        const year = new Date().getFullYear();
        const years = Array.from(new Array(val), (val, index) => index + year);
        return years;
    },

    paging(paging, type) {
        if (type == 'offset') {
            return (paging.page - 1) * paging.limit;
        } else if (type == 'serial') {
            return (paging.page - 1) * paging.limit;
        }
    },

    reParse(data) {
        return JSON.parse(JSON.stringify(data));
    },

    scrollToRef(myRef, adjust = 0) {
        window.scroll({
            top: myRef.current.offsetTop - adjust,
            behavior: 'smooth'
        });
    },

    scrollTo(to = '') {
        if (to === 'top') {
            window.scroll({ top: 0, behavior: 'smooth' });
        } else if (to === 'bottom') {
            window.scrollTo({
                left: 0,
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }
    },

    // validate
    validateType(val, type = 's') {
        let result = val;
        if (type == 'n') {
            result = common.onlyNumbers(val);
        } else if (type == 'f') {
            result = common.onlyFloat(val);
        }
        return result;
    },

    validateMobile(number) {
        return number.replace(/\D/g, '');
    },

    // input
    onlyNumbers(str) {
        return str.replace(/[^0-9]+/gi, '');
    },

    onlyFloat(str) {
        return str.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    },

    modalStyle(width = 75) {
        return {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                width: `${width}%`,
                maxHeight: '800px',
                marginRight: '-50%',
                padding: '0',
                borderRadius: '0',
                border: 'none',
                boxShadow: '0px 0px 20px rgba(77, 78, 141, 0.1773601)',
                transform: 'translate(-50%, -50%)'
            }
        };
    },

    mapStyle() {
        return {
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `300px`,
            height: `50px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
            position: 'absolute',
            left: '48%',
            marginLeft: '-120px'
        };
    },
    sliderSettings() {
        return {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 0
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
    },

    ctaSliderSettings() {
        return {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 0
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
    },

    redirect(url = '') {
        window.location.href = config.public_url + url;
    },

    dateFormat(val, format) {
        return val ? moment(val).format(config.elements.dp[format]) : '';
    },

    trimString(str, len) {
        let res = str;
        if (str?.length > len) {
            res = str.substring(0, len) + '...';
        }
        return res;
    },

    readable(type, str) {
        let res = '';
        if (str === null || str === '' || str === 'undefined') {
            res = ' - ';
        } else {
            if (type === 'string') {
                res = str;
            } else if (type === 'date') {
                res = moment(str).format(config.elements.dp.A);
            } else if (type === 'dateTime') {
                res = moment(str).format(config.elements.dp.C);
            } else if (type === 'select') {
                res = str?.name;
            } else if (type === 'boolObject') {
                res = str ? 'Yes' : 'No';
            } else if (type === 'nationality') {
                res = str?.nationality;
            }
        }
        return res;
    },

    progressMeter(val) {
        let result = 'error';
        if (val >= 30 && val < 50) {
            result = 'warning';
        } else if (val >= 50 && val <= 99) {
            result = 'info';
        } else if (val === 100) {
            result = 'success';
        }
        return result;
    },

    getPath(url) {
        let res = url
            ?.split('/')
            ?.filter((i) => i != '')
            ?.slice(0, 2);
        if (['application'].includes(res[0])) {
            return res[0];
        } else {
            return res?.join('_');
        }
    },

    maskString(str, f, l) {
        var first = str.substring(0, f);
        var last = str.substring(str.length - l);
        let mask = str.substring(f, str.length - l).replace(/./g, '*');
        return first + mask + last;
    },
    ArrayJsonFind(key, value, Array, getObject = false) {
        let hashValue = false;
        let Object = {};
        Array.map((item, index) => {
            if (item[key] === value) {
                hashValue = true;
                Object = item;
                Object.index = index;
            }
        });
        if (getObject) {
            return Object;
        } else {
            return hashValue;
        }
    },

    numberWithCommas(value) {
        return value?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    timeSince(date) {
        var seconds = Math.floor((new Date() - date) / 1000);
        var interval = seconds / 31536000;
        if (interval > 1) {
            return Math.floor(interval) + ' years';
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + ' months';
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + ' days';
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + ' hours';
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + ' minutes';
        }
        return Math.floor(seconds) + ' seconds';
    }
};
