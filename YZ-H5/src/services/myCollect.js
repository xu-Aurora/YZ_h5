import {post} from '../utils/xFetch';
import {host} from './host';

const API = {
    GET_FAVORITES: `${host}/mall/app/favorites/queryFavoritesList`, // 收藏列表
    DEL_FAVORITES: `${host}/mall/app/favorites/delFavorites`, //收藏删除

}

export const getFavorites = async(params) => post(API.GET_FAVORITES, params);
export const delFavorites = async(params) => post(API.DEL_FAVORITES, params);

