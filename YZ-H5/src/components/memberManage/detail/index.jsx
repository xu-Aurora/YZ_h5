import React, {Component} from 'react';
import { Modal } from 'antd-mobile';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import Style from './index.less'
import Icon1 from '../../../assets/left_gray.png'
import Icon2 from '../../../assets/close.png'

import {disposeUrl} from '../../../utils/dispose'
import {host} from '../../../utils/host'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            priceList: [],
            priceIfo: '',
            modal: false,
            pic: ''
        }
    }
    componentDidMount() {
        let self = this
        let params = disposeUrl()
        if(params) {
            this.props.memberPurchase({
                params:{
                    userId: params.userId,
                    token: params.token,
                    merchantCode: '0001',
                    apiName: 'cif.member.memberPurchase'
                },
                func:function() {
                    let data = self.props.memberPurchaseInfo
                    let list = data.memberGoods
                    list.forEach((item, index) =>{
                        if(index) {
                            item.check = false
                        } else {
                            item.check = true
                        }
                    })
                    self.setState({
                        priceList: list,
                        priceIfo: data.memberGoods[0]
                    })
                }
            })
        }     
    }
    //套餐渲染
    priceApply() {
        let self = this
        let children = self.state.priceList.map(function(item , index){
            return (<div key={index} onClick={self.onPrice.bind(self, item)} className={item.check ? `${Style.list_in}`: ''}>{item.price}元</div>)
        })
        return children
    }
    onPrice(params) {
        let priceList = this.state.priceList
        let list = []
        priceList.forEach((data,i)=>{
            list.push(Object.assign({},data))
        })
        list.forEach((data,i)=>{
            if(params.id == data.id) {
                data.check = true
            } else {
                data.check = false
            }
        })
        this.setState({
            priceList: list,
            priceIfo: params
        })
        
    }
    //套餐包含优惠券
    ticket() {
        let self = this
        let children = []
        if(self.state.priceIfo) {
            self.state.priceIfo.coupons.forEach(function(item , index){
                if(item.optionalState == '0') {
                    children.push(
                        <div className={Style.ticket_list} key={index} onClick={self.ticketChange.bind(self, item)}>
                            <div className={Style.ticket_detail}>
                                <div>{item.couponName}</div>
                                <div>*{item.couponNum}</div>
                            </div>
                            <div className={Style.ticket_explain}>{item.couponDetails}</div>
                        </div>
                    )
                }
            })
            return children
        }
       
    }
    //多选的情况
    ticketChoice () {
        let self = this
        let children = []
        if(self.state.priceIfo) {
            if(self.state.priceIfo.choicesNumber) {
                let num = self.state.priceIfo.choicesNumber
                for(let i= 1; i<=num; i++) {
                    let list = []
                    self.state.priceIfo.coupons.forEach(function(item , index){
                        if(item.optionalState == i) {
                            list.push(Object.assign({},item))
                        }
                    })
                    children.push(
                        <div className={Style.choice} key = {i}>
                            <p className={Style.choice_title}>以下{list.length}选一</p>
                            {self.choice(list)}
                        </div>
                    )
                }
            } else {
                //无多选的情况
            } 
        }
        return children
    }
    choice(params) {
        let children = []
        let self = this
        params.forEach((item, index) =>{
            children.push(
                <div className={Style.choice_list}  key={index} onClick={self.ticketChange.bind(self, item)}>
                    <div className={Style.choice_detail}>
                        <div>{item.couponName}</div>
                        <div>*{item.couponNum}</div>
                    </div>
                </div>
            )
        })
        return children
    }
    // 券详情
    ticketChange(param) {
        console.log(param)
        let self = this
        let params = disposeUrl()
        if(params) {
            this.props.couponDetail({
                params:{
                    id: param.id,
                    userId: params.userId,
                    token: params.token,
                    merchantCode: '0001',
                    apiName: 'cif.coupon.detail'
                },
                func: ()=> {
                    let couponInfo = self.props.couponInfo
                    self.setState({
                        modal: true,
                        pic: couponInfo.pic
                    })
                }
            })
        }
    }
    //支付
    onPay() {

        //信息存入缓存
        // localStorage.setItem('setMeal', JSON.stringify(this.state.priceIfo))
        // let params = disposeUrl()
        // if(params) {
        //     this.context.router.history.push(`/memberBuy/?token=${params.token}&userId=${params.userId}`) 
        // }
        // const setMeal = JSON.parse(localStorage.getItem('setMeal'));
        let couponIds = []
        let priceIfo = this.state.priceIfo
        priceIfo.coupons.forEach(item => {
            couponIds.push(item.couponId)
        })
        let params = disposeUrl()
        if(params) {
            this.props.createOrder({
                params:{
                    quantity: 1,
                    couponIds: couponIds.join(),
                    a: undefined,
                    goodsId: priceIfo ? priceIfo.id : '',
                    userId: params.userId,
                    token: params.token,
                    merchantCode: '0001',
                    terminal: '1',
                    apiName: 'cif.member.order.createOrder'
                },
                func: () => {
                    goPay();

                    window.location.href = `${host}/h5/yd_h5/checkstand.html?origOrderNo=${this.props.orderInfo.orderNo}&type=1&userId=${params.userId}&token=${params.token}`
                }
            })
        }




    } 
    goBack() {
        back()
    }
    onClose(param) {
        this.setState({
            [param]: false
        })
    }
    render() {
        const state = this.state
        return (
            <div className={Style.box}>
                <div className={Style.header}>
                    <div className={Style.header_title}>会员中心</div>
                    <div  className={Style.header_btn} onClick={this.goBack.bind(this)}>
                        <img src={Icon1} alt=""/>
                    </div>
                </div>
                <div className={Style.package}>
                    <div className={Style.package_headline}>悦享套餐</div>
                    <div className={Style.price}>
                        <div className={Style.price_list}>
                            {this.priceApply()}
                        </div>
                    </div>
                    <div className={Style.reward}>
                        可获得<span>{state.priceIfo ? state.priceIfo.goodsAmount : 0}</span>粮票
                    </div>
                    <div className={Style.ticket_flow}>
                        <div className={Style.ticket}>
                            {this.ticket()}
                        </div>
                        {this.ticketChoice()}
                    </div>
                </div>
                <div className={Style.blank}></div>
                <div className={Style.pay} onClick={this.onPay.bind(this)}>
                    前往支付
                </div>
                {
                    this.state.modal ?
                    (
                        <div className={Style.model}>
                            <div className={Style.model_shade}>
                            </div>
                            <div className={Style.model_content}>
                                <div className={Style.model_close} onClick={this.onClose.bind(this, 'modal')}>
                                    <img src={Icon2} alt=""/>
                                </div>
                                <img src={`/common/upload/download?uuid=${this.state.pic}&viewFlag=1&fileType=jpg&filename=aa&apiName=common.upload.download&merchantCode=0001`} alt=""/>
                            </div>                   
                        </div>
                    ):null
                }
                
                {/* <Modal
                    visible={this.state.modal}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose.bind(this, 'modal')}
                    footer={[{ text: '关闭', onPress: () => this.onClose.bind(this, 'modal')()}]}
                    // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    >
                    <div style={{ height: "40vh"}}>
                        <img style={{height:'100%', width:'100%'}} src={`/common/upload/download?uuid=${this.state.pic}&viewFlag=1&fileType=jpg&filename=aa&apiName=common.upload.download&merchantCode=0001`} alt=""/>
                    </div>
                </Modal> */}
            </div>
        )
    }
}
App.contextTypes = {
    router: PropTypes.object
}
function mapStateToProps(state) {
    return {
        memberPurchaseInfo: state.memberManage.memberPurchaseInfo,
        couponInfo: state.memberManage.couponInfo,
        orderInfo: state.memberManage.orderInfo
    }
}
function dispatchToProps(dispatch) {
    return {
        memberPurchase(payload, params) {
            dispatch({
              type: 'memberManage/memberPurchase',
              payload
            })
        },
        couponDetail(payload, params) {
            dispatch({
              type: 'memberManage/couponDetail',
              payload
            })
        },
        createOrder(payload, params) {
            dispatch({
              type: 'memberManage/createOrder',
              payload
            })
        }
    }
}

export default connect(mapStateToProps, dispatchToProps)(App);