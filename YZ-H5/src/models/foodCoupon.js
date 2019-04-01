import services from '../services';
export default {
    namespace: 'foodCoupon',

    state: {
        list: []
    },
  
    effects: {
      * getList({ payload: params}, {call, put}){
        const {jsonResult} = yield call(services.foodCoupon.getList, params);
        yield put({
            type: 'serchSuccess',
            payload: {
              list: jsonResult.data.list
            }
        });
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
  
  }
  