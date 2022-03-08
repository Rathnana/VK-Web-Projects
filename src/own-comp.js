
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