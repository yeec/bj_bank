import React, { PropTypes } from 'react';
// import RcCollapse from 'rc-collapse';
import './bjcaed.less';

const Assets = function (props, context) {

    const {
        fages,
        title,
        data,
        lastBenchmark,
        lastBenchmarkdian
    } = props;

    return (
        <div className="rit-li-card">
            <div className="rit-li-card-top">
             {fages == "1" ? <div className="rit-li-card-top-lftbg"></div> : <div className="rit-li-card-top-lftbg1"></div>}
                <div className="rit-li-card-top-title">{title}</div>
                {fages == "1" ? null : <div className="rit-li-card-top-biaozhi"></div>}
            </div>
            {fages == "1" ? <div className="rit-li-card-buttom1">
                <div className="rit-li-card-buttom1-left">最高20万</div>
                <div className="rit-li-card-buttom1-left">最长3年</div>
            </div> : <div className="rit-li-card-buttom">
                {/*<div className="rit-li-card-buttom-cp">
                                    <div className="rit-li-card-buttom-cp-left">
                                        
                                        <div className="rit-li-card-buttom-cp-left-bafenb">
                                            <span className="rit-li-card-buttom-cp-left-bafenbs">{lastBenchmark}</span>
                                            <span className="rit-li-card-buttom-cp-left-span">{lastBenchmarkdian}</span>
                                        </div>
                                        <div className="rit-li-card-buttom-cp-left-jizhunlv">业绩比较基准</div>
                                    </div>
                                    <div className="ryt-boder"></div>
                                    <div className="rit-li-card-buttom-cp-right">
                                        <div className="rit-li-card-buttom-cp-right-qgjine">50,000<span className="rit-li-card-buttom-cp-right-span">元起购</span></div>
                                        <div className="rit-li-card-buttom-cp-right-leixing">{data}</div>
                                    </div>
                                </div>*/}
                <div style={{position:"relative"}}>
                    <div style={{overflow:"hidden"}}>
                        <span className="rit-li-card-buttom-cp-left-bafenb">
                            <span className="rit-li-card-buttom-cp-left-bafenbs">{lastBenchmark}</span>
                            <span className="rit-li-card-buttom-cp-left-span">{lastBenchmarkdian}</span>
                        </span>
                        <span className="rit-li-card-buttom-cp-right">
                            <div className="rit-li-card-buttom-cp-right-qgjine">50,000<span className="rit-li-card-buttom-cp-right-span">元起购</span></div>
                        </span>
                    </div>
                    <div style={{overflow:"hidden"}}>
                        <span className="rit-li-card-buttom-cp-left-jizhunlv">业绩比较基准</span>
                        <span className="rit-li-card-buttom-cp-right-leixing">{data}</span>
                    </div>
                    <div className="ryt-boder"> </div>
                </div>
            </div>
             }

        </div>
    )
}
export default Assets;