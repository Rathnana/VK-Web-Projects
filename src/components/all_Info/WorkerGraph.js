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
import KhmerOSSiemreap from '../../assets/fonts/KHMEROSSIEMREAP.TTF'

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
            labels: {
                font: {
                    size: 15,
                    family: KhmerOSSiemreap
                }
            }
        },
        title: {
            display: true,
            text: 'ចំនួនកម្មករប្រចាំថ្ងៃ',
            font:{
                size:15,
                family: KhmerOSSiemreap
            }

        },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                min: 0,
                maxTicksLimit: 5,
                font: {
                    family: "Khmer OS Siemreap"
                }
            }
        },
        x: {
            beginAtZero: true,
            ticks: {
                min: 0,
                // maxTicksLimit: 7
                font: {
                    family: "Khmer OS Siemreap"
                }
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
    let res = array?.reduce((ac, a) => {
        let ind = ac.findIndex(x => x.createdAt === a.createdAt);
        ind === -1 ? ac.push(a) : ac[ind].workerCount += a.workerCount;
        return ac;
    }, [])

    return res
}

const combineFemaleWorkerCount = (array) => {
    let res = array?.reduce((ac, a) => {
        let ind = ac.findIndex(x => x.createdAt === a.createdAt);
        ind === -1 ? ac.push(a) : ac[ind].femaleWorkerCount += a.femaleWorkerCount;
        return ac;
    }, [])

    return res
}

const combinePainterCount = (array) => {
    let res = array?.reduce((ac, a) => {
        let ind = ac.findIndex(x => x.createdAt === a.createdAt);
        ind === -1 ? ac.push(a) : ac[ind].painterCount += a.painterCount;
        return ac;
    }, [])

    return res
}


const combineBuilderCount = (array) => {

    let res = array?.reduce((ac, a) => {
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

                let combinedFemaleWorkerArray = combineFemaleWorkerCount(data?.data)
                let combinedPainterArray = combinePainterCount(data?.data)

                let daysInMonth = getDaysInMonthUTC(new Date().getUTCMonth(), new Date().getUTCFullYear());
                
                let newArr=[]
                daysInMonth?.map(day=>{
                    let set = {createdAt:day}

                    combinedWorkerArray?.map(e =>{
                        if(e?.createdAt===day?.toString()){
                            set = {...set, workerCount:e?.workerCount}
                        }
                    })

                    combinedBuilderArray?.map(e =>{
                        if(e?.createdAt===day?.toString()){
                            set = {...set, builderCount:e?.builderCount}
                        }
                    })

                    // combinedFemaleWorkerArray?.map(e =>{
                    //     if(e?.createdAt===day?.toString()){
                    //         set = {...set, femaleWorkerCount:e?.femaleWorkerCount}
                    //     }
                    // })

                    // combinedPainterArray?.map(e =>{
                    //     if(e?.createdAt===day?.toString()){
                    //         set = {...set, painterCount:e?.painterCount}
                    //     }
                    // })

                    if(!set?.workerCount && !set?.builderCount && !set?.femaleWorkerCount && !set?.painterCount){
                        let today = new Date().getUTCDate()
                        let setCount = parseInt(set?.createdAt) <= today ? 0 : null
                        set = {...set, builderCount:setCount,workerCount:setCount, painterCount:setCount,femaleWorkerCount:setCount}
                    }
                    newArr.push(set)
                })

                setGraph(newArr)

                // setWorkerCount(combinedWorkerArray?.map(e => e.workerCount))
                // setbuilderCount(combinedBuilderArray?.map(e => e.builderCount))
            }
        }
        getData()

    }, [])

    let data = {
        labels: graph?.map(e=> "ថ្ងៃទី"+e?.createdAt),
        // labels: getDaysInMonthUTC(new Date().getUTCMonth(), new Date().getUTCFullYear()),
        datasets: [
            {
                label: 'ចំនួនជាង',
                data: graph?.map(e=> e?.builderCount),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                tension: 0.6,
            },
            {
                label: 'ចំនួនកម្មករ',
                data: graph?.map(e=> e?.workerCount),
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
            
            
        ],
    };

    return <Col  xs={24} sm={24} md={24} lg={24} xl={24}>
        <Line options={options} data={data} />
    </Col>
}
