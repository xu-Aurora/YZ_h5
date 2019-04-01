import React, { Component } from 'react';
import { List,SegmentedControl,Picker,InputItem,ImagePicker,Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import style from './index.less';
import Icon1 from '../../../assets/left_gray.png';

const district1 = [
  {
    label: "协商一致退款",
    value: "1"
  },
  {
    label: "未按约定时间发货",
    value: "2"
  },
  {
    label: "快递无跟踪记录",
    value: "3"
  },
  {
    label: "我不想要了",
    value: "4"
  },
  {
    label: "其他",
    value: "5"
  }
]
const district2 = [
  {
    label: "尺寸拍错/不喜欢/效果不好",
    value: "1"
  },
  {
    label: "商品质量问题",
    value: "2"
  },
  {
    label: "收到商品与描述不符",
    value: "3"
  },
  {
    label: "卖家发错货",
    value: "4"
  },
  {
    label: "收到商品少件或破损",
    value: "5"
  },
  {
    label: "商品质量问题",
    value: "6"
  },
  {
    label: "我不想要了",
    value: "7"
  },
  {
    label: "其他",
    value: "8"
  }
]

let urlParams;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      refundType: 0,
      amount: '',
      refundReason: '',
      refundPic: '',
      refundMemo: '',
      file: [],
      background: 'linear-gradient(#CFCFCF,#AFAFAF)',
      requestStatus: true,
    };
  }

  componentDidMount(){
    urlParams = JSON.parse(localStorage.getItem('urlParams'));

    this.props.queryDetail({
      userId: urlParams ? urlParams.userId : 'HY201811220948231855',
      orderNo: this.props.match.params.orderNo,
      skuId: this.props.match.params.skuId,
      apiName: 'mall.order.mng.orderRefundDetails',
      merchantCode: '0001',
      status: this.props.match.params.status,
      token: urlParams ? urlParams.token : '46ee04d8-bc50-497e-bc43-ac9ec47eb426',
      
    })
  }

  handleChange(e){
    this.setState({
      refundType: e.nativeEvent.selectedSegmentIndex
    })
  }

  handleImg = (files, type, index) => {
    this.setState({
      files,
    });
  }
  handleInput1(val){
    this.setState({
      amount: val
    })
    if(this.props.orderRefundDatas.status == '3') {
      if(val != '' && this.state.refundReason != ''){
        this.setState({
          background: 'linear-gradient(#FDD60C, #FFB40B)'
        })
      }else{
        this.setState({
          background: 'linear-gradient(#CFCFCF,#AFAFAF)'
        })
      }
    }
    if(this.props.orderRefundDatas.status == '2') {
      if(this.state.refundReason != ''){
        this.setState({
          background: 'linear-gradient(#FDD60C, #FFB40B)'
        })
      }else{
        this.setState({
          background: 'linear-gradient(#CFCFCF,#AFAFAF)'
        })
      }
    }

  }
  handleInput2(val){
    this.setState({
      refundMemo: val
    })
  }
  pickerChange(val){
    this.setState({
      refundReason: val[0]
    })
    if(this.props.orderRefundDatas.status == '3') {
      if(this.state.amount != '' && val != ''){
        this.setState({
          background: 'linear-gradient(#FDD60C, #FFB40B)'
        })
      }else{
        this.setState({
          background: 'linear-gradient(#CFCFCF,#AFAFAF)'
        })
      }
    }
    if(this.props.orderRefundDatas.status == '2') {
      if(val != ''){
        this.setState({
          background: 'linear-gradient(#FDD60C, #FFB40B)'
        })
      }else{
        this.setState({
          background: 'linear-gradient(#CFCFCF,#AFAFAF)'
        })
      }
    }

  }

  regx() {
    let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;

    if(!this.state.refundReason) {
      Toast.fail('请选择退款原因', 2);
      return false;
    }

    if(this.props.orderRefundDatas.status == '3') {
      if(!this.state.amount) {
        Toast.fail('退款金额不能为空', 2);
        return false;
      }
      if(!reg.test(this.state.amount)) {
        Toast.fail('退款金额只能输入数字和小数点', 2);
        return false;
      }
      if(this.state.amount > this.props.orderRefundDatas.priceMax) {
        Toast.fail('退款金额不能大于最高退款金额', 2);
        return false;
      }
    }

    return true;
  }

  //点击确定
  confirm(){
    let self = this;
    let reg = self.regx();

    if(reg) {
      if(this.state.requestStatus){
        self.setState({requestStatus: false},() => {

          // 处理图片
          let imgArray = []
          this.state.files.forEach(ele=>{
            imgArray.push(ele.file)        
          })
          if(imgArray.length){
            this.props.upLoadRKey({
              params: {
                file: imgArray,
                merchantCode: '0001',
                apiName: 'common.upload.upLoad'
              },
              func: () => {
                this.props.refundGood({
                  params: {
                    userId: urlParams ? urlParams.userId : 'HY201811220948231855',
                    refundType: this.state.refundType+1,
                    refundPic: this.props.osskey,
                    refundReason: this.state.refundReason,
                    refundMemo: this.state.refundMemo,
                    amount: this.state.amount == '' ? this.props.orderRefundDatas.priceMax : this.state.amount,
                    orderSkuId: this.props.match.params.id,
                    orderNo: this.props.match.params.orderNo,
                    apiName: 'mall.order.mng.refundGood',
                    merchantCode: '0001',
                    token: urlParams ? urlParams.token : '46ee04d8-bc50-497e-bc43-ac9ec47eb426'
                  },
                  func: () => {
                      Toast.success('申请退款成功 !', 1.5,() => {
                        this.context.router.history.push(`/myOrder?userId=${urlParams.userId}&token=${urlParams.token}&userName=${urlParams.userName}&userPhone=${urlParams.userPhone}`);
                      });
                  }
                })
              }
            })
          } else {
            this.props.refundGood({
              params: {
                userId: urlParams ? urlParams.userId : 'HY201811220948231855',
                refundType: this.state.refundType+1,
                refundPic: this.props.osskey,
                refundReason: this.state.refundReason,
                refundMemo: this.state.refundMemo,
                amount: this.state.amount == '' ? this.props.orderRefundDatas.priceMax : this.state.amount,
                orderSkuId: this.props.match.params.id,
                orderNo: this.props.match.params.orderNo,
                apiName: 'mall.order.mng.refundGood',
                merchantCode: '0001',
                token: urlParams ? urlParams.token : '46ee04d8-bc50-497e-bc43-ac9ec47eb426'
              },
              func: () => {
                  Toast.success('申请退款成功 !', 1.5,() => {
                    this.context.router.history.push(`/myOrder`);
                  });
              }
            })
          }

        })
      }
    }


  }

  goBack() {
    this.context.router.history.goBack()
  }


  texts(data) {
      if(data.status == '2') {  //待配送
        return <SegmentedControl
            values={['仅退款']}
            selectedIndex={ this.state.refundType }
            onChange={this.handleChange.bind(this)}
          />
      }
      if(data.status == '3') {  //配送中
        return <SegmentedControl
            values={['仅退款', '退货退款']}
            selectedIndex={ this.state.refundType }
            onChange={this.handleChange.bind(this)}
          />
      }
      return null
  }
  texts1(data) {
    const { getFieldProps } = this.props.form;
    if(data.status == '2') {  //待配送
      return  <InputItem
        {...getFieldProps('preice')}
        placeholder="请输入退款金额"
        clear
        disabled
        value={ data.priceMax }
        extra={`最高可退${data?data.priceMax:''}元`}
      >退款金额&nbsp;:</InputItem>
    }
    if(data.status == '3') {  //配送中
      return  <InputItem
        {...getFieldProps('preice')}
        placeholder="请输入退款金额"
        clear
        value={ this.state.amount }
        onChange={this.handleInput1.bind(this)}
        extra={`最高可退${data?data.priceMax:''}元`}
      >退款金额&nbsp;:</InputItem>
    }
  }

  render(){
    const { getFieldProps } = this.props.form;
    const { files } = this.state;
    const { orderRefundDatas } = this.props;
    const data = orderRefundDatas ? orderRefundDatas : '';
    return (
      <div className={style.boxs}>
        <div className={style.header}>
          <div className={style.header_title}>申请退款</div>
          <div  className={style.header_btn} onClick={this.goBack.bind(this)}>
              <img src={Icon1} alt=""/>
          </div>
        </div>
        <div className={style.content}>
          <div className={style.box}>
            <List>
              {  
                data ? 
                <List.Item>
                  <div className={style.boxImg}>
                    <img src={`/common/upload/download?uuid=${data.orderSku.pic}&viewFlag=1&fileType=jpg&filename=aa&apiName=common.upload.download&merchantCode=0001`} alt=""/>
                  </div>
                  <div className={style.goodInfo}>
                    <div className={style.goodName}>
                      { data.orderSku.goodName }
                    </div>
                    <div className={style.spec}>
                      { data.orderSku.skuName }
                    </div>
                    <div className={style.priceBox}>
                      <div className={style.left}>
                        <span className={style.yuan}>&yen; </span>
                        <span>{ data.orderSku.amount }</span>
                        <span>&nbsp;x&nbsp;</span>
                        <span>{ data.orderSku.num }</span>
                      </div>
                    </div>
                  </div>
                </List.Item> : ''
              }

            </List>
          </div>
          {
            data ? this.texts(data) : ''
          }

          <List style={{ backgroundColor: 'white' }}>
            <Picker 
              extra="请选择" 
              onOk={this.pickerChange.bind(this)}
              data={ this.state.refundType == 0 ? district1 : district2 } 
              cols={1} 
              {...getFieldProps('district3')} 
              className="forss">
              <List.Item arrow="horizontal">退款原因&nbsp;:</List.Item>
            </Picker>

            {
              data ? this.texts1(data) : ''
            }


            <InputItem
              {...getFieldProps('autofocus')}
              clear
              placeholder="请输入退款备注"
              value={ this.state.refundMemo }
              onChange={this.handleInput2.bind(this)}
              ref={el => this.autoFocusInst = el}
            >退款备注&nbsp;:</InputItem>

          </List>

          <div className={style.line}>

          </div>

          <ImagePicker
            length="3"
            files={files}
            onChange={this.handleImg}
            selectable={files.length < 3}
            multiple={false}
            accept="image/gif,image/jpeg,image/jpg,image/png"
          />
        </div>
        <div onClick={this.confirm.bind(this)} style={{background: this.state.background}} className={style.footer}>
          确认
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
    orderRefundDatas: state.orderList.orderRefundDatas,
    osskey: state.orderList.imgInfo
  }
}
function dispatchToProps(dispatch) {
  return {
    queryDetail(payload, params) {
      dispatch({type: 'orderList/orderRefundDetails',payload})
    },
    refundGood(payload, params) { //申请退货
      dispatch({type: 'orderList/refundGood',payload})
    },
    queryList(payload, params) {
      dispatch({type: 'orderList/queryList',payload})
    },
    upLoadRKey(payload, params) { //图片上传
      dispatch({type: 'orderList/upLoadRKey',payload})
    },
  }
}

export default connect(mapStateToProps, dispatchToProps)(createForm()(App));
