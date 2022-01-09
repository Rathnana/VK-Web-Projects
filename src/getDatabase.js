import axios from 'axios'
import { openErrorNotification } from './own-comp'

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

export const Add_New_User = async (username, password, role) => {
    const params = new URLSearchParams();
    params.append('db_user', process.env.React_App_DB_USER);
    params.append('db_password', process.env.React_App_DB_PASSWORD);
    params.append('db', process.env.React_App_DB);

    params.append('data', JSON.stringify({ username, password, role }));

    return await axios.post(
        `${process.env.React_App_URL}/create/createUser.php`, params
    )
        .then(async function (response) {
            console.log(response?.data)

        });
}


export const Update_User = async (username, role, u_id) => {
    const params = new URLSearchParams();
    params.append('db_user', process.env.React_App_DB_USER);
    params.append('db_password', process.env.React_App_DB_PASSWORD);
    params.append('db', process.env.React_App_DB);

    params.append('data', JSON.stringify({ username, role, status: true, u_id }));

    return await axios.post(
        `${process.env.React_App_URL}/update/updateUserById.php`, params
    )
        .then(async function (response) {
            console.log(response?.data)

        });
}

export const Create_Request = async (requestFor, constructionId, date, needDate, r_status) => {
    const params = new URLSearchParams();
    params.append('db_user', process.env.React_App_DB_USER);
    params.append('db_password', process.env.React_App_DB_PASSWORD);
    params.append('db', process.env.React_App_DB);

    params.append('data', JSON.stringify({
        requestFor,
        constructionId,
        date,
        needDate,
        r_status,

    }));

    return await axios.post(
        `${process.env.React_App_URL}/create/createRequest.php`, params
    )
        .then(async function (response) {
            console.log(response?.data)

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
    constructionName,
    customerName,
    tel,
    gender,
    maritalStatus,
    partnerName,
    partnerGender,
    taskType,
    constructionType,
    constructionLocation,
    countFloor,
    mapLink,
    priority,
    showInDashboard,
    startDate,
    endDate,
    remark,
    // customerId
) => {
    const params = new URLSearchParams();
    params.append('db_user', process.env.React_App_DB_USER);
    params.append('db_password', process.env.React_App_DB_PASSWORD);
    params.append('db', process.env.React_App_DB);

    params.append('data', JSON.stringify({
        constructionName,
        customerName,
        tel,
        gender,
        maritalStatus,
        partnerName,
        partnerGender,
        taskType,
        constructionType,
        constructionLocation,
        countFloor,
        mapLink,
        priority,
        showInDashboard,
        startDate,
        endDate,
        remark,
        // customerId
    }));

    return await axios.post(
        `${process.env.React_App_URL}/create/createCustomer.php`, params
    )
        .then(async function (response) {
            console.log(response?.data)

        });
}

export const Update_Customer = async (
    id,
    constructionName,
    customerName,
    tel,
    gender,
    maritalStatus,
    partnerName,
    partnerGender,
    taskType,
    constructionType,
    constructionLocation,
    countFloor,
    mapLink,
    priority,
    showInDashboard,
    startDate,
    endDate,
    remark,) => {
    const params = new URLSearchParams();
    params.append('db_user', process.env.React_App_DB_USER);
    params.append('db_password', process.env.React_App_DB_PASSWORD);
    params.append('db', process.env.React_App_DB);

    params.append('data', JSON.stringify({
        id,
        constructionName,
        customerName,
        tel,
        gender,
        maritalStatus,
        partnerName,
        partnerGender,
        taskType,
        constructionType,
        constructionLocation,
        countFloor,
        mapLink,
        priority,
        showInDashboard,
        startDate,
        endDate,
        remark,
    }));

    return await axios.post(
        `${process.env.React_App_URL}/update/updateCustomerById.php`, params
    )
        .then(async function (response) {
            console.log(response?.data)

        });
}