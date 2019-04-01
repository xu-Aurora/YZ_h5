import React, { Component } from 'react';
import { List,ImagePicker,TextareaItem,Button,Toast } from 'antd-mobile';
import PropTypes from 'prop-types';
import Rate from 'react-star-rating-component';
import {connect} from 'dva';
import { createForm } from 'rc-form';
import style from './index.less';
import {disposeUrl} from '../../../utils/dispose'

import Icon1 from '../../../assets/left_gray.png';

let params = disposeUrl()

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      satisfaction: 0,
      timelyDelivery: 0,
      attitude: 0,
      evaluateData: [],
      fileList: []
    };
  }

  componentDidMount(){

    // if(params) {
        this.props.haveEvaluate({
        params: {
            userId: params ? params.userId : 'HY201811220948231855',
            token: params ? params.token : '46ee04d8-bc50-497e-bc43-ac9ec47eb426',
            orderNo: this.props.match.params.orderNo,
            apiName: 'mall.order.mng.getGoodEvaluationByOrderNo',
            merchantCode: '0001',
        },
        func: () => {
            let goodEvaluations = this.props.evaluateInfo.goodEvaluations
            let order = this.props.evaluateInfo.order
            this.setState({
                evaluateData: goodEvaluations,
                attitude: Number(order.attitude),
                timelyDelivery: Number(order.timelyDelivery),
                satisfaction: Number(order.satisfaction),

            })
        }
        })
    // }
  }


  handleImg (params, files, type) {
    let list = []
    this.state.evaluateData.forEach(item=>{
      list.push(Object.assign({}, item))
    })
    list.forEach(item=>{
      if(params.id == item.id) {
        item.files = files
      }
    })
    this.setState({
      evaluateData: list
    });
  }

  evaluateApply(){
    const { getFieldProps } = this.props.form;
    let children = []
    this.state.evaluateData.forEach((item) => {
      children.push(
          <div className={style.listItem} key={ item.id }>
              <div className={style.box}>
                <List>
                  <List.Item>
                    <div className={style.boxImg}>
                      <img src={`/common/upload/download?uuid=${item.goodPic}&viewFlag=1&fileType=jpg&filename=aa&apiName=common.upload.download&merchantCode=0001`} alt=""/>
                    </div>
                    <div className={style.goodInfo}>
                      <div className={style.goodName}>
                        { item.goodName }
                      </div>
                      <div className={style.spec}>
                        { item.skuName }
                      </div>
                    </div>
                  </List.Item>
                </List>
              </div>

              <div className={style.content}>
                  {item.content}
              </div>
              {this.imgApply(item.evaluationPic)}

              {/* <TextareaItem
                  {...getFieldProps('note1')}
                  rows={3}
                  value={item.content}
                  placeholder="请输入评价内容"
                  onChange={this.handleComm.bind(this, item)}
              />
              <ImagePicker
                length="3"
                files={item.files}
                onChange={this.handleImg.bind(this,item)}
                selectable={item.files.length < 3}
                multiple={false}
              /> */}
          </div>
      )
    })
    return children
  }
  imgApply(param) {
    let children = []

      if(param) {
        let list = param.split(',')
        list.forEach((item, index)=>{
            children.push(
                <div className={style.box}  key={index}>
                    <div className={style.boxImg}>
                        <img src={`/common/upload/download?uuid=${item}&viewFlag=1&fileType=jpg&filename=aa&apiName=common.upload.download&merchantCode=0001`} alt=""/>
                    </div>
                </div>
            )
        })
      }
     
      return children
  }
  handleComm(param, val) {
    let list = []
    this.state.evaluateData.forEach(item=>{
      list.push(Object.assign({}, item))
    })
    list.forEach(item=>{
      if(item.id == param.id) {
        item.content = val
      }
    })
    this.setState({
      evaluateData: list
    })
  }

  goBack() {
    this.context.router.history.goBack()
  }


  render(){

    const { attitude,satisfaction,timelyDelivery,files } = this.state;
    // const { evaluateData } = this.props;
    // const data = evaluateData ? evaluateData : '';
    return (
      <div className={style.boxs}>
        <div className={style.header}>
          <div className={style.header_title}>评价</div>
          <div  className={style.header_btn} onClick={this.goBack.bind(this)}>
              <img src={Icon1} alt=""/>
          </div>
        </div>
        { this.evaluateApply() }
        <div className={style.evaluate}>
          <h3 className={style.evaluateTitle}>商品评价</h3>
          <div className={style.rate}>
            <div className={style.left}>商品满意</div>
            <Rate 
              name="satisfaction"
              starColor={'#FDD80C'}
              emptyStarColor={'#E9E9E9'}
              starCount={5}
              value={satisfaction}
            />
          </div>
          <div className={style.rate}>
            <div className={style.left}>商品及时</div>
            <Rate 
              name="timelyDelivery"
              starColor={'#FDD80C'}
              emptyStarColor={'#E9E9E9'}
              starCount={5}
              value={timelyDelivery}
            />
          </div>
          <div className={style.rate}>
            <div className={style.left}>服务态度</div>
            <Rate 
              name="attitude"
              starColor={'#FDD80C'}
              emptyStarColor={'#E9E9E9'}
              starCount={5}
              value={attitude}
            />
          </div>
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
    evaluateInfo: state.orderList.evaluateInfo
  }
}
function dispatchToProps(dispatch) {
  return {
    haveEvaluate(payload, params) {
      dispatch({type: 'orderList/haveEvaluate',payload})
    }
  }
}

export default connect(mapStateToProps, dispatchToProps)(createForm()(App));

