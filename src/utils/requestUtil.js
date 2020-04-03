import request from './request';
import { notification } from 'antd';
const requestUtil = (url , params) => {
	return new Promise((resolve , reject) => {
		request(url,params)
		.then(response => {
			console.log(url , params , response)
			if(!response){
				notification.error({
		      description: '服务器连接异常',
		      message: '请求异常',
		    });
				reject(response)
			}else if(response.code && response.code === 200){
				resolve(response.data)
			}else{
				notification.error({
		      description: response.message,
		      message: '请求异常',
		    });
				resolve(response)
			}
		});
	})
}

export default requestUtil;
