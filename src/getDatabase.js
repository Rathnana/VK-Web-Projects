import axios from 'axios'
import { openErrorNotification } from './own-comp'
import { message } from 'antd';
import moment from 'moment';

export function currencyFormat(num) {
    num = num > 0 ? parseFloat(num) : 0
    return '$' + num?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const getUser = async () => {
    const params = new URLSearchParams();
    params.append('db_user', process.env.React_App_DB_USER);
    params.append('db_password', process.env.React_App_DB_PASSWORD);
    params.append('db', process.env.React_App_DB);

    return await axios.post(
        `${process.env.React_App_URL}/get/getUser.php`, params
    )
        .then(async function (response) {

            if (await response?.data !== 'Cannot select' && await response?.data !== 'notuser') {
                // console.log(response?.data)
                return response?.data;
            } else {
                openErrorNotification({ title: 'Failed', message: response.data })
                return [];
            }
        });
}

export const Add_New_User = async (user) => {
    const params = new URLSearchParams();
    params.append('db_user', process.env.React_App_DB_USER);
    params.append('db_password', process.env.React_App_DB_PASSWORD);
    params.append('db', process.env.React_App_DB);

    params.append('data', JSON.stringify({
        username: user.username,
        password: user.password,
        role: user.role,
        lastName: user.lastName,
        firstName: user.firstName
    }));

    return await axios.post(
        `${process.env.React_App_URL}/create/createUser.php`, params
    )
        .then(async function (response) {
            if (response?.data === "success") {
                message.success('បង្កើតអ្នកប្រើប្រាស់ជោគជ័យ!!!')
                return true
            } else if (response?.data === "usernameExisted") {
                message.error(` អ្នកប្រើប្រាស់ ${user.username} បានបង្កើតរួចរាល់ម្ដង់ហើយ!!`)
                return false
            } else {
                message.error('បង្កើតអ្នកប្រើប្រាស់មានបញ្ហា!!')
                return false
            }
        });
}


export const Update_User = async (users, u_id) => {
    const params = new URLSearchParams();
    params.append('db_user', process.env.React_App_DB_USER);
    params.append('db_password', process.env.React_App_DB_PASSWORD);
    params.append('db', process.env.React_App_DB);

    params.append('data', JSON.stringify({
        username: users.username,
        role: users.role,
        lastName: users.lastName,
        firstName: users.firstName,
        status: true,
        u_id
    }));

    return await axios.post(
        `${process.env.React_App_URL}/update/updateUserById.php`, params
    )
        .then(async function (response) {
            if (response?.data === "success") {
                message.success('ធ្វើបច្ចុប្បន្នភាពរួចរាល់!!')
                return true
            } else {
                message.error('ធ្វើបច្ចុប្បន្នភាពមានបញ្ហា!!')
                return false
            }
        });
}

export const Reset_Password = async (data) => {
    const params = new URLSearchParams();
    params.append('db_user', process.env.React_App_DB_USER);
    params.append('db_password', process.env.React_App_DB_PASSWORD);
    params.append('db', process.env.React_App_DB);

    params.append('data', JSON.stringify(data));

    return await axios.post(
        `${process.env.React_App_URL}/update/resetPasswordById.php`, params
    )
        .then(async function (response) {
            if (response?.data === "success") {
                message.success('កែប្រែជោគជ័យ!!')
                return true
            } else {
                message.error('កែប្រែមានបញ្ហា!!')
                return false
            }
        });
}

export const Create_Request = async (requests, createdBy) => {
    const params = new URLSearchParams();
    params.append('db_user', process.env.React_App_DB_USER);
    params.append('db_password', process.env.React_App_DB_PASSWORD);
    params.append('db', process.env.React_App_DB);

    params.append('data', JSON.stringify({
        constructionId: requests.constructionId,
        date: requests.date.format('YYYY-MM-DD'),
        needDate: requests.needDate.format('YYYY-MM-DD'),
        requestTo: requests.requestTo,
        purpose: requests.purpose,
        requests: requests.requests,
        createdBy
    }));

    return await axios.post(
        `${process.env.React_App_URL}/create/createRequest.php`, params
    )
        .then(async function (response) {
            if (response?.data === "success") {
                message.success('ស្នើសុំជោជ័យ!!')
                return true;
            } else {
                message.error('ស្នើសុំមានបញ្ហា!!')
                return false;
            }
        });
}

export const update_Request = async (
    values, r_id

) => {

    const params = new URLSearchParams();
    params.append('db_user', process.env.React_App_DB_USER);
    params.append('db_password', process.env.React_App_DB_PASSWORD);
    params.append('db', process.env.React_App_DB);

    params.append('data', JSON.stringify({
        r_id,
        constructionId: values?.constructionId,
        date: moment(values?.date)?.format('YYYY-MM-DD'),
        needDate: moment(values?.needDate)?.format('YYYY-MM-DD'),
        // createdBy: values?.createdBy,
        requestTo: values?.requestTo,
        purpose: values?.purpose,
        requests: values?.requests
    }));

    return await axios.post(
        `${process.env.React_App_URL}/update/updateRequestById.php`, params
    )
        .then(async function (response) {
            console.log(response?.data)
            if (response?.data?.trim() === "success") {
                message.success('កែប្រែស្នើសុំជោជ័យ!!')
                return true
            } else {
                message.error('កែប្រែស្នើសុំមានបញ្ហា!!')
                return false
            }
        });
}

export const Creat_Construction = async (
    constructionName,
    customerId,
    customerName,
    customerNumber,
    c_address,
    constructingType,
    countFloor,
    startDate,
    endDate,
    c_remark,
    c_status
) => {
    const params = new URLSearchParams();
    params.append('db_user', process.env.React_App_DB_USER);
    params.append('db_password', process.env.React_App_DB_PASSWORD);
    params.append('db', process.env.React_App_DB);

    params.append('data', JSON.stringify({
        constructionName,
        customerId,
        customerName,
        customerNumber,
        c_address,
        constructingType,
        countFloor,
        startDate,
        endDate,
        c_remark,
        c_status
    }));

    return await axios.post(
        `${process.env.React_App_URL}/create/createConstruction.php`, params
    )
        .then(async function (response) {
            console.log(response?.data)

        });
}

export const Creat_Customer = async (
    customer

    // customerId
) => {
    const params = new URLSearchParams();
    params.append('db_user', process.env.React_App_DB_USER);
    params.append('db_password', process.env.React_App_DB_PASSWORD);
    params.append('db', process.env.React_App_DB);

    params.append('data', JSON.stringify({
        constructionName: customer?.constructionName,
        customerName: customer?.customerName,
        tel: customer?.tel,
        gender: customer?.gender,
        maritalStatus: customer?.maritalStatus,
        partnerName: customer?.partnerName,
        partnerGender: customer?.partnerGender,
        taskType: customer?.taskType,
        constructionType: customer?.constructionType,
        constructionLocation: customer?.constructionLocation,
        countFloor: customer?.countFloor,
        mapLink: customer?.mapLink,
        priority: customer?.priority,
        showInDashboard: customer?.showInDashboard,
        startDate: customer?.startDate?.format('YYYY-MM-DD'),
        endDate: customer?.endDate?.format('YYYY-MM-DD'),
        remark: customer?.remark,
        landNumber: customer?.landNumber,
        landOfficerName: customer?.landOfficerName,
        idCardSet: customer?.idCardSet,
        landCardSet: customer?.landCardSet,
        footMeterSet: customer?.footMeterSet,
        idCardPlowerSet: customer?.idCardPlowerSet,
        familyBookSet: customer?.familyBookSet,
        idCardNextBorderSet: customer?.idCardNextBorderSet,
        certificateCompanySet: customer?.certificateCompanySet

    }));

    return await axios.post(
        `${process.env.React_App_URL}/create/createCustomer.php`, params
    )
        .then(async function (response) {
            console.log(response?.data)
            if (response?.data === "success") {
                // message.success('បង្កើតជោជ័យ!!')
                return true
            } else {
                // message.error('បង្កើតមានបញ្ហា!!')
                return false
            }
        });
}

export const Update_Customer = async (
    customer,
    c_id,

) => {
    // console.log(customer);
    const params = new URLSearchParams();
    params.append('db_user', process.env.React_App_DB_USER);
    params.append('db_password', process.env.React_App_DB_PASSWORD);
    params.append('db', process.env.React_App_DB);

    params.append('data', JSON.stringify({
        constructionName: customer?.constructionName,
        customerName: customer?.customerName,
        tel: customer?.tel,
        gender: customer?.gender,
        maritalStatus: customer?.maritalStatus,
        partnerName: customer?.partnerName,
        partnerGender: customer?.partnerGender,
        taskType: customer?.taskType,
        constructionType: customer?.constructionType,
        constructionLocation: customer?.constructionLocation,
        countFloor: customer?.countFloor,
        mapLink: customer?.mapLink,
        priority: customer?.priority,
        showInDashboard: customer?.showInDashboard,
        startDate: customer?.startDate?.format('YYYY-MM-DD'),
        endDate: customer?.endDate?.format('YYYY-MM-DD'),
        remark: customer?.remark,
        landNumber: customer?.landNumber,
        landOfficerName: customer?.landOfficerName,
        idCardSet: customer?.idCardSet,
        landCardSet: customer?.landCardSet,
        footMeterSet: customer?.footMeterSet,
        idCardPlowerSet: customer?.idCardPlowerSet,
        familyBookSet: customer?.familyBookSet,
        idCardNextBorderSet: customer?.idCardNextBorderSet,
        certificateCompanySet: customer?.certificateCompanySet,
        c_id
    }));



    return await axios.post(
        `${process.env.React_App_URL}/update/updateCustomerById.php`, params
    )
        .then(async function (response) {
            console.log(response?.data)
            if (response?.data === "success") {
                return true
            } else {
                return false
            }
        });
}

export const Creat_PettyCash = async (pettyCash,lendedBy,) => {
    const params = new URLSearchParams();
    params.append('db_user', process.env.React_App_DB_USER);
    params.append('db_password', process.env.React_App_DB_PASSWORD);
    params.append('db', process.env.React_App_DB);

    params.append('data', JSON.stringify({
        date: pettyCash?.date.format('YYYY-MM-DD'),
        borrowPerson: pettyCash?.borrowPerson,
        remark: pettyCash?.remark,
        lendedBy,
        totalCash: pettyCash?.totalCash,
        totalCashKh: pettyCash?.totalCashKh,
    }));

    return await axios.post(
        `${process.env.React_App_URL}/create/createPrettyCash.php`, params
    )
        .then(async function (response) {
            if (response?.data === "success") {
                message.success('បង្កើត Petty Cash ជោជ័យ!!')
                return true
            } else {
                message.error('បង្កើត Petty Cash មានបញ្ហា!!')
                return false
            }
        });
}

export const Update_PettyCash = async (
    pettyCash,
    pc_id
) => {
    const params = new URLSearchParams();
    params.append('db_user', process.env.React_App_DB_USER);
    params.append('db_password', process.env.React_App_DB_PASSWORD);
    params.append('db', process.env.React_App_DB);

    params.append('data', JSON.stringify({
        pc_id,
        date: pettyCash?.date?.format('YYYY-MM-DD'),
        borrowPerson: pettyCash?.borrowPerson,
        remark: pettyCash?.remark,
        totalCash: pettyCash?.totalCash,
        totalCashKh: pettyCash?.totalCashKh,
        paidDate: pettyCash?.paidDate,
        status: pettyCash?.status,
    }));

    return await axios.post(
        `${process.env.React_App_URL}/update/updatePrettyCashById.php`, params
    )
        .then(async function (response) {
            if (response?.data === "success") {
                message.success('Update Petty Cash សុំជោជ័យ!!')
                return true
            } else {
                message.error('Update Petty Cash សុំមានបញ្ហា!!')
                return false
            }
        });
}