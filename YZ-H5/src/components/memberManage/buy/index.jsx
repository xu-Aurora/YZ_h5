import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import Style from './index.less'
import Group9 from '../../../assets/Group9.png'
import Group10 from '../../../assets/Group10.png'
import Group11 from '../../../assets/Group11.png'
import Icon1 from '../../../assets/left_gray.png'
import {disposeUrl} from '../../../utils/dispose'
import {host} from '../../../utils/host'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            buyInfo: '',
            choicesNumber: ''
        }
    }
    componentDidMount() {
        const setMeal = JSON.parse(localStorage.getItem('setMeal'));
        let self = this
        let params = disposeUrl()
        if(params) {
            this.props.packagePurchase({
                params:{
                    memberGoodsId: setMeal.id,
                    userId: params.userId,
                    token: params.token,
                    merchantCode: '0001',
                    apiName: 'cif.member.packagePurchase'
                },
                func:function() {
                    let data = self.props.packagePurchaseInfo.memberGood
                    let list = []
                    data.coupons.forEach((item, index) =>{
                        list.push(Object.assign({},item))
                    })
                    let iconList = []
                    list.forEach((item, index)=>{
                        if(item.optionalState == '0') {
                            item.check = true
                        } else {
                            if(iconList.indexOf(item.optionalState) == '-1'){
                                iconList.push(item.optionalState)
                                item.check = true
                            } else {
                                item.check = false
                            }
                        }
                    })
                    self.setState({
                        choicesNumber: data.choicesNumber,
                        buyInfo: list
                    })
                }
            })
        }     
    }
    iconApply() {
        let children = []
        if(this.state.buyInfo) {
            let buyInfo = this.state.buyInfo
            buyInfo.forEach((item, index) =>{
                if(item.check) {
                    children.push(
                        <div className={Style.giftBag_detail} key={index}>
                            <img src={require(`../../../assets/icon${item.iconType}.png`)} alt=""/>
                            <span>{item.iconName}</span>
                        </div>
                    )
                     
                }
            })
        }
        return children
    }
    //多选的情况
    ticketChoice () {
        let self = this
        let children = []
        if(self.state.choicesNumber) {
            let num = self.state.choicesNumber
            for(let i= 1; i<=num; i++) {
                let list = []
                self.state.buyInfo.forEach(function(item , index){
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
        return children
    }
    choice(params) {
        let children = []
        params.forEach((item, index) =>{
            children.push(
                <div className={Style.choice_list} key={index}>
                    <div className={Style.choice_detail}>
                        <div>{item.couponName}</div>
                        <div>*{item.couponNum}</div>
                    </div>
                    <div className={Style.choice_checked} onClick={this.choiceChange.bind(this, item)}>
                        <div className={Style.choice_line}>

                        </div>
                        <div className={Style.choice_radio}>
                            <img src={item.check ?  Group10:Group11} alt=""/>
                        </div>
                    </div>
                </div>
            )
        })
        return children
    }
    choiceChange(params) {
        let buyInfo = this.state.buyInfo
        let list = []
        buyInfo.forEach((data,i)=>{
            list.push(Object.assign({},data))
        })
        list.forEach((data,i)=>{
            if(params.optionalState == data.optionalState) {
                data.check = false
            }
            if(params.id == data.id) {
                data.check = true
            }
        })
        this.setState({
            buyInfo: list
        })
    }
    onPay() {
        const setMeal = JSON.parse(localStorage.getItem('setMeal'));
        let couponIds = []
        let buyInfo = this.state.buyInfo
        buyInfo.forEach(item => {
            if(item.check) {
                couponIds.push(item.couponId)
            }
        })
        let params = disposeUrl()
        if(params) {
            this.props.createOrder({
                params:{
                    quantity: 1,
                    couponIds: couponIds.join(),
                    a: undefined,
                    goodsId: setMeal.id,
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
        this.context.router.history.goBack()
    }

    goPage() {
        this.context.router.history.push(`/buyAgreement`);
    }

    render() {
        const data = this.props.packagePurchaseInfo
        const member = data ? data.member : {}
        const memberGood = data ? data.memberGood : {}
        let nowGrade = member ? (member.totalRechargeAmount+memberGood.price)/member.nextLevel*100 : 0
        let futureGrade =member ? member.totalRechargeAmount/member.nextLevel*100 : 0
        return (
            <div className={Style.box}>
                <div className={Style.header}>
                    <div className={Style.header_title}>套餐购买</div>
                    <div  className={Style.header_btn} onClick={this.goBack.bind(this)}>
                        <img src={Icon1} alt=""/>
                    </div>
                </div>
                <div className={Style.content}>
                    <div className={Style.amount}>
                        <div className={Style.amount_headline}>累计充值金额</div>
                        <div className={Style.amount_box}>
                            <div className={Style.amount_Progress} >
                                <div className={Style.amount_upgrade}>升级还差{member ? member.differenceAmount:0}</div>
                                <div className={Style.Progress}>
                                    <div></div>
                                    <div style={{width: `${nowGrade >100 ? 100 : nowGrade}%`}}></div>
                                    <div style={{width: `${futureGrade}%`}}></div>
                                </div>
                                {/* <Progress percent={member.totalRechargeAmount/member.nextLevel*100} position="normal"/> */}
                                <div className={Style.amount_lable}>
                                    <span>0</span>
                                    <span>{member ? member.nextLevel : 0}</span>
                                </div>
                            </div>
                            <div className={Style.amount_img}>
                                <div className={Style.lable_icon}>                          
                                    <div className={Style.icon_num}>{member ? member.level : 0}</div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className={Style.reward}>
                        您将购买<span>{memberGood.price}</span>套餐，可获得<span>{memberGood.name}</span>
                    </div>
                    <div className={Style.giftBag}>
                        <div className={Style.giftBag_shape}>
                            <img src={Group9} alt=""/>
                        </div>
                        <div className={Style.giftBag_headline}>{memberGood.price}礼包</div>
                        <div className={Style.giftBag_list}>
                            {this.iconApply()}
                        </div>
                    </div>
                    {this.ticketChoice()}
                </div>
               
                <div className={Style.explain}>支付即视为同意<span style={{color:'#2B2B2B'}} onClick={this.goPage.bind(this)}>粮票购买协议</span></div>
                <div className={Style.pay} onClick={this.onPay.bind(this)}>
                    确认支付
                </div>    
            </div>
        )
    }
}
App.contextTypes = {
    router: PropTypes.object
}
function mapStateToProps(state) {
    return {
        packagePurchaseInfo: state.memberManage.packagePurchaseInfo,
        orderInfo: state.memberManage.orderInfo
    }
}
function dispatchToProps(dispatch) {
    return {
        packagePurchase(payload, params) {
            dispatch({
              type: 'memberManage/packagePurchase',
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