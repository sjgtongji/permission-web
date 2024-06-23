import { stringify } from 'querystring';
import { router, useModel} from 'umi';
import { fakeAccountLogin , login} from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
const Model = {
  namespace: 'login',
  state: {
    status: undefined,
    userId : '',
    token : ''
  },
  effects: {
    *login({ payload }, { call, put, select}) {
      const response = yield call(login, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully
			console.log(response)
      if (response && response.code === 200) {
        // const urlParams = new URL(window.location.href);
        // const params = getPageQuery();
        // let { redirect } = params;
				//
        // if (redirect) {
        //   const redirectUrlParams = new URL(redirect);
				//
        //   if (redirectUrlParams.origin === urlParams.origin) {
        //     redirect = redirect.substr(urlParams.origin.length);
				//
        //     if (redirect.match(/^\/.*#/)) {
        //       redirect = redirect.substr(redirect.indexOf('#') + 1);
        //     }
        //   } else {
        //     window.location.href = '/';
        //     return;
        //   }
        // }
        router.replace('/');
      }else{

			}
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/user/login' && !redirect) {
        router.replace({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      console.log(payload)
      return { ...state, status: 1, userId: payload.data.userId, token:payload.data.token };
    },
  },
};
export default Model;
