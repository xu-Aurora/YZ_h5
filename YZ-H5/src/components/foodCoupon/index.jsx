import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import Style from './index.less'
import Group6 from '../../assets/Group6.png'
import Icon1 from '../../assets/left_gray.png'
import {element} from '../nodata/index'
import {disposeUrl} from '../../utils/dispose'
import Moment from 'moment';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
        let params = disposeUrl()
        if(params) {
            this.props.getList({
                userId: params.userId,
                token: params.token,
                merchantCode: '0001',
                apiName: 'cif.member.ticketDetail'
            }) 
        }
    }
    goBack() {
       back()
    }
    listApply() {
        let children = []
        this.props.list.forEach((item, index) => {
            children.push(
                <div className={Style.list} key={index}>
                    <div className={Style.list_icon}>
                    <img src={Group6} alt=""/>
                    </div>
                    <div className={Style.info}>
                        <div className={Style.info_name}>{item.memo}</div>
                        <div className={Style.info_time}>
                            {item.createTime ? Moment(item.createTime).format("YYYY-MM-DD HH:mm:ss") : ''}
                        </div>
                    </div>
                    <div className={Style.price}>
                       {item.borrowing == 'C' ? `+ ${item.amount}` : `- ${item.amount}` }
                    </div>
                </div>
            )
        });
        return children
    }
    render() {
        return (
            <div className={Style.box}>
                <div className={Style.header}>
                    <div className={Style.header_title}>粮票明细</div>
                    <div  className={Style.header_btn} onClick={this.goBack.bind(this)}>
                        <img src={Icon1} alt=""/>
                    </div>
                </div>             
                { this.props.list.length ? 
                    (
                        <div className={Style.content}>
                            {this.listApply()} 
                        </div>
                    )
                   : element()}
            </div>
        )
    }
}
App.contextTypes = {
    router: PropTypes.object
}
function mapStateToProps(state) {
    return {
        list: state.foodCoupon.list
    }
}
function dispatchToProps(dispatch) {
    return {
        getList(payload, params) {
            dispatch({
              type: 'foodCoupon/getList',
              payload
            })
        }
    }
}

export default connect(mapStateToProps, dispatchToProps)(App);