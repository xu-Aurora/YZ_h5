import {post} from '../utils/xFetch';
import {host} from './host';

const API = {
    memberHome: `${host}/cif/member/memberHome`, // 会员首页
    memberPurchase: `${host}/cif/member/memberPurchase`, //查询所有套餐
    packagePurchase: `${host}/cif/member/packagePurchase`, //套餐购买
    createOrder: `${host}/cif/member/order/createOrder`, //创建订单
    couponDetail: `${host}/cif/coupon/detail` //卡券详情
}

export const memberHome = async(params) => post(API.memberHome, params);
export const memberPurchase = async(params) => post(API.memberPurchase, params);
export const packagePurchase = async(params) => post(API.packagePurchase, params);

export const createOrder = async(params) => post(API.createOrder, params);
export const couponDetail = async(params) => post(API.couponDetail, params);
