import React from 'react';
import './chujingjinrong.less';
import MenuCard from '../../components/business/carehealth/Bjyinhang-menu-card'
// import bjdevice from "../utils/EMPJSBridge-1.0.0.js";


class Chujingjinrong extends React.Component {
    // static contextTypes = {
    //     history: React.PropTypes.object.isRequired
    // }
    constructor() {
        super();
        this.state = {
            contentlist : [],
            huilvlist : [],
        }
    }

    componentWillMount(){
        var me = this;
        var guoqiarry = [];
        // bjdevice.doEMPFunction("exchangeRate","13","");            
        setTimeout(() => { 
            var huilvlists = exchangeRateList;
            for (var i = 0; i < huilvlists.length; i++) {
                guoqiarry.push(huilvlists[i]["EN_USME"]);
                console.log(guoqiarry)
            }
            for (var x = 0; x < guoqiarry.length; x++) {
                var ming = guoqiarry[x];
                // var guoqilist = ["AUD","CAD","CHF","EUR","GBP","HKD","JPY","NZD","SEK","USD"];
                if(ming !== "AUD" && ming !== "CAD" && ming !== "CHF" && ming !== "EUR" && ming !== "GBP" && ming !== "HKD" && ming !== "JPY" && ming !== "NZD" && ming !== "SEK" && ming !== "USD"){
                    // aaa.push(x);
                    delete huilvlists[x]
                    // huilvlists.delete(x)
                }
            }
            me.setState({
                huilvlist : huilvlists,
            })               
            // alert(JSON.stringify(exchangeRateList)) 
        }, 500);
    }

    componentDidMount(){
        
        //var me = this;
        //var guoqiarry = [];
        // var huilvlists = [
        //     {
        //         "currency":"12",
        //         "tranDate":"20180623",
        //         "EN_USME":"GBP",
        //         "ZH_CNME":"英镑",
        //         "middlePrice":"8704500",
        //     },
        //     {
        //         "currency":"14",
        //         "tranDate":"20180623",
        //         "EN_USME":"SDD",
        //         "ZH_CNME":"美元",
        //         "middlePrice":"6839400",
        //     },
        //     {
        //         "currency":"13",
        //         "tranDate":"20180623",
        //         "EN_USME":"HKD",
        //         "ZH_CNME":"港币",
        //         "middlePrice":"4567865",
        //     },
        //     {
        //         "currency":"14",
        //         "tranDate":"20180623",
        //         "EN_USME":"CpD",
        //         "ZH_CNME":"港币",
        //         "middlePrice":"877000",
        //     },
        //     {
        //         "currency":"14",
        //         "tranDate":"20180623",
        //         "EN_USME":"NZD",
        //         "ZH_CNME":"港币",
        //         "middlePrice":"877000",
        //     },
        // ]
        // console.log("22"+huilvlists)
        // for (var i = 0; i < huilvlists.length; i++) {
        //     guoqiarry.push(huilvlists[i]["EN_USME"]);
        //     console.log(guoqiarry)
        // }
        // for (var x = 0; x < guoqiarry.length; x++) {
        //     var ming = guoqiarry[x];
        //     if(ming !== "AUD" && ming !== "CAD" && ming !== "CHF" && ming !== "EUR" && ming !== "GBP" && ming !== "HKD" && ming !== "JPY" && ming !== "NZD" && ming !== "SEK" && ming !== "USD"){
        //         delete huilvlists[x]
        //         // $(".listboxs:eq("+key+") .listtext").focus(); //.box2 li
        //         // $("#zhanweibox").css({"display":"none"});
        //     }
        // }
        // // console.log("111"+huilvlists)
        // me.setState({
        //     huilvlist : huilvlists,
        // })
    }

    gotoWHPage = jyType => {
        var service = "";
        var ewpType = "";
        //消费优计划
        if(jyType === "xiafeiyou"){
            //service = "https://marketing.unionpayintl.com/gmpapp/jsp/100120156/index.jsp";
            //test
            //service = "https://marketing-test.unionpayintl.com/gmpapp/validate.do";
            service = "http://219.237.75.67:8896/#/formpage";
            ewpType = "beidongdenglu";
        }
        //线上签证
        if(jyType === "xianshangqianzheng" || jyType === "gengduoguojia"){
            service = "https://dh.visahall.cn/bjyhApp/noLogin_authorize.action?openId=";
            ewpType = "beidongdenglu";
        }
        //我的签证
        if(jyType === "qianzheng"){
            service = "https://dh.visahall.cn/bjyhApp/noLogin_authorize.action?alone=myOrder&openId=";
            ewpType = "beidongdenglu";
        }
        //信用卡
        if(jyType === "xinyongka"){
            service = "https://web.cupdata.com/coas/rcmmd/mb/showCard?openId=";
            ewpType = "beidongdenglu";
        }
        //境外汇款 结售汇
        if(jyType === "jingwaihuikuan" || jyType === "chuxuhui"){
            ewpType = "tankuang_none";
            service = "";
        }

        //visa卡申请
        if(jyType === "visa"){
            service = "https://web.cupdata.com/coas/second/mb/card?cardId=12675";
            ewpType = "no_login";
        }
        //master卡申请
        if(jyType === "master"){
            service = "https://web.cupdata.com/coas/second/mb/card?cardId=12673";
            ewpType = "no_login";
        }
        //悦行加拿大
        if(jyType === "canada"){
            service = "https://www.visahall.cn/bjyhClient/noLogin_toSelectProduct.action?req.nationId=11&req.provinceld=7";
            ewpType = "no_login";
        }
        //行前准备
        if(jyType === "zhunbei1"){
            service = "https://mp.weixin.qq.com/s/89eruBtPLh2VSD-Bt2fvMA";
            ewpType = "no_login";
        }
        //出国留学
        if(jyType === "zhunbei2"){
            service = "https://mp.weixin.qq.com/s/G9LxWcTuIRK2TshQlJXXjg";
            ewpType = "no_login";
        }
        //出境贴士
        if(jyType === "zhunbei3"){
            service = "https://mp.weixin.qq.com/s/gSJYSthfrzHMdqWzASB0Lw";
            ewpType = "no_login";
        }
        //泰国
        if(jyType === "reTaiguo"){
            service = "https://dh.visahall.cn/bjyhApp/noLogin_authorize.action?alone=28&openId=";
            ewpType = "beidongdenglu";
        }

        //德国
        if(jyType === "reDeguo"){
            service = "https://dh.visahall.cn/bjyhApp/noLogin_authorize.action?alone=15&openId=";
            ewpType = "beidongdenglu";
        }
        //法国
        if(jyType === "reFaguo"){
            service = "https://dh.visahall.cn/bjyhApp/noLogin_authorize.action?alone=14&openId=";
            ewpType = "beidongdenglu";
        }
        bjdevice.doEMPFunction(ewpType,jyType,service);
    }
    gotoEwpPage = jyType => {
        bjdevice.doEMPFunction(jyType,"","");
    }

    //外汇牌价
    goWhpaijia(){
        bjdevice.doEMPFunction("paijia","","");
    }

    render() {
        // setInterval(function(){
            // alert("11111111111111111111111")
        // },500000)
        var me = this;
        var huilv;
        var lvbaoliu;
        var lvbaolius
        // var guoqilist = ["AUD","CAD","CHF","EUR","GBP","HKD","JPY","NZD","SEK","USD"];
        // console.log("111"+me.state.huilv list)
        huilv = me.state.huilvlist.map(function(item,key){
            console.log(item)
            //8.7703
            var lv = item.middlePrice;
            lvbaoliu = 1000000*100/lv;
            lvbaoliu = lvbaoliu.toString();
            var weishu = lvbaoliu.indexOf(".")
            lvbaolius = lvbaoliu.substring(0,weishu + 5);
            var cc = Number(lvbaolius).toFixed(4)
            // alert(lvbaoliu)dist\app\images
            return<li className="lis" key={key}>
                    <div className={"lunbo-shikou"+key}>
                        <div className="image-bg" onClick={me.goWhpaijia.bind(me)}>
                            <div className="image-bg-box">
                            <div className="image-bg-icon" style={{"backgroundImage":'url(images/'+item["EN_USME"]+'.png)'}}>
                                    {/*<img className="img-lunbo" src={}/>*/}
                                </div>
                                <div className="duihuanlv">
                                    <span>100人民币=</span>
                                    <span>{cc + item["ZH_CNME"]}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
        })

        return (
            <div>
                <div className="bjyh-cjlx">
                    <div className="rit-qichefuwu-banner"></div>
                    <div className="rit-qichefuwu-box">
                        <MenuCard fage="2" click21={me.gotoWHPage.bind(me,"xianshangqianzheng")} 
                        click22={me.gotoWHPage.bind(me,"jingwaihuikuan")} 
                        click23={me.gotoWHPage.bind(me,"chuxuhui")} 
                        click24={me.gotoWHPage.bind(me,"xinyongka")} 
                        />
                    </div>
                    <div className="waihuiduihuan">
                        <div className="waihuiduihuan-text">外汇牌价</div>
                        <div className="left-boder"></div>
                        <ul className="box2" id="boxs">
                            {huilv}
                        </ul>
                    </div>
                    <div className="nav-title">
                        <div className="nav-boder-left"></div>
                        <div className="nav-boder-title">悦行世界签</div>
                        <div className="nav-boder-gengduo qianzheng" onClick={me.gotoWHPage.bind(me,"qianzheng")}>我的签证</div>
                    </div>
                    <div className="shijieqian-list">
                        <div className="ryt-gg-hight"></div>
                        <div className="shijieqian-list-bg taiguo" onClick={me.gotoWHPage.bind(me,"reTaiguo")} ></div>
                        <div className="ryt-gg-hight"></div>
                        <div className="shijieqian-list-bg deguo" onClick={me.gotoWHPage.bind(me,"reDeguo")}></div>
                        <div className="ryt-gg-hight"></div>
                        <div className="shijieqian-list-bg faguo" onClick={me.gotoWHPage.bind(me,"reFaguo")}></div>
                        <div className="ryt-gg-hight"></div>
                        <div className="rit-gengduo" onClick={me.gotoWHPage.bind(me,"gengduoguojia")}>更多国家 ›</div>
                    </div>
                    <div className="mage-higth"></div>
                    <div className="nav-title">
                        <div className="nav-boder-left"></div>
                        <div className="nav-boder-title">信用卡申请</div>
                    </div>
                    <div className="rit-xinyongka">
                        <div className="rit-xinyongka-box">
                            <div className="rit-xinyongka-box-caer" onClick={me.gotoWHPage.bind(me,"visa")}>
                                <div className="box-caer-bg visa"></div>
                                <div className="box-caer-text">Visa卡申请</div>
                            </div>
                            <div className="box-caer-boder"></div>
                            <div className="rit-xinyongka-box-caer" onClick={me.gotoWHPage.bind(me,"master")}>
                                <div className="box-caer-bg master"></div>
                                <div className="box-caer-text">Master卡申请</div>
                            </div>
                        </div>
                    </div>
                    <div className="mage-higth"></div>
                    <div className="nav-title">
                        <div className="nav-boder-left"></div>
                        <div className="nav-boder-title">消费优计划</div>
                    </div>
                    <div className="ryt-xiaofeiyoujihua-box" onClick={me.gotoWHPage.bind(me,"xiafeiyou")}></div>
                    <div className="mage-higth1"></div>
                    <div className="mage-higth"></div>
                    <div className="nav-title">
                        <div className="nav-boder-left"></div>
                        <div className="nav-boder-title">悦行加拿大</div>
                    </div>
                    <div className="banner-lunbo" onClick={me.gotoWHPage.bind(me,"canada")}></div>
                    <div className="mage-higth1"></div>
                    <div className="mage-higth"></div>
                    <div className="nav-title">
                        <div className="nav-boder-left"></div>
                        <div className="nav-boder-title">出境小贴士</div>
                    </div>
                    <div className="ryt-cjxts">
                        <div className="ryt-cjxts-box">
                            <div className="ryt-cjxts-box-caerd" onClick={me.gotoWHPage.bind(me,"zhunbei1")} >
                                <div className="ryt-cjxts-box-caerd-bg xingqian"></div>
                                <div className="ryt-cjxts-box-caerd-title">行前准备</div>
                                <div className="ryt-cjxts-box-caerd-text">如何快速、顺利的获取签证，快来这里...</div>
                            </div>
                            <div className="ryt-cjxts-box-caerd" onClick={me.gotoWHPage.bind(me,"zhunbei2")} >
                                <div className="ryt-cjxts-box-caerd-bg chuguo"></div>
                                <div className="ryt-cjxts-box-caerd-title">出国留学</div>
                                <div className="ryt-cjxts-box-caerd-text">如果您萌生了出国留学的想法，希望这...</div>
                            </div>
                            <div className="ryt-cjxts-box-caerd zuihoua" onClick={me.gotoWHPage.bind(me,"zhunbei3")}>
                                <div className="ryt-cjxts-box-caerd-bg chujing"></div>
                                <div className="ryt-cjxts-box-caerd-title zuihouab">出境贴士</div>
                                <div className="ryt-cjxts-box-caerd-text zuihouac">旅行中的困惑，让我们来为您解答。</div>
                            </div>
                        </div>
                    </div>

                    {/*<div className="aaa">
                                            <div className="bbb">
                                                <div className="ccc1"  >
                                                    <div className="ryt-cjxts-box-caerd-bg xingqian"></div>
                                                    <div className="ryt-cjxts-box-caerd-title">行前准备</div>
                                                    <div className="ryt-cjxts-box-caerd-text">如何快速、顺利的获取签证，快来这里...</div>
                                                </div>
                                                <div className="ccc1">
                                                    <div className="ryt-cjxts-box-caerd-bg chuguo"></div>
                                                    <div className="ryt-cjxts-box-caerd-title">出国留学</div>
                                                    <div className="ryt-cjxts-box-caerd-text">如果您萌生了出国留学的想法，希望这...</div>
                                                </div>
                                                <div className="ccc1">
                                                    <div className="ryt-cjxts-box-caerd-bg chujing"></div>
                                                    <div className="ryt-cjxts-box-caerd-title zuihouab">出境贴士</div>
                                                    <div className="ryt-cjxts-box-caerd-text zuihouac">旅行中的困惑，让我们来为您解答。</div>
                                                </div>
                                            </div>
                                        </div>*/}


                </div>

            </div>
        )
    }
}
export default Chujingjinrong
