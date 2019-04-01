import React, { Component } from 'react';
import { List,Button,Modal,Toast } from 'antd-mobile';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import Moment from 'moment';
import style from './index.less';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Icon1 from '../../../assets/left_gray.png';

const alert = Modal.alert;
let urlParams;

function successToast() {
  Toast.success('复制成功 !', 1.5);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderText: '123456789',
      copied: false,
      isShow: 'none',
      isShow1: 'flex',
      borderBottom: '',
      invoiceStyle: 'none',
      modalDisplay: 'none'
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

  //跳转到退换货申请
  goRefundApply(item,data,e){
    e.stopPropagation();
    this.context.router.history.push(`/applyRefund/${data.orderNo}/${item.skuId}/${item.id}/${data.status}`);
  }
  goRefund(refundOrderNo,e){
    e.stopPropagation();
    this.context.router.history.push(`/refundDetail/${refundOrderNo}`);
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
  //查看发票
  showInvoice(){
    if(this.state.invoiceStyle == 'none') {
      this.setState({
        invoiceStyle: 'block'
      })
    }
    if(this.state.invoiceStyle == 'block') {
      this.setState({
        invoiceStyle: 'none'
      })
    }

  }
  //根据不同的状态展示不同的按钮
  btnType(item,data){
    let btn;
    if(data.status == '1'){ //待付款,不显示按钮
      btn = ''
    }else{
      if(item.status == '1'){
        btn = <Button style={{marginRight:2}} onClick={this.goRefundApply.bind(this,item,data)} inline size="small">退换</Button>
      }
      if(item.status == '2'){
        btn = <Button style={{marginRight:2}} onClick={this.goRefund.bind(this,item.refundOrderNo)} inline size="small">退款中</Button>
      }
      if(item.status == '3'){
        btn = <Button style={{marginRight:2}} onClick={this.goRefund.bind(this,item.refundOrderNo)} inline size="small">已同意</Button>
      }
      if(item.status == '4'){
        btn = <Button style={{marginRight:2}} onClick={this.goRefund.bind(this,item.refundOrderNo)} inline size="small">已退款</Button>
      }
      if(item.status == '5'){
        btn = <Button style={{marginRight:2}} onClick={this.goRefund.bind(this,item.refundOrderNo)} inline size="small">已拒绝</Button>
      }
    }

    return btn;
  }

  text(way){
    let text;
    if(way == '1'){
      text = '配送时间'
    }
    if(way == '2'){
      text = '发货时间 '
    }
    if(way == '3'){
      text = '自取时间'
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
          <div>
            <div className={style.title}>
              <div className={style.left}>
                <p>待配送</p>
                <p>订单正在确认中...</p>
              </div>
              <div className={style.right}>
                <img src="./img/qc.png" alt=""/>
              </div>
            </div>
            <div className={style.content}>
              <div className={style.delivery}>
                <div className={style.car}><img src="./img/ps.png" alt=""/></div>
                
                <div className={style.deliveryWay}>
                  <div className={style.left}>
                    <p>配送方式</p>
                    <p>{ this.text(data.way) }</p>
                  </div>
                  <div className={style.right}>
                    <p>{ this.way(data.way) }</p>
                    <p>{ data.freightTimeInfo }</p>
                  </div>
                </div>

              </div>
              <div className={style.deliveryInfo}>
                <div className={style.car}><img src="./img/zb.png" alt=""/></div>
                <div className={style.perInfo}>
                  <p>{ data.receiptName }&nbsp;<span>{ data.receiptPhone }</span></p>
                  <p>{ data.address }</p>
                </div>
              </div>
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
                              { this.btnType(item,data) }
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
              <span onClick={this.showModal.bind(this, data.servicePhone)}>联系客服</span>
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
                    <span>{ data.originalPrice }</span>
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
                      <div>发票信息&nbsp;:&nbsp;&nbsp;
                        { `${data.orderInvoice.type=='1'?'增值税普通发票 ':'增值税专用发票'}-${data.orderInvoice.userType=='1'?'个人':'单位'}` }
                      </div>
                      <div>发票抬头&nbsp;:&nbsp;&nbsp;{data.orderInvoice.title}</div>
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
            </div>
          </div>
          : ''
        }

        <div className={style.modal} style={{display: this.state.modalDisplay}}>
          <div className={style.box1}>
            <div className={style.top}>
              <p>联系客服</p>
              <p>是否拨打客服电话?</p>
            </div>
            <div className={style.bottom}>
              <a onClick={ () => this.setState({modalDisplay: 'none'}) } href="javacript:void(0);">取消</a>
              {
                !!navigator.userAgent.match(/android/ig) ? 
                (
                  <div onClick={ () => {
                    this.setState({modalDisplay: 'none'}) 
                    goCall(data.servicePhone) 
                  }} >确定</div>
                ):(
                  <a onClick={ () => {
                    this.setState({modalDisplay: 'none'}) 
                  }} href={`tel:${data.servicePhone}`}>确定</a>
                )
              }
            </div>
          </div>
        </div>

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
    }
  }
}

export default connect(mapStateToProps, dispatchToProps)(App);

