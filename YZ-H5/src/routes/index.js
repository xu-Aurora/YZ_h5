import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import PropTypes from 'prop-types';
import MemberManage from '../components/memberManage'; //无等级会员
import MemberDetail from '../components/memberManage/detail'; //会员礼包详情
import MemberCenter from '../components/memberManage/center'; //会员中心
import MemberBuy from '../components/memberManage/buy'; //会员购买
import MyCollect from '../components/myCollect/index'; //我的收藏
import MyOrder from '../components/myOrder/index'; //完成完成订单详情
import AwaitDelivery from '../components/orderDetail/awaitDelivery/index'; //待配送详情,
import AwaitPay from '../components/orderDetail/awaitPay/index'; //待付款订单详情
import Deliverying from '../components/orderDetail/deliverying/index'; //配送中->自取
import Complete from '../components/orderDetail/complete/index'; //交易完成
// import Refund from '../components/orderDetail/refund/index'; //申请退款
import FoodCoupon from '../components/foodCoupon'; //粮票
import ApplyRefund from '../components/orderDetail/applyRefund/index'; //申请退款
import RefundDetail from '../components/orderDetail/refundDetail/index'; //退款详情
import Evaluate from '../components/orderDetail/evaluate/index'; //评价
import EvaluateDetail from '../components/orderDetail/evaluate/detail'; //评价

import ServerDetail from '../components/serverDetail/index'; //服务 -> 订单详情

import Protocol from '../components/protocol/index'; //协议
import BuyAgreement from '../components/buyAgreement/index'; //粮票购买协议
import HelpCenter from '../components/helpCenter/index'; //帮助中心

import HouseProperty from '../components/houseProperty'; //房产


function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={FoodCoupon} />
        <Route path="/memberManage" exact component={MemberManage}/>
        <Route path="/memberDetail" exact component={MemberDetail}/>
        <Route path="/memberCenter" exact component={MemberCenter}/>
        <Route path="/memberBuy" exact component={MemberBuy} />
        <Route path="/foodCoupon" exact component={FoodCoupon} />

        <Route path="/myCollect" exact component={MyCollect} />
        <Route path="/myOrder" exact component={MyOrder} />
        <Route path="/awaitDelivery/:orderNo?" exact component={AwaitDelivery} />
        <Route path="/awaitPay/:orderNo?" exact component={AwaitPay} />
        <Route path="/deliverying/:orderNo?" exact component={Deliverying} />
        <Route path="/complete/:orderNo?" exact component={Complete} />
        <Route path="/applyRefund/:orderNo/:skuId/:id/:status?" exact component={ApplyRefund} />
        <Route path="/refundDetail/:orderNo?" exact component={RefundDetail} />
        <Route path="/evaluate/:orderNo?" exact component={Evaluate} />
        <Route path="/evaluateDetail/:orderNo" exact component={EvaluateDetail} />

        <Route path="/serverDetail/:orderNo" exact component={ServerDetail} />

        <Route path="/protocol" exact component={Protocol} />
        <Route path="/buyAgreement" exact component={BuyAgreement} />
        <Route path="/helpCenter" exact component={HelpCenter} />
        <Route path="/houseProperty" exact component={HouseProperty} />

      </Switch>
    </Router>
  );
}

RouterConfig.propTypes = {
  history: PropTypes.any // eslint-disable-line
};

export default RouterConfig;

