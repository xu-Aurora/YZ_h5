import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './index.less';
import {connect} from 'dva';
import { disposeUrl } from '../../utils/dispose';
import Icon1 from '../../assets/left_gray.png';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  goBack() {
    back()
  }


  render(){
    return (
      <div className={style.boxs}>
        <div className={style.header}>
          <div className={style.header_title}>帮助中心</div>
          <div className={style.header_btn} onClick={this.goBack.bind(this)}>
              <img src={Icon1} alt=""/>
          </div>
        </div>
        <div className={style.box}>
          <h4>1、关于佳家</h4>
          <p className={style.textIndent}>
            佳家是佳源服务业主的官方平台，全面升级物业服务，为业主打造了从购房到入住的一站式生活服务平台，实现园区生活智慧化，为业主提供易捷、健康的理想生活。佳家整合了佳源全系服务资源，提供品质生活服务，让社区生活更加精彩。
          </p>
          <br/>
          <h4>2、注册</h4>
          <p>
            1）检查当前手机信号，如无信号会影响接收短信；
          </p>
          <p>
            2）检查是否关闭了网络，如关闭了则需开启才能收到验证码，检查路径：
          </p>
          <p className={style.textIndent}>
            苹果手机：设置——佳家——蜂窝移动数据；
          </p>
          <p className={style.textIndent}>
            安卓手机：因各手机品牌不同而有所不同
          </p>
          <p className={style.textIndent}>
            如安卓手机无法确定是否关闭网络，可卸载软件后重新下载，对于提出的问题全部点击允许即可确保APP的正常使用
          </p>
          <br/>
          <h4>3、怎样更改绑定的手机号码？</h4>
          <p className={style.textIndent}>
            点击APP右下角“我的”—“设置”—“手机”中修改绑定的手机号码。
          </p>
          <br/>
          <h4>4、如何在APP上新增房屋（适用于佳家有多套房产业主/住户）？</h4>
          <p className={style.textIndent}>
            点击APP右下角“我的”—“我的地址”—“新增其他房屋”中新增房屋。
          </p>
          <br/>
          <h4>5、忘记登录密码怎么办？</h4>
          <p className={style.textIndent}>
            打开APP登录页面，使用“验证码登录”即可。
          </p>
          <br/>
          <h4>6、如何修改登录密码？</h4>
          <p className={style.textIndent}>
            点击APP右下角“我的”—“设置”—“登录密码”中修改登录密码。
          </p>
          <br/>
          <h4>7、如何添加家庭成员？</h4>
          <p className={style.textIndent}>
            此功能只对已完成认证的业主开放，点击APP右下角“我的”—“我的家庭组”—“新增家庭成员”中添加家庭成员
          </p>
          <br/>
          <h4>8、我在APP上进行了服务报修，为什么一直显示“待处理”？</h4>
          <p className={style.textIndent}>
            业主在线申请报修后，如24小时未有服务跟踪，请联系该项目物业服务中心。点击APP左下角“首页”—“电话”中找到服务中心的电话。
          </p>
          <br/>
          <h4>悦站商城</h4>
          <h4>1、怎么查看我的订单及详情？</h4>
          <p className={style.textIndent}>
            可在购买商品时选择开具发票，包括电子发票和纸质发票。确认收货后可在“我的订单”中进行查看对应的发票，纸质发票可在物业服务中心领取。
          </p>
          <br/>
          <h4>关于支付</h4>
          <h4>1、一共有几种付款方式？</h4>
          <p className={style.textIndent}>
            目前支持支付宝、微信、银联三种支付方式。
          </p>
          <br/>
          <h4>2、付款不成功怎么办？</h4>
          <p className={style.textIndent}>
            如您在付款页面无法正常完成付款，请不要重复提交。
          </p>
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

  }
}
function dispatchToProps(dispatch) {
  return {

  }
}
export default connect(mapStateToProps, dispatchToProps)(App);
