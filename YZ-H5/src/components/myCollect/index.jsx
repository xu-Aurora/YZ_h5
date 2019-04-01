import React, { Component } from 'react';
import { Tabs, SwipeAction, List, Toast} from 'antd-mobile';
import PropTypes from 'prop-types';
import style from './index.less';
import {connect} from 'dva';
import Icon1 from '../../assets/left_gray.png'
import {disposeUrl} from '../../utils/dispose'
import {element} from '../nodata/index'

let params = disposeUrl()

const tabs = [
  { title: '商品' },
  { title: '服务' }
];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    
    // if(params) {
      this.props.getFavorites({
        userId: params ? params.userId : 'HY201811220948231855',
        token: params ? params.token : '46ee04d8-bc50-497e-bc43-ac9ec47eb426',
        merchantCode: '0001',
        apiName: 'mall.app.favorites.queryFavoritesList',
        size: 100
      })
    // }
     
  }


  goDetail(id,e) {
    e.stopPropagation();
    goDetail(id);
  }

  listApply() {
    let children = []
    this.props.list.forEach((element, index) => {
      children.push(
        <SwipeAction
            key={index}
            style={{ backgroundColor: 'gray' }}
            autoClose
            right={[
              {
                text: '删除',
                onPress: this.onPress.bind(this, element),
                style: { backgroundColor: '#F4333C', color: 'white' },
              },
            ]}
          >
            <List.Item onClick={this.goDetail.bind(this,element.goodId)}>
              <div className={style.boxImg}>
                <img src={`/common/upload/download?uuid=${element.goodPic}&viewFlag=1&fileType=jpg&filename=aa&apiName=common.upload.download&merchantCode=0001`} alt=""/>
              </div>
              <div className={style.goodInfo}>
                <div className={style.goodName}>
                 {element.goodName}
                </div>
                <div className={style.price}>
                  <span>{element.price}</span>
                </div>
                <div className={style.liangP}>
                  粮票最低可抵<span>{element.ticket}</span>元
                </div>
                { element.isInvalid ? 
                  (<div className={style.failure}>
                    已失效
                  </div>) : null
                }
              </div>
            </List.Item>
          </SwipeAction>
      )
    });
    if(!children.length) {
      children.push((<div className={style.no_data} key={1}>暂无数据</div>))
    }
    return children
  }
  onPress(ele) {
    // let userId = this.props.match.params.userId

    this.props.delFavorites({
      params: {
        favoritesId: ele.id,
        userId: "HY201811220948231855",
        token: params ? params.token : '46ee04d8-bc50-497e-bc43-ac9ec47eb426',
        merchantCode: '0001',
        apiName: 'mall.app.favorites.delFavorites',
      },
      func: () =>{
        Toast.info('删除成功', 1, () =>{
          this.props.getFavorites({
            userId: params ? params.userId : 'HY201811220948231855',
            token: params ? params.token : '46ee04d8-bc50-497e-bc43-ac9ec47eb426',
            merchantCode: '0001',
            apiName: 'mall.app.favorites.queryFavoritesList',
            size: 100
          }) 
        });
      }
    })
  }
  goBack() {
    back()
  }
  render(){
    return (
      <div className={style.boxs}>
        <div className={style.header}>
            <div className={style.header_title} >我的收藏</div>
            <div  className={style.header_btn}  onClick={this.goBack.bind(this)}>
                <img src={Icon1} alt=""/>
            </div>
        </div>
          
          {/* <Tabs tabs={tabs} page={0} animated={false} swipeable={false} useOnPan={false}> */}
            
            { this.props.list.length ? 
              (
                <div className={style.box}>
                  <List>
                    {this.listApply()} 
                  </List>
                </div>
              )
              : element()}
            {/* <div className={style.box}>
              服务
            </div> */}
          {/* </Tabs> */}
      </div>
    );
  }

};

App.contextTypes = {
  router: PropTypes.object
};
function mapStateToProps(state) {
  return {
    list: state.myCollect.list
  }
}
function dispatchToProps(dispatch) {
  return {
      getFavorites(payload, params) {
          dispatch({
            type: 'myCollect/getFavorites',
            payload
          })
      },
      delFavorites(payload, params) {
        dispatch({
          type: 'myCollect/delFavorites',
          payload
        })
      }
  }
}
export default connect(mapStateToProps, dispatchToProps)(App);
