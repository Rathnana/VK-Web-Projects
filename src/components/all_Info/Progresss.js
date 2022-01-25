import React, { useEffect, useState } from 'react'
import { Progress } from 'antd';


export default function Progresss({status}) {
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
                day = 10;
                break;
            case "ការងារទ្រួសត្រាយដី":
                day = 20;
                break;
            case "ការងារវាស់វែង":
                day = 30;
                break;
            case "រកកែងនៅទីតាំងផ្ទាល់ដី":
                day = 33;
                break;
            case "សំអាតដី":
                day = 36;
                break;
            case "បុកភ្ជើរ":
                day = 39;
                break;
            case "ជីកដីធ្វើគ្រឹះ":
                day = 40;
                break;
            case "លុបបំពេញរណ្តៅគ្រឹះ":
                day = 43;
                break;
            case "ធ្វើធ្នឹមបាតក្រោម":
                day = 46;
                break;
            case "ចាក់ដីលុបបំពេញផ្ទៃអគារ":
                day = 49;
                break;
            case "ធ្វើសសរ":
                day = 50;
                break;
            case "ធ្វើធ្នឹម":
                day = 53;
                break;
            case "បង្គប់ទីប":
                day = 56;
                break;
            case "ចាក់ប្លង់សេ":
                day = 59;
                break;
            case "រៀបឥដ្ឋ":
                day = 60;
                break;
            case "បង្គប់ហ្គែន":
                day = 63;
                break;
            case "ធ្វើជណ្តើរ":
                day = 66;
                break;
            case "បូកនិងសី":
                day = 69;
                break;
            case "ធ្វើដំបូល":
                day = 70;
                break;
            case "ដាក់ទ្វា":
                day = 73;
                break;
            case "ដាក់បង្អួច":
                day = 76;
                break;
            case "ក្រាលការ៉ូ":
                day = 79;
                break;
            case "បំពាក់គ្រឿងបន្ទប់ទឹក ":
                day = 80;
                break;
            case "ចាប់ជ្រីនិងចាប់ជ្រុង":
                day = 83;
                break;
            case "បៀកថ្នាំ":
                day = 86;
                break;
            case "រុញថ្នាំ":
                day = 89;
                break;
            case "បៀករ៉ង់និងសម្អាត":
                day = 90;
                break;
            case "បំពាក់អំពូល":
                day = 93;
                break;
            case "សម្អាត":
                day = 96;
                break;
            case "កែលំអរចំនុចខ្វះខាត":
                day = 99;
                break;
            case "រួចរាល់":
                day = 100;
                break;


        }
        setProgress(day)
    }
    return <Progress percent={progress} size="small" />;
}
