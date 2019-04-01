import React, { Component } from 'react';
import { Tabs, List, Button,ListView,Modal,Toast } from 'antd-mobile';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import style from './index.less';
import Icon1 from '../../assets/left_gray.png';
import { disposeUrl } from '../../utils/dispose';
import {host} from '../../utils/host';


const alert = Modal.alert;

let urlParams;

let status2 = '';
let initialPage = 0;

class App extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    })
    this.initData = []
    this.state = {
      dataSource,
      isLoading: false,
      hasMore: true,
      currentPage: 1,
      pageSize: 10,
      listData: [],
      height: '100%',
      status: '',
    };
  }

  componentDidMount() {
    if (disposeUrl()) {
      localStorage.setItem('urlParams',JSON.stringify(disposeUrl()));      
    }
    urlParams = JSON.parse(localStorage.getItem('urlParams'));
    if(urlParams) {
      this.props.queryList({
        params:{
          userId: urlParams.userId,
          page: 1,
          size: 10,
          apiName: 'mall.order.list',
          merchantCode: '0001',
          token: urlParams.token,
          status: status2 ? status2 : ''
        },
        func: () => {
          let listData = this.props.listData
          this.initData = listData.list
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.initData),
            listData: listData.list,
          });
          if(listData.list.length < 10) {
            this.setState({
              hasMore: false
            });
          }
        }
      });
    }
    else{
      this.props.queryList({
        params:{
        userId: 'HY201811220948231855',
        page: 1,
        size: this.state.pageSize,
        apiName: 'mall.order.list',
        merchantCode: '0001',
        token: '46ee04d8-bc50-497e-bc43-ac9ec47eb426',
        status: status2 ? status2 : ''
        },
        func: () => {
          let listData = this.props.listData
          this.initData = listData.list
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.initData),
            listData: listData.list,
          });
          if(listData.list.length < 10) {
            this.setState({
              hasMore: false
            });
          }

        }
      });
    }
  }

  //确认收货
  affirm(orderNo,e){
    e.stopPropagation();
    alert('确认收货', '收货前请确认您已收到商品并确认无误!', [
      { 
        text: '确认收货', 
        onPress: () => {
          this.props.confirmReceipt({
            params: {
              userId: urlParams ? urlParams.userId : 'HY201811220948231855',
              orderNo,
              page: 1,
              size: 10,
              apiName: 'mall.order.mng.confirmReceipt',
              merchantCode: '0001',
              token: urlParams ? urlParams.token : '46ee04d8-bc50-497e-bc43-ac9ec47eb426'
            },
            func: () => {
              Toast.success('收货成功 !', 1.5,() => {
                this.props.queryList({
                  params:{
                    userId: urlParams ? urlParams.userId : 'HY201811220948231855',
                    page: 1,
                    size: 10,
                    apiName: 'mall.order.list',
                    merchantCode: '0001',
                    token: urlParams ? urlParams.token : '46ee04d8-bc50-497e-bc43-ac9ec47eb426'
                  },
                  func: () => {
                    // window.location.reload();
                    // let listData = this.props.listData
                    // this.initData = listData.list
                    // this.setState({
                    //   dataSource: this.state.dataSource.cloneWithRows(this.initData),
                    //   listData: listData.list,
                    // });
                    // if(listData.list.length < 10) {
                    //   this.setState({
                    //     hasMore: false,
                    //   });
                    // }
                    this.props.queryList({
                      params:{
                        userId: urlParams.userId,
                        page: 1,
                        size: 10,
                        apiName: 'mall.order.list',
                        merchantCode: '0001',
                        token: urlParams.token,
                        status: status2 ? status2 : ''
                      },
                      func: () => {
                        let listData = this.props.listData
                        this.initData = listData.list
                        this.setState({
                          dataSource: this.state.dataSource.cloneWithRows(this.initData),
                          listData: listData.list,
                        });
                        if(listData.list.length < 10) {
                          this.setState({
                            hasMore: false
                          });
                        }
                      }
                    });



                  }
                });
              });
            }
          });
        }
      },
      { text: '取消', onPress: () => console.log('ok') }
    ])
  }
  //删除订单
  delete(orderNo,e){
    e.stopPropagation();
    alert('删除订单', '是否确认删除该订单?', [
      { 
        text: '确认', 
        onPress: () => {
          this.props.deleteOrder({
            params: {
              userId: urlParams ? urlParams.userId : 'HY201811220948231855',
              page: 1,
              size: 10,
              orderNo,
              apiName: 'mall.order.mng.deleteOrder',
              merchantCode: '0001',
              token: urlParams ? urlParams.token : '46ee04d8-bc50-497e-bc43-ac9ec47eb426'
            },
            func: () => {
              Toast.success('删除订单成功 !', 1.5,() => {
                this.props.queryList({
                  params:{
                    userId: urlParams ? urlParams.userId : 'HY201811220948231855',
                    page: 1,
                    size: 10,
                    apiName: 'mall.order.list',
                    merchantCode: '0001',
                    token: urlParams ? urlParams.token : '46ee04d8-bc50-497e-bc43-ac9ec47eb426'
                  },
                  func: () => {
                    // window.location.reload();
                    // let listData = this.props.listData
                    // this.initData = listData.list
                    // this.setState({
                    //   dataSource: this.state.dataSource.cloneWithRows(this.initData),
                    //   listData: listData.list,
                    // });
                    // if(listData.list.length < 10) {
                    //   this.setState({
                    //     hasMore: false
                    //   });
                    // }
                    this.props.queryList({
                      params:{
                        userId: urlParams.userId,
                        page: 1,
                        size: 10,
                        apiName: 'mall.order.list',
                        merchantCode: '0001',
                        token: urlParams.token,
                        status: status2 ? status2 : ''
                      },
                      func: () => {
                        let listData = this.props.listData
                        this.initData = listData.list
                        this.setState({
                          dataSource: this.state.dataSource.cloneWithRows(this.initData),
                          listData: listData.list,
                        });
                        if(listData.list.length < 10) {
                          this.setState({
                            hasMore: false
                          });
                        }
                      }
                    });

                  }
                });
              });
            }
          });
        }
      },
      { text: '取消', onPress: () => console.log('ok') }
    ])
  }
  //跳转到评价页面
  goEvaluate(orderNo,e){
    e.stopPropagation();
    this.props.saveSelect(orderNo);
    this.context.router.history.push(`/evaluate/${orderNo}`);
  }
  //跳转到收银台
  goPay1(orderNo,e){
    e.stopPropagation();
    window.location.href = `${host}/h5/yd_h5/checkstand.html?orderNo=${orderNo}&token=${urlParams.token}&userId=${urlParams.userId}&type=${3}`;
    goPay();

  }

  //重新组装数据
  loop = (data) => {
    let regNum = /^[0-9]*$/;
    data.forEach((item) => {
        if(regNum.test(item.status)){
          switch (item.status) {
            case "1":
              item.status = "待付款"
              break;
            case "2":
              item.status = "待配送"
              break;
            case "3":
              item.status = "配送中"
              break;
            case "4":
              item.status = "交易完成-待评价"
              break;
            case "5":
              item.status = "已关闭"
              break;
            case "6":
              item.status = "交易完成-已评价"
              break;
            default:
              item.status = "未知状态"
          }
        }

    })
    return data;
  }
  //根据订单不同的状态,展示不同的订单按钮
  btnTypes(status,orderNo){
    let button;
    if(status == '待付款'){
      button = <Button className={style.btnPrimary} onClick={this.goPay1.bind(this,orderNo)} size="small">付款</Button>
    }
    if(status == '待配送'){
      button = '';
    }
    if(status == '配送中'){
      button = <Button onClick={this.affirm.bind(this,orderNo)} size="small">确认收货</Button>
    }
    if(status == '交易完成-待评价'){
      button = <Button onClick={this.goEvaluate.bind(this,orderNo)} size="small">评价</Button>
    }
    if(status == '已关闭'){
      button = <Button onClick={this.delete.bind(this,orderNo)} size="small">删除订单</Button>
    }
    if(status == '交易完成-已评价'){
      button = ''
    }

    return button;
  }
  //点击tab
  handleTab(tab, status){
    status2 = status;
    initialPage = status;
    this.setState({
      currentPage: 1,
      isLoading: false,
      hasMore: true,
      status: status2
    },()=>{
      this.props.queryList({
        params:{
          userId: urlParams ? urlParams.userId : 'HY201811220948231855',
          page: 1,
          apiName: 'mall.order.list',
          merchantCode: '0001',
          token: urlParams ? urlParams.token : '46ee04d8-bc50-497e-bc43-ac9ec47eb426',
          status: status2,
          size: this.state.pageSize
        },
        func: () => {
          let listData = this.props.listData
          this.initData = listData.list
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.initData),
            listData: listData.list,
          });
          if(listData.list.length < 10) {
            this.setState({
              hasMore: false
            });
          }
        }
      });
    })

  }
  onEndReached = (event) => {
    if ( !this.state.hasMore) {
        return false;
    }
    this.setState({ isLoading: true }) 
    setTimeout(() => {
      this.getOutputList();

    }, 1000);
  }
  getOutputList() {
    if(this.state.hasMore){
      this.props.queryList({
        params:{
        userId: urlParams ? urlParams.userId : 'HY201811220948231855',
        page: this.state.currentPage + 1,
        size: this.state.pageSize,
        apiName: 'mall.order.list',
        merchantCode: '0001',
        status: status2,
        token: urlParams ? urlParams.token : '46ee04d8-bc50-497e-bc43-ac9ec47eb426'
        },
        func: () => {
            let listData = this.props.listData
            this.initData =  this.initData.concat(listData.list);
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(this.initData),
              listData: this.state.listData.concat(listData.list),
              currentPage: this.state.currentPage + 1
            });
            if(listData.list.length < 10) {
              this.setState({
                hasMore: false,
                isLoading: false
              });
            }

        }
      });

    }
  }
  //点击数据跳转相应的详情
  goDetail(orderNo,status,businessType){
    this.props.saveSelect(orderNo);
    if(businessType == '1'){    //商品订单
      if(status == '待付款'){
        this.context.router.history.push(`/awaitPay/${orderNo}`);
      }
      if(status == '待配送'){
        this.context.router.history.push(`/awaitDelivery/${orderNo}`);
      }
      if(status == '配送中'){ //物业配送,自取,快递
        this.context.router.history.push(`/deliverying/${orderNo}`);
      }
      if(status == '交易完成-待评价' || status == '交易完成-已评价' || status == '已关闭'){
        this.context.router.history.push(`/complete/${orderNo}`);
      }
    }
    if(businessType == '2'){    //服务订单
      this.context.router.history.push(`/serverDetail/${orderNo}`);
    }

  }

  renderTab1(){
    return (
      <div className={style.icon}>
        <div><img src="./img/qb.png" alt=""/></div>
        <div>全部</div>
      </div>
    )
  }
  renderTab2(){
    return (
      <div className={style.icon}>
        <div><img src="./img/dfk.png" alt=""/></div>
        <div>待付款</div>
      </div>
    )
  }
  renderTab3(){
    return (
      <div className={style.icon}>
        <div><img src="./img/dps.png" alt=""/></div>
        <div>待配送</div>
      </div>
    )
  }
  renderTab4(){
    return (
      <div className={style.icon}>
        <div><img src="./img/psz.png" alt=""/></div>
        <div>配送中</div>
      </div>
    )
  }
  renderTab5(){
    return (
      <div className={style.icon}>
        <div><img src="./img/dpj.png" alt=""/></div>
        <div>待评价</div>
      </div>
    )
  }
  goBack() {
    back()
  }

  tipsText(data) {
    if(data.length > 0) {
      return this.state.isLoading ? 'Loading...' : '没有更多了'
    }else{
      return <div className={style.tipsImg}>
        <img src="./img/no.png" alt=""/>
        <p>没有更多数据</p>
      </div>
    }

  }

  render(){
    const { listData } = this.state;
    const datas = listData ? this.loop(listData) : '';
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    const row = (rowData, sectionID, rowID) => {
      const obj = rowData;
      return (
          <List>
            <List.Item key={obj.id} onClick={this.goDetail.bind(this,obj.orderNo,obj.status,obj.businessType)}>
              <div className={style.listTitle}>
                <div className={style.left}>订单编号&nbsp;:&nbsp;&nbsp;
                  <span>{ obj.orderNo }</span>
                </div>
                <div className={style.right}>{ obj.status }</div>
              </div>
              <div className={style.listContent}>
                <div className={style.boxImg}>
                  <img src={`/common/upload/download?uuid=${obj.orderSkuList[0].pic}&viewFlag=1&fileType=jpg&filename=aa&apiName=common.upload.download&merchantCode=0001`} alt=""/>
                </div>
                <div className={style.goodInfo}>
                  <div className={style.goodName}>
                    { obj.orderSkuList[0].goodName }
                  </div>
                  <div className={style.price}>
                    <span>共{ obj.goodSize }件商品 实付款: </span>
                    <span className={style.yuan}>&yen; </span>
                    <span className={style.yuan}>{ obj.amount }</span>
                  </div>
                </div>
              </div>
              <div className={style.listBottom}>
                <div className={style.left}>{ obj.orderTypeName }</div>
                <div className={style.right}>
                  { this.btnTypes(obj.status,obj.orderNo) }
                </div>
              </div>
            </List.Item>                
          </List>
      );
    };
    const tabs = [
      { title: this.renderTab1() },
      { title: this.renderTab2() },
      { title: this.renderTab3() },
      { title: this.renderTab4() },
      { title: this.renderTab5() },
    ];
    return (
      <div className={style.boxs}>
          <div className={style.header}>
            <div className={style.header_title}>我的订单</div>
            <div className={style.header_btn} onClick={this.goBack.bind(this)}>
                <img src={Icon1} alt=""/>
            </div>
          </div>
          <div className={style.content}>
            <Tabs tabs={tabs} initialPage={ initialPage } onTabClick={this.handleTab.bind(this)}  animated={false} swipeable={false} useOnPan={false}>
              <div className={style.box}>
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    renderFooter={() => (<div style={{textAlign: 'center' }}>
                      { this.tipsText(datas) }
                    </div>)}
                    renderRow={row}
                    renderSeparator={separator}
                    style={{
                      height: this.state.height,
                      overflow: 'auto',
                    }}
                    pageSize={4}
                    scrollRenderAheadDistance={500}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                />
              </div>
            
            </Tabs>
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
    listData: state.orderList.listData,
  }
}
function dispatchToProps(dispatch) {
  return {
    queryList(payload, params) {
      dispatch({type: 'orderList/queryList',payload})
    },
    saveSelect(payload = {}) {
      dispatch({type: 'orderList/save', payload})
    },
    confirmReceipt(payload = {}) {  //确认收货
      dispatch({type: 'orderList/confirmReceipt', payload})
    },
    deleteOrder(payload = {}) {   //删除订单
      dispatch({type: 'orderList/deleteOrder', payload})
    },
  }
}

export default connect(mapStateToProps, dispatchToProps)(App);
