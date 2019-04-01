import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './index.less';
import {connect} from 'dva';
import Icon1 from '../../assets/left_gray.png';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  goBack() {
    this.context.router.history.goBack()
  }


  render(){
    return (
      <div className={style.boxs}>
        <div className={style.header}>
          <div className={style.header_title}>粮票购买协议</div>
          <div className={style.header_btn} onClick={this.goBack.bind(this)}>
              <img src={Icon1} alt=""/>
          </div>
        </div>
        <div className={style.box}>
          <p className={style.textIndent}>
            本协议是您与佳家平台之间就佳家粮票套餐购买所订立的契约。请您仔细阅读本协议，您点击"前往支付"按钮后，本协议即构成对双方有约束力的法律文件。
          </p>
          <br/>
          <h4>第1条 本协议的确认</h4>
          <p className={style.textIndent}>
            1.1用户点击前往支付的，即视为用户确认自己同意接受粮票购买协议相关服务的条款，且同意按本协议内容履行，如产生用户相关责任的，同意承担相应法律责任。
          </p>
          <p className={style.textIndent}>
            1.2粮票套餐购买成功后不允许退款，请在购买前确认。
          </p>
          <p className={style.textIndent}>
            1.3套餐中赠送的粮票及卡券为赠送物品，没有现金价值。
          </p>
          <p className={style.textIndent}>
            1.4套餐中赠送的卡券将以电子券的形式放置“我的卡券”中。
          </p>
          <br/>
          <h4>第2条 会员权益</h4>
          <p className={style.textIndent}>
            您购买套餐可成为佳家会员，享受的权益以佳家公布的信息为准。为更好的向会员提供服务，佳家有权基于自身业务发展需要调整全部或部分会员权益。佳家就前述权益调整将在相应服务页面进行通知或公告，您可以通过佳家APP查询最新的会员权益内容。
          </p>
          <br/>
          <h4>第3条 协议更新</h4>
          <p className={style.textIndent}>
            根据国家法律法规变化及网站运营需要，佳家有权以网站公告的方式进行不定期地制定、修改本协议及/或相关服务规则，暂停、取消和修改本协议条款，修改后的协议一旦被公告在本站上即生效，并代替原来的协议。用户应及时关注不时发布的各项服务规则及本协议的变更。若不同意相关规则及条款修改的，应及时终止与本站的协议。如用户继续使用本网站提供的服务的，即视为同意更新后的协议。
          </p>
          <br/>
          <h4>第4条 其他</h4>
          <p className={style.textIndent}>
            4.1如因不可抗力或其它本站无法控制的原因使本站活动服务无法及时提供或无法按本协议进行的，佳家会合理地尽力协助处理善后事宜。
          </p>
          <p className={style.textIndent}>
            4.2用户除遵守该粮票购买协议外，仍应同时遵守《用户服务协议》。
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
