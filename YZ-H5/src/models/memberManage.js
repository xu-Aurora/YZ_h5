import services from '../services';
export default {
    namespace: 'memberManage',

    state: {},
  
    effects: {
      * memberHome({ payload: params}, {call, put}){
        const {jsonResult} = yield call(services.memberManage.memberHome, params);
        yield put({
            type: 'serchSuccess',
            payload: {
              memberInfo: jsonResult.data
            }
        });
      },
      * memberPurchase({ payload: {params,func}}, {call, put}){
        const {jsonResult} = yield call(services.memberManage.memberPurchase, params);
        yield put({
            type: 'serchSuccess',
            payload: {
              memberPurchaseInfo: jsonResult.data
            }
        });
        if(typeof func == 'function') {
          func()
        }
      },
      * packagePurchase({ payload: {params,func}}, {call, put}){
        const {jsonResult} = yield call(services.memberManage.packagePurchase, params);
        yield put({
            type: 'serchSuccess',
            payload: {
              packagePurchaseInfo: jsonResult.data
            }
        });
        if(typeof func == 'function') {
          func()
        }
      },
      * createOrder({ payload: {params,func}}, {call, put}){
        const {jsonResult} = yield call(services.memberManage.createOrder, params);
        yield put({
            type: 'serchSuccess',
            payload: {
              orderInfo: jsonResult.data
            }
        });
        if(typeof func == 'function') {
          func()
        }
      },
      * couponDetail({ payload: {params,func}}, {call, put}){
        const {jsonResult} = yield call(services.memberManage.couponDetail, params);
        yield put({
            type: 'serchSuccess',
            payload: {
              couponInfo: jsonResult.data
            }
        });
        if(typeof func == 'function') {
          func()
        }
      }
    },
  
    reducers: {
      serchSuccess(state, {payload}) {
        return {
            ...state,
            ...payload
        };
      }
    }
  
  };
  