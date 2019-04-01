import services from '../services';
export default {
    namespace: 'myCollect',

    state: {
        list: []
    },
  
    effects: {
      * getFavorites({ payload: params}, {call, put}){
        const {jsonResult} = yield call(services.myCollect.getFavorites, params);
        yield put({
            type: 'serchSuccess',
            payload: {
              list: jsonResult.data.list
            }
        });
      },
      * delFavorites({ payload: {params,func}}, {call, put}){
        const {jsonResult} = yield call(services.myCollect.delFavorites, params);
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
  
  }
  