import dva from 'dva';
import Models from './models/index';
import './index.less';

import { Toast} from 'antd-mobile';
// 1. Initialize
const app = dva({
  // history: browserHistory,
   onError(e) { //后台报错信息处理
    Toast.fail(e.message);
   }
 });
// 2. Plugins
// app.use({});

// 3. Model
Object.keys(Models).forEach((item) => {
  app.model(Models[item].default);
})

// 4. Router
app.router(require('./routes/index').default);

// 5. Start
app.start('#root');
