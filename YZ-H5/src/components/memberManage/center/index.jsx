import React, {Component} from 'react';
import { Progress } from 'antd-mobile';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import Style from './index.less'
import Group2 from '../../../assets/Group2.png'
import Group3 from '../../../assets/Group3.png'
import Group4 from '../../../assets/Group4.png'
import Group5 from '../../../assets/Group5.png'
import Group6 from '../../../assets/Group6.png'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
        this.props.memberHome({
          userId: 'HY201811081122587802'
        }) 
    }
    render() {
        const data = this.props.memberInfo
        const member = data ? data.member : {}
        const memberLevel = data ? data.memberLevel : {}
        return (
            <div className={Style.box}>
                <div className={Style.grade}>
                    <div className={Style.grade_logo}>
                        <div className={Style.grade_img}>
                            <img src={Group2} alt=""/>
                            <span>{member.level}</span>
                        </div>
                    </div>
                    <div className={Style.grade_num}>
                        {member.levelName}
                    </div>
                </div>
               
                <div className={Style.headline}>会员充值</div>
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
                <div className={Style.info}>
                    <div className={Style.info_list}>
                        <p>{member.levelName}</p>
                        <p>会员等级</p>
                    </div>
                    <div className={Style.info_list}>
                        <p>{member.balance}</p>
                        <p>剩余粮票</p>
                    </div>
                    <div className={Style.info_list}>
                        <p> {member.totalUsed}元</p>
                        <p>累计节省</p>
                    </div>
                </div>
                <div className={Style.amount}>
                    <div className={Style.amount_headline}>累计充值金额</div>
                    <div className={Style.amount_box}>
                        <div className={Style.amount_Progress} >
                            <div className={Style.amount_upgrade}>升级还差{member.differenceAmount}</div>
                            <Progress percent={40} position="normal"/>
                            <div className={Style.amount_lable}>
                                <span>{member.totalRechargeAmount}</span>
                                <span>{member.nextLevel}</span>
                            </div>
                        </div>
                        <div className={Style.amount_img}>
                            <img src={Group6} alt=""/>
                        </div>
                    </div>
                    
                </div>
                {/* <div className={Style.headline}>悦享套餐</div>
                <div className={Style.price}>
                    <div className={Style.price_list}>
                        <div>88元</div>
                        <div>365元</div>
                        <div>730元</div>
                        <div>1460元</div>
                    </div>
                    <div className={Style.price_list}>
                        <div>1825元</div>
                        <div>2920元</div>
                        <div>3650元</div>
                    </div>
                </div>
                <div className={Style.reward}>
                    可获得<span>1088</span>粮票
                </div>
                <div className={Style.ticket}>
                    <div className={Style.ticket_list}>
                        <div className={Style.ticket_detail}>
                            <div>免费送水上门</div>
                            <div>*4</div>
                        </div>
                        <div className={Style.ticket_explain}>价值20元的19L农夫山泉饮用水送水上门</div>
                    </div>
                    <div className={Style.ticket_list}>
                        <div className={Style.ticket_detail}>
                            <div>免费送水上门</div>
                            <div>*4</div>
                        </div>
                        <div className={Style.ticket_explain}>价值20元的19L农夫山泉饮用水送水上门</div>
                    </div>
                    <div className={Style.ticket_list}>
                        <div className={Style.ticket_detail}>
                            <div>免费送水上门</div>
                            <div>*4</div>
                        </div>
                        <div className={Style.ticket_explain}>价值20元的19L农夫山泉饮用水送水上门</div>
                    </div>
                </div>
                <div className={Style.choice}>
                    <p className={Style.choice_title}>以下2选一</p>
                    <div className={Style.choice_list}>
                        <div className={Style.choice_detail}>
                            <div>免费送水上门</div>
                            <div>*4</div>
                        </div>
                    </div>
                    <div className={Style.choice_list}>
                        <div className={Style.choice_detail}>
                            <div>免费送水上门</div>
                            <div>*4</div>
                        </div>
                    </div>
                </div>
                <div className={Style.blank}></div>
                <div className={Style.pay}> 
                    前往支付
                </div>  */}  
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