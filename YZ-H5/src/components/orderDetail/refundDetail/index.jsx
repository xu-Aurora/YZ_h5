import React, { Component } from 'react';
import { List,Modal,Toast} from 'antd-mobile';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import Moment from 'moment';
import style from './index.less';
import Countdown from 'react-countdown-now';  //倒计时
import Icon1 from '../../../assets/left_gray.png';

const alert = Modal.alert;
let urlParams;


const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return '';
  } else {
    return <span>{hours}小时{minutes}分钟{seconds}</span>;
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount(){
    urlParams = JSON.parse(localStorage.getItem('urlParams'));

    this.props.queryDetail({
      userId: urlParams ? urlParams.userId : '1',
      refundOrderNo: this.props.match.params.orderNo,
      apiName: 'mall.order.mng.refundDetails',
      merchantCode: '0001',
      token: urlParams ? urlParams.token : '8406278c-b935-4fe6-85ca-64efe67f3cc7'
    })
  }
  //联系客服,模态框
  showModal(servicePhone){
    alert('联系客服', '是否拨打客服电话?', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确认', onPress: () => {
        if(!!navigator.userAgent.match(/android/ig)) {
            goCall(servicePhone) 
          } else {
            window.location.href = `tel://${servicePhone}`
          }
        } 
      }
    ])
  }

  refundType(status){
    let text;
    if(status == '1'){
      text = '仅退款'
    }
    if(status == '2'){
      text = '退货退款'
    }
    return text;
  }
  refundReason(val) {
    let text;
    if(val == '1') {
      text = '退运费'
    }
    if(val == '2') {
      text = '收到商品破损'
    }
    if(val == '3') {
      text = '商品发错、漏发'
    }
    if(val == '4') {
      text = '商品需要维修'
    }
    if(val == '5') {
      text = '收到商品与描述不符'
    }
    if(val == '6') {
      text = '我不想要了'
    }
    if(val == '7') {
      text = '商品质量问题'
    }
    if(val == '8') {
      text = '未按约定时间发货'
    }
    if(val == '9') {
      text = '其他'
    }
    return text;
  }
  box(data){
    let text;
    if(data.refundState == '2'){
      text = 
      <div className={style.box}>
        <div className={style.left}><img src="./img/tj.png" alt=""/></div>{/* 退款中 */}
        <div className={style.right}>
          <p>你的退款申请已提交，等待商家同意</p>
          {/* <p>如商家在{ <Countdown date={ data.defaultAgreeRefundTime - Date.now() + Date.now()} renderer={renderer} /> }内未答复,系统将默认同意退款申请</p> */}
          <p>如商家在{ data.defaultAgreeRefundTimeStr }分内未答复,系统将默认同意退款申请</p>
          <p>{ Moment(data.titleTime).format('YYYY-MM-DD HH:mm:ss') }</p>
        </div>
      </div>
    }
    if(data.refundState == '3'){
      text = 
      <div className={style.box}>
        <div className={style.left}><img src="./img/ty.png" alt=""/></div>{/* 同意退款 */}
        <div className={style.right}>
          <p>您的退款申请已同意</p>
          <p>物业服务人员将上门取回退款商品,将提前电话联系,请注意接听</p>
          <p>{ Moment(data.titleTime).format('YYYY-MM-DD HH:mm:ss') }</p>
        </div>
      </div>
    }
    if(data.refundState == '4'){
      text = 
      <div className={style.box}>
        <div className={style.left}><img src="./img/xz.png" alt=""/></div>{/* 退款成功 */}
        <div className={style.right}>
          <p>退款成功</p>
          <p>退款金额将在48个小时内退回到您支付的账户,请注意查收</p>
          <p>{ Moment(data.titleTime).format('YYYY-MM-DD HH:mm:ss') }</p>
        </div>
      </div>
    }
    if(data.refundState == '5'){
      text = 
      <div className={style.box}>
        <div className={style.left}><img src="./img/close.png" alt=""/></div>{/* 已拒绝 */}
        <div className={style.right}>
          <p>商家拒绝退款</p>
          <p>拒绝原因: { data.refundReviewMemo }</p>
          <p>{ Moment(data.titleTime).format('YYYY-MM-DD HH:mm:ss') }</p>
        </div>
      </div>
    }
    return text;
  }

  //取消退款
  cancelRefund(data){
    alert('取消退款', '是否确认取消退款?', [
      { 
        text: '确定', 
        onPress: () => {
          this.props.cancelRefund({
            params: {
              userId: urlParams ? urlParams.userId : '1',
              returnOrderNo: data.orderNo,
              origOrderNo: data.origOrderNo,
              apiName: 'mall.order.mng.orderCancelRefund',
              merchantCode: '0001',
              token: urlParams ? urlParams.token : '8406278c-b935-4fe6-85ca-64efe67f3cc7'
            },
            func: () => {
              Toast.success('取消退款成功 !', 1.5,() => {
                this.context.router.history.push(`/myOrder?userId=${urlParams.userId}&token=${urlParams.token}&userName=${urlParams.userName}&userPhone=${urlParams.userPhone}`);
                this.props.queryList({
                  userId: urlParams ? urlParams.userId : '1',
                  page: 1,
                  size: 10,
                  apiName: 'mall.order.list',
                  merchantCode: '0001',
                  token: urlParams ? urlParams.token : '8406278c-b935-4fe6-85ca-64efe67f3cc7'
                });
              });
            }
          });
        }
      },
      { text: '取消', onPress: () => console.log('ok') }
    ])
  }
  footer(data){
    let text;
    if(data.refundState == '2'){
      text = <div onClick={this.cancelRefund.bind(this,data)} className={style.footer}>取消退款</div>
    }
    if(data.refundState == '3'){
      text = ''
    }
    if(data.refundState == '4'){
      text = ''
    }
    if(data.refundState == '5'){
      text = <div onClick={this.showModal.bind(this,data.servicePhone)} className={style.footer1}>申请客服</div>
    }
    return text;
  }
  goBack() {
    this.context.router.history.goBack()
  }

  render(){
    const { refundDetailData } = this.props;
    const data = refundDetailData ? refundDetailData : '';
    return (
      <div className={style.boxs}>
        <div className={style.header}>
          <div className={style.header_title}>退款详情</div>
          <div  className={style.header_btn} onClick={this.goBack.bind(this)}>
              <img src={Icon1} alt=""/>
          </div>
        </div>
        {
          data ? 
          <div>
            { this.box(data) }
            <List>
              <List.Item><span>退款类型</span><span>{ this.refundType(data.refundType) }</span></List.Item>
              <List.Item><span>退款商品</span><span>{ data.goodNames }</span></List.Item>
              <List.Item><span>退款金额</span><span>{ data.amount.toFixed(2) }</span></List.Item>
              <List.Item><span>退款理由</span><span>{ this.refundReason(data.refundReason) }</span></List.Item>
              <List.Item><span>退款备注</span><span>{ data.refundMemo }</span></List.Item>
              <List.Item><span>退款编号</span><span>{ data.orderNo }</span></List.Item>
              <List.Item><span>申请时间</span><span>{ Moment(data.applyTime).format('YYYY-MM-DD HH:mm:ss') }</span></List.Item>
            </List>
            { this.footer(data) }
          </div>
          : ''
        }
        
      </div>
    );
  }

};

App.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    refundDetailData: state.orderList.refundDetailData
  }
}
function dispatchToProps(dispatch) {
  return {
    queryList(payload, params) {
      dispatch({type: 'orderList/queryList',payload})
    },
    queryDetail(payload = {}) {
      dispatch({type: 'orderList/refundDetailsApp', payload})
    },
    cancelRefund(payload = {}) {  //取消退货
      dispatch({type: 'orderList/orderCancelRefund', payload})
    },

  }
}

export default connect(mapStateToProps, dispatchToProps)(App);
