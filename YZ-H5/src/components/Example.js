import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd-mobile';

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }


  member(){
    this.context.router.history.push(`/memberBuy`);
  }
  myCollect(){
    this.context.router.history.push(`/myCollect`);
  }

  render(){
    return (
      <div>
        <Button type="primary" onClick={this.member.bind(this)}>会员购买</Button>
        <Button type="ghost">粮票明细</Button>
        <Button type="ghost" onClick={this.myCollect.bind(this)}>我的收藏</Button>
      </div>
    );
  }

};

Example.contextTypes = {
  router: PropTypes.object
};

export default Example;
