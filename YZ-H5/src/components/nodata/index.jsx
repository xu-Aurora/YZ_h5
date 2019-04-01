import img from '../../assets/nodata.png'
import style from './index.less';

export function element() {
    return (
        <div className={style.box}>
            <img src={img} alt=""/>
            <div>没有相关数据</div>
        </div>
    )
}
