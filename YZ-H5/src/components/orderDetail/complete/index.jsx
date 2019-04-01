import React, { Component } from 'react';
import { List,Button,Modal,Toast } from 'antd-mobile';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import Moment from 'moment';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import style from './index.less';
import Icon1 from '../../../assets/left_gray.png';

const alert = Modal.alert;

function successToast() {
  Toast.success('复制成功 !', 1.5);
}

let urlParams;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: 'none',
      isShow1: 'flex',
      borderBottom: '',
      FPshow: 'none',
      requestStatus: true,
    };
  }

  componentDidMount(){
    urlParams = JSON.parse(localStorage.getItem('urlParams'));

    this.props.queryDetail({
      userId: urlParams ? urlParams.userId : 'HY201811220948231855',
      orderNo: this.props.match.params.orderNo,
      apiName: 'mall.order.detail',
      merchantCode: '0001',
      token: urlParams ? urlParams.token : '46ee04d8-bc50-497e-bc43-ac9ec47eb426'
    })
  }

  isShow(){
    this.setState({
      isShow: 'flex',
      isShow1: 'none',
      borderBottom: '8px solid #F0F0F0'
    })
  }
  way(way){
    let text;
    if(way == '1'){
      text = '物业配送'
    }
    if(way == '2'){
      text = '快递 '
    }
    if(way == '3'){
      text = '上门自取'
    }
    return text;
  }
  orderSource(way){
    let text;
    if(way == '1' || way == '3'){
      text = '佳源自营'
    }
    if(way == '2'){
      text = '悦站优选'
    }
    return text;
  }
  paymentMethod(val){
    let text;
    if(val == '1'){
      text = '微信'
    }
    if(val == '2'){
      text = '支付宝'
    }
    return text;
  }
  //查看发票
  checkFP(){
    if(this.state.FPshow == 'none'){
      this.setState({FPshow: 'block'})
    }
    if(this.state.FPshow == 'block'){
      this.setState({FPshow: 'none'})
    }
    
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
  //确认收货
  affirm(orderNo){
    alert('确认收货', '收货前请确认您已收到商品并确认无误!', [
      { 
        text: '确认收货', 
        onPress: () => {
          if(this.state.requestStatus){
            this.setState({requestStatus: false},() => {
              this.props.confirmReceipt({
                params: {
                  userId: urlParams ? urlParams.userId : 'HY201811220948231855',
                  page: 1,
                  size: 10,
                  apiName: 'mall.order.mng.confirmReceipt',
                  merchantCode: '0001',
                  token: urlParams ? urlParams.token : '46ee04d8-bc50-497e-bc43-ac9ec47eb426'
                },
                func: () => {
                  Toast.success('确认收货成功 !', 1.5,() => {
                    this.context.router.history.push(`/myOrder?userId=${urlParams.userId}&token=${urlParams.token}&userName=${urlParams.userName}&userPhone=${urlParams.userPhone}`);
                    this.props.queryList({
                      userId: urlParams ? urlParams.userId : 'HY201811220948231855',
                      page: 1,
                      size: 10,
                      apiName: 'mall.order.list',
                      merchantCode: '0001',
                      token: urlParams ? urlParams.token : '46ee04d8-bc50-497e-bc43-ac9ec47eb426'
                    });
                  });
                }
              });
            })
          }

        }
      },
      { text: '取消', onPress: () => console.log('ok') }
    ])
  }
  //删除订单
  deleteOrder(orderNo){
    alert('删除订单', '是否确认删除该订单?', [
      { 
        text: '确认', 
        onPress: () => {
          if(this.state.requestStatus){
            this.setState({requestStatus: false},() => {
              this.props.confirmReceipt({
                params: {
                  userId: urlParams ? urlParams.userId : 'HY201811220948231855',
                  page: 1,
                  size: 10,
                  apiName: 'mall.order.mng.confirmReceipt',
                  merchantCode: '0001',
                  token: urlParams ? urlParams.token : '46ee04d8-bc50-497e-bc43-ac9ec47eb426'
                },
                func: () => {
                  Toast.success('确认收货成功 !', 1.5,() => {
                    this.context.router.history.push(`/myOrder?userId=${urlParams.userId}&token=${urlParams.token}`);
                    this.props.queryList({
                      userId: urlParams ? urlParams.userId : 'HY201811220948231855',
                      page: 1,
                      size: 10,
                      apiName: 'mall.order.list',
                      merchantCode: '0001',
                      token: urlParams ? urlParams.token : '46ee04d8-bc50-497e-bc43-ac9ec47eb426'
                    });
                  });
                }
              });
            })
          }

          this.props.deleteOrder({
            params: {
              userId: urlParams ? urlParams.userId : 'HY201811220948231855',
              page: 1,
              size: 10,
              apiName: 'mall.order.mng.deleteOrder',
              merchantCode: '0001',
              token: urlParams ? urlParams.token : '46ee04d8-bc50-497e-bc43-ac9ec47eb426'
            },
            func: () => {
              Toast.success('删除订单成功 !', 1.5,() => {
                this.context.router.history.push(`/myOrder`);
                this.props.queryList({
                  userId: urlParams ? urlParams.userId : 'HY201811220948231855',
                  page: 1,
                  size: 10,
                  apiName: 'mall.order.list',
                  merchantCode: '0001',
                  token: urlParams ? urlParams.token : '46ee04d8-bc50-497e-bc43-ac9ec47eb426'
                });
              });
            }
          });
        }
      },
      { text: '取消', onPress: () => console.log('ok') }
    ])
  }

  //根据不同的配送方式,展示不同配送
  deliveryWay(data){
    let text;
    if(data.way == '3'){ //上门自取
      text = 
      <div className={style.left}>
        <p>您的订单已配送至自取点，请及时上门取货。自取点联系电话：{ data.selfRaisingPhone }</p>
        <p>{ data.freightTimeInfo }</p>
      </div>
    }
    if(data.way == '2'){ //快递
      text = 
      <div className={style.left}>
        <p>{ data.logisticsName } ({ data.logisticsNo }) 您的快递已发出，请及时查收</p>
        <p>{ data.freightTimeInfo }</p>
      </div>
    }
    if(data.way == '1'){ //物业配送
      text = 
      <div className={style.left}>
        <p>配送员 ({ data.distributorName } { data.distributorPhone }) 正在为你配送订单,请确保配送时段内家有人收获。</p>
        <p>{ data.freightTimeInfo }</p>
      </div>
    }
    return text;
  }
  isClose(status){
    let text;
    if(status == '5'){  //交易关闭
      text = 
      <div className={style.title}>
        <div className={style.left}>
          <p>交易关闭</p>
          <p>您的订单已关闭</p>
        </div>
        <div className={style.right}>
          <img src="./img/gb.png" alt=""/>
        </div>
      </div>
    }
    if(status == '4' || status == '6'){  //交易完成-待评价,交易完成-已评价
      text = 
      <div className={style.title}>
        <div className={style.left}>
          <p>完成交易</p>
          <p>您的订单已完成</p>
        </div>
        <div className={style.right}>
          <img src="./img/lb.png" alt=""/>
        </div>
      </div>
    }
    return text;
  }

  goRefund(refundOrderNo,e){
    e.stopPropagation();
    this.context.router.history.push(`/refundDetail/${refundOrderNo}`);
  }

  btnType(goodsTatus,refundOrderNo,data){
    let text;

      if(goodsTatus == '2'){
        text = <Button style={{marginRight:2}} onClick={this.goRefund.bind(this,refundOrderNo)} inline size="small">退货中</Button>
      }
      if(goodsTatus == '3'){
        text = <Button style={{marginRight:2}} onClick={this.goRefund.bind(this,refundOrderNo)} inline size="small">已同意</Button>
      }
      if(goodsTatus == '4'){
        text = <Button style={{marginRight:2}} onClick={this.goRefund.bind(this,refundOrderNo)} inline size="small">已退款</Button>
      }
      if(goodsTatus == '5'){
        text = <Button style={{marginRight:2}} onClick={this.goRefund.bind(this,refundOrderNo)} inline size="small">已拒绝</Button>
      }

      if(goodsTatus == '1' && data.status == '4'){  //交易完成-待评价
        text = <Button style={{marginRight:2}} onClick={this.showModal.bind(this,data.servicePhone)} inline size="small">售后</Button>
      }
      if(goodsTatus == '1' && data.status == '6'){  //交易完成-已评价
        text = <Button style={{marginRight:2}} onClick={this.showModal.bind(this,data.servicePhone)} inline size="small">售后</Button>
      }
    // }

    return text;
  }

  btn1(status,orderNo){
    let text;
    if(status == '4'){
      text = <Button style={{marginRight:2}} inline size="small" onClick={()=>this.context.router.history.push(`/evaluate/${orderNo}`)}>评价晒单</Button>
    }
    if(status == '6'){
      text = <Button style={{marginRight:2}} inline size="small" onClick={()=>this.context.router.history.push(`/evaluateDetail/${orderNo}`)}>已评价</Button>
    }
    if(status == '5'){
      text = <Button style={{marginRight:2}} inline size="small" onClick={this.deleteOrder.bind(this,orderNo)}>删除订单</Button>
    }
    return text;
  }

  goBack() {
    this.context.router.history.goBack()
  }
  goDetail(id,e) {
    e.stopPropagation();
    goDetail(id);
  }

  render(){
    const { detailData } = this.props;
    const data = detailData ? detailData : '';
    return (
      <div className={style.boxs}>
        <div className={style.header}>
          <div className={style.header_title}>订单详情</div>
          <div  className={style.header_btn} onClick={this.goBack.bind(this)}>
              <img src={Icon1} alt=""/>
          </div>
        </div>
        {
          data ? 
          <div style={{height:'100%'}}>
                { this.isClose(data.status) }

                <div className={style.content}>
                  <div className={style.delivery}>
                    <div className={style.car}><img src="./img/ps.png" alt=""/></div>
                    <div className={style.deliveryWay}>
                      <div className={style.left}>
                        <p>订单已配送完成，感谢使用悦站购物，欢迎您再次购买。</p>
                      </div>
                      {/* { this.deliveryWay(data)} */}
                      
                    </div>
                  </div>
                  {
                    data.way == '3' ? 
                    <div className={style.deliveryInfo}>
                      <div className={style.car}><img src="./img/zb.png" alt=""/></div>
                      <div className={style.selfAddress}>
                        <p>{ data.address }</p>
                      </div>
                    </div> : 
                    <div className={style.deliveryInfo}>
                      <div className={style.car}><img src="./img/zb.png" alt=""/></div>
                      <div className={style.perInfo}>
                        <p>{ data.receiptName }&nbsp;<span>{ data.receiptPhone }</span></p>
                        <p>{ data.address }</p>
                      </div>
                    </div>
                  }

                </div>
                <div className={style.box}>
                  <div className={style.boxTitle}>
                    <img src="./img/zy.png" alt=""/>
                    <span>{this.orderSource(data.way)}</span>
                  </div>
                  <List>
                    {
                      data.orderSkus.map((item) => {
                        return (
                          <List.Item key={item.id} onClick={this.goDetail.bind(this,item.goodId)}>
                            <div className={style.boxImg}>
                              <img src={`/common/upload/download?uuid=${item.pic}&viewFlag=1&fileType=jpg&filename=aa&apiName=common.upload.download&merchantCode=0001`} alt=""/>
                            </div>
                            <div className={style.goodInfo}>
                              <div className={style.goodName}>
                                { item.goodName }
                              </div>
                              <div className={style.spec}>
                                { item.skuName }
                              </div>
                              <div className={style.priceBox}>
                                <div className={style.left}>
                                  <span className={style.yuan}>&yen; </span>
                                  <span>{ item.amount.toFixed(2) }</span>
                                  <span>&nbsp;x&nbsp;</span>
                                  <span>{ item.num }</span>
                                </div>
                                <div className={style.right}>
                                  { this.btnType(item.status,item.refundOrderNo,data) }
                                </div>

                              </div>
                            </div>
                          </List.Item>
                        )
                      })
                    }

                  </List>
                </div>
                <div className={style.contact}>
                  <img src="./img/kf.png" alt=""/>
                  <span onClick={this.showModal.bind(this,data.servicePhone)}>联系客服</span>
                </div>
                <div style={{borderBottom:this.state.borderBottom}} className={style.cost}>
                  <ul>
                    <li>
                      <div>商品总价</div>
                      <div>
                        <span>&yen;&nbsp;</span>
                        <span>{ data.goodsTotalPrice }</span>
                      </div>
                    </li>
                    <li>
                      <div className={style.lp}>运费</div>
                      <div>
                        <span>&yen;&nbsp;</span>
                        <span>{ data.freight }</span>
                      </div>
                    </li>
                    <li className={style.li_3} style={{display: this.state.isShow}}>
                      <div className={style.lp}>订单总价</div>
                      <div>
                        <span>&yen;&nbsp;</span>
                        <span>{ data.originalPrice}</span>
                      </div>
                    </li>
                    <li className={style.li_4} style={{display: this.state.isShow}}>
                      <div className={style.lp}>粮票抵用</div>
                      <div>
                        <span>&yen;&nbsp;</span>
                        <span>{ data.ticket }</span>
                      </div>
                    </li>
                    <li>
                      <div>实付金额</div>
                      <div>
                        <span>&yen;&nbsp;</span>
                        <span>{ data.amount }</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div style={{display:this.state.isShow1}} className={style.all} onClick={this.isShow.bind(this)}>
                  查看全部
                </div>
                <div className={style.orderDetail}>
                  <div className={style.boxTitle}>
                    <img src="./img/zy.png" alt=""/>
                    <span>订单信息</span>
                  </div>
                  <div className={style.content}>
                      {
                        data.invoiceStatus == '1' ? 
                        <div className={style.top}>
                          <div>
                            <div>发票信息&nbsp;:&nbsp;&nbsp;
                              { `${data.orderInvoice.type=='1'?'增值税普通发票 ':'增值税专用发票'}-${data.orderInvoice.userType=='1'?'个人':'单位'}` }
                            </div>
                            <div onClick={ this.checkFP.bind(this) }>查看发票</div>
                          </div>

                          <div style={{display: this.state.FPshow}}>发票抬头&nbsp;:&nbsp;&nbsp;{data.orderInvoice.title}</div>
                          <div style={{display: this.state.FPshow}}>纳税编号&nbsp;:&nbsp;&nbsp;{data.orderInvoice.tax}</div>
                        </div> : 
                        <div className={style.top}>
                          <div>发票信息&nbsp;:&nbsp;&nbsp;不开发票</div>
                        </div>
                      }
                    <div className={style.bottom}>
                      <div>
                        <span>订单编号&nbsp;:&nbsp;&nbsp;{ data.orderNo }</span>
                        <CopyToClipboard text={ data.orderNo }
                          onCopy={() => this.setState({copied: true})}>
                          <span onClick={successToast}>复制</span>
                        </CopyToClipboard>
                      </div>
                      <div>创建时间&nbsp;:&nbsp;&nbsp;{ Moment(data.createTime).format("YYYY-MM-DD HH:mm:ss") }</div>
                      <div>支付时间&nbsp;:&nbsp;&nbsp;{ Moment(data.payTime).format("YYYY-MM-DD HH:mm:ss") }</div>
                      <div>支付订单&nbsp;:&nbsp;&nbsp;{ data.payOrderNo }</div>
                      <div>支付方式&nbsp;:&nbsp;&nbsp;{ this.paymentMethod(data.paymentMethod) }</div>
                    </div>
                  </div>
                  <div style={{height:50}}></div>
                  {/* <div className={style.btn}>
                    { this.btn1(data.status,data.orderNo) }
                  </div> */}
                </div>

              <div className={style.btn}>
                  { this.btn1(data.status,data.orderNo) }
              </div>
             
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
    detailData: state.orderList.detailData
  }
}
function dispatchToProps(dispatch) {
  return {
    queryDetail(payload, params) {
      dispatch({type: 'orderList/detailApp',payload})
    },
    queryList(payload, params) {
      dispatch({type: 'orderList/queryList',payload})
    },
    confirmReceipt(payload = {}) {  //确认收货
      dispatch({type: 'orderList/confirmReceipt', payload})
    },
    deleteOrder(payload = {}) {   //删除订单
      dispatch({type: 'orderList/deleteOrder', payload})
    },
  }
}

export default connect(mapStateToProps, dispatchToProps)(App);
