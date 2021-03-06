
import { Button, notification } from 'antd';
import imageCompression from 'browser-image-compression';

export const openSuccessNotification = (data) => {
    notification.success({
        message: `${data.title}`,
        description: data.message
    });
};

export const openErrorNotification = (data) => {
    notification.error({
        message: `${data.title}`,
        description: data.message
    });
};

export const openWarningNotification = (data) => {
    notification.warning({
        message: ` ${data.title}`,
        description: data.message
    });
};

export function UploadController({ children, value, onChange, disabled, accept, name }) {
    return (
        <Button type='dashed' style={{ width: '100%',padding:0}}>
        <label htmlFor={name} style={{width:'100%'}}>
            <input
                value={value}
                accept={accept}
                disabled={disabled}
                style={{ display: 'none', width:'100%'}}
                id={name}
                multiple
                type="file"
                onChange={onChange}
            />
            
                <div style={{ width:'100%'}}>{children}</div>
            
        </label>
        </Button>
    )
}

export const compressImage = async (file)=>{

    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    }

    const compressedFile = await imageCompression(file, options)

    let newFile = new File([compressedFile], `${file?.name?.split('.')[0]}.png`, { type: 'image/png' });

    return newFile

}

export const getTotalBuilder = (team)=>{
    let total = 0
    team?.map(e=>{
        total+= parseInt(e?.builderCount)
    })

    return total
}

export const getTotalWorker = (team)=>{
    let total = 0
    team?.map(e=>{
        total+= parseInt(e?.workerCount)
    })

    return total
}

export const convertUSDtoKHR=(e)=>{
    let cash = parseFloat(e) * 4000
    return cash
}

export const convertKHRtoUSD=(e)=>{
    let cash = parseFloat(e) / 4000
    return cash
}

export function currencyFormatKHR(num) {
    num = num > 0 ? parseFloat(num) : 0
    return <span>{num?.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}&#6107;</span>
}

export const checkStatus = (status) => {
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
            day = 45;
            break;
        case "ធ្វើជណ្តើរ":
            day = 50;
            break;
        case "បូកនិងសី":
            day = 55;
            break;
        case "ធ្វើដំបូល":
            day = 60;
            break;
        case "ដាក់ទ្វា":
            day = 65;
            break;
        case "ដាក់បង្អួច":
            day = 70;
            break;
        case "ក្រាលការ៉ូ":
            day = 75;
            break;
        case "បំពាក់គ្រឿងបន្ទប់ទឹក ":
            day = 80;
            break;
        case "ចាប់ជ្រីនិងចាប់ជ្រុង":
            day = 85;
            break;
        case "បៀកថ្នាំ":
            day = 90;
            break;
        case "រុញថ្នាំ":
            day = 95;
            break;
        case "បៀករ៉ង់និងសម្អាត":
            day = 100;
            break;
        case "បំពាក់អំពូល":
            day = 100;
            break;
        case "សម្អាត":
            day = 100;
            break;
        case "កែលំអរចំនុចខ្វះខាត":
            day = 100;
            break;
        case "រួចរាល់":
            day = 100;
            break;
    }

    return day
}