 //返回操作
 function back() {
    var us = navigator.userAgent;
    var isAndroid = !!us.match(/android/ig);
    if(isAndroid){
        window.WebViewJavascriptBridge.callHandler(
            'back'
        ); 
    }
 }
 // 收藏去详情
 function goDetail(id) {
    var us = navigator.userAgent;
    var isAndroid = !!us.match(/android/ig);
      if(isAndroid){
        window.WebViewJavascriptBridge.callHandler(
            'goDetail',
            {"id": id}
        ); 
      }
}
//跟app交互的方法
function gotoMemberInnerPage(params) {
    console.log(params)
    var us = navigator.userAgent;
    var isAndroid = !!us.match(/android/ig);
      if(isAndroid){
        window.WebViewJavascriptBridge.callHandler(
            'gotoMemberInnerPage',
            {"url": params}
        ); 
      }
}
//android 拨打电话
function goCall(params) {
    console.log(params)

    var us = navigator.userAgent;
    var isAndroid = !!us.match(/android/ig);
      if(isAndroid){
        window.WebViewJavascriptBridge.callHandler(
            'goCall',
            {"url": params}
        ); 
      }
}

//传给安卓的方法
function goPay() {
  var us = navigator.userAgent;
  var isAndroid = !!us.match(/android/ig);
    if(isAndroid){
      window.WebViewJavascriptBridge.callHandler(
          'goPay',
          {}
      ); 
    }
}
