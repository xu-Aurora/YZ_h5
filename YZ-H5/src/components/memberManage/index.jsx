import React, {Component} from 'react';
import { Progress } from 'antd-mobile';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import Style from './index.less'
import Group2 from '../../assets/Group2.png'
import Group3 from '../../assets/Group3.png'
import Group4 from '../../assets/Group4.png'
import Group5 from '../../assets/Group5.png'
import {disposeUrl} from '../../utils/dispose'
import {host} from '../../utils/host'
import Moment from 'moment';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            params: ''
        }
    }
    componentDidMount() {
        let params = disposeUrl()
        if(params) {
            this.props.memberHome({
                userId: params.userId,
                token: params.token,
                merchantCode: '0001',
                apiName: 'cif.member.memberHome'
            }) 
            this.setState({
                params
            })
        }
       
    }
    //组件更新时被调用 
    UNSAFE_componentWillReceiveProps(nextProps){
        let params = disposeUrl()
        if(JSON.stringify(params) != JSON.stringify(this.state.params)) {
            this.props.memberHome({
                userId: params.userId,
                token: params.token,
                merchantCode: '0001',
                apiName: 'cif.member.memberHome'
            }) 
            this.setState({
                params
            })
        }
    }
    openMember() {
        let params = disposeUrl()
        if(params) {
            //原生跳转
            gotoMemberInnerPage(`${host}/h5/dist/#/memberDetail?token=${params.token}&userId=${params.userId}`)
        }
    }
    goDetail() {
        let params = disposeUrl()
        if(params) {
            //原生跳转
            gotoMemberInnerPage(`${host}/h5/dist/#/foodCoupon?token=${params.token}&userId=${params.userId}`)
        }
    }
    render() {
        const data = this.props.memberInfo
        const member = data ? data.member : {}
        const memberLevel = data ? data.memberLevel : {}
        const isVip =  data ? data.isVip : 'no' //是不是会员
        return (
            <div className={Style.box}>
                <div className={Style.header}>
                    <div className={Style.header_title}>会员中心</div>
                    <div  className={Style.header_btn} onClick={this.goDetail.bind(this)}>粮票明细</div>
                </div>
                <div className={Style.scoll}>
                    {
                        isVip == 'no' ? (
                            <div className={Style.grade}>
                                <div className={Style.grade_logo}>
                                    <div className={Style.grade_img}>
                                        <img src={Group2} alt=""/>
                                        <span>0</span>
                                    </div>
                                    <div className={Style.grade_btn} onClick={this.openMember.bind(this)}>
                                        立即开通会员
                                    </div>
                                </div>
                            </div>
                        ):(
                            <div className={Style.grade1}>
                                <div className={Style.grade_logo}>
                                    <div className={Style.grade_img}>
                                        <img src={Group2} alt=""/>
                                        <span>{member.level}</span>
                                    </div>
                                </div>
                                <div className={Style.grade_num}>
                                    佳优家Plus
                                </div>
                                <div className={Style.grade_lable}>
                                    <div className={Style.lable_icon}>                          
                                        <div className={Style.icon_num}>{member.level}</div>
                                    </div>
                                    <div className={Style.lable_name}>
                                        <div>NO.{member.numberNo}</div>
                                        <div className={Style.name_text}>SY{memberLevel.createTime ? Moment(memberLevel.createTime).format("YYYY.MM.DD") : ''}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                
                    <div className={Style.content}>
                        {
                            isVip == 'no' ? '' : (
                                <div className={Style.headline1} onClick={this.openMember.bind(this)}>会员充值</div>
                            )
                        }
                        <div className={Style.info}>
                            <div className={Style.info_list}>
                                <p>{isVip == 'no' ? 0 : member.levelName}</p>
                                <p>会员等级</p>
                            </div>
                            <div className={Style.info_list} onClick={this.goDetail.bind(this)}>
                                <p>{isVip == 'no' ? 0 : member.balance}</p>
                                <p>剩余粮票</p>
                            </div>
                            <div className={Style.info_list}>
                                <p> {isVip == 'no' ? 0 : member.totalUsed}元</p>
                                <p>累计节省</p>
                            </div>
                        </div>
                        <div className={Style.amount}>
                            <div className={Style.amount_headline}>累计充值金额</div>
                            <div className={Style.amount_box}>
                                <div className={Style.amount_Progress} >
                                    <div className={Style.amount_upgrade}>升级还差{isVip == 'no' ? memberLevel.amount : member.differenceAmount}</div>
                                    <Progress percent={ isVip == 'no' ? 0:member.totalRechargeAmount/member.nextLevel*100} position="normal"/>
                                    <div className={Style.amount_lable}>
                                        <span>0</span>
                                        <span>{isVip == 'no' ? memberLevel.amount : member.nextLevel}</span>
                                    </div>
                                </div>
                                <div className={Style.amount_img}>
                                    <div className={Style.lable_icon}>                          
                                        <div className={Style.icon_num}>{member ? member.level : 0}</div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        {
                            isVip == 'no' ? 
                            (
                                <div className={Style.headline}>
                                    <span className={Style.headline_icon}></span>
                                    <span className={Style.headline_text}>开通会员即可效果享受各项优惠</span>     
                                </div>
                            ):""
                        }  
                        <div className={Style.introduce}>
                            <div className={Style.introduce_list}>
                                <img src={Group5} alt=""/>
                                <div className={Style.introduce_text}>入会即享超值</div>
                                <div className={Style.introduce_text}>优+礼包</div>

                            </div>
                            <div className={Style.introduce_list}>
                                <img src={Group3} alt=""/>
                                <div className={Style.introduce_text}>多种会员券</div>
                                <div className={Style.introduce_text}>入会即得</div>

                            </div>
                            <div className={Style.introduce_list}>
                                <img src={Group4} alt=""/>
                                <div className={Style.introduce_text}>1:3购买</div>
                                <div className={Style.introduce_text}>1:1抵现</div>
                            </div>
                        </div>

                    </div>
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
        memberInfo: state.memberManage.memberInfo
    }
}
function dispatchToProps(dispatch) {
    return {
        memberHome(payload, params) {
            dispatch({
              type: 'memberManage/memberHome',
              payload
            })
        }
    }
}

export default connect(mapStateToProps, dispatchToProps)(App);