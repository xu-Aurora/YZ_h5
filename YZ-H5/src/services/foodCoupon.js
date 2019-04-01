import {post} from '../utils/xFetch';
import {host} from './host';

const API = {
    GET_LIST: `${host}/cif/member/ticketDetail` //卡券详情
}

export const getList = async(params) => post(API.GET_LIST, params);

