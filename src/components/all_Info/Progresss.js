import React, { useEffect, useState } from 'react'
import { Progress } from 'antd';


export default function Progresss({status,type,width}) {
    const [progress, setProgress] = useState();
    
    useEffect(() => {
        CheckStatue(status)
    }, [])

    const CheckStatue = (status) => {
        let day;
        switch (status) {
            case "":
                day = 0;
                break;
            case "រុះរើសំណង់ចាស់":
                day = 1;
                break;
            case "ការងារទ្រួសត្រាយដី":
                day = 2;
                break;
            case "ការងារវាស់វែង":
                day = 3;
                break;
            case "រកកែងនៅទីតាំងផ្ទាល់ដី":
                day = 4;
                break;
            case "សំអាតដី":
                day = 5;
                break;
            case "បុកភ្ជើរ":
                day = 6;
                break;
            case "ជីកដីធ្វើគ្រឹះ":
                day = 10;
                break;
            case "លុបបំពេញរណ្តៅគ្រឹះ":
                day = 12;
                break;
            case "ធ្វើធ្នឹមបាតក្រោម":
                day = 15;
                break;
            case "ចាក់ដីលុបបំពេញផ្ទៃអគារ":
                day = 18;
                break;
            case "ធ្វើសសរ":
                day = 20;
                break;
            case "ធ្វើធ្នឹម":
                day = 25;
                break;
            case "បង្គប់ទីប":
                day = 30;
                break;
            case "ចាក់ប្លង់សេ":
                day = 35;
                break;
            case "រៀបឥដ្ឋ":
                day = 40;
                break;
            case "បង្គប់ហ្គែន":
                day = 42;
                break;
            case "ធ្វើជណ្តើរ":
                day = 45;
                break;
            case "បូកនិងសី":
                day = 50;
                break;
            case "ធ្វើដំបូល":
                day = 55;
                break;
            case "ដាក់ទ្វា":
                day = 60;
                break;
            case "ដាក់បង្អួច":
                day = 65;
                break;
            case "ក្រាលការ៉ូ":
                day = 70;
                break;
            case "បំពាក់គ្រឿងបន្ទប់ទឹក ":
                day = 72;
                break;
            case "ចាប់ជ្រីនិងចាប់ជ្រុង":
                day = 75;
                break;
            case "បៀកថ្នាំ":
                day = 80;
                break;
            case "រុញថ្នាំ":
                day = 85;
                break;
            case "បៀករ៉ង់និងសម្អាត":
                day = 88;
                break;
            case "បំពាក់អំពូល":
                day = 90;
                break;
            case "សម្អាត":
                day = 95;
                break;
            case "កែលំអរចំនុចខ្វះខាត":
                day = 97;
                break;
            case "រួចរាល់":
                day = 100;
                break;


        }
        setProgress(day)
    }

    if(type==='circle') return <Progress percent={progress} strokeColor='#33ab5f' type={type} width={60} strokeWidth={8}  strokeLinecap='square' size="large" />;

    return <Progress percent={progress} strokeColor='#33ab5f'  strokeLinecap='square' size="large" />;
}
