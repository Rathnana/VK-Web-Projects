
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