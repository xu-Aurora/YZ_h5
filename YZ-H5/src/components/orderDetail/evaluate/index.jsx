import React, { Component } from 'react';
import { List,TextareaItem,Toast } from 'antd-mobile';
import { Upload, Icon } from 'antd';
import PropTypes from 'prop-types';
import Rate from 'react-star-rating-component';
import {connect} from 'dva';
import { createForm } from 'rc-form';
import style from './index.less';

import Icon1 from '../../../assets/left_gray.png';

let urlParams;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      satisfaction: 0,
      timelyDelivery: 0,
      attitude: 0,
      evaluateData: [],
      fileList: [],
      previewVisible: false,
      previewImage: "",
      requestStatus: true,
    };
  }

  componentDidMount(){
    urlParams = JSON.parse(localStorage.getItem('urlParams'));

    this.props.queryDetail({
      params: {
        userId: urlParams ? urlParams.userId : 'HY201811220948231855',
        orderNo: this.props.match.params.orderNo,
        apiName: 'mall.order.mng.orderEvaluationDetails',
        merchantCode: '0001',
        token: urlParams ? urlParams.token : '46ee04d8-bc50-497e-bc43-ac9ec47eb426'
      },
      func: () => {
        let evaluateData = this.props.evaluateData
        evaluateData.forEach(item=>{
          item.content = ''
          item.evaluationPic = ''
          item.fileList = []
        })
        this.setState({
          evaluateData
        })
      }
    })
    
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

  onStarClick1(nextValue, prevValue, name) {
    this.setState({satisfaction: nextValue});
  }
  onStarClick2(nextValue, prevValue, name) {
    this.setState({timelyDelivery: nextValue});
  }
  onStarClick3(nextValue, prevValue, name) {
    this.setState({attitude: nextValue});
  }

  //上传图片
  handleCancel = () => this.setState({ previewVisible: false });
  handleChange (data, file){

    let list = [];
    this.state.evaluateData.forEach(item => {
      list.push(Object.assign({}, item))
    })

    
      list.forEach(item => {
        if(item.id == data.id) {
          if(file.file.size > 50) {
            item.fileList = file.fileList
          }

        }
      })

    this.setState({ 
      evaluateData: list
    });




  }
  //校验上传图片
  checkImg(file, fileList) {
    if (!/image/.test(file.type)) {
        Toast.fail('文件必须为图片！');
        return false;
    }
    if (file.size > 1000000) {
        Toast.fail('图片不能超过1M！');
        return false;
    }
    return true;
  }
  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };


  //提交
  submit1(){
    if(this.state.satisfaction == 0 || this.state.timelyDelivery == 0 || this.state.attitude == 0) {
      Toast.fail('请对商品进行评价 !');
      return false;
    }


    //处理图片
    let list = []
    this.state.evaluateData.forEach(item=>{
      list.push(Object.assign({},item))
    })
    let goodEvaluation = []
    list.forEach((item) => {
      goodEvaluation.push({
        content: item.content,
        evaluationPic: item.fileList.length > 0 ? item.fileList[0].response.data : '',
        goodId: item.goodId,
        goodName: item.goodName,
        skuId: item.skuId,
        skuName: item.skuName,
        skuCode: item.skuCode,
        goodPic: item.pic
      })
    })

    if(this.state.requestStatus){
      this.setState({requestStatus: false},() => {
        this.props.evaluate({
          params: {
            userId: urlParams ? urlParams.userId : 'HY201811220948231855',
            apiName: 'mall.order.mng.evaluate',
            token: urlParams ? urlParams.token : '46ee04d8-bc50-497e-bc43-ac9ec47eb426',
            attitude: this.state.attitude,
            satisfaction: this.state.satisfaction,
            timelyDelivery: this.state.timelyDelivery,
            orderNo: this.props.match.params.orderNo,
            authentication: '1',
            userName: urlParams.userName ? urlParams.userName : urlParams.userPhone,
            userPhone: urlParams ? urlParams.userPhone : '',
            headPic: urlParams ? urlParams.headPic : '',//用户头像,app传过来
            goodEvaluationJson: JSON.stringify(goodEvaluation),
            merchantCode: '0001',
          },
          func: () => {
            Toast.success('评价成功 !', 1.5,() => {
              this.context.router.history.push(`/myOrder?userId=${urlParams.userId}&token=${urlParams.token}&userName=${urlParams.userName}&userPhone=${urlParams.userPhone}`);
            });
          }
        })
      })
    }


  }
  evaluateApply(){
    const { getFieldProps } = this.props.form;
    const uploadButton = (
      <Icon type="plus" style={{fontSize: 30 }} />
    );
    let children = []
    this.state.evaluateData.forEach((item) => {
      children.push(
          <div key={ item.id }>
              <div className={style.box}>
                <List>
                  <List.Item>
                    <div className={style.boxImg}>
                      <img src={`/common/upload/download?uuid=${item.pic}&viewFlag=1&fileType=jpg&filename=aa&apiName=common.upload.download&merchantCode=0001`} alt=""/>
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
              <TextareaItem
                  {...getFieldProps('note1')}
                  rows={5}
                  value={item.content}
                  placeholder="请输入评价内容"
                  onChange={this.handleComm.bind(this, item)}
              />
              <Upload
                  action={`/common/upload/upLoad?merchantCode=${'0001'}&apiName=${'common.upload.upLoad'}`}
                  name={'files'}
                  // beforeUpload={this.checkImg}
                  listType="picture-card"
                  fileList={ item.fileList }
                  onPreview={this.handlePreview}
                  onChange={this.handleChange.bind(this,item)}
                >
                  { item.fileList.length >= 3 ? null : uploadButton }
              </Upload>
          </div>
      )
    })
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
    const { attitude,satisfaction,timelyDelivery } = this.state;

    return (
      <div className={style.boxs}>
        <div className={style.header}>
          <div className={style.header_title}>评价</div>
          <div  className={style.header_btn} onClick={this.goBack.bind(this)}>
              <img src={Icon1} alt=""/>
          </div>
          <div className={style.header_save} onClick={this.submit1.bind(this)}>提交</div>
        </div>
        { this.evaluateApply() }

        <div className={style.line}>
        
        </div>

        <div className={style.evaluate}>
          <h3>商品评价</h3>
          <div className={style.rate}>
            <div className={style.left}>商品满意</div>
            <Rate 
              name="satisfaction"
              starColor={'#FDD80C'}
              emptyStarColor={'#E9E9E9'}
              starCount={5}
              value={satisfaction}
              onStarClick={this.onStarClick1.bind(this)}
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
              onStarClick={this.onStarClick2.bind(this)}
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
              onStarClick={this.onStarClick3.bind(this)}
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
    evaluateData: state.orderList.evaluateData1,
    orderNo: state.orderList.saveSeslect,
    imgInfo: state.orderList.imgInfo
  }
}
function dispatchToProps(dispatch) {
  return {
    queryDetail(payload, params) {
      dispatch({type: 'orderList/evaluateDetail1',payload})
    },
    evaluate(payload, params) { //评价
      dispatch({type: 'orderList/evaluate',payload})
    },
    queryList(payload, params) {
      dispatch({type: 'orderList/queryList',payload})
    },
    upLoadRKey(payload, params) {
      dispatch({type: 'orderList/upLoadRKey',payload})
    },
  }
}

export default connect(mapStateToProps, dispatchToProps)(createForm()(App));

