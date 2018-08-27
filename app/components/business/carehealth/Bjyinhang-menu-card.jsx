import React, { PropTypes } from 'react';
// import RcCollapse from 'rc-collapse';
import './bjyhmenucard.less';

const Assets = function (props, context) {

    const {
        fage,
        click1,
        click2,
        click3,
        click4,
        click5,
        click6,
        click31,
        click32,
        click33,
        click34,
        click35,
        click36,
        click21,
        click22,
        click23,
        click24,
    } = props;

    return (
        <div className="rit-menu-card">
            {fage == "1" ? <div className="rit-card-box">
                <div className="rit-card-list">
                    <div className="rit-card-li" onClick={click1}>
                        <div className="rit-card-li-bg-qichefuwu"></div>
                        <div className="rit-card-li-title">洗车服务</div>
                    </div>
                    <div className="rit-card-li" onClick={click2}>
                        <div className="rit-card-li-bg-qichebaoxian"></div>
                        <div className="rit-card-li-title">汽车保险</div>
                    </div>
                    <div className="rit-card-li" onClick={click3}>
                        <div className="rit-card-li-bg-qichedaikuan"></div>
                        <div className="rit-card-li-title">汽车贷款</div>
                    </div>
                </div>
                <div className="rit-card-list-mager"></div>
                <div className="rit-card-list">
                    <div className="rit-card-li" onClick={click4}>
                        <div className="rit-card-li-bg-meirongyanghu"></div>
                        <div className="rit-card-li-title">美容打蜡</div>
                    </div>
                    <div className="rit-card-li" onClick={click5}>
                        <div className="rit-card-li-bg-daodianbaoyang"></div>
                        <div className="rit-card-li-title">到店保养</div>
                    </div>
                    <div className="rit-card-li" onClick={click6}>
                        <div className="rit-card-li-bg-daolujiuyuan"></div>
                        <div className="rit-card-li-title">道路救援</div>
                    </div>
                </div>
            </div> :null}
            {fage == "2" ? <div className="rit-card-box">
                <div className="rit-card-list">
                    <div className="rit-card-li" onClick={click21}>
                        <div className="rit-card-li-bg-xianshangqianzheng"></div>
                        <div className="rit-card-li-title">线上签证</div>
                    </div>
                    <div className="rit-card-li" onClick={click22}>
                        <div className="rit-card-li-bg-jingwaihuikuan">
                            <div className="rit-card-li-bg-tuichu"></div>
                        </div>
                        <div className="rit-card-li-title">境外汇款</div>
                    </div>
                    <div className="rit-card-li" onClick={click23}>
                        <div className="rit-card-li-bg-jieshouhui">
                            <div className="rit-card-li-bg-tuichu"></div>
                        </div>
                        <div className="rit-card-li-title">结售汇</div>
                    </div>
                    <div className="rit-card-li" style={{paddingRight:" 0.07rem"}} onClick={click24}>
                        <div className="rit-card-li-bg-xinyongka"></div>
                        <div className="rit-card-li-title">信用卡申请</div>
                    </div>
                </div>
            </div> :null}
            {fage == "3" ? <div className="rit-card-box">
                <div className="rit-card-list">
                    <div className="rit-card-li"  onClick={click31}>
                        <div className="rit-card-li-bg-yibaofuwu"></div>
                        <div className="rit-card-li-title">医保服务</div>
                    </div>
                    <div className="rit-card-li" onClick={click36}>
                        <div className="rit-card-li-bg-lvseshipin"></div>
                        <div className="rit-card-li-title">绿色食品</div>
                    </div>
                    <div className="rit-card-li" onClick={click34}>
                        <div className="rit-card-li-bg-yundongdingyue"></div>
                        <div className="rit-card-li-title">运动订场</div>
                    </div>
                    <div className="rit-card-li" onClick={click32}>
                        <div className="rit-card-li-bg-jiankangzixun"></div>
                        <div className="rit-card-li-title">健康咨询</div>
                    </div>
                </div>
                <div className="rit-card-list-mager"></div>
                <div className="rit-card-list">
                    <div className="rit-card-li" onClick={click33}>
                        <div className="rit-card-li-bg-tijianyuyue"></div>
                        <div className="rit-card-li-title">体检预约</div>
                    </div>
                    <div className="rit-card-li" onClick={click35}>
                        <div className="rit-card-li-bg-vip"></div>
                        <div className="rit-card-li-title">贵宾服务</div>
                    </div>
                    
                    <div className="rit-card-li">
                        <div className="rit-card-li-bg" style={{"backgroundColor": "white"}}></div>
                        <div className="rit-card-li-title"></div>
                    </div>
                    <div className="rit-card-li">
                        <div className="rit-card-li-bg" style={{"backgroundColor": "white"}}></div>
                        <div className="rit-card-li-title"></div>
                    </div>
                </div>
            </div> :null}
            {/* {fage == "3" ? <div className="rit-card-box">
                <div className="rit-card-list">
                    <div className="rit-card-li"  onClick={click31}>
                        <div className="rit-card-li-bg"></div>
                        <div className="rit-card-li-title">医疗服务</div>
                    </div>
                    <div className="rit-card-li">
                        <div className="rit-card-li-bg" onClick={click32}></div>
                        <div className="rit-card-li-title">健康咨询</div>
                    </div>
                    <div className="rit-card-li">
                        <div className="rit-card-li-bg" onClick={click33}></div>
                        <div className="rit-card-li-title">体检预约</div>
                    </div>
                    <div className="rit-card-li">
                        <div className="rit-card-li-bg" onClick={click34}></div>
                        <div className="rit-card-li-title">运动场馆预约</div>
                    </div>
                </div>
                <div className="rit-card-list-mager"></div>
                <div className="rit-card-list">
                    <div className="rit-card-li1" onClick={click35}>
                        <div className="rit-card-li-bg"></div>
                        <div className="rit-card-li-title">贵宾服务</div>
                    </div>
                    <div className="rit-card-li">
                        <div className="rit-card-li-bg" onClick={click36}></div>
                        <div className="rit-card-li-title">密农商城</div>
                    </div>
                    <div className="rit-card-li">
                        <div className="rit-card-li-bg" style={{"backgroundColor": "white"}}></div>
                        <div className="rit-card-li-title"></div>
                    </div>
                    <div className="rit-card-li">
                        <div className="rit-card-li-bg" style={{"backgroundColor": "white"}}></div>
                        <div className="rit-card-li-title"></div>
                    </div>
                </div>
            </div> :null} */}
        </div>
    )
}
export default Assets;