import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
// import faker from 'faker';
import { Col } from 'antd';
import axios from 'axios';
import moment from 'moment';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display:true,
            position: 'top',
            fontFamily: 'Khmer OS Siemreap',
            fontSize:20
        },
        title: {
            display: true,
            text: 'ចំនួនកម្មករប្រចាំថ្ងៃ',
            fontFamily: 'Khmer OS Siemreap',
            fontSize:50

        },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                min: 0,
                maxTicksLimit: 5
            }
        },
        x: {
            beginAtZero: true,
            ticks: {
                min: 0,
                // maxTicksLimit: 7
            }
        }
    }
};


const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'
    , '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '27', '29', '30', '31'];

const getDailyWorkerGraph = async () => {
    const params = new URLSearchParams();
    params.append('db_user', process.env.React_App_DB_USER);
    params.append('db_password', process.env.React_App_DB_PASSWORD);
    params.append('db', 'wwvka_vkms', process.env.React_App_DB);

    // params.append('data', JSON.stringify({ date: moment(date).format('YYYY-MM-DD') }))

    return await axios.post(
        `${process.env.React_App_URL}/get/getDailyWorkerGraph.php`, params
    )
        .then(async function (response) {
            if (await response?.data !== 'Cannot select' && await response?.data !== 'notuser') {

                // setGraph(response?.data.data)
                // setLoading(false)
                return response?.data;
            } else {
                // setLoading(false)
                return [];
            }
        });
}

const combineWorkerCount = (array) => {

    let res = array.reduce((ac, a) => {
        let ind = ac.findIndex(x => x.createdAt === a.createdAt);
        ind === -1 ? ac.push(a) : ac[ind].workerCount += a.workerCount;
        return ac;
    }, [])

    return res
}

const combineBuilderCount = (array) => {

    let res = array.reduce((ac, a) => {
        let ind = ac.findIndex(x => x.createdAt === a.createdAt);
        ind === -1 ? ac.push(a) : ac[ind].builderCount += a.builderCount;
        return ac;
    }, [])

    return res
}

function getDaysInMonthUTC(month, year) {
    var date = new Date(Date.UTC(year, month, 1));
    var days = [];
    while (date.getUTCMonth() === month) {
      days.push(moment(new Date(date)).format('DD'));
      date.setUTCDate(date.getUTCDate() + 1);
    }



    return days;
}

console.log(getDaysInMonthUTC(new Date().getUTCMonth(), new Date().getUTCFullYear()))

export default function WorkerGraph() {

    const [graph, setGraph] = useState(null)

    const [monthLabel, setMonthLabel] = useState(null)
    const [workerCount, setWorkerCount] = useState(null)
    const [builderCount, setbuilderCount] = useState(null)

    useEffect(() => {
        const getData = async () => {
            let data = await getDailyWorkerGraph()

            if (data) {
                setGraph(data?.data)
                let combinedWorkerArray = combineWorkerCount(data?.data)
                let combinedBuilderArray = combineBuilderCount(data?.data)

                setMonthLabel(combinedWorkerArray?.map(e => e.createdAt))
                setWorkerCount(combinedWorkerArray?.map(e => e.workerCount))
                setbuilderCount(combinedBuilderArray?.map(e => e.builderCount))
            }
        }
        getData()

    }, [])

    let data = {
        labels: getDaysInMonthUTC(new Date().getUTCMonth(), new Date().getUTCFullYear()),
        datasets: [
            {
                label: 'ចំនួនកម្មករ',
                data: workerCount,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.6,
                // borderColor: "rgba(2,117,216,1)",
                // pointRadius: 5,
                // pointBackgroundColor: "rgba(2,117,216,1)",
                // pointBorderColor: "rgba(255,255,255,0.8)",
                // pointHoverRadius: 5,
                // pointHoverBackgroundColor: "rgba(2,117,216,1)",
                // pointHitRadius: 50,
                // pointBorderWidth: 2,

            },
            {
                label: 'ចំនួនជាង',
                data: builderCount,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                tension: 0.6,
            },
        ],
    };

    return <Col style={{ marginBottom: "200px" }} xs={24} sm={24} md={12} lg={12} xl={12}>
        <Line options={options} data={data} />
    </Col>
}
