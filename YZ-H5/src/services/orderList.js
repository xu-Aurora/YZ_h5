import {post} from '../utils/xFetch';
import {upload} from '../utils/upLoad';
import {host} from './host';

const API = {
  queryList: `${host}/mall/order/list`, //订单列表
  confirmReceipt: `${host}/mall/order/mng/confirmReceipt`, //确认收货
  deleteOrder: `${host}/mall/order/mng/deleteOrder`, //删除订单
  closeOrder: `${host}/mall/order/mng/closingOrder`, //关闭订单
  evaluate: `${host}/mall/order/mng/evaluate`, //订单评价
  evaluateDetail: `${host}/mall/order/mng/orderEvaluationDetails`, //评价详情
  detailApp: `${host}/mall/order/detail`, //订单详情
  refundGood: `${host}/mall/order/mng/refundGood`, //申请退货
  refundDetailsApp: `${host}/mall/order/mng/refundDetails`, //退货订单详情
  // upLoadRKey: `/mall/upload/upLoadRKey` //上传图片
  upLoadRKey: `${host}/common/upload/upLoad`, //上传图片

  orderNoPay: `${host}/mall/order/mng/getPayInfoByOrderNo`, //订单支付

  orderRefundDetails: `${host}/mall/order/mng/orderRefundDetails`, //订单商品退货详情
  orderCancelRefund: `${host}/mall/order/mng/orderCancelRefund`, //取消退货
  haveEvaluate: `${host}/mall/order/mng/getGoodEvaluationByOrderNo`, //已评价

}

export const queryList = async(params) => post(API.queryList, params);
export const confirmReceipt = async(params) => post(API.confirmReceipt, params);
export const deleteOrder = async(params) => post(API.deleteOrder, params);
export const closeOrder = async(params) => post(API.closeOrder, params);
export const evaluate = async(params) => post(API.evaluate, params);
export const evaluateDetail = async(params) => post(API.evaluateDetail, params);
export const detailApp = async(params) => post(API.detailApp, params);
export const refundGood = async(params) => post(API.refundGood, params);
export const refundDetailsApp = async(params) => post(API.refundDetailsApp, params);
export const orderNoPay = async(params) => post(API.orderNoPay, params);

export const upLoadRKey = async(params) => upload(API.upLoadRKey, params);
export const orderRefundDetails = async(params) => post(API.orderRefundDetails, params);
export const orderCancelRefund = async(params) => post(API.orderCancelRefund, params);
export const haveEvaluate = async(params) => post(API.haveEvaluate, params);
