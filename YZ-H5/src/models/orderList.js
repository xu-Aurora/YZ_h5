import services from '../services';
export default {
    namespace: 'orderList',

    state: {
    },
  
    effects: {
      * queryList ({ payload: {params, func}}, {call, put}) { //查询订单
         
        if(JSON.stringify(params) != undefined) {
          if(params.status == ''){
            delete params.status
          }

          const { jsonResult } = yield call(services.orderList.queryList, params);
          yield put({
              type: 'serchSuccess',
              payload: {
                listData: jsonResult.data
              }
          });
          if(typeof func == 'function') {
            func()
          }
        }


      },
      * detailApp ({ payload: params}, {call, put}) { //订单详情
        const { jsonResult } = yield call(services.orderList.detailApp, params);
        yield put({
            type: 'serchSuccess',
            payload: {
              detailData: jsonResult.data
            }
        });
      },
      * evaluateDetail1 ({ payload: { params,func }}, {call, put}) {
        const { jsonResult } = yield call(services.orderList.evaluateDetail, params);
        yield put({
            type: 'serchSuccess',
            payload: {
              evaluateData1: jsonResult.data
            }
        });
        if (typeof func === 'function') {
          func();
        }
      },
      * evaluateDetail ({ payload: params}, {call, put}) { //评价详情
        const { jsonResult } = yield call(services.orderList.evaluateDetail, params);
        yield put({
            type: 'serchSuccess',
            payload: {
              evaluateData: jsonResult.data
            }
        });
      },
      * haveEvaluate ({ payload: {params, func}}, {call, put}) { //评价详情
        const { jsonResult } = yield call(services.orderList.haveEvaluate, params);
        yield put({
            type: 'serchSuccess',
            payload: {
              evaluateInfo: jsonResult.data
            }
        });
        if(typeof func == 'function') {
          func()
        }
      },
      * refundDetailsApp ({ payload: params}, {call, put}) { //退货详情
        const { jsonResult } = yield call(services.orderList.refundDetailsApp, params);
        yield put({
            type: 'serchSuccess',
            payload: {
              refundDetailData: jsonResult.data
            }
        });
      },   
      * orderNoPay ({ payload: {  params, func } }, { call, put }) { //订单支付
        const { jsonResult } = yield call(services.orderList.orderNoPay, params);
        yield put({
          type: 'serchSuccess',
          payload: {
            orderNoPayData: jsonResult.data
          }
        });
        if (typeof func === 'function') {
          func();
        }
      },
      * upLoadRKey ({ payload: {  params, func } }, { call, put }) { //上传
        const jsonResult  = yield call(services.orderList.upLoadRKey, params);
        yield put({
          type: 'serchSuccess',
          payload: {
            imgInfo: jsonResult.data
          }
        });
        if (typeof func === 'function') {
          func();
        }
      },
      * orderRefundDetails ({ payload: params}, {call, put}) { //订单商品退货详情
        const { jsonResult } = yield call(services.orderList.orderRefundDetails, params);
        yield put({
            type: 'serchSuccess',
            payload: {
              orderRefundDatas: jsonResult.data
            }
        });
      },
      * evaluate ({ payload: {  params, func } }, { call }) { //订单评价
        yield call(services.orderList.evaluate, params);
        if (typeof func === 'function') {
          func();
        }
      },
      * confirmReceipt ({ payload: {  params, func } }, { call }) { //确认收货
        yield call(services.orderList.confirmReceipt, params);
        if (typeof func === 'function') {
          func();
        }
      },
      * orderCancelRefund ({ payload: {  params, func } }, { call }) {  //取消退货
        yield call(services.orderList.orderCancelRefund, params);
        if (typeof func === 'function') {
          func();
        }
      },
      * refundGood ({ payload: {  params, func } }, { call }) {  //申请退货
        yield call(services.orderList.refundGood, params);
        if (typeof func === 'function') {
          func();
        }
      },
      * deleteOrder ({ payload: {  params, func } }, { call }) {  //删除订单
        yield call(services.orderList.deleteOrder, params);
        if (typeof func === 'function') {
          func();
        }
      },
      * closeOrder ({ payload: {  params, func } }, { call }) {  //关闭订单
        yield call(services.orderList.closeOrder, params);
        if (typeof func === 'function') {
          func();
        }
      },
      * save({ payload: params }, { put }) {
        yield put({
          type: 'serchSuccess',
          payload: {
            saveSeslect: params
          }
        });
      },
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
  