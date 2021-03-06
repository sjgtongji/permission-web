import request from '@/utils/request';
import {LOGIN} from '@/utils/constant'
export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function login(params){
	return request(LOGIN,{
		method: 'POST',
		data: params,
	})
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
