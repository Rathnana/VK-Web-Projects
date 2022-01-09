
import {  notification} from 'antd';
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