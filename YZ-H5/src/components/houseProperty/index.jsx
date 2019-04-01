import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './index.less';
import {connect} from 'dva';
import Icon1 from '../../assets/left_gray.png';
import Bg from '../../assets/house.jpg';


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
      
        <div className={style.content}>
          <img src={Bg} alt=""/>
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
